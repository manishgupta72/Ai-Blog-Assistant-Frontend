import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ai Blog Assistant - Manish Gupta",
  description: "Created by Manish Gupta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={`
            ${geistSans.variable} ${geistMono.variable}
            antialiased
            min-h-screen
           bg-gradient-to-br from-sky-50 via-white to-indigo-50
          `}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
