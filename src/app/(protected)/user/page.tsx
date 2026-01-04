const User = () => {
  return (
    <div className="w-full">
      <p className="mt-4 mb-6 ml-10 text-lg font-bold sm:text-4xl">
        AwareNet User
      </p>

      <div className="mt-10 mr-10 mb-7 ml-10 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full text-left text-xs text-gray-500 sm:text-sm">
          <thead className="bg-[#eafef3] text-gray-700">
            <tr>
              <th className="px-2 py-3 sm:px-5 sm:py-5">AUTHENTICATION</th>
              <th className="px-2 py-3 sm:px-5 sm:py-5">USER</th>
              <th className="px-2 py-3 sm:px-5 sm:py-5">TIMESTAMP</th>
              <th className="px-2 py-3 sm:px-5 sm:py-5">ACTION</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            <tr>
              <td className="px-2 py-3 sm:px-5 sm:py-5">
                Google Authentication
              </td>
              <td className="px-2 py-3 sm:px-5 sm:py-5">admin@awarenet.com</td>
              <td className="px-2 py-3 sm:px-5 sm:py-5">2025-07-20 10:30 AM</td>
              <td className="flex flex-wrap gap-2 px-2 py-3 sm:px-5 sm:py-5">
                <button className="cursor-pointer rounded-full border-2 border-red-400 bg-white px-3 py-1 text-xs text-red-400 hover:bg-red-400 hover:text-white sm:text-sm">
                  Delete
                </button>
                <button className="cursor-pointer rounded-full border-2 border-orange-300 bg-white px-3 py-1 text-xs text-orange-300 hover:bg-orange-300 hover:text-white sm:text-sm">
                  Restrict
                </button>
              </td>
            </tr>

            <tr className="bg-[#fafafb]">
              <td className="px-2 py-3 sm:px-5 sm:py-5">
                Google Authentication
              </td>
              <td className="px-2 py-3 sm:px-5 sm:py-5">admin@awarenet.com</td>
              <td className="px-2 py-3 sm:px-5 sm:py-5">2025-07-20 9:30 AM</td>
              <td className="flex flex-wrap gap-2 px-2 py-3 sm:px-5 sm:py-5">
                <button className="cursor-pointer rounded-full border-2 border-red-400 bg-white px-3 py-1 text-xs text-red-400 hover:bg-red-400 hover:text-white sm:text-sm">
                  Delete
                </button>
                <button className="cursor-pointer rounded-full border-2 border-orange-300 bg-white px-3 py-1 text-xs text-orange-300 hover:bg-orange-300 hover:text-white sm:text-sm">
                  Restrict
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-2 py-3 sm:px-5 sm:py-5">
                AwareNet Authentication
              </td>
              <td className="px-2 py-3 sm:px-5 sm:py-5">
                user123@awarenet.com
              </td>
              <td className="px-2 py-3 sm:px-5 sm:py-5">2025-07-18 1:00 PM</td>
              <td className="flex flex-wrap gap-2 px-2 py-3 sm:px-5 sm:py-5">
                <button className="cursor-pointer rounded-full border-2 border-red-400 bg-white px-3 py-1 text-xs text-red-400 hover:bg-red-400 hover:text-white sm:text-sm">
                  Delete
                </button>
                <button className="cursor-pointer rounded-full border-2 border-orange-300 bg-white px-3 py-1 text-xs text-orange-300 hover:bg-orange-300 hover:text-white sm:text-sm">
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
