"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";

import Modal from "@/components/common/Modal";
import { db } from "lib/firebase";

type FirebaseUser = {
  id: string;
  userPfp?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  accountStatus?: string | boolean;
  deactivatedUntil?: unknown;
  deactivationDuration?: string;
};

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

type DurationKey = "8h" | "12h" | "1d" | "1w";

const DURATION_OPTIONS: {
  key: DurationKey;
  label: string;
  ms: number;
  className: string;
}[] = [
  {
    key: "8h",
    label: "8 hrs",
    ms: 8 * 60 * 60 * 1000,
    className: "border-sky-300 bg-sky-50 text-sky-700",
  },
  {
    key: "12h",
    label: "12 hrs",
    ms: 12 * 60 * 60 * 1000,
    className: "border-emerald-300 bg-emerald-50 text-emerald-700",
  },
  {
    key: "1d",
    label: "1 day",
    ms: 24 * 60 * 60 * 1000,
    className: "border-amber-300 bg-amber-50 text-amber-700",
  },
  {
    key: "1w",
    label: "1 week",
    ms: 7 * 24 * 60 * 60 * 1000,
    className: "border-rose-300 bg-rose-50 text-rose-700",
  },
];

function parseDate(value: unknown) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "object" && value !== null && "toDate" in value) {
    const dateObj = value as { toDate: () => Date };
    return dateObj.toDate();
  }
  const parsed = new Date(value as string | number);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isDeactivated(accountStatus?: string | boolean) {
  if (typeof accountStatus === "boolean") return !accountStatus;
  return (accountStatus ?? "").toString().toLowerCase() === "deactivated";
}

