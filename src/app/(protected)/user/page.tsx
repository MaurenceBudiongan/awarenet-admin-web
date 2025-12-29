"use client";

const User = () => {
  return (
    <div className="">
      <p className="ml-10 mt-4 text-lg sm:text-4xl font-bold mb-6 ">
        AwareNet User
      </p>

      <div className="ml-10 mr-10 mt-10 mb-7 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full text-xs sm:text-sm text-left text-gray-500">
          <thead className="bg-[#eafef3] text-gray-700">
            <tr>
              <th className="py-3 sm:py-5 px-2 sm:px-5">AUTHENTICATION</th>
              <th className="py-3 sm:py-5 px-2 sm:px-5">USER</th>
              <th className="py-3 sm:py-5 px-2 sm:px-5">TIMESTAMP</th>
              <th className="py-3 sm:py-5 px-2 sm:px-5">ACTION</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            <tr>
              <td className="py-3 sm:py-5 px-2 sm:px-5">
                Google Authentication
              </td>
              <td className="py-3 sm:py-5 px-2 sm:px-5">admin@awarenet.com</td>
              <td className="py-3 sm:py-5 px-2 sm:px-5">2025-07-20 10:30 AM</td>
              <td className="py-3 sm:py-5 px-2 sm:px-5 flex flex-wrap gap-2">
                <button className="cursor-pointer bg-white hover:bg-red-400 hover:text-white text-red-400 px-3 py-1 rounded-full border-2 border-red-400 text-xs sm:text-sm">
                  Delete
                </button>
                <button className="cursor-pointer bg-white hover:bg-orange-300 hover:text-white text-orange-300 px-3 py-1 rounded-full border-2 border-orange-300 text-xs sm:text-sm">
                  Restrict
                </button>
              </td>
            </tr>

            <tr className="bg-[#fafafb]">
              <td className="py-3 sm:py-5 px-2 sm:px-5">
                Google Authentication
              </td>
              <td className="py-3 sm:py-5 px-2 sm:px-5">admin@awarenet.com</td>
              <td className="py-3 sm:py-5 px-2 sm:px-5">2025-07-20 9:30 AM</td>
              <td className="py-3 sm:py-5 px-2 sm:px-5 flex flex-wrap gap-2">
                <button className="cursor-pointer bg-white hover:bg-red-400 hover:text-white text-red-400 px-3 py-1 rounded-full border-2 border-red-400 text-xs sm:text-sm">
                  Delete
                </button>
                <button className="cursor-pointer bg-white hover:bg-orange-300 hover:text-white text-orange-300 px-3 py-1 rounded-full border-2 border-orange-300 text-xs sm:text-sm">
                  Restrict
                </button>
              </td>
            </tr>

            <tr>
              <td className="py-3 sm:py-5 px-2 sm:px-5">
                AwareNet Authentication
              </td>
              <td className="py-3 sm:py-5 px-2 sm:px-5">
                user123@awarenet.com
              </td>
              <td className="py-3 sm:py-5 px-2 sm:px-5">2025-07-18 1:00 PM</td>
              <td className="py-3 sm:py-5 px-2 sm:px-5 flex flex-wrap gap-2">
                <button className="cursor-pointer bg-white hover:bg-red-400 hover:text-white text-red-400 px-3 py-1 rounded-full border-2 border-red-400 text-xs sm:text-sm">
                  Delete
                </button>
                <button className="cursor-pointer bg-white hover:bg-orange-300 hover:text-white text-orange-300 px-3 py-1 rounded-full border-2 border-orange-300 text-xs sm:text-sm">
                  Restrict
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
