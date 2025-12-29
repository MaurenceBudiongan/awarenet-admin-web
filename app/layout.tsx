"use client";

import "./globals.css";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { AuthProvider } from "@descope/react-sdk";

import TopBar from "@/shared/TopBar";
import Content from "@/shared/Content";
import AuthGuard from "./_components/shared/AuthGuard";

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
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider
          projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID || ""}
        >
          <TopBar />
          <Content>{children}</Content>
        </AuthProvider>
      </body>
    </html>
  );
}
