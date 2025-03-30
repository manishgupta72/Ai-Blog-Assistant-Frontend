// frontend/components/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, User, LockKeyhole } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/", icon: <Home size={18} /> },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <User size={18} />,
  },
  {
    name: "Admin",
    href: "/admin/login",
    icon: <LockKeyhole size={18} />,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between sticky top-0 z-50 px-6 bg-gradient-to-br from-indigo-50 via-blue to-white-100  backdrop-blur-md">
      {/* Logo on the left */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={0}
          className="h-auto"
        />
      </Link>

      {/* Menu on the right */}
      <ul className="flex gap-4 px-4 py-2 rounded-full bg-transparent backdrop-blur-sm border border-white/30 shadow-md text-sm">
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
      </ul>
    </nav>
  );
}
