"use client";

const User = () => {
  return (
    <div>
      <p className="ml-10 mt-4 text-4xl font-bold">User Overview</p>
      <table className="table-auto md:table-fixed">
        <thead>
          <tr>
            <th>AUTHENTICATION</th>
            <th>USER</th>
            <th>TIMESTAMP</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Google Authentication</td>
            <td>admin@awarenet.com</td>
            <td>2025-07-20 10:30 AM</td>
            <td>delete</td>
          </tr>
          <tr>
            <td>Google Authentication</td>
            <td>admin@awarenet.com</td>
            <td>2025-07-20 9:30 AM</td>
            <td>delete</td>
          </tr>
          <tr>
            <td>AwareNet Authentication</td>
            <td>user123@awarenet.com</td>
            <td>2025-07-18 1:00 PM</td>
            <td>delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default User;
