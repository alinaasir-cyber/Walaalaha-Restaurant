"use client";

import React from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  DollarSign,
  Grid,
  ChefHat,
  Users,
  Plus,
} from "lucide-react";

export default function POSDashboardPage() {
  const activeTables = [
    { id: "T1", name: "Table 01", section: "Main Hall", status: "Occupied", orders: 3, total: "$28.50", waiter: "Ahmed Nur" },
    { id: "T2", name: "Table 02", section: "Main Hall", status: "Billing", orders: 5, total: "$64.00", waiter: "Hassan Ali" },
    { id: "T3", name: "Table 03", section: "Family Area", status: "Available", orders: 0, total: "$0.00", waiter: "-" },
    { id: "T4", name: "Table 04", section: "Terrace", status: "Occupied", orders: 2, total: "$19.00", waiter: "Fartun M." },
    { id: "VIP1", name: "VIP Room 1", section: "VIP Lounge", status: "Occupied", orders: 7, total: "$145.00", waiter: "Ahmed Nur" },
    { id: "VIP2", name: "VIP Room 2", section: "VIP Lounge", status: "Reserved", orders: 0, total: "$0.00", waiter: "-" },
  ];

  const liveKitchenOrders = [
    { id: "KOT-301", table: "Table 01", items: "1x Bariis & Hilib Geel, 1x Cambe", status: "Cooking", elapsed: "6 mins" },
    { id: "KOT-302", table: "VIP Room 1", items: "2x Baasto Saldaato, 1x Digaag, 2x Shaah", status: "Ready", elapsed: "14 mins" },
    { id: "KOT-303", table: "Table 04", items: "1x Suqaar Hilib & 2x Sabaayad", status: "Cooking", elapsed: "3 mins" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <UtensilsCrossed className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-800">POS Operations Dashboard</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Walaalaha Restaurant - Floor status, live KOT orders, and active sessions
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/pos/kot"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <ChefHat className="w-4 h-4 text-amber-600" />
            Kitchen Display (KOT)
          </Link>
          <Link
            href="/pos/tables"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
          >
            <Grid className="w-4 h-4" />
            Tables View
          </Link>
          <Link
            href="/pos/menu"
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Order (POS)
          </Link>
        </div>
      </div>

      {/* 4 POS Quick Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>TODAY'S POS SALES</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">$1,420.50</div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">68 Orders Closed</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>ACTIVE TABLES</span>
            <Grid className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-rose-600">4 / 6 Tables</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">66% Hall Capacity</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>KITCHEN ORDERS (KOT)</span>
            <ChefHat className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-600">3 Pending</div>
          <p className="text-[11px] text-amber-700 font-medium mt-1">Average wait: 8 mins</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>ACTIVE WAITERS</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-purple-600">5 on Shift</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Morning & Lunch Shift</p>
        </div>
      </div>

      {/* Tables Status Grid */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Real-time Table Status</h3>
            <p className="text-xs text-slate-500">Click on any active table to review ticket or checkout</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Available
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Occupied
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Billing
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Reserved
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {activeTables.map((tbl) => (
            <Link
              key={tbl.id}
              href="/pos/menu"
              className={`p-4 rounded-xl border flex flex-col justify-between hover:shadow-md transition-all ${
                tbl.status === "Occupied"
                  ? "bg-rose-50/40 border-rose-200"
                  : tbl.status === "Billing"
                  ? "bg-amber-50/50 border-amber-200"
                  : tbl.status === "Reserved"
                  ? "bg-purple-50/50 border-purple-200"
                  : "bg-emerald-50/40 border-emerald-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-800">{tbl.name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    tbl.status === "Occupied"
                      ? "bg-rose-500 text-white"
                      : tbl.status === "Billing"
                      ? "bg-amber-600 text-white"
                      : tbl.status === "Reserved"
                      ? "bg-purple-600 text-white"
                      : "bg-emerald-600 text-white"
                  }`}
                >
                  {tbl.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{tbl.section}</p>

              <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{tbl.waiter}</span>
                <span className="font-extrabold text-slate-900">{tbl.total}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Live Kitchen Display (KOT) preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800 text-sm">Live Kitchen Orders (KOT)</h3>
            <Link href="/pos/kitchen-orders" className="text-xs font-bold text-rose-500 hover:underline">
              Kitchen Screen &rarr;
            </Link>
          </div>
          <div className="space-y-2.5">
            {liveKitchenOrders.map((kot) => (
              <div key={kot.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{kot.id}</span>
                    <span className="text-xs font-medium text-rose-600">({kot.table})</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{kot.items}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      kot.status === "Ready" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700 animate-pulse"
                    }`}
                  >
                    {kot.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{kot.elapsed}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links to submenus */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 text-sm mb-3">POS Management Quick Links</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link href="/pos/orders" className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 hover:border-rose-200 border font-medium text-slate-700 transition-colors">
              🧾 Cashier Orders
            </Link>
            <Link href="/pos/tables" className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 hover:border-rose-200 border font-medium text-slate-700 transition-colors">
              🪑 Tables Management
            </Link>
            <Link href="/pos/sessions" className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 hover:border-rose-200 border font-medium text-slate-700 transition-colors">
              ⏱️ Cashier Sessions
            </Link>
            <Link href="/pos/waiters" className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 hover:border-rose-200 border font-medium text-slate-700 transition-colors">
              👨‍🍳 Waiters Management
            </Link>
            <Link href="/pos/categories" className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 hover:border-rose-200 border font-medium text-slate-700 transition-colors">
              📂 Menu Categories
            </Link>
            <Link href="/pos/reports" className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 hover:border-rose-200 border font-medium text-slate-700 transition-colors">
              📊 POS Sales Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
