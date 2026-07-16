"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  slug: string;
  nameEn: string;
  nameHi: string;
  typeEn: string;
  typeHi: string;
  image: string;
  sortOrder: number;
};

const blank: Omit<Product, "id"> = {
  slug: "",
  nameEn: "",
  nameHi: "",
  typeEn: "",
  typeHi: "",
  image: "",
  sortOrder: 0,
};

const input =
  "w-full border border-gray-400 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 bg-white text-gray-900 [color-scheme:light]";
const label = "text-xs text-gray-500";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [adding, setAdding] = useState<Omit<Product, "id">>({ ...blank });
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const r = await fetch("/api/admin/products");
    if (r.status === 401) { window.location.href = "/admin/login"; return; }
    const d = await r.json();
    setProducts(d.products ?? []);
    setLoaded(true);
  };
  useEffect(() => { load(); }, []);

  const save = async (p: Product) => {
    setBusy(true);
    await fetch(`/api/admin/products/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    await load();
    setBusy(false);
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    setBusy(true);
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    await load();
    setBusy(false);
  };

  const add = async () => {
    if (!adding.slug || !adding.nameEn) { alert("Slug and English name are required."); return; }
    setBusy(true);
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...adding, sortOrder: products.length }),
    });
    setAdding({ ...blank });
    await load();
    setBusy(false);
  };

  const field = (p: Product, k: keyof Product) => (v: string) =>
    setProducts((list) => list.map((x) => (x.id === p.id ? { ...x, [k]: k === "sortOrder" ? Number(v) : v } : x)));

  if (!loaded) return <p className="text-gray-500">Loading…</p>;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-600">
        Edit product names and details below, then press <b>Save</b>. The image field is the file path
        (e.g. <code>/products/shambhu-soap2.png</code>). To add a brand-new photo, ask me to upload the image file first.
      </p>

      {products.map((p) => (
        <div key={p.id} className="rounded-lg border border-gray-400 p-4 grid sm:grid-cols-2 gap-3">
          <div><span className={label}>Name (English)</span><input className={input} value={p.nameEn} onChange={(e) => field(p, "nameEn")(e.target.value)} /></div>
          <div><span className={label}>Name (Hindi)</span><input className={input} value={p.nameHi} onChange={(e) => field(p, "nameHi")(e.target.value)} /></div>
          <div><span className={label}>Type (English)</span><input className={input} value={p.typeEn} onChange={(e) => field(p, "typeEn")(e.target.value)} /></div>
          <div><span className={label}>Type (Hindi)</span><input className={input} value={p.typeHi} onChange={(e) => field(p, "typeHi")(e.target.value)} /></div>
          <div><span className={label}>Image path</span><input className={input} value={p.image} onChange={(e) => field(p, "image")(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><span className={label}>Slug (unique id)</span><input className={input} value={p.slug} onChange={(e) => field(p, "slug")(e.target.value)} /></div>
            <div><span className={label}>Order</span><input type="number" className={input} value={p.sortOrder} onChange={(e) => field(p, "sortOrder")(e.target.value)} /></div>
          </div>
          <div className="sm:col-span-2 flex gap-2">
            <button disabled={busy} onClick={() => save(p)} className="bg-blue-800 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded px-4 py-1.5">Save</button>
            <button disabled={busy} onClick={() => remove(p.id)} className="border border-red-400 text-red-600 hover:bg-red-50 text-sm font-medium rounded px-4 py-1.5">Delete</button>
          </div>
        </div>
      ))}

      <div className="rounded-lg border border-dashed border-gray-400 p-4 grid sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2 font-medium text-blue-800">Add a new product</div>
        <div><span className={label}>Name (English)</span><input className={input} value={adding.nameEn} onChange={(e) => setAdding({ ...adding, nameEn: e.target.value })} /></div>
        <div><span className={label}>Name (Hindi)</span><input className={input} value={adding.nameHi} onChange={(e) => setAdding({ ...adding, nameHi: e.target.value })} /></div>
        <div><span className={label}>Type (English)</span><input className={input} value={adding.typeEn} onChange={(e) => setAdding({ ...adding, typeEn: e.target.value })} /></div>
        <div><span className={label}>Type (Hindi)</span><input className={input} value={adding.typeHi} onChange={(e) => setAdding({ ...adding, typeHi: e.target.value })} /></div>
        <div><span className={label}>Image path</span><input className={input} value={adding.image} onChange={(e) => setAdding({ ...adding, image: e.target.value })} placeholder="/products/....png" /></div>
        <div><span className={label}>Slug (unique id)</span><input className={input} value={adding.slug} onChange={(e) => setAdding({ ...adding, slug: e.target.value })} placeholder="e.g. new-product" /></div>
        <div className="sm:col-span-2">
          <button disabled={busy} onClick={add} className="bg-blue-800 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded px-4 py-1.5">Add product</button>
        </div>
      </div>
    </div>
  );
}
