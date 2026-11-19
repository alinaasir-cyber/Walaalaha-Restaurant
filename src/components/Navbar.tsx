"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, ShoppingBag, Globe, User, LogOut, UtensilsCrossed, ExternalLink } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    role: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data?.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (e) {
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-slate-200">
      {/* Left Search Bar */}
      <div className="flex items-center gap-4 lg:w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search menu, orders, tables, customers..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all"
          />
        </div>
      </div>

      {/* Right Controls & Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Public Website */}
        <Link
          href="/website"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-rose-500" />
          <span>Public Website</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        {/* Customer App */}
        <Link
          href="/order"
          target="_blank"
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
        >
          <UtensilsCrossed className="w-3.5 h-3.5 text-rose-500" />
          <span>Customer App</span>
        </Link>

        {/* Quick Launch POS Button */}
        <Link
          href="/pos/menu"
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-sm shadow-rose-500/25 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Open POS</span>
        </Link>

        {/* Language switch */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span>EN</span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        {/* User profile with Role & Standalone Login Portal */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <Link
            href="/login"
            title="Open Standalone Login Page"
            className="flex items-center gap-2 group hover:opacity-85 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white flex items-center justify-center font-bold text-xs border border-rose-100 transition-colors shadow-sm">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors leading-tight">
                {currentUser?.name || "Admin User"}
              </p>
              <p className="text-[10px] text-rose-500 font-semibold uppercase tracking-wider">
                {currentUser?.role || "SUPER_ADMIN"}
              </p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            title="Sign Out & Go to Standalone Login"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
