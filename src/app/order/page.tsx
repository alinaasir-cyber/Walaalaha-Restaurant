"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChefHat,
  Search,
  Plus,
  Minus,
  ShoppingBag,
  MapPin,
  Clock,
  Phone,
  User,
  CheckCircle2,
  ArrowRight,
  Truck,
  PartyPopper,
  RotateCcw,
  Sparkles,
  Tag,
  ArrowLeft,
} from "lucide-react";

interface MenuItem {
  id: string;
  code: string;
  name: string;
  nameSomali: string;
  price: number;
  image?: string;
  category: { name: string; nameSomali: string };
}

interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export default function CustomerOrderingApp() {
  const [activeTab, setActiveTab] = useState<"menu" | "cart" | "track" | "halls">("menu");
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Checkout form state
  const [selectedBranch, setSelectedBranch] = useState("Taleex Flagship (Mogadishu)");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderType, setOrderType] = useState<"DELIVERY" | "TAKEAWAY">("DELIVERY");
  const [paymentMethod, setPaymentMethod] = useState<string>("EVC_PLUS");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Discount code state
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApplyCoupon = () => {
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    if (code === "WALAALAHA" || code === "BEYDAN" || code === "WELCOME10") {
      setDiscountAmount(subtotal * 0.1);
      setCouponApplied(true);
    } else {
      setCouponError("Koodhka dhimistu ma shaqeynayo (Invalid Code). Isticmaal WALAALAHA");
    }
  };

  // Tracking state
  const [trackingOrderNumber, setTrackingOrderNumber] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  // Load menu from live backend API
  useEffect(() => {
    fetch("/api/customer/menu")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) {
          setCategories(data.categories);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load menu:", err);
        setLoading(false);
      });
  }, []);

  // Flatten items for filtering
  const allItems: MenuItem[] = categories.flatMap((cat) =>
    (cat.menuItems || []).map((m: any) => ({
      ...m,
      price: Number(m.price),
      category: { name: cat.name, nameSomali: cat.nameSomali },
    }))
  );

  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category.name === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameSomali.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
            const nextQty = c.quantity + delta;
            return nextQty > 0 ? { ...c, quantity: nextQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const subtotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const deliveryFee = orderType === "DELIVERY" && cart.length > 0 ? 2.0 : 0.0;
  const tax = subtotal * 0.05;
  const discount = couponApplied ? discountAmount : 0;
  const total = Math.max(0, subtotal + tax + deliveryFee - discount);

  // Submit Order to Backend
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    try {
      const payload = {
        customerName,
        customerPhone,
        deliveryAddress,
        type: orderType,
        paymentMethod,
        items: cart.map((c) => ({
          menuItemId: c.item.id,
          quantity: c.quantity,
        })),
      };

      const res = await fetch("/api/customer/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to place order");
        setIsSubmitting(false);
        return;
      }

      // Order placed successfully!
      setCart([]);
      setTrackingOrderNumber(data.order.orderNumber);
      setTrackedOrder(data.order);
      setActiveTab("track");
      setIsSubmitting(false);
    } catch (err) {
      alert("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Lookup Order Tracking
  const handleTrackLookup = async (orderNumToFind?: string) => {
    const num = orderNumToFind || trackingOrderNumber;
    if (!num) return;

    setTrackingError(null);
    try {
      const res = await fetch(`/api/customer/orders/${num.trim()}`);
      const data = await res.json();
      if (!res.ok) {
        setTrackingError(data.error || "Order not found");
        setTrackedOrder(null);
        return;
      }
      setTrackedOrder(data.order);
    } catch (err) {
      setTrackingError("Could not retrieve tracking details.");
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 border-x border-slate-200 shadow-xl flex flex-col pb-20">
      {/* Top Mobile Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            title="Ku noqo Website-ka"
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25">
            <ChefHat className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-extrabold text-xs text-slate-900 leading-tight">Walaalaha</h1>
            <p className="text-[9px] text-rose-500 font-bold uppercase tracking-wider">
              Food & Delivery
            </p>
          </div>
        </div>

        {/* Branch Selector Dropdown */}
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full px-2 py-1 text-[10px] font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer max-w-[130px] truncate"
          >
            <option value="Taleex Flagship (Mogadishu)">Taleex, Hodan</option>
            <option value="KM4 Maka Al-Mukarama (Mogadishu)">KM4, Mogadishu</option>
            <option value="Banaadir Mall (Mogadishu)">Banaadir Mall</option>
            <option value="Xamar Weyne (Mogadishu)">Xamar Weyne</option>
            <option value="Jigjiga Yar (Hargeisa)">Hargeisa</option>
            <option value="Tamam Park (Garowe)">Garowe</option>
          </select>
        </div>
      </header>

      {/* TAB 1: MENU / HOME SCREEN */}
      {activeTab === "menu" && (
        <div className="flex-1 p-4 space-y-4">
          {/* Promo Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                <Sparkles className="w-3 h-3" /> Special Somali Cuisine
              </span>
              <h2 className="text-lg font-black mt-1">Cunto Macaan & Gaarsiin Degdeg ah</h2>
              <p className="text-xs text-rose-100 mt-0.5">Dalbo hadda, wax ka yar 30 daqiiqo ku hel!</p>
            </div>
            <div className="absolute right-[-10px] bottom-[-10px] text-6xl opacity-30 select-none">
              🍛
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Bariis, Baasto, Canjeero, Juices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 font-medium shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "All"
                  ? "bg-rose-500 text-white shadow-sm shadow-rose-500/25"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? "bg-rose-500 text-white shadow-sm shadow-rose-500/25"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat.nameSomali || cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {loading ? (
              <div className="col-span-2 py-12 text-center text-xs text-slate-400 font-medium">
                Loading Walaalaha menu...
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="col-span-2 py-12 text-center text-xs text-slate-400 font-medium">
                No matching dishes found.
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-rose-300 transition-all"
                >
                  <div>
                    <div className="h-20 rounded-xl bg-slate-50 flex items-center justify-center text-4xl mb-2">
                      {item.image || "🍽️"}
                    </div>
                    <h3 className="font-bold text-xs text-slate-800 line-clamp-1">{item.nameSomali}</h3>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{item.name}</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-extrabold text-sm text-rose-500">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="p-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white shadow-sm shadow-rose-500/25 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CART & CHECKOUT */}
      {activeTab === "cart" && (
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h2 className="font-bold text-base text-slate-800">Your Basket</h2>
              <span className="text-xs text-slate-500 font-medium">
                {cart.reduce((s, c) => s + c.quantity, 0)} items
              </span>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
                <p className="text-xs font-medium">Your basket is currently empty.</p>
                <button
                  onClick={() => setActiveTab("menu")}
                  className="px-4 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold"
                >
                  Browse Menu &rarr;
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {cart.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{item.image || "🍛"}</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{item.nameSomali}</h4>
                        <p className="text-[10px] text-slate-400">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-extrabold text-slate-800 w-14 text-right">
                        ${(item.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Delivery vs Takeaway */}
                <div className="mt-4 p-3 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType("DELIVERY")}
                      className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        orderType === "DELIVERY"
                          ? "bg-rose-500 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      Delivery (+$2.00)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType("TAKEAWAY")}
                      className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        orderType === "TAKEAWAY"
                          ? "bg-rose-500 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Takeaway (Free)
                    </button>
                  </div>

                  {/* Customer details */}
                  <div className="space-y-2 pt-2">
                    <input
                      type="text"
                      required
                      placeholder="Magacaaga (Full Name)*"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Telefoonka (e.g. 061XXXXXXX)*"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                    {orderType === "DELIVERY" && (
                      <input
                        type="text"
                        required
                        placeholder="Cinwaanka (Guri / Dagmada / Meel caan ah)*"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                      />
                    )}
                  </div>

                  {/* Branch Notice */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="font-semibold">Laanta Dalabka:</span>
                    <span className="font-bold text-rose-600">{selectedBranch}</span>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-slate-500 mb-1.5">HABKA LACAG BIXINTA</p>
                    <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                      {["EVC_PLUS", "ZAAD", "CASH"].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setPaymentMethod(m)}
                          className={`py-2 px-1 text-center font-bold rounded-lg border transition-all ${
                            paymentMethod === m
                              ? "bg-rose-50 border-rose-500 text-rose-600 font-extrabold"
                              : "bg-white border-slate-200 text-slate-600"
                          }`}
                        >
                          {m === "EVC_PLUS" ? "EVC Plus" : m === "ZAAD" ? "Zaad" : "Cash"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Coupon Code Input */}
                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-rose-500" />
                      <span>KOODHKA DHIMISTA (PROMO CODE)</span>
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Gali koodh (e.g. WALAALAHA)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg uppercase font-bold focus:outline-none focus:ring-1 focus:ring-rose-500"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
                      >
                        Dhimis
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-[10px] text-emerald-600 font-bold mt-1">
                        ✓ 10% dhimis ayaa lagu daray dalabkaaga!
                      </p>
                    )}
                    {couponError && (
                      <p className="text-[10px] text-red-500 font-semibold mt-1">
                        {couponError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pricing Summary & Checkout Button */}
          {cart.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">${subtotal.toFixed(2)}</span>
              </div>
              {orderType === "DELIVERY" && (
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-slate-800">${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              {couponApplied && (
                <div className="flex justify-between text-xs text-emerald-600 font-bold">
                  <span>Dhimis (10% Promo)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-slate-500">
                <span>Tax (5% VAT)</span>
                <span className="font-bold text-slate-800">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1 border-t border-slate-200">
                <span>Wadarta Guud (Total)</span>
                <span className="text-base text-rose-500 font-black">${total.toFixed(2)}</span>
              </div>

              <button
                disabled={isSubmitting || !customerName || !customerPhone}
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-500/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Dirayaa Dalabka...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Xaqiiji & Dalbo Hadda (${total.toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LIVE ORDER TRACKING */}
      {activeTab === "track" && (
        <div className="flex-1 p-4 space-y-4">
          <div className="text-center pb-2">
            <h2 className="font-black text-base text-slate-800">Dabagalka Dalabka (Live Tracking)</h2>
            <p className="text-xs text-slate-400">Geli number-ka dalabkaaga si aad ula socoto xaaladdiisa</p>
          </div>

          {/* Search order input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. WAL-123456"
              value={trackingOrderNumber}
              onChange={(e) => setTrackingOrderNumber(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
            <button
              onClick={() => handleTrackLookup()}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold"
            >
              Raadi
            </button>
          </div>

          {trackingError && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
              {trackingError}
            </div>
          )}

          {trackedOrder && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Dalabka</span>
                  <h3 className="font-black text-sm text-slate-900">{trackedOrder.orderNumber}</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-600 border border-rose-100">
                  {trackedOrder.status}
                </span>
              </div>

              {/* Status Stepper */}
              <div className="space-y-3 py-2">
                {[
                  { step: 1, title: "Dalabka Waa La Helay", desc: "Order received in system", active: true },
                  { step: 2, title: "Karsasho Jikada Ku Socota", desc: "Kitchen is preparing your food", active: trackedOrder.status === "COOKING" || trackedOrder.status === "READY" || trackedOrder.status === "PAID" },
                  { step: 3, title: "Waa La Soo Wadaa", desc: "Out for delivery / Ready for pickup", active: trackedOrder.status === "READY" || trackedOrder.status === "PAID" },
                  { step: 4, title: "Waa La Gaarsiiyay", desc: "Delivered to your address", active: trackedOrder.status === "SERVED" },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                        s.active
                          ? "bg-rose-500 text-white shadow-sm shadow-rose-500/25"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {s.step}
                    </div>
                    <div>
                      <h5 className={`text-xs font-bold ${s.active ? "text-slate-800" : "text-slate-400"}`}>
                        {s.title}
                      </h5>
                      <p className="text-[10px] text-slate-400">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Items Summary */}
              <div className="pt-3 border-t border-slate-100 text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Wadarta Guud:</span>
                  <span className="font-extrabold text-slate-900">${Number(trackedOrder.totalAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Nooca:</span>
                  <span className="font-semibold text-slate-700">{trackedOrder.type}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: HALLS & EVENT RESERVATIONS */}
      {activeTab === "halls" && (
        <div className="flex-1 p-4 space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
              Walaalaha Event Centers
            </span>
            <h2 className="text-lg font-black mt-1">Hoolalka Aroosyada & Xafladaha</h2>
            <p className="text-xs text-purple-100 mt-0.5">Ballanso hoolal casri ah oo leh nalka, codka & cuntada</p>
          </div>

          <div className="space-y-3">
            {[
              { name: "Grand Diamond Ballroom", capacity: "500 - 800 Qof", price: "$3,200", icon: "🏛️" },
              { name: "Somalia Banquet Hall A", capacity: "200 - 350 Qof", price: "$1,800", icon: "💎" },
              { name: "VIP Executive Boardroom", capacity: "20 - 50 Qof", price: "$950", icon: "👑" },
            ].map((hall) => (
              <div key={hall.name} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{hall.icon}</span>
                    <h3 className="font-bold text-xs text-slate-800">{hall.name}</h3>
                  </div>
                  <span className="text-xs font-black text-purple-600">{hall.price}</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Qaadista: {hall.capacity}</p>
                <button
                  onClick={() => alert(`Waxaad dalbatay ballansashada: ${hall.name}. Kooxda Walaalaha ayaa kula soo xiriiri doonta.`)}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Dalbo Ballan (Reserve Hall)
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Sticky Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 px-6 py-2 flex items-center justify-between z-40 shadow-lg">
        <button
          onClick={() => setActiveTab("menu")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-all ${
            activeTab === "menu" ? "text-rose-500" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <ChefHat className="w-5 h-5" />
          <span>Menu</span>
        </button>

        <button
          onClick={() => setActiveTab("cart")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold relative transition-all ${
            activeTab === "cart" ? "text-rose-500" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Basket</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
              {cart.reduce((s, c) => s + c.quantity, 0)}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("track")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-all ${
            activeTab === "track" ? "text-rose-500" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Truck className="w-5 h-5" />
          <span>Track</span>
        </button>

        <button
          onClick={() => setActiveTab("halls")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-all ${
            activeTab === "halls" ? "text-purple-600" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <PartyPopper className="w-5 h-5" />
          <span>Halls</span>
        </button>
      </nav>
    </div>
  );
}