const User = () => {
  const [users, setUsers] = useState<FirebaseUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<ToastState>(null);
  const [selectedUser, setSelectedUser] = useState<FirebaseUser | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<DurationKey>("8h");

  const isSelectedUserDeactivated = useMemo(
    () => isDeactivated(selectedUser?.accountStatus),
    [selectedUser],
  );

  const reactivateExpiredUsers = useCallback(async (currentUsers: FirebaseUser[]) => {
    const expiredUsers = currentUsers.filter((user) => {
      if (!isDeactivated(user.accountStatus)) return false;
      const expiresAt = parseDate(user.deactivatedUntil);
      if (!expiresAt) return false;
      return expiresAt.getTime() <= Date.now();
    });

    if (expiredUsers.length === 0) {
      return currentUsers;
    }

    await Promise.all(
      expiredUsers.map((user) =>
        updateDoc(doc(db, "users", user.id), {
          accountStatus: "active",
          deactivatedUntil: null,
          deactivationDuration: null,
        }),
      ),
    );

    return currentUsers.map((user) =>
      expiredUsers.some((expiredUser) => expiredUser.id === user.id)
        ? {
            ...user,
            accountStatus: "active",
            deactivatedUntil: null,
            deactivationDuration: undefined,
          }
        : user,
    );
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersQuery = query(collection(db, "users"));
        const snapshot = await getDocs(usersQuery);

        const list: FirebaseUser[] = snapshot.docs.map((userDoc) => {
          const data = userDoc.data();
          return {
            id: userDoc.id,
            userPfp: data.userPfp,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            accountStatus: data.accountStatus,
            deactivatedUntil: data.deactivatedUntil,
            deactivationDuration: data.deactivationDuration,
          };
        });

        const normalizedUsers = await reactivateExpiredUsers(list);
        setUsers(normalizedUsers);
      } catch (error) {
        console.error("Failed to load users from Firebase:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUsers();
  }, [reactivateExpiredUsers]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (users.length === 0) return;
      void (async () => {
        const normalizedUsers = await reactivateExpiredUsers(users);
        setUsers(normalizedUsers);
      })();
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, [users, reactivateExpiredUsers]);

  const getFullName = (firstName?: string, lastName?: string) => {
    const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
    return fullName || "No name";
  };

  const getAccountStatusLabel = (accountStatus?: string | boolean) => {
    if (typeof accountStatus === "boolean") {
      return accountStatus ? "active" : "Deactivated";
    }
    return accountStatus ?? "Unknown";
  };

  const getDurationClass = (durationLabel?: string) => {
    const option = DURATION_OPTIONS.find((item) => item.label === durationLabel);
    return option?.className ?? "border-zinc-300 bg-zinc-50 text-zinc-700";
  };

  const openStatusModal = (user: FirebaseUser) => {
    setSelectedUser(user);
    setSelectedDuration("8h");
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    if (isUpdatingStatus) return;
    setIsStatusModalOpen(false);
    setSelectedUser(null);
  };

  const openDeleteModal = (user: FirebaseUser) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const onConfirmStatusChange = async () => {
    if (!selectedUser || isUpdatingStatus) return;

    setIsUpdatingStatus(true);
    try {
      if (isDeactivated(selectedUser.accountStatus)) {
        await updateDoc(doc(db, "users", selectedUser.id), {
          accountStatus: "active",
          deactivatedUntil: null,
          deactivationDuration: null,
        });

        setUsers((current) =>
          current.map((item) =>
            item.id === selectedUser.id
              ? {
                  ...item,
                  accountStatus: "active",
                  deactivatedUntil: null,
                  deactivationDuration: undefined,
                }
              : item,
          ),
        );

        setToast({
          type: "success",
          message: "Account activated successfully.",
        });
      } else {
        const durationOption = DURATION_OPTIONS.find(
          (option) => option.key === selectedDuration,
        );
        if (!durationOption) return;

        const expiresAt = new Date(Date.now() + durationOption.ms);
        await updateDoc(doc(db, "users", selectedUser.id), {
          accountStatus: "Deactivated",
          deactivatedUntil: expiresAt,
          deactivationDuration: durationOption.label,
        });

        setUsers((current) =>
          current.map((item) =>
            item.id === selectedUser.id
              ? {
                  ...item,
                  accountStatus: "Deactivated",
                  deactivatedUntil: expiresAt,
                  deactivationDuration: durationOption.label,
                }
              : item,
          ),
        );

        setToast({
          type: "success",
          message: `Account deactivated for ${durationOption.label}.`,
        });
      }

      setIsStatusModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      setToast({
        type: "error",
        message: "Failed to update account status.",
      });
      console.error("Failed to update account status:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const onConfirmDelete = async () => {
    if (!selectedUser || isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, "users", selectedUser.id));
      setUsers((current) => current.filter((item) => item.id !== selectedUser.id));
      setToast({
        type: "success",
        message: "User deleted successfully.",
      });
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      setToast({
        type: "error",
        message: "Failed to delete user.",
      });
      console.error("Failed to delete user:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full">
      <p className="mt-4 mb-6 ml-10 text-lg font-bold sm:text-4xl">
        AwareNet User
      </p>
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
        isOpen={isStatusModalOpen}
        onClose={closeStatusModal}
        disableOutsideClick={isUpdatingStatus}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Update Account Status</h2>
          <p className="mt-2 text-sm text-zinc-600">
            {isSelectedUserDeactivated
              ? `Activate ${selectedUser ? getFullName(selectedUser.firstName, selectedUser.lastName) : "this user"} now?`
              : `Set deactivation duration for ${selectedUser ? getFullName(selectedUser.firstName, selectedUser.lastName) : "this user"}.`}
          </p>

          {!isSelectedUserDeactivated ? (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {DURATION_OPTIONS.map((option) => {
                const isSelected = selectedDuration === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setSelectedDuration(option.key)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      isSelected
                        ? `${option.className} ring-2 ring-zinc-900/15`
                        : "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          ) : null}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeStatusModal}
              disabled={isUpdatingStatus}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void onConfirmStatusChange()}
              disabled={isUpdatingStatus}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdatingStatus
                ? "Saving..."
                : isSelectedUserDeactivated
                  ? "Activate Now"
                  : "Deactivate"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        disableOutsideClick={isDeleting}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Delete User</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-zinc-800">
              {selectedUser
                ? getFullName(selectedUser.firstName, selectedUser.lastName)
                : "this user"}
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
              {isDeleting ? "Deleting..." : "Delete User"}
            </button>
          </div>
        </div>
      </Modal>

      <div className="mt-10 mr-10 mb-7 ml-10 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full text-left text-xs text-gray-500 sm:text-sm">
          <thead className="bg-[#eafef3] text-gray-700">
            <tr>
              <th className="px-3 py-4 sm:px-5">USER</th>
              <th className="px-3 py-4 sm:px-5">EMAIL</th>
              <th className="px-3 py-4 sm:px-5">ACCOUNT STATUS</th>
              <th className="px-3 py-4 sm:px-5">ACTION</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {isLoading ? (
              <tr>
                <td className="px-3 py-4 sm:px-5" colSpan={4}>
                  Loading users...
                </td>
              </tr>
            ) : null}

            {!isLoading && users.length === 0 ? (
              <tr>
                <td className="px-3 py-4 sm:px-5" colSpan={4}>
                  No users found in Firebase.
                </td>
              </tr>
            ) : null}

            {!isLoading
              ? users.map((user, index) => (
                  <tr key={user.id} className={index % 2 === 1 ? "bg-[#fafafb]" : ""}>
                    <td className="px-3 py-4 sm:px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.userPfp || "/profile.png"}
                          alt={getFullName(user.firstName, user.lastName)}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-900">
                          {getFullName(user.firstName, user.lastName)}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4 sm:px-5">{user.email ?? "No email"}</td>
                    <td className="px-3 py-4 sm:px-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            isDeactivated(user.accountStatus)
                              ? "bg-red-100 text-red-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {getAccountStatusLabel(user.accountStatus)}
                        </span>
                        {isDeactivated(user.accountStatus) && user.deactivationDuration ? (
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getDurationClass(user.deactivationDuration)}`}
                          >
                            {user.deactivationDuration}
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-3 py-4 sm:px-5">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => openStatusModal(user)}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition sm:text-sm ${
                            isDeactivated(user.accountStatus)
                              ? "border-emerald-500 text-emerald-700 hover:bg-emerald-500 hover:text-white"
                              : "border-orange-400 text-orange-500 hover:bg-orange-400 hover:text-white"
                          }`}
                        >
                          {isDeactivated(user.accountStatus) ? "Activate" : "Deactivate"}
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(user)}
                          className="rounded-full border border-red-400 px-3 py-1 text-xs font-medium text-red-500 transition hover:bg-red-500 hover:text-white sm:text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
