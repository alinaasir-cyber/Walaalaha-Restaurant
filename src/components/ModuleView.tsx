"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Printer,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  ArrowUpRight,
} from "lucide-react";
import { SubpageConfig } from "@/data/modulesData";

interface Props {
  config: SubpageConfig;
}

export default function ModuleView({ config }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [rows, setRows] = useState(config.rows || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [notification, setNotification] = useState<string | null>(null);

  // Search filter
  const filteredRows = rows.filter((r) => {
    return Object.values(r).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newRow = {
      id: String(Date.now()),
      ...formData,
      status: formData.status || "Active",
    };
    setRows([newRow, ...rows]);
    setIsModalOpen(false);
    setFormData({});
    setNotification("Diiwaanka cusub si guul leh ayaa loo keydiyay!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Ma hubtaa inaad tirtirto diiwaankan?")) {
      setRows(rows.filter((r) => r.id !== id));
      setNotification("Diiwaanka waa la tirtiray.");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleExportCSV = () => {
    if (rows.length === 0) return;
    const headers = config.columns.map((c) => c.label).join(",");
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers +
      "\n" +
      rows
        .map((r) => config.columns.map((c) => `"${r[c.key] || ""}"`).join(","))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${config.slug}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const colorStyles: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-rose-50", text: "text-rose-600" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
    amber: { bg: "bg-amber-50", text: "text-amber-600" },
    purple: { bg: "bg-purple-50", text: "text-purple-600" },
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xl transition-all">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-100">
              {config.category}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 mt-1">{config.title}</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {config.titleSomali} &bull; {config.description}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-md shadow-rose-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Record
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      {config.kpis && config.kpis.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {config.kpis.map((kpi, idx) => {
            const style = colorStyles[kpi.color] || colorStyles.blue;
            return (
              <div
                key={idx}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {kpi.label}
                </span>
                <div className="mt-2 text-2xl font-black text-slate-900">{kpi.value}</div>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  <ArrowUpRight className={`w-3.5 h-3.5 ${style.text}`} />
                  <span>{kpi.subtext}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${config.title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filteredRows.length}</span> records
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                {config.columns.map((col) => (
                  <th key={col.key} className="py-3 px-4">
                    {col.label}
                  </th>
                ))}
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={config.columns.length + 1}
                    className="py-10 text-center text-slate-400 font-medium"
                  >
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    {config.columns.map((col) => {
                      const val = row[col.key];
                      if (col.type === "badge") {
                        const isPositive =
                          val === "Active" ||
                          val === "Settled" ||
                          val === "Served" ||
                          val === "Available" ||
                          val === "On Duty" ||
                          val === "Ready for Serving" ||
                          String(val).includes("Paid");
                        const isWarning =
                          val === "Cooking" ||
                          val === "Occupied" ||
                          val === "Pending" ||
                          val === "Unpaid" ||
                          val === "Billing";

                        return (
                          <td key={col.key} className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isPositive
                                  ? "bg-emerald-100 text-emerald-700"
                                  : isWarning
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-rose-100 text-rose-700"
                              }`}
                            >
                              {val}
                            </span>
                          </td>
                        );
                      }

                      if (col.type === "currency") {
                        return (
                          <td key={col.key} className="py-3 px-4 font-extrabold text-slate-900">
                            {val}
                          </td>
                        );
                      }

                      return (
                        <td key={col.key} className="py-3 px-4 text-slate-700 font-medium">
                          {val || "-"}
                        </td>
                      );
                    })}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => alert(`View details for ID: ${row.id}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="View / Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <h3 className="text-base font-bold text-slate-800">Add New - {config.title}</h3>
              <p className="text-xs text-slate-500 font-medium">
                Geli xogta cusub ee aad ku darayso qaybtan.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {config.formFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      required
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 font-medium"
                    >
                      <option value="">Select option...</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      required
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 font-medium"
                    />
                  )}
                </div>
              ))}

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-md shadow-rose-500/25"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
