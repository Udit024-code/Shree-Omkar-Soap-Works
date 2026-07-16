"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/components/LanguageProvider";
import { BUSINESS, PRODUCTS } from "@/lib/site";

function ContactForm() {
  const { lang, t } = useLang();
  const params = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    product: params.get("product") ?? "",
    qty: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Enquiry from website`,
      `Name: ${form.name}`,
      form.business && `Business: ${form.business}`,
      `Phone: ${form.phone}`,
      form.product && `Product: ${form.product}`,
      form.qty && `Quantity: ${form.qty}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean);
    window.open(
      `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank"
    );
  };

  const input =
    "w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-white text-gray-900 placeholder:text-gray-500 [color-scheme:light]";

  return (
    <form onSubmit={submit} className="rounded-lg border border-gray-400 p-6 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-blue-800">{t.formTitle}</h2>
      <input required placeholder={t.formName} value={form.name} onChange={set("name")} className={input} />
      <input placeholder={t.formBusiness} value={form.business} onChange={set("business")} className={input} />
      <input required placeholder={t.formPhone} value={form.phone} onChange={set("phone")} className={input} inputMode="tel" />
      <select value={form.product} onChange={set("product")} className={input}>
        <option value="">{t.formProduct}</option>
        {PRODUCTS.map((p) => (
          <option key={p.slug} value={p.nameEn}>
            {lang === "hi" ? p.nameHi : p.nameEn}
          </option>
        ))}
      </select>
      <input placeholder={t.formQty} value={form.qty} onChange={set("qty")} className={input} />
      <textarea placeholder={t.formMessage} value={form.message} onChange={set("message")} className={input} rows={3} />
      <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-medium rounded-md px-6 py-3">
        {t.formSend}
      </button>
      <p className="text-xs text-gray-500">{t.formNote}</p>
    </form>
  );
}

export default function ContactPage() {
  const { lang, t } = useLang();
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-800 text-center">{t.contactTitle}</h1>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <a href={`tel:${BUSINESS.phone}`} className="rounded-lg border border-gray-400 p-5 flex items-center gap-4 hover:border-gray-600">
              <div>
              <div className="font-bold text-blue-800">{t.callUs}</div>
              <div className="text-gray-600">{BUSINESS.phone}</div>
            </div>
          </a>
          <a href={`mailto:${BUSINESS.email}`} className="rounded-lg border border-gray-400 p-5 flex items-center gap-4 hover:border-gray-600">
            <div>
              <div className="font-bold text-blue-800">{t.emailUs}</div>
              <div className="text-gray-600 break-all">{BUSINESS.email}</div>
            </div>
          </a>
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-400 p-5 flex items-center gap-4 hover:border-gray-600"
          >
            <div>
              <div className="font-bold text-blue-800">{t.whatsappUs}</div>
              <div className="text-gray-600">+91 {BUSINESS.whatsapp.slice(2)}</div>
            </div>
          </a>
          <div className="rounded-lg border border-gray-400 p-5">
            <div className="font-bold text-blue-800">{t.address}</div>
            <div className="text-gray-600 mt-1">
              {lang === "hi" ? BUSINESS.addressHi : BUSINESS.addressEn}
            </div>
            <div className="font-bold text-blue-800 mt-3">{t.deliveryAreas}</div>
            <div className="text-gray-600">{t.deliveryAreasBody}</div>
          </div>
        </div>
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
