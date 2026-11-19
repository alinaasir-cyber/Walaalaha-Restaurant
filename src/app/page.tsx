"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  Scale,
  Landmark,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  ShoppingBag,
  PartyPopper,
  Store,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [activeMonth, setActiveMonth] = useState<string | null>("Nov");

  // Financial statistics matching NetSom ERP standards
  const financialStats = [
    {
      title: "Total Assets",
      titleSomali: "Hantida Guud",
      value: "$28,450",
      description: "Total value of company assets",
      icon: Wallet,
      color: "border-blue-100 bg-blue-50/40 text-blue-600",
      iconBg: "bg-blue-100 text-blue-600",
      badgeColor: "text-blue-600 bg-blue-50",
    },
    {
      title: "Total Liabilities",
      titleSomali: "Deymaha Lagu Leeyahay",
      value: "$6,860",
      description: "Total outstanding debts and obligations",
      icon: Scale,
      color: "border-amber-100 bg-amber-50/40 text-amber-600",
      iconBg: "bg-amber-100 text-amber-600",
      badgeColor: "text-amber-600 bg-amber-50",
    },
    {
      title: "Total Capital",
      titleSomali: "Raasumaalka",
      value: "$21,590",
      description: "Total owner's capital & equity",
      icon: Landmark,
      color: "border-purple-100 bg-purple-50/40 text-purple-600",
      iconBg: "bg-purple-100 text-purple-600",
      badgeColor: "text-purple-600 bg-purple-50",
    },
    {
      title: "Total Revenue",
      titleSomali: "Dakhliga Guud",
      value: "$34,070",
      description: "Total income generated from POS & Events",
      icon: TrendingUp,
      color: "border-emerald-100 bg-emerald-50/40 text-emerald-600",
      iconBg: "bg-emerald-100 text-emerald-600",
      badgeColor: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Total Expenses",
      titleSomali: "Kharashaadka Guud",
      value: "$18,520",
      description: "Total operational costs & purchases",
      icon: TrendingDown,
      color: "border-rose-100 bg-rose-50/40 text-rose-600",
      iconBg: "bg-rose-100 text-rose-600",
      badgeColor: "text-rose-600 bg-rose-50",
    },
    {
      title: "Net Income",
      titleSomali: "Macaashka Safiga ah",
      value: "+$15,550",
      description: "Revenue minus Expenses (Profit)",
      icon: Activity,
      color: "border-rose-100 bg-rose-50/30 text-rose-600",
      iconBg: "bg-rose-100 text-rose-600",
      badgeColor: "text-rose-600 bg-rose-50",
    },
  ];

  // Monthly sales performance data for 2026
  const monthlySales = [
    { month: "Jan", sales: 2400, orders: 180 },
    { month: "Feb", sales: 4800, orders: 320 },
    { month: "Mar", sales: 2900, orders: 210 },
    { month: "Apr", sales: 1200, orders: 95 },
    { month: "May", sales: 800, orders: 70 },
    { month: "Jun", sales: 4100, orders: 290 },
    { month: "Jul", sales: 500, orders: 40 },
    { month: "Aug", sales: 650, orders: 50 },
    { month: "Sep", sales: 900, orders: 75 },
    { month: "Oct", sales: 1100, orders: 90 },
    { month: "Nov", sales: 3850, orders: 275 },
    { month: "Dec", sales: 0, orders: 0 },
  ];

  const maxSales = Math.max(...monthlySales.map((m) => m.sales));
  const totalYearSales = monthlySales.reduce((acc, m) => acc + m.sales, 0);

  return (
    <div className="space-y-6">
      {/* Header Title & Subtitle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Company financial statistics and performance &bull; Walaalaha Restaurant
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/pos/menu"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-sm shadow-rose-500/25 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            Open POS
          </Link>
          <Link
            href="/accounting/chart"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-sm transition-colors"
          >
            Accounting Ledger &rarr;
          </Link>
        </div>
      </div>

      {/* 6 Financial Cards (2 Rows of 3 Columns - Matching NetSom Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {financialStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`p-5 rounded-2xl border ${stat.color} shadow-sm bg-white hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{stat.title}</span>
                  </div>
                  <div className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                </div>
                <div className={`p-2 rounded-xl ${stat.iconBg}`}>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{stat.description}</span>
                <span className="font-semibold text-slate-600">{stat.titleSomali}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Performance Chart Card (Matching NetSom Bar Chart) */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Chart Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <h3 className="text-base font-bold text-slate-800">Sales Performance</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Click on any month to see daily breakdown &bull; Revenue distribution
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                TOTAL {selectedYear}
              </span>
              <div className="text-lg font-black text-slate-900">
                ${totalYearSales.toLocaleString()}
              </div>
            </div>

            <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div className="mt-8">
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-4">
            {monthlySales.map((item) => {
              const heightPercent = item.sales > 0 ? (item.sales / maxSales) * 100 : 4;
              const isSelected = activeMonth === item.month;

              return (
                <div
                  key={item.month}
                  onClick={() => setActiveMonth(item.month)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                >
                  {/* Tooltip on hover */}
                  <div
                    className={`opacity-0 group-hover:opacity-100 transition-opacity mb-2 px-2 py-1 bg-slate-900 text-white rounded text-[10px] font-bold whitespace-nowrap pointer-events-none shadow-lg z-10 ${
                      isSelected ? "opacity-100" : ""
                    }`}
                  >
                    ${item.sales.toLocaleString()}
                  </div>

                  {/* Bar */}
                  <div className="w-full max-w-[48px] bg-slate-100 rounded-t-lg overflow-hidden flex items-end h-full">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        isSelected
                          ? "bg-rose-500 shadow-md shadow-rose-500/25"
                          : "bg-blue-600 hover:bg-blue-500"
                      }`}
                    />
                  </div>

                  {/* Month Label */}
                  <span
                    className={`mt-3 text-xs font-bold transition-colors ${
                      isSelected ? "text-rose-600" : "text-slate-500 group-hover:text-slate-800"
                    }`}
                  >
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Month Detail Banner */}
        {activeMonth && (
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span className="text-slate-600">
                Selected Month: <strong className="text-slate-800 font-bold">{activeMonth} {selectedYear}</strong>
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-600 font-medium">
              <span>
                Sales: <strong className="text-slate-900 font-bold">${monthlySales.find((m) => m.month === activeMonth)?.sales.toLocaleString()}</strong>
              </span>
              <span>
                Orders: <strong className="text-slate-900 font-bold">{monthlySales.find((m) => m.month === activeMonth)?.orders} orders</strong>
              </span>
              <Link href="/pos/reports" className="text-rose-500 font-bold hover:underline">
                View Daily Report &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Quick Access to Sub-Operations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/pos"
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-rose-200 hover:shadow-md transition-all group flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">POS Operations</h4>
              <p className="text-[10px] text-slate-400">Live tables & cashiers</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500" />
        </Link>

        <Link
          href="/hall-management"
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-purple-200 hover:shadow-md transition-all group flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <PartyPopper className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Hall Management</h4>
              <p className="text-[10px] text-slate-400">Weddings & banquets</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
        </Link>

        <Link
          href="/store-management"
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all group flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Kitchen Store</h4>
              <p className="text-[10px] text-slate-400">Inventory & usage</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
        </Link>

        <Link
          href="/hr"
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-amber-200 hover:shadow-md transition-all group flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">HR & Payroll</h4>
              <p className="text-[10px] text-slate-400">Staff & salaries</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
        </Link>
      </div>
    </div>
  );
}
