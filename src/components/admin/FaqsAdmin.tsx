"use client";

import { useEffect, useState } from "react";

type Faq = { id: number; qEn: string; aEn: string; qHi: string; aHi: string; sortOrder: number };

const blank: Omit<Faq, "id"> = { qEn: "", aEn: "", qHi: "", aHi: "", sortOrder: 0 };

const input =
  "w-full border border-gray-400 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 bg-white text-gray-900 [color-scheme:light]";
const label = "text-xs text-gray-500";

export default function FaqsAdmin() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [adding, setAdding] = useState<Omit<Faq, "id">>({ ...blank });
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const r = await fetch("/api/admin/faqs");
    if (r.status === 401) { window.location.href = "/admin/login"; return; }
    const d = await r.json();
    setFaqs(d.faqs ?? []);
    setLoaded(true);
  };
  useEffect(() => { load(); }, []);

  const save = async (f: Faq) => {
    setBusy(true);
    await fetch(`/api/admin/faqs/${f.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    await load();
    setBusy(false);
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this FAQ?")) return;
    setBusy(true);
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    await load();
    setBusy(false);
  };

  const add = async () => {
    if (!adding.qEn || !adding.aEn) { alert("English question and answer are required."); return; }
    setBusy(true);
    await fetch("/api/admin/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...adding, sortOrder: faqs.length }),
    });
    setAdding({ ...blank });
    await load();
    setBusy(false);
  };

  const field = (f: Faq, k: keyof Faq) => (v: string) =>
    setFaqs((list) => list.map((x) => (x.id === f.id ? { ...x, [k]: k === "sortOrder" ? Number(v) : v } : x)));

  if (!loaded) return <p className="text-gray-500">Loading…</p>;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-600">
        These are the answers your website chatbot gives. Edit and press <b>Save</b>. Add both English and Hindi so it
        can answer in either language.
      </p>

      {faqs.map((f) => (
        <div key={f.id} className="rounded-lg border border-gray-400 p-4 grid gap-3">
          <div><span className={label}>Question (English)</span><input className={input} value={f.qEn} onChange={(e) => field(f, "qEn")(e.target.value)} /></div>
          <div><span className={label}>Answer (English)</span><textarea className={input} rows={2} value={f.aEn} onChange={(e) => field(f, "aEn")(e.target.value)} /></div>
          <div><span className={label}>Question (Hindi)</span><input className={input} value={f.qHi} onChange={(e) => field(f, "qHi")(e.target.value)} /></div>
          <div><span className={label}>Answer (Hindi)</span><textarea className={input} rows={2} value={f.aHi} onChange={(e) => field(f, "aHi")(e.target.value)} /></div>
          <div className="flex items-center gap-2">
            <span className={label}>Order</span>
            <input type="number" className="w-20 border border-gray-400 rounded px-2 py-1 text-sm text-gray-900" value={f.sortOrder} onChange={(e) => field(f, "sortOrder")(e.target.value)} />
            <button disabled={busy} onClick={() => save(f)} className="ml-auto bg-blue-800 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded px-4 py-1.5">Save</button>
            <button disabled={busy} onClick={() => remove(f.id)} className="border border-red-400 text-red-600 hover:bg-red-50 text-sm font-medium rounded px-4 py-1.5">Delete</button>
          </div>
        </div>
      ))}

      <div className="rounded-lg border border-dashed border-gray-400 p-4 grid gap-3">
        <div className="font-medium text-blue-800">Add a new FAQ</div>
        <div><span className={label}>Question (English)</span><input className={input} value={adding.qEn} onChange={(e) => setAdding({ ...adding, qEn: e.target.value })} /></div>
        <div><span className={label}>Answer (English)</span><textarea className={input} rows={2} value={adding.aEn} onChange={(e) => setAdding({ ...adding, aEn: e.target.value })} /></div>
        <div><span className={label}>Question (Hindi)</span><input className={input} value={adding.qHi} onChange={(e) => setAdding({ ...adding, qHi: e.target.value })} /></div>
        <div><span className={label}>Answer (Hindi)</span><textarea className={input} rows={2} value={adding.aHi} onChange={(e) => setAdding({ ...adding, aHi: e.target.value })} /></div>
        <div>
          <button disabled={busy} onClick={add} className="bg-blue-800 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded px-4 py-1.5">Add FAQ</button>
        </div>
      </div>
    </div>
  );
}
