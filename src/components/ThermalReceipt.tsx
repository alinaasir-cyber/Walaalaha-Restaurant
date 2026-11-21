"use client";

import React from "react";
import { Printer, CheckCircle2, X, ChefHat, Copy, Check } from "lucide-react";

export interface ReceiptItem {
  name: string;
  nameSomali?: string;
  quantity: number;
  price: number;
}

export interface ReceiptData {
  orderNumber: string;
  tableNumber: string;
  waiterName: string;
  cashierName: string;
  branchName: string;
  date: string;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  notes?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ReceiptData;
}

export default function ThermalReceipt({ isOpen, onClose, data }: Props) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textReceipt = `
========================================
       WALAALAHA RESTAURANT & CAFE      
       Authentic Somali & Modern Dining 
     Maka Al-Mukarama Rd, Mogadishu     
          Tel: +252 61 500 0000         
========================================
Order: #${data.orderNumber}
Date:  ${data.date}
Table: ${data.tableNumber} | Waiter: ${data.waiterName}
Cashier: ${data.cashierName}
----------------------------------------
Qty  Item                      Amount
----------------------------------------
${data.items
  .map(
    (i) =>
      `${i.quantity.toString().padEnd(4)}${i.name.padEnd(24)} $${(i.price * i.quantity).toFixed(2)}`
  )
  .join("\n")}
----------------------------------------
Subtotal:                    $${data.subtotal.toFixed(2)}
Tax (5% VAT):                $${data.tax.toFixed(2)}
TOTAL DUE:                   $${data.total.toFixed(2)}
Payment: ${data.paymentMethod} (PAID)
========================================
     MAHADSANID! SOO DHOWOW MAR KALE    
   Thank you for dining at Walaalaha!   
========================================
`.trim();

    navigator.clipboard.writeText(textReceipt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      {/* Modal Box */}
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Official POS Thermal Receipt (80mm)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Controls for Cashier */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="text-[11px] text-slate-500 font-medium">
            Order <span className="font-bold text-slate-800">#{data.orderNumber}</span> &bull; {data.paymentMethod}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold shadow-xs transition-colors"
              title="Copy plain text receipt for WhatsApp/SMS"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold shadow-sm shadow-rose-500/25 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>

        {/* Printable 80mm Thermal Receipt Content */}
        <div className="p-6 bg-slate-100/50 print:bg-white print:p-0 flex justify-center">
          <div
            id="printable-receipt"
            className="w-full max-w-[340px] bg-white p-5 rounded-2xl shadow-md border border-slate-200/90 font-mono text-slate-900 text-xs print:border-none print:shadow-none print:p-0 print:w-full print:max-w-none"
          >
            {/* Header */}
            <div className="text-center pb-3 border-b border-dashed border-slate-300">
              <div className="w-10 h-10 mx-auto rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm mb-1.5 print:border print:border-black">
                W
              </div>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Walaalaha Restaurant
              </h2>
              <p className="text-[10px] text-slate-600 mt-0.5">
                Authentic Somali Cuisine & Cafe
              </p>
              <p className="text-[10px] text-slate-500">
                Maka Al-Mukarama Rd, Mogadishu
              </p>
              <p className="text-[10px] text-slate-500 font-semibold">
                Tel: +252 61 500 0000 / +252 61 511 1111
              </p>
              <p className="text-[9px] text-slate-400 mt-0.5">
                TIN / Reg: 252-WAL-9941
              </p>
            </div>

            {/* Meta Info */}
            <div className="py-2.5 border-b border-dashed border-slate-300 text-[11px] space-y-1">
              <div className="flex justify-between font-bold">
                <span>Receipt #:</span>
                <span className="text-slate-950 font-black">#{data.orderNumber}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Date & Time:</span>
                <span>{data.date}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Table:</span>
                <span className="font-bold text-slate-900">{data.tableNumber}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Waiter / Server:</span>
                <span>{data.waiterName}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Cashier:</span>
                <span>{data.cashierName}</span>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="py-2.5 border-b border-dashed border-slate-300">
              <div className="flex justify-between font-bold text-[10px] text-slate-500 uppercase tracking-wider pb-1.5 border-b border-slate-200">
                <span className="w-8">Qty</span>
                <span className="flex-1">Description</span>
                <span className="w-16 text-right">Price</span>
              </div>

              <div className="pt-2 space-y-2">
                {data.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] leading-tight">
                    <span className="w-8 font-bold text-slate-800">{item.quantity}x</span>
                    <div className="flex-1 pr-2">
                      <p className="font-bold text-slate-900">{item.name}</p>
                      {item.nameSomali && (
                        <p className="text-[9px] text-slate-500 italic">{item.nameSomali}</p>
                      )}
                    </div>
                    <span className="w-16 text-right font-extrabold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="py-2.5 border-b border-dashed border-slate-300 text-[11px] space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-bold">${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Gov Tax (5% VAT):</span>
                <span className="font-bold">${data.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1 border-t border-slate-200 text-sm font-black text-slate-950">
                <span>TOTAL USD:</span>
                <span className="text-base font-black">${data.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                <span>Sh.So Approx (26,000/USD):</span>
                <span>{(data.total * 26000).toLocaleString()} SOS</span>
              </div>
            </div>

            {/* Payment Details */}
            <div className="py-2.5 border-b border-dashed border-slate-300 text-[11px]">
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Paid Via</p>
                  <p className="font-black text-emerald-700">{data.paymentMethod}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    PAID IN FULL
                  </span>
                </div>
              </div>
            </div>

            {/* Barcode & Footer */}
            <div className="pt-3 text-center space-y-1">
              {/* Simulated Thermal Barcode */}
              <div className="flex justify-center items-center gap-0.5 h-8 py-1 my-1 opacity-80">
                {[...Array(38)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full ${
                      i % 3 === 0
                        ? "w-1 bg-black"
                        : i % 2 === 0
                        ? "w-0.5 bg-black"
                        : "w-0.5 bg-transparent"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[9px] tracking-widest text-slate-400">
                *{data.orderNumber}*
              </p>

              <p className="text-[11px] font-bold text-slate-800 pt-1">
                MAHADSANID! SOO DHOWOW MAR KALE
              </p>
              <p className="text-[9px] text-slate-500">
                Customer Care & Delivery: +252 61 500 0000
              </p>
              <p className="text-[8px] text-slate-400 pt-1">
                Powered by Walaalaha Restaurant Enterprise POS
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3 print:hidden">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            Start Next Order
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 px-4 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print 80mm Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
