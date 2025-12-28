"use client";

import "./globals.css";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { AuthProvider } from "@descope/react-sdk";

import TopBar from "@/shared/TopBar";
import SideBar from "@/shared/SideBar";
import Main from "@/shared/Main";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <AuthProvider
          projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID || ""}
        >
          <TopBar />
          <div className="mt-16 fixed left-0 w-full h-screen flex">
            <SideBar />
            <Main>{children}</Main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
