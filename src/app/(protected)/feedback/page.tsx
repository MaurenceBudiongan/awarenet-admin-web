"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import Modal from "@/components/common/Modal";
import Pagination from "@/components/common/Pagination";
import { db } from "lib/firebase";

type FeedbackItem = {
  id: string;
  userId?: string;
  rating?: number;
  title?: string;
  description?: string;
  createdAt?: Timestamp;
};

type UserProfile = {
  id: string;
  firstName?: string;
  lastName?: string;
  userPfp?: string;
};

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [usersById, setUsersById] = useState<Record<string, UserProfile>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(feedbacks.length / pageSize));

  useEffect(() => {
    const feedbackQuery = query(
      collection(db, "feedback"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribeFeedback = onSnapshot(
      feedbackQuery,
      (snapshot) => {
        const list: FeedbackItem[] = snapshot.docs.map((feedbackDoc) => {
          const data = feedbackDoc.data();
          const parsedRating =
            typeof data.rating === "number"
              ? data.rating
              : Number.parseFloat(data.rating ?? "0");

          return {
            id: feedbackDoc.id,
            userId: data.userId,
            rating: Number.isNaN(parsedRating) ? 0 : parsedRating,
            title: data.title ?? "",
            description: data.description ?? "",
            createdAt: data.createdAt,
          };
        });

        setFeedbacks(list);
        setIsLoading(false);
      },
      (error) => {
        console.error("Failed to subscribe feedback collection:", error);
        setIsLoading(false);
      },
    );

    const usersQuery = query(collection(db, "users"));
    const unsubscribeUsers = onSnapshot(
      usersQuery,
      (snapshot) => {
        const mappedUsers: Record<string, UserProfile> = {};
        snapshot.docs.forEach((userDoc) => {
          const data = userDoc.data();
          mappedUsers[userDoc.id] = {
            id: userDoc.id,
            firstName: data.firstName,
            lastName: data.lastName,
            userPfp: data.userPfp,
          };
        });

        setUsersById(mappedUsers);
      },
      (error) => {
        console.error("Failed to subscribe users collection:", error);
      },
    );

    return () => {
      unsubscribeFeedback();
      unsubscribeUsers();
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!isDeleteModalOpen) return;
    setMenuOpenId(null);
  }, [isDeleteModalOpen]);

  const totalFeedbackEntries = feedbacks.length;
  const averageRating = useMemo(() => {
    if (feedbacks.length === 0) return 0;
    const total = feedbacks.reduce(
      (sum, item) => sum + (typeof item.rating === "number" ? item.rating : 0),
      0,
    );
    return total / feedbacks.length;
  }, [feedbacks]);

  const paginatedFeedbacks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return feedbacks.slice(startIndex, endIndex);
  }, [feedbacks, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const getDisplayName = (userId?: string) => {
    if (!userId) return "Unknown User";
    const user = usersById[userId];
    if (!user) return "Unknown User";
    const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    return fullName || "Unknown User";
  };

  const getUserPfp = (userId?: string) => {
    if (!userId) return "/profile.png";
    return usersById[userId]?.userPfp || "/profile.png";
  };

  const formatDate = (createdAt?: Timestamp) => {
    if (!createdAt) return "No date";
    return createdAt.toDate().toLocaleString();
  };

  const openDeleteModal = (item: FeedbackItem) => {
    setSelectedFeedback(item);
    setIsDeleteModalOpen(true);
    setMenuOpenId(null);
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
    setSelectedFeedback(null);
  };

  const onConfirmDelete = async () => {
    if (!selectedFeedback || isDeleting) return;

    const deletingId = selectedFeedback.id;
    const previousFeedbacks = feedbacks;
    setIsDeleting(true);
    setFeedbacks((current) => current.filter((item) => item.id !== deletingId));

    try {
      await deleteDoc(doc(db, "feedback", deletingId));
      setToast({ type: "success", message: "Feedback deleted successfully." });
      setIsDeleteModalOpen(false);
      setSelectedFeedback(null);
    } catch (error) {
      setToast({ type: "error", message: "Failed to delete feedback." });
      setFeedbacks(previousFeedbacks);
      console.error("Failed to delete feedback:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full">
      <p className="mt-4 ml-10 text-lg font-bold sm:text-4xl">Feedback Overview</p>
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
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        disableOutsideClick={isDeleting}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Delete Feedback</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-zinc-800">
              {selectedFeedback?.title || "this feedback"}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeDeleteModal}
              disabled={isDeleting}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void onConfirmDelete()}
              disabled={isDeleting}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
      <div className="mt-10 mr-10 ml-10 flex flex-col space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex min-h-44 w-full flex-col justify-center space-y-4 rounded-lg bg-[#eafef3] p-8">
            <p className="text-xl font-semibold">Total Feedback Entries</p>
            <p className="text-3xl font-bold text-[#05893E]">{totalFeedbackEntries}</p>
            <p className="text-md text-gray-500">Across all users</p>
          </div>
          <div className="flex min-h-44 w-full flex-col justify-center space-y-4 rounded-lg bg-[#eafef3] p-8">
            <p className="text-xl font-semibold">Average Rating</p>
            <p className="text-3xl font-bold text-[#05893E]">
              {averageRating.toFixed(1)} / 5
            </p>
            <p className="text-md text-gray-500">Based on all submissions</p>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm">
            Loading feedback...
          </div>
        ) : null}

        {!isLoading && feedbacks.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm">
            No feedback entries found.
          </div>
        ) : null}

        {!isLoading && feedbacks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 rounded-xl lg:grid-cols-3">
            {paginatedFeedbacks.map((item) => (
              <div
                key={item.id}
                className="relative w-full overflow-visible rounded-lg bg-[#e5f6ff] p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={getUserPfp(item.userId)}
                      alt={getDisplayName(item.userId)}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg">{getDisplayName(item.userId)}</p>
                      <p className="text-sm text-[#565d6d]">{formatDate(item.createdAt)}</p>
                    </div>
                  </div>
                  <div className="relative z-30">
                    <button
                      type="button"
                      onClick={() =>
                        setMenuOpenId((current) => (current === item.id ? null : item.id))
                      }
                      className="rounded-full p-1.5 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-800"
                      aria-label="Open feedback actions"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <circle cx="12" cy="5" r="1.8" />
                        <circle cx="12" cy="12" r="1.8" />
                        <circle cx="12" cy="19" r="1.8" />
                      </svg>
                    </button>
                    {menuOpenId === item.id && !isDeleteModalOpen ? (
                      <div className="absolute top-9 right-0 min-w-28 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg">
                        <button
                          type="button"
                          onClick={() => openDeleteModal(item)}
                          className="block w-full px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-3 flex">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const isFilled = index < Math.round(item.rating ?? 0);
                    return (
                      <svg
                        key={`${item.id}-star-${index}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={isFilled ? "#EAB308" : "#D1D5DB"}
                        stroke={isFilled ? "#EAB308" : "#D1D5DB"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star-icon lucide-star"
                      >
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                    );
                  })}
                </div>

                <div className="mt-3">
                  <p className="text-base font-semibold text-zinc-900">
                    {item.title || "Untitled Feedback"}
                  </p>
                  <p className="mt-2 text-sm text-zinc-700">
                    {item.description || "No description provided."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {!isLoading && feedbacks.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              if (page < 1 || page > totalPages) return;
              setCurrentPage(page);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Feedback;
