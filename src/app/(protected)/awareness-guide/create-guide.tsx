"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@descope/nextjs-sdk/client";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "lib/firebase";

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

const Manage_Awareness_Guide = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const guideId = searchParams.get("id");
  const isEditMode = Boolean(guideId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

  const [articleTitle, setArticleTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isLoadingGuide, setIsLoadingGuide] = useState(isEditMode);
  const [isPublishing, setIsPublishing] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    const fetchGuide = async () => {
      if (!guideId) {
        setAuthor(user?.name ?? "");
        setIsLoadingGuide(false);
        return;
      }

      try {
        const guideRef = doc(db, "awarenessGuide", guideId);
        const guideSnapshot = await getDoc(guideRef);

        if (!guideSnapshot.exists()) {
          setToast({
            type: "error",
            message: "Guide not found.",
          });
          setIsLoadingGuide(false);
          return;
        }

        const data = guideSnapshot.data();
        setArticleTitle(data.articleTitle ?? "");
        setContent(data.content ?? "");
        setAuthor(data.author ?? user?.name ?? "");
        setExistingImageUrl(data.imageUrl ?? null);
      } catch (error) {
        setToast({
          type: "error",
          message: "Failed to load guide details.",
        });
        console.error("Failed to load awareness guide:", error);
      } finally {
        setIsLoadingGuide(false);
      }
    };

    void fetchGuide();
  }, [guideId, user?.name]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file && file.size > 700 * 1024) {
      setToast({ type: "error", message: "Image must be under 700 KB." });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = articleTitle.trim();
    const trimmedContent = content.trim();
    const trimmedAuthor = author.trim();

    if (!trimmedTitle || !trimmedContent || !trimmedAuthor) {
      setToast({
        type: "error",
        message: "Please complete Article Title, Content, and Author.",
      });
      return;
    }

    setIsPublishing(true);
    setToast(null);

    try {
      let imageUrl: string | null = existingImageUrl;

      if (imageFile) {
        imageUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      }

      const payload = {
        articleTitle: trimmedTitle,
        content: trimmedContent,
        author: trimmedAuthor,
        adminImageUrl: user?.picture ?? null,
        imageUrl: imageUrl ?? null,
        updatedAt: serverTimestamp(),
      };

      if (guideId) {
        await updateDoc(doc(db, "awarenessGuide", guideId), payload);
      } else {
        await addDoc(collection(db, "awarenessGuide"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      setToast({
        type: "success",
        message: guideId
          ? "Guide updated successfully."
          : "Article published successfully.",
      });
      router.push("/awareness-guide");
    } catch (error) {
      setToast({
        type: "error",
        message: guideId
          ? "Failed to update guide. Please try again."
          : "Failed to publish article. Please try again.",
      });
      console.error("Failed to publish awareness guide article:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  const displayedImage = imagePreview ?? existingImageUrl;

  return (
    <div className="w-full">
      <div className="mt-4 ml-10 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/awareness-guide")}
          className="rounded-full p-2 text-zinc-700 transition hover:bg-zinc-200"
          aria-label="Back to awareness guide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <p className="text-lg font-bold sm:text-4xl">
          {isEditMode
            ? "Update Awareness Guide"
            : "Create New Awareness Guide"}
        </p>
      </div>
      {toast ? (
        <div className="fixed top-18 right-6 z-50">
          <div
            className={`rounded-md px-4 py-3 text-sm font-medium text-white shadow-lg ${
              toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
            }`}
            role="status"
            aria-live="polite"
          >
            {toast.message}
          </div>
        </div>
      ) : null}
      <form
        onSubmit={handleSubmit}
        className="mt-10 mr-10 mb-7 ml-10 flex flex-col justify-around gap-y-6 rounded-xl p-6"
      >
        {isLoadingGuide ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
            Loading current guide details...
          </div>
        ) : null}
        <div className="text-sm text-[#565d6d]">
          {isEditMode
            ? "Update the fields below to edit this tip of the day."
            : "Fill in the information to create a new Guide / Tips of the Day."}
        </div>
        <div className="space-y-3">
          <p className="font-semibold">Article Title</p>
          <input
            type="text"
            placeholder="AwareNet: CyberSecurity Awareness"
            value={articleTitle}
            onChange={(event) => setArticleTitle(event.target.value)}
            className="w-full rounded-sm border border-gray-300 p-2 indent-3 outline-0"
          />
        </div>
        <div className="space-y-3">
          <p className="font-semibold">Content</p>
          <textarea
            name="content"
            id="content"
            placeholder="Enter the content of the article here..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="h-50 w-full rounded-sm border border-gray-300 p-2 indent-3 outline-0 placeholder:text-justify"
          />
        </div>
        <div className="space-y-3">
          <p className="font-semibold">Author</p>
          <input
            type="text"
            placeholder="CodeGenisis Team"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="w-full rounded-sm border border-gray-300 p-2 outline-0"
          />
        </div>
        <div className="space-y-3">
          <p className="font-semibold">Cover Image <span className="text-sm font-normal text-zinc-400">(optional, max 700 KB)</span></p>
          {displayedImage ? (
            <div className="relative w-fit">
              <Image
                src={displayedImage}
                alt="Cover preview"
                width={300}
                height={192}
                unoptimized
                className="h-48 w-auto rounded-md border border-gray-200 object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                aria-label="Remove image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : null}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-zinc-500 file:mr-4 file:rounded-sm file:border-0 file:bg-zinc-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-zinc-700 hover:file:bg-zinc-200"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isPublishing || isLoadingGuide}
            className="float-right mt-4 rounded-sm bg-[#7CAD71] p-2 text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPublishing
              ? isEditMode
                ? "Updating..."
                : "Publishing..."
              : isEditMode
                ? "Update Guide"
                : "Publish Article"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Manage_Awareness_Guide;
