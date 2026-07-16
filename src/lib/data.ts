import { db } from "./db";
import { PRODUCTS as SEED_PRODUCTS } from "./site";
import { FAQS as SEED_FAQS } from "./faqs";

export type Product = {
  id: number;
  slug: string;
  nameEn: string;
  nameHi: string;
  typeEn: string;
  typeHi: string;
  image: string;
  sortOrder: number;
};

export type Faq = {
  id: number;
  qEn: string;
  aEn: string;
  qHi: string;
  aHi: string;
  sortOrder: number;
};

export type Enquiry = {
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

// --- Schema + seed (idempotent, safe to run repeatedly) ---

export async function initSchema() {
  const sql = db();
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name_en TEXT NOT NULL,
      name_hi TEXT NOT NULL,
      type_en TEXT NOT NULL,
      type_hi TEXT NOT NULL,
      image TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS faqs (
      id SERIAL PRIMARY KEY,
      q_en TEXT NOT NULL,
      a_en TEXT NOT NULL,
      q_hi TEXT NOT NULL,
      a_hi TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS enquiries (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      name TEXT NOT NULL,
      business TEXT,
      phone TEXT NOT NULL,
      product TEXT,
      qty TEXT,
      message TEXT,
      source TEXT NOT NULL DEFAULT 'form'
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY DEFAULT 1,
      password_hash TEXT,
      failed_attempts INTEGER NOT NULL DEFAULT 0,
      locked_until TIMESTAMPTZ,
      CONSTRAINT single_row CHECK (id = 1)
    )`;
  await sql`INSERT INTO admin (id) VALUES (1) ON CONFLICT (id) DO NOTHING`;
}

// Seeds products and FAQs from the code defaults, only if the tables are empty.
export async function seedIfEmpty() {
  const sql = db();
  const [{ count: pCount }] = (await sql`SELECT COUNT(*)::int AS count FROM products`) as { count: number }[];
  if (pCount === 0) {
    let i = 0;
    for (const p of SEED_PRODUCTS) {
      await sql`
        INSERT INTO products (slug, name_en, name_hi, type_en, type_hi, image, sort_order)
        VALUES (${p.slug}, ${p.nameEn}, ${p.nameHi}, ${p.typeEn}, ${p.typeHi}, ${p.image}, ${i++})`;
    }
  }
  const [{ count: fCount }] = (await sql`SELECT COUNT(*)::int AS count FROM faqs`) as { count: number }[];
  if (fCount === 0) {
    let i = 0;
    for (const f of SEED_FAQS) {
      await sql`
        INSERT INTO faqs (q_en, a_en, q_hi, a_hi, sort_order)
        VALUES (${f.qEn}, ${f.aEn}, ${f.qHi}, ${f.aHi}, ${i++})`;
    }
  }
}

// --- Resilient public getters ---
// If the database is ever unreachable, the public site falls back to the
// built-in defaults so it never goes down.

export async function getProductsSafe(): Promise<Product[]> {
  try {
    const rows = await getProducts();
    if (rows.length) return rows;
  } catch {
    /* fall through to seed */
  }
  return SEED_PRODUCTS.map((p, i) => ({ id: -(i + 1), sortOrder: i, ...p }));
}

export async function getFaqsSafe(): Promise<Faq[]> {
  try {
    const rows = await getFaqs();
    if (rows.length) return rows;
  } catch {
    /* fall through to seed */
  }
  return SEED_FAQS.map((f, i) => ({ id: -(i + 1), sortOrder: i, ...f }));
}

// --- Products ---

export async function getProducts(): Promise<Product[]> {
  const rows = (await db()`
    SELECT id, slug, name_en, name_hi, type_en, type_hi, image, sort_order
    FROM products ORDER BY sort_order, id`) as Record<string, unknown>[];
  return rows.map(rowToProduct);
}

export async function createProduct(p: Omit<Product, "id">) {
  await db()`
    INSERT INTO products (slug, name_en, name_hi, type_en, type_hi, image, sort_order)
    VALUES (${p.slug}, ${p.nameEn}, ${p.nameHi}, ${p.typeEn}, ${p.typeHi}, ${p.image}, ${p.sortOrder})`;
}

export async function updateProduct(id: number, p: Omit<Product, "id">) {
  await db()`
    UPDATE products SET slug=${p.slug}, name_en=${p.nameEn}, name_hi=${p.nameHi},
      type_en=${p.typeEn}, type_hi=${p.typeHi}, image=${p.image}, sort_order=${p.sortOrder}
    WHERE id=${id}`;
}

export async function deleteProduct(id: number) {
  await db()`DELETE FROM products WHERE id=${id}`;
}

// --- FAQs ---

export async function getFaqs(): Promise<Faq[]> {
  const rows = (await db()`
    SELECT id, q_en, a_en, q_hi, a_hi, sort_order FROM faqs ORDER BY sort_order, id`) as Record<string, unknown>[];
  return rows.map(rowToFaq);
}

export async function createFaq(f: Omit<Faq, "id">) {
  await db()`
    INSERT INTO faqs (q_en, a_en, q_hi, a_hi, sort_order)
    VALUES (${f.qEn}, ${f.aEn}, ${f.qHi}, ${f.aHi}, ${f.sortOrder})`;
}

export async function updateFaq(id: number, f: Omit<Faq, "id">) {
  await db()`
    UPDATE faqs SET q_en=${f.qEn}, a_en=${f.aEn}, q_hi=${f.qHi}, a_hi=${f.aHi}, sort_order=${f.sortOrder}
    WHERE id=${id}`;
}

export async function deleteFaq(id: number) {
  await db()`DELETE FROM faqs WHERE id=${id}`;
}

// --- Enquiries ---

export async function createEnquiry(e: Omit<Enquiry, "id" | "createdAt">) {
  await db()`
    INSERT INTO enquiries (name, business, phone, product, qty, message, source)
    VALUES (${e.name}, ${e.business}, ${e.phone}, ${e.product}, ${e.qty}, ${e.message}, ${e.source})`;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const rows = (await db()`
    SELECT id, created_at, name, business, phone, product, qty, message, source
    FROM enquiries ORDER BY created_at DESC`) as Record<string, unknown>[];
  return rows.map((r) => ({
    id: r.id as number,
    createdAt: new Date(r.created_at as string).toISOString(),
    name: r.name as string,
    business: (r.business as string) ?? null,
    phone: r.phone as string,
    product: (r.product as string) ?? null,
    qty: (r.qty as string) ?? null,
    message: (r.message as string) ?? null,
    source: r.source as string,
  }));
}

export async function deleteEnquiry(id: number) {
  await db()`DELETE FROM enquiries WHERE id=${id}`;
}

// --- row mappers ---

function rowToProduct(r: Record<string, unknown>): Product {
  return {
    id: r.id as number,
    slug: r.slug as string,
    nameEn: r.name_en as string,
    nameHi: r.name_hi as string,
    typeEn: r.type_en as string,
    typeHi: r.type_hi as string,
    image: r.image as string,
    sortOrder: r.sort_order as number,
  };
}

function rowToFaq(r: Record<string, unknown>): Faq {
  return {
    id: r.id as number,
    qEn: r.q_en as string,
    aEn: r.a_en as string,
    qHi: r.q_hi as string,
    aHi: r.a_hi as string,
    sortOrder: r.sort_order as number,
  };
}
