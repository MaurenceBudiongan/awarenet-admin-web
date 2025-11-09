"use client";

const History = () => {
  return (
    <div>
      <p className="ml-10 mt-4 text-4xl font-bold">History</p>
      <div className="ml-10 mr-10 mt-10 mb-7 rounded-xl flex space-x-15">
        <div className="flex w-full space-x-30">
          <div className="w-full rounded-xl shadow-sm h-40 flex justify-center items-center space-x-4">
            <div className="w-20 flex flex-col space-y-2 ">
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
                className="text-[#05893E] mb-5 lucide lucide-history-icon lucide-history"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M12 7v5l4 2" />
              </svg>
            </div>
          </div>
          <div className="w-full rounded-xl shadow-sm h-40 flex justify-center items-center space-x-4">
            <div className="w-20 flex flex-col space-y-2 ">
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
                className="text-[#8AAB67] lucide lucide-users-icon lucide-users"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <div className="w-full rounded-xl shadow-sm h-40 flex justify-center items-center space-x-4">
            <div className="w-20 flex flex-col space-y-2 ">
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
                className="text-[#16A34A] lucide lucide-message-circle-icon lucide-message-circle"
              >
                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
              </svg>
            </div>
          </div>
          <div className="w-full rounded-xl shadow-sm h-40 flex justify-center items-center space-x-4">
            <div className="w-20 flex flex-col space-y-2 ">
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
                className="text-[#EF4444] lucide lucide-circle-check-big-icon lucide-circle-check-big"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
