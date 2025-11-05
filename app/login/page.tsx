"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    setMessage("");

    setTimeout(async () => {
      try {
        const res = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
          router.push("/homepage");
        } else {
          setMessage(`❌ ${data.error || "Login failed"}`);
        }
      } catch (err) {
        console.error(err);
        setMessage("❌ Network error");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white rounded-2xl shadow-md w-full max-w-md space-y-4 "
      >
        <h1 className="text-2xl font-bold text-center">AwareNet</h1>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 text-sm py-2 rounded-lg bg-gray-100 outline-none border-none mb-5"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-black-900">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 text-sm py-2 rounded-lg outline-none border-none bg-gray-100"
            required
          />
        </div>

        {isLoading ? (
          <p className="text-center text-sm text-gray-700">Logging in...</p>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Login
          </button>
        )}

        {message && (
          <p className="text-center text-sm text-gray-700 mt-3">{message}</p>
        )}
      </form>
    </div>
  );
}
