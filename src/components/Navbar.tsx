"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  User,
  LockKeyhole,
  Sparkles,
  ImageIcon,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import AIToolsModal from "@/components/AIToolsModal";
import { useState, useRef, useEffect } from "react";

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
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [openAITools, setOpenAITools] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(localStorage.getItem("user_name"));
    };
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_name");
    setUserName(null);
    router.push("/login");
  };

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
      <nav className="sticky top-0 z-50 bg-gradient-to-br from-indigo-50 via-blue to-white-100 backdrop-blur-md px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={120} height={20} />
          </Link>

          <div className="md:hidden cursor-pointer">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <ul className="hidden md:flex gap-4 px-4 py-2 rounded-full bg-transparent backdrop-blur-sm border border-white/30 text-sm relative">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 hover:bg-gray-100 ${
                    pathname === item.href
                      ? "text-blue-600 font-semibold border-b-2 border-blue-600 cursor-pointer"
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
              <button className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full hover:bg-gray-100 text-gray-700">
                🧠 AI Tools ▾
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      setOpenAITools(true);
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 cursor-pointer flex items-center gap-2 text-purple-700 font-semibold hover:bg-purple-50"
                  >
                    <Sparkles size={18} /> AI Blog Assistant
                  </button>
                  <Link
                    href="/image-generator"
                    onClick={() => setShowDropdown(false)}
                    className="w-full px-4 py-2 cursor-pointer flex items-center gap-2 text-indigo-700 hover:bg-indigo-50"
                  >
                    <ImageIcon size={18} /> AI Image Generator
                  </Link>
                </div>
              )}
            </li>

            {userName && (
              <li className="ml-2 flex items-center gap-2 text-sm text-gray-800">
                <span className="font-medium">Hi, {userName}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-50 rounded-full text-red-500 cursor-pointer"
                >
                  <LogOut size={18} />
                </button>
              </li>
            )}
          </ul>
        </div>

        {mobileMenuOpen && (
          <ul className="md:hidden flex flex-col gap-2 mt-4 border-t pt-4 text-sm ">
            {navItems.map((item) => (
              <li key={item.href} className="flex items-center gap-2 px-4 ">
                {item.icon}
                <Link
                  href={item.href}
                  className={`block py-2 transition-all duration-200 hover:bg-gray-100 rounded-md flex-1 ${
                    pathname === item.href
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2 px-4">
              <Sparkles size={18} />
              <button
                onClick={() => setOpenAITools(true)}
                className="block py-2 text-left text-purple-700 font-semibold hover:bg-purple-50 rounded-md flex-1"
              >
                AI Blog Assistant
              </button>
            </li>
            <li className="flex items-center gap-2 px-4">
              <ImageIcon size={18} />
              <Link
                href="/image-generator"
                className="block py-2 text-indigo-700 hover:bg-indigo-50 rounded-md flex-1"
              >
                AI Image Generator
              </Link>
            </li>
            {userName && (
              <li className="flex items-center gap-2 px-4 text-sm text-gray-800">
                <span className="flex-1">Hi, {userName}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-50 rounded-full text-red-500"
                >
                  <LogOut size={18} />
                </button>
              </li>
            )}
          </ul>
        )}
      </nav>

      {openAITools && <AIToolsModal onClose={() => setOpenAITools(false)} />}
    </>
  );
}
