"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  createdAt: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/users");
      const result = await response.json();

      setUsers(result.data.users);
    })();
  }, []);

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id} style={{ marginBottom: 16 }}>
            <h3>
              {user.name} ({user.email})
            </h3>
            <p>Roles: {user.roles.join(", ")}</p>
            <p>Created At: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
