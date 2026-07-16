import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

export const metadata: Metadata = {
  title: "Shree Omkar Soap Works — Wholesale Soaps & Detergents Since 1989",
  description:
    "Bulk supplier of quality soaps, detergent powders and cakes across Uttar Pradesh. Brands: Shambhu, Dulara Gold, Rajdulara. Enquire for wholesale quotes.",
};

export const viewport: Viewport = {
  colorScheme: "only light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">
        <LanguageProvider>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
          <WhatsAppFab />
        </LanguageProvider>
      </body>
    </html>
  );
}
