"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@walaalaha.so");
  const [password, setPassword] = useState("AdminPassword123!");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Login failed. Please check credentials.");
        setLoading(false);
        return;
      }

      // Successful login -> Redirect to Dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setErrorMessage("Network error. Could not connect to the server.");
      setLoading(false);
    }
  };

  const setDemoRole = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-rose-50/30 to-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
        {/* Header Branding */}
        <div className="p-8 text-center border-b border-slate-100">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 mb-4">
            <ChefHat className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Walaalaha</h1>
          <p className="text-xs text-rose-500 font-bold uppercase tracking-wider mt-0.5">
            Restaurant ERP & POS System
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Secure Authentication & Session Gate (NeonDB + bcrypt)
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8 space-y-6">
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@walaalaha.so"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password..."
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-500/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials for Testing RBAC */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 text-center">
              Quick Test Demo Credentials (RBAC)
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => setDemoRole("admin@walaalaha.so", "AdminPassword123!")}
                className="p-2 text-left bg-slate-50 hover:bg-rose-50 border border-slate-200 rounded-xl transition-colors"
              >
                <span className="font-bold text-slate-800 block">👑 Super Admin</span>
                <span className="text-[10px] text-slate-400">admin@walaalaha.so</span>
              </button>

              <button
                type="button"
                onClick={() => setDemoRole("cashier@walaalaha.so", "CashierPass123!")}
                className="p-2 text-left bg-slate-50 hover:bg-rose-50 border border-slate-200 rounded-xl transition-colors"
              >
                <span className="font-bold text-slate-800 block">🧾 Cashier</span>
                <span className="text-[10px] text-slate-400">cashier@walaalaha.so</span>
              </button>

              <button
                type="button"
                onClick={() => setDemoRole("waiter@walaalaha.so", "WaiterPass123!")}
                className="p-2 text-left bg-slate-50 hover:bg-rose-50 border border-slate-200 rounded-xl transition-colors"
              >
                <span className="font-bold text-slate-800 block">👨‍🍳 Waiter</span>
                <span className="text-[10px] text-slate-400">waiter@walaalaha.so</span>
              </button>

              <button
                type="button"
                onClick={() => setDemoRole("accountant@walaalaha.so", "AccountantPass123!")}
                className="p-2 text-left bg-slate-50 hover:bg-rose-50 border border-slate-200 rounded-xl transition-colors"
              >
                <span className="font-bold text-slate-800 block">📊 Accountant</span>
                <span className="text-[10px] text-slate-400">accountant@walaalaha.so</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
