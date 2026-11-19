"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ConciergeBell,
  Boxes,
  PartyPopper,
  Store,
  Calculator,
  PiggyBank,
  Building2,
  Receipt,
  FileSpreadsheet,
  Users,
  CreditCard,
  ShieldAlert,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ChefHat,
} from "lucide-react";
import { navigationData, NavSection } from "@/data/navigation";

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
  UtensilsCrossed: <UtensilsCrossed className="w-4 h-4" />,
  ConciergeBell: <ConciergeBell className="w-4 h-4" />,
  Boxes: <Boxes className="w-4 h-4" />,
  PartyPopper: <PartyPopper className="w-4 h-4" />,
  Store: <Store className="w-4 h-4" />,
  Calculator: <Calculator className="w-4 h-4" />,
  PiggyBank: <PiggyBank className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
  Receipt: <Receipt className="w-4 h-4" />,
  FileSpreadsheet: <FileSpreadsheet className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  CreditCard: <CreditCard className="w-4 h-4" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4" />,
};

export default function Sidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "POS Management": true,
    "Payment & Feedback": true,
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/dashboard" && pathname === "/") return true;
    return pathname === href;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-white rounded-lg shadow-md border text-slate-700"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* White / Light Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white text-slate-700 flex flex-col border-r border-slate-200 shadow-sm transition-transform duration-200 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight text-slate-900 tracking-wide">
              Walaalaha
            </h1>
            <p className="text-xs text-rose-500 font-semibold">Restaurant ERP & POS</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 text-sm custom-scrollbar">
          {navigationData.map((section: NavSection) => {
            const hasSub = section.items && section.items.length > 0;
            const isOpen = openSections[section.title];
            const icon = iconMap[section.icon] || <LayoutDashboard className="w-4 h-4" />;

            if (!hasSub && section.href) {
              const active = isActive(section.href);
              return (
                <Link
                  key={section.title}
                  href={section.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-rose-500 text-white shadow-sm shadow-rose-500/25"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className={active ? "text-white" : "text-slate-400"}>{icon}</span>
                  <span>{section.title}</span>
                </Link>
              );
            }

            return (
              <div key={section.title} className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-slate-400">{icon}</span>
                    <span>{section.title}</span>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                {isOpen && hasSub && (
                  <div className="pl-8 pr-1 py-1 space-y-0.5 border-l-2 border-slate-100 ml-4">
                    {section.items!.map((sub) => {
                      const active = isActive(sub.href);
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            active
                              ? "bg-rose-50 text-rose-600 font-bold border-l-2 border-rose-500 -ml-[18px] pl-[16px]"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          {sub.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-medium text-slate-600">Live Active</span>
          </div>
          <span className="font-bold text-[11px] text-slate-500">v1.0</span>
        </div>
      </aside>
    </>
  );
}
