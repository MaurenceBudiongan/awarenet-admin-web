"use client";

const History = () => {
  return (
    <div className="w-full">
      <p className="mt-4 ml-10 text-lg font-bold sm:text-4xl">History</p>
      <div className="mt-10 mr-10 mb-7 ml-10 flex space-x-15 rounded-xl">
        <div className="w-full flex-row space-y-10 space-x-20 sm:space-y-0 md:flex">
          <div className="flex h-40 w-full items-center justify-center space-x-4 rounded-xl shadow-sm">
            <div className="flex w-20 flex-col space-y-2">
              <p className="text-[#565d6d]">Total Activities</p>
              <p className="text-2xl font-bold">1,250</p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-history-icon lucide-history mb-5 text-[#05893E]"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M12 7v5l4 2" />
              </svg>
            </div>
          </div>
          <div className="flex h-40 w-full items-center justify-center space-x-4 rounded-xl shadow-sm">
            <div className="flex w-20 flex-col space-y-2">
              <p className="text-[#565d6d]">Unique Users</p>
              <p className="text-2xl font-bold">120</p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users-icon lucide-users text-[#8AAB67]"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <div className="flex h-40 w-full items-center justify-center space-x-4 rounded-xl shadow-sm">
            <div className="flex w-20 flex-col space-y-2">
              <p className="text-[#565d6d]">Feedback Submitted</p>
              <p className="text-2xl font-bold">320</p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle-icon lucide-message-circle text-[#16A34A]"
              >
                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
              </svg>
            </div>
          </div>
          <div className="flex h-40 w-full items-center justify-center space-x-4 rounded-xl shadow-sm">
            <div className="flex w-20 flex-col space-y-2">
              <p className="text-[#565d6d]">Links Verified</p>
              <p className="text-2xl font-bold">680</p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-check-big-icon lucide-circle-check-big text-[#EF4444]"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 mr-10 mb-7 ml-10 flex space-x-15 overflow-x-auto rounded-xl border border-[#dee1e6] p-2 shadow-xs">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="text-md p-4 text-left text-[#565d6d]"></th>
              <th className="text-md p-4 text-left text-[#565d6d]">
                Activity Type
              </th>
              <th className="text-md p-4 text-left text-[#565d6d]">
                Description
              </th>
              <th className="text-md p-4 text-left text-[#565d6d]">User</th>
              <th className="text-md p-4 text-left text-[#565d6d]">Timestap</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-t-[#dee1e6]">
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-circle-icon lucide-message-circle"
                  color="#16A34A"
                >
                  <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                </svg>
              </td>
              <td className="p-4">Submitted feedback</td>
              <td className="p-4 text-[#565d6d]">Submitted feedback</td>
              <td className="p-4 text-[#565d6d]">Maurence B.</td>
              <td className="p-4 text-[#565d6d]">
                2026-09-01 <br /> 10:30 AM
              </td>
            </tr>
            <tr className="border-t border-t-[#dee1e6]">
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-check-big-icon lucide-circle-check-big"
                  color="#EF4444"
                >
                  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
              </td>
              <td className="p-4">Verified Link</td>
              <td className="p-4 text-[#565d6d]">Verified link</td>
              <td className="p-4 text-[#565d6d]">Joshua A.</td>
              <td className="p-4 text-[#565d6d]">
                2026-09-01 <br /> 10:30 AM
              </td>
            </tr>
            <tr className="border-t border-t-[#dee1e6]">
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-scan-icon lucide-scan"
                  color="#F59E0B"
                >
                  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                </svg>
              </td>
              <td className="p-4">Posting</td>
              <td className="p-4 text-[#565d6d]">Submitted feedback </td>
              <td className="p-4 text-[#565d6d]">Angelica E.</td>
              <td className="p-4 text-[#565d6d]">
                2026-09-01 <br /> 10:30 AM
              </td>
            </tr>
            <tr className="border-t border-t-[#dee1e6]">
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-check-big-icon lucide-circle-check-big"
                  color="#EF4444"
                >
                  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
              </td>
              <td className="p-4">Submitted feedback</td>
              <td className="p-4 text-[#565d6d]">Verified link</td>
              <td className="p-4 text-[#565d6d]"> bob_k</td>
              <td className="p-4 text-[#565d6d]">
                2026-09-01 <br /> 10:30 AM
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
