import type { Metadata } from "next";
import Login from "@/shared/Login";

export const metadata: Metadata = {
  title: "Login - AwareNet Admin",
  description: "Login to AwareNet Admin",
};

export default function Page() {
  return (
    <div className="flex items-center justify-center">
      <Login />
    </div>
  );
}
