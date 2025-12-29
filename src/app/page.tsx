import type { Metadata } from "next";
import Login from "@/shared/Login";

export const metadata: Metadata = {
  title: "AwareNet Admin",
  description: "Login to AwareNet Admin",
};

export default function Page() {
  return <Login />;
}
