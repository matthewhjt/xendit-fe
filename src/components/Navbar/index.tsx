"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const router = useRouter();
  const { email, logout } = useUser();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="fixed top-0 w-full z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg border-b">
      <nav className="flex justify-between items-center px-[80px] py-4">
        <Link href="/">
          <Image
            src="/landing/hero.jpg"
            width={179}
            height={47}
            alt="Logo"
            className="w-[180px] h-[80px]"
          />
        </Link>

        <div className="flex items-center gap-12">
          <Link
            href="/class"
            className="text-white hover:text-gray-200 font-medium text-lg transition-colors"
          >
            Kelas
          </Link>
          <Link
            href="/langganan"
            className="text-white hover:text-gray-200 font-medium text-lg transition-colors"
          >
            Langganan
          </Link>
        </div>

        <div className="flex gap-6 items-center">
          {email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20 font-light text-lg gap-2 px-6"
                >
                  Hello, <span className="font-medium">{email}</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="secondary" className="rounded-xl px-6">
                <Link href="/register">Sign Up</Link>
              </Button>
              <Button asChild variant="secondary" className="rounded-xl px-6">
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
