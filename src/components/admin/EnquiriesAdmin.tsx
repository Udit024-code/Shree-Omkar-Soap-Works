"use client";

import { useEffect, useState } from "react";

type Enquiry = {
  id: number;
  createdAt: string;
  name: string;
  business: string | null;
  phone: string;
  product: string | null;
  qty: string | null;
  message: string | null;
  source: string;
};

export default function EnquiriesAdmin() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const r = await fetch("/api/admin/enquiries");
    if (r.status === 401) { window.location.href = "/admin/login"; return; }
    const d = await r.json();
    setItems(d.enquiries ?? []);
    setLoaded(true);
  };
  useEffect(() => { load(); }, []);

  const remove = async (id: number) => {
    if (!confirm("Delete this enquiry?")) return;
    await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
    await load();
  };

  if (!loaded) return <p className="text-gray-500">Loading…</p>;
  if (items.length === 0) return <p className="text-gray-500">No enquiries yet. They will appear here as customers send them.</p>;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-600">{items.length} enquiry{items.length === 1 ? "" : "ies"} received.</p>
      {items.map((e) => (
        <div key={e.id} className="rounded-lg border border-gray-400 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="font-semibold text-blue-800">{e.name}</div>
            <div className="text-xs text-gray-500 whitespace-nowrap">
              {new Date(e.createdAt).toLocaleString("en-IN")}
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-700 flex flex-col gap-0.5">
            <a href={`tel:${e.phone}`} className="text-blue-800">{e.phone}</a>
            {e.business && <div>Business: {e.business}</div>}
            {e.product && <div>Product: {e.product}</div>}
            {e.qty && <div>Quantity: {e.qty}</div>}
            {e.message && <div className="text-gray-600">“{e.message}”</div>}
            <div className="text-xs text-gray-400 mt-1">via {e.source}</div>
          </div>
          <div className="mt-2 flex gap-2">
            <a
              href={`https://wa.me/91${e.phone.replace(/\D/g, "").slice(-10)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 border border-green-500 hover:bg-green-50 rounded px-3 py-1"
            >
              Reply on WhatsApp
            </a>
            <button onClick={() => remove(e.id)} className="text-sm text-red-600 border border-red-400 hover:bg-red-50 rounded px-3 py-1">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
