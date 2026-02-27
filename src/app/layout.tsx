"use client";

import "@/components/styles/globals.css";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { AuthProvider } from "@descope/react-sdk";

import Content from "@/shared/Content";
import ThemeProvider from "@/shared/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply dark class instantly before React hydrates — prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.classList.toggle('dark',localStorage.getItem('theme')!=='light')}catch(e){document.documentElement.classList.add('dark')}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider
            projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID || ""}
          >
            <Content>{children}</Content>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
