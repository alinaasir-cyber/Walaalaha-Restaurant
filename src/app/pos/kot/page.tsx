"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChefHat,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  UtensilsCrossed,
  Volume2,
  RefreshCw,
  BellRing,
} from "lucide-react";

interface KitchenTicket {
  id: string;
  orderNumber: string;
  table: string;
  waiter: string;
  time: string;
  elapsedMinutes: number;
  status: "PENDING" | "COOKING" | "READY" | "SERVED";
  items: { name: string; nameSomali: string; qty: number; note?: string }[];
}

export default function KitchenDisplayPage() {
  const [filter, setFilter] = useState<string>("ALL");
  const [tickets, setTickets] = useState<KitchenTicket[]>([
    {
      id: "KOT-101",
      orderNumber: "WAL-4821",
      table: "Table 01 (Main Hall)",
      waiter: "Ahmed Nur",
      time: "12:35 PM",
      elapsedMinutes: 4,
      status: "COOKING",
      items: [
        { name: "Somali Rice with Camel Meat", nameSomali: "Bariis & Hilib Geel", qty: 2 },
        { name: "Fresh Mango Juice", nameSomali: "Casiir Cambe Dabiici", qty: 2 },
      ],
    },
    {
      id: "KOT-102",
      orderNumber: "WAL-4822",
      table: "VIP Room 1",
      waiter: "Hassan Ali",
      time: "12:28 PM",
      elapsedMinutes: 11,
      status: "PENDING",
      items: [
        { name: "Spaghetti with Goat Meat", nameSomali: "Baasto & Hilib Ari", qty: 3, note: "Extra Maraq / Maraq Gooni ah" },
        { name: "Chicken Steak with Fries", nameSomali: "Digaag & Baradho", qty: 1 },
        { name: "Somali Spiced Tea", nameSomali: "Shaah Caleen & Hayl", qty: 4 },
      ],
    },
    {
      id: "KOT-103",
      orderNumber: "WAL-4820",
      table: "Table 04 (Terrace)",
      waiter: "Fartun Mohamed",
      time: "12:20 PM",
      elapsedMinutes: 19,
      status: "READY",
      items: [
        { name: "Suqaar with Chapati", nameSomali: "Suqaar Hilib & Sabaayad", qty: 2 },
        { name: "Sambusa Beef", nameSomali: "Sambuusi Hilib (6 xabbo)", qty: 2 },
      ],
    },
  ]);

  const updateStatus = (id: string, newStatus: KitchenTicket["status"]) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const filteredTickets = tickets.filter((t) => {
    if (filter === "ALL") return t.status !== "SERVED";
    return t.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-slate-900 text-white rounded-2xl shadow-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/pos/menu"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Back to POS Cashier"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              <span>Kitchen Display System (KOT / KDS)</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                Live Kitchen
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Walaalaha Main Branch &bull; Orders direct to kitchen chef
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          {["ALL", "PENDING", "COOKING", "READY"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === st
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {st === "ALL" ? "Active Tickets" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTickets.map((ticket) => {
          const isUrgent = ticket.elapsedMinutes > 15;
          const statusBg =
            ticket.status === "READY"
              ? "bg-emerald-50 border-emerald-300"
              : ticket.status === "COOKING"
              ? "bg-amber-50/70 border-amber-300"
              : "bg-white border-slate-200";

          return (
            <div
              key={ticket.id}
              className={`flex flex-col rounded-2xl border-2 shadow-sm transition-all overflow-hidden ${statusBg}`}
            >
              {/* Ticket Header */}
              <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-slate-900">
                      {ticket.orderNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                      {ticket.id}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-rose-600 mt-0.5">
                    {ticket.table}
                  </p>
                </div>

                {/* Elapsed Timer */}
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black ${
                    isUrgent
                      ? "bg-red-100 text-red-700 animate-pulse border border-red-200"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{ticket.elapsedMinutes} mins</span>
                </div>
              </div>

              {/* Waiter & Time */}
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-[11px] text-slate-500 flex justify-between">
                <span>Waiter: <strong className="text-slate-800">{ticket.waiter}</strong></span>
                <span>Sent: {ticket.time}</span>
              </div>

              {/* Food Items for Chefs */}
              <div className="p-4 flex-1 space-y-3 bg-white/50">
                {ticket.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <span className="w-7 h-7 rounded-lg bg-rose-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                          {item.qty}x
                        </span>
                        <div>
                          <p className="text-sm font-black text-slate-900 leading-tight">
                            {item.nameSomali || item.name}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    {item.note && (
                      <p className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/60 mt-1">
                        ⚠️ Note: {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Chef State Controls */}
              <div className="p-3 bg-white border-t border-slate-200 grid grid-cols-2 gap-2">
                {ticket.status === "PENDING" && (
                  <button
                    onClick={() => updateStatus(ticket.id, "COOKING")}
                    className="col-span-2 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Start Cooking 🍳
                  </button>
                )}

                {ticket.status === "COOKING" && (
                  <>
                    <button
                      onClick={() => updateStatus(ticket.id, "PENDING")}
                      className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                    >
                      Pause
                    </button>
                    <button
                      onClick={() => updateStatus(ticket.id, "READY")}
                      className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                    >
                      Food Ready ✅
                    </button>
                  </>
                )}

                {ticket.status === "READY" && (
                  <button
                    onClick={() => updateStatus(ticket.id, "SERVED")}
                    className="col-span-2 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Food Served to Table (Complete)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
