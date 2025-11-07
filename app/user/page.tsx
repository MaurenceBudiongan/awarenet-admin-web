"use client";

const User = () => {
  return (
    <div>
      <p className="ml-10 mt-4 text-4xl font-bold">User Overview</p>
      <div className="bg-[#eafef3] p-12 rounded-xl">
        <table className="w-full text-sm text-left  text-gray-500">
          <thead className="text-lg  bg-[#e5f6ff]">
            <tr>
              <th scope="col" className="px-6 py-3">
                AUTHENTICATION
              </th>
              <th>USER</th>
              <th>TIMESTAMP</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            <tr className="">
              <td className="px-6 py-3">Google Authentication</td>
              <td>admin@awarenet.com</td>
              <td>2025-07-20 10:30 AM</td>
              <td>delete</td>
            </tr>
            <tr>
              <td className="px-6 py-3">Google Authentication</td>
              <td>admin@awarenet.com</td>
              <td>2025-07-20 9:30 AM</td>
              <td>delete</td>
            </tr>
            <tr>
              <td className="px-6 py-3">AwareNet Authentication</td>
              <td>user123@awarenet.com</td>
              <td>2025-07-18 1:00 PM</td>
              <td>delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
