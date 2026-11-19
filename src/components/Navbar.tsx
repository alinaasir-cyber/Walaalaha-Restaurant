"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, ShoppingBag, Globe, User } from "lucide-react";

export default function Navbar() {
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
        {/* Quick Launch POS Button - Soft Red */}
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

        {/* User profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs border border-rose-100">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight">Admin User</p>
            <p className="text-[10px] text-slate-400">Main Branch</p>
          </div>
        </div>
      </div>
    </header>
  );
}
