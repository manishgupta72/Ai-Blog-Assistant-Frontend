"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  User,
  LockKeyhole,
  Sparkles,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import AIToolsModal from "@/components/AIToolsModal";
import { useState, useRef } from "react";

const navItems = [
  { name: "Home", href: "/", icon: <Home size={18} /> },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  { name: "Contact", href: "/contact", icon: <User size={18} /> },
  { name: "Admin", href: "/admin/login", icon: <LockKeyhole size={18} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [openAITools, setOpenAITools] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <>
      <nav className="flex items-center justify-between sticky top-0 z-50 px-6 py-2 bg-gradient-to-br from-indigo-50 via-blue to-white-100 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={0}
            className="h-auto"
          />
        </Link>

        <ul className="flex gap-4 px-4 py-2 rounded-full bg-transparent backdrop-blur-sm border border-white/30 shadow-md text-sm relative">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 hover:bg-gray-100 ${
                  pathname === item.href
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-700"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}

          <li
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 px-4 py-2 cursor-pointer rounded-full transition-all duration-200 hover:bg-gray-100 text-gray-700">
              🧠 AI Tools ▾
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg z-50">
                <button
                  onClick={() => {
                    setOpenAITools(true);
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 flex items-center gap-2 text-purple-700 font-semibold hover:bg-purple-50 cursor-pointer"
                >
                  <Sparkles size={18} />
                  AI Blog Assistant
                </button>

                <Link
                  href="/image-generator"
                  onClick={() => setShowDropdown(false)}
                  className="w-full px-4 py-2 flex items-center gap-2 text-indigo-700 hover:bg-indigo-50 cursor-pointer"
                >
                  <ImageIcon size={18} />
                  AI Image Generator
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>

      {openAITools && <AIToolsModal onClose={() => setOpenAITools(false)} />}
    </>
  );
}
