import { NextResponse } from "next/server";

import { getFirebaseAdminAuth, getFirebaseAdminDb } from "lib/firebase-admin";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  try {
    const auth = getFirebaseAdminAuth();
    const db = getFirebaseAdminDb();
    const body = (await req.json().catch(() => null)) as { email?: string } | null;
    const requestEmail = body?.email?.trim() || "";

    // Load the Firestore user first so we can fallback to email-based auth deletion
    // when the document ID is not the Firebase Auth UID.
    const userDocRef = db.collection("users").doc(id);
    const userDoc = await userDocRef.get();
    const docEmail = userDoc.exists
      ? String(userDoc.data()?.email ?? "").trim()
      : "";
    const email = requestEmail || docEmail;

    try {
      await auth.deleteUser(id);
    } catch (authDeleteError) {
      // If the ID is not an Auth UID, try deleting by email identifier.
      if (!email) {
        throw authDeleteError;
      }
      const authUser = await auth.getUserByEmail(email);
      await auth.deleteUser(authUser.uid);
    }

    if (userDoc.exists) {
      await userDocRef.delete();
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete user";
    console.error("Failed to delete user:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
