"use client";

const User = () => {
  return (
    <div>
      <p className="ml-10 mt-4 text-4xl font-bold">AwareNet User</p>
      <div className=" ml-10 mr-10 mt-10 mb-7 p-4  p-12 rounded-xl">
        <table className="table-fixed w-full text-sm text-left  text-gray-500">
          <thead className="text-lg  bg-[#eafef3] rounded-sm">
            <tr className="">
              <td className="py-5 px-5">AUTHENTICATION</td>
              <td className="py-5 px-5">USER</td>
              <td className="py-5 px-5">TIMESTAMP</td>
              <td className="py-5 px-5">ACTION</td>
            </tr>
          </thead>
          <tbody className="text-lg">
            <tr className="">
              <td className="py-5 px-5">Google Authentication</td>
              <td className="py-5 px-5">admin@awarenet.com</td>
              <td className="py-5 px-5">2025-07-20 10:30 AM</td>
              <td className="py-5 px-5">
                <button className="cursor-pointer bg-white hover:bg-red-400 hover:text-white text-red-400 w-19 h-8 rounded-full border-2 border-red-400">
                  delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-5 px-5 bg-[#fafafb]">Google Authentication</td>
              <td className="py-5 px-5 bg-[#fafafb]">admin@awarenet.com</td>
              <td className="py-5 px-5 bg-[#fafafb]">2025-07-20 9:30 AM</td>
              <td className="py-5 px-5 bg-[#fafafb]">
                <button className="cursor-pointer bg-white hover:bg-red-400 hover:text-white text-red-400 w-19 h-8 rounded-full border-2 border-red-400">
                  delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-5 px-5">AwareNet Authentication</td>
              <td className="py-5 px-5">user123@awarenet.com</td>
              <td className="py-5 px-5">2025-07-18 1:00 PM</td>
              <td className="py-5 px-5">
                <button className="cursor-pointer bg-white hover:bg-red-400 hover:text-white text-red-400 w-19 h-8 rounded-full border-2 border-red-400">
                  delete
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
