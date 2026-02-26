"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import Modal from "@/components/common/Modal";
import { db } from "lib/firebase";

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

type AwarenessGuide = {
  id: string;
  articleTitle: string;
  content: string;
  author: string;
  createdAt?: Timestamp;
};

const Manage_Awareness_Guide = () => {
  const [guides, setGuides] = useState<AwarenessGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [guideToDelete, setGuideToDelete] = useState<AwarenessGuide | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const guidesQuery = query(
          collection(db, "awarenessGuide"),
          orderBy("createdAt", "desc"),
        );
        const snapshot = await getDocs(guidesQuery);

        const list: AwarenessGuide[] = snapshot.docs.map((guide) => {
          const data = guide.data();
          return {
            id: guide.id,
            articleTitle: data.articleTitle ?? "Untitled",
            content: data.content ?? "",
            author: data.author ?? "Unknown",
            createdAt: data.createdAt,
          };
        });

        setGuides(list);
      } catch (error) {
        setToast({
          type: "error",
          message: "Failed to load guides. Please refresh the page.",
        });
        console.error("Failed to fetch awareness guides:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchGuides();
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const onDelete = async (id: string) => {
    if (deletingId) return;

    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "awarenessGuide", id));
      setGuides((current) => current.filter((guide) => guide.id !== id));
      setToast({
        type: "success",
        message: "Tip deleted successfully.",
      });
    } catch (error) {
      setToast({
        type: "error",
        message: "Failed to delete tip. Please try again.",
      });
      console.error("Failed to delete awareness guide:", error);
    } finally {
      setDeletingId(null);
      setGuideToDelete(null);
    }
  };

  const openDeleteModal = (guide: AwarenessGuide) => {
    if (deletingId) return;
    setGuideToDelete(guide);
  };

  const closeDeleteModal = () => {
    if (deletingId) return;
    setGuideToDelete(null);
  };

  const formatDate = (createdAt?: Timestamp) => {
    if (!createdAt) return "No date";
    return createdAt.toDate().toLocaleDateString();
  };

  return (
    <div className="w-full">
      <div className="mt-4 mr-10 ml-10 flex items-center justify-between gap-4">
        <p className="text-lg font-bold sm:text-4xl">Manage Awareness Guide</p>
        <Link
          href="/awareness-guide/create-guide"
          className="inline-flex items-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-700"
        >
          New Tip of the Day
        </Link>
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
      <Modal
        isOpen={Boolean(guideToDelete)}
        onClose={closeDeleteModal}
        disableOutsideClick={Boolean(deletingId)}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Delete Tip</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-zinc-800">
              {guideToDelete?.articleTitle ?? "this tip"}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeDeleteModal}
              disabled={Boolean(deletingId)}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() =>
                guideToDelete ? void onDelete(guideToDelete.id) : undefined
              }
              disabled={Boolean(deletingId)}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deletingId ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>

      <div className="mt-8 mr-10 mb-7 ml-10">
        <div className="text-sm text-[#565d6d]">
          Manage posted awareness tips and keep content up to date.
        </div>

        {isLoading ? (
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-500 shadow-sm">
            Loading awareness guides...
          </div>
        ) : null}

        {!isLoading && guides.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm">
            <p className="font-semibold text-zinc-700">No tips published yet</p>
            <p className="mt-2 text-sm text-zinc-500">
              Click New Tip of the Day to add your first awareness guide.
            </p>
          </div>
        ) : null}

        {!isLoading && guides.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {guides.map((guide) => (
              <article
                key={guide.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h2 className="line-clamp-2 text-lg font-semibold text-zinc-900">
                    {guide.articleTitle}
                  </h2>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600">
                    {formatDate(guide.createdAt)}
                  </span>
                </div>
                <p className="line-clamp-4 text-sm leading-6 text-zinc-600">
                  {guide.content}
                </p>
                <p className="mt-4 text-xs font-medium tracking-wide text-zinc-500 uppercase">
                  Author: {guide.author}
                </p>
                <div className="mt-5 flex items-center justify-end gap-2">
                  <Link
                    href={`/awareness-guide/create-guide?id=${guide.id}`}
                    className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                  >
                    Update
                  </Link>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(guide)}
                    disabled={deletingId === guide.id}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === guide.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Manage_Awareness_Guide;
