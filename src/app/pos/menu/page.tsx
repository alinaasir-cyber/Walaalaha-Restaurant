"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Send,
  PauseCircle,
  Users,
  Grid,
  CheckCircle2,
  Receipt,
  RotateCcw,
} from "lucide-react";
import { initialMenuItems, initialTables, initialWaiters, MenuItem } from "@/data/mockData";

interface CartItem {
  item: MenuItem;
  quantity: number;
  note?: string;
}

export default function POSMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("tbl-1");
  const [selectedWaiter, setSelectedWaiter] = useState<string>("w-1");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastPaymentMethod, setLastPaymentMethod] = useState("");

  const categories = ["All", "Main Dishes", "Breakfast", "Drinks", "Hot Drinks", "Snacks"];

  const filteredItems = initialMenuItems.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameSomali.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.item.id === itemId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const tax = subtotal * 0.05; // 5% VAT
  const total = subtotal + tax;

  const handleCheckout = (method: string) => {
    if (cart.length === 0) return;
    setLastPaymentMethod(method);
    setIsSuccessModalOpen(true);
  };

  const handleFinishOrder = () => {
    setIsSuccessModalOpen(false);
    clearCart();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-6.5rem)]">
      {/* LEFT: Products & Menu Grid (8 cols) */}
      <div className="lg:col-span-8 flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Controls */}
        <div className="p-4 border-b border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-800">POS Menu Ordering</h2>
              <p className="text-xs text-slate-500">Walaalaha Restaurant Point of Sale</p>
            </div>

            {/* Quick table & waiter selects */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700">
                <Grid className="w-3.5 h-3.5 text-rose-500" />
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer"
                >
                  {initialTables.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.number} ({t.section})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700">
                <Users className="w-3.5 h-3.5 text-rose-500" />
                <select
                  value={selectedWaiter}
                  onChange={(e) => setSelectedWaiter(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer"
                >
                  {initialWaiters.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Search bar & Category Pills */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search food / drink..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-rose-500 text-white shadow-sm shadow-rose-500/25"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => addToCart(item)}
                className="flex flex-col text-left p-3.5 rounded-xl border border-slate-200 hover:border-rose-400 hover:shadow-md transition-all bg-white group relative"
              >
                <div className="text-3xl mb-2 flex items-center justify-center h-14 bg-slate-50 rounded-lg group-hover:scale-105 transition-transform">
                  {item.image}
                </div>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.nameSomali}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">{item.name}</p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-rose-500">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="p-1 rounded-md bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Order Cart & Checkout (4 cols) */}
      <div className="lg:col-span-4 flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Cart Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="font-bold text-sm text-slate-800">Current Order</h3>
            <p className="text-[11px] text-slate-500">
              {cart.reduce((sum, c) => sum + c.quantity, 0)} items selected
            </p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        {/* Cart List */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Receipt className="w-12 h-12 mb-2 text-slate-300 stroke-1" />
              <p className="text-sm font-medium text-slate-600">Cart is empty</p>
              <p className="text-xs text-slate-400">Click menu items on the left to add</p>
            </div>
          ) : (
            cart.map(({ item, quantity }) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <h5 className="text-xs font-bold text-slate-800 truncate">{item.nameSomali}</h5>
                  <p className="text-[10px] text-slate-500">${item.price.toFixed(2)} each</p>
                </div>

                {/* Counter */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-100"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-5 text-center text-slate-800">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-100"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="w-16 text-right font-extrabold text-xs text-slate-800">
                  ${(item.price * quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-2 text-slate-400 hover:text-rose-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pricing Summary */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/70 space-y-2">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Tax (5% VAT)</span>
            <span className="font-semibold text-slate-800">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
            <span>Total Payable</span>
            <span className="text-base text-rose-500 font-extrabold">${total.toFixed(2)}</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              disabled={cart.length === 0}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold disabled:opacity-50 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Send to Kitchen
            </button>
            <button
              disabled={cart.length === 0}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-50 transition-all"
            >
              <PauseCircle className="w-3.5 h-3.5" />
              Hold Order
            </button>
          </div>

          {/* Payment Methods */}
          <div className="pt-2">
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Pay Now</p>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                disabled={cart.length === 0}
                onClick={() => handleCheckout("EVC Plus / Zaad")}
                className="py-2 px-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg disabled:opacity-50 transition-all"
              >
                EVC / Mobile
              </button>
              <button
                disabled={cart.length === 0}
                onClick={() => handleCheckout("Cash")}
                className="py-2 px-1 text-center bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg disabled:opacity-50 transition-all"
              >
                Cash
              </button>
              <button
                disabled={cart.length === 0}
                onClick={() => handleCheckout("Bank Card")}
                className="py-2 px-1 text-center bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg disabled:opacity-50 transition-all"
              >
                Card
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Payment Successful!</h3>
            <p className="text-xs text-slate-500 mt-1">
              Order paid via <span className="font-semibold text-slate-700">{lastPaymentMethod}</span>
            </p>

            <div className="my-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Order Total:</span>
                <span className="font-bold text-slate-800">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Branch:</span>
                <span className="font-semibold text-slate-700">Walaalaha Main</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-600">PAID & SENT TO KITCHEN</span>
              </div>
            </div>

            <button
              onClick={handleFinishOrder}
              className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-500/25 transition-all"
            >
              Start Next Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
