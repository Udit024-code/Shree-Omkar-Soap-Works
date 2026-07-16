"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductsAdmin from "@/components/admin/ProductsAdmin";
import FaqsAdmin from "@/components/admin/FaqsAdmin";
import EnquiriesAdmin from "@/components/admin/EnquiriesAdmin";

type Tab = "enquiries" | "products" | "faqs";

const tabs: { key: Tab; label: string }[] = [
  { key: "enquiries", label: "Enquiries" },
  { key: "products", label: "Products" },
  { key: "faqs", label: "Chatbot FAQs" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("enquiries");

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-400">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="font-bold text-blue-800">Shree Omkar Soap Works — Admin</div>
          <div className="flex items-center gap-3 text-sm">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline">View site ↗</a>
            <button onClick={logout} className="border border-gray-400 rounded px-3 py-1 text-gray-700 hover:border-blue-800 hover:text-blue-800">
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex gap-1 pt-4">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg border border-b-0 ${
                tab === tb.key ? "bg-white border-gray-400 text-blue-800" : "bg-transparent border-transparent text-gray-500 hover:text-blue-800"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </nav>
        <div className="bg-white border border-gray-400 rounded-b-lg rounded-tr-lg p-4 sm:p-6 mb-10">
          {tab === "enquiries" && <EnquiriesAdmin />}
          {tab === "products" && <ProductsAdmin />}
          {tab === "faqs" && <FaqsAdmin />}
        </div>
      </div>
    </div>
  );
}
