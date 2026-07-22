import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shreeomkarsoapworks.com"),
  title: {
    default: "Shree Omkar Soap Works — Wholesale Soaps & Detergents Since 1989",
    template: "%s | Shree Omkar Soap Works",
  },
  description:
    "Shree Omkar Soap Works — wholesale manufacturer and bulk supplier of soaps, detergent powders and detergent cakes since 1989, based in Chandausi, Sambhal, Uttar Pradesh. Brands: Shambhu, Dulara Gold, Rajdulara. Enquire for wholesale quotes.",
  keywords: [
    "Shree Omkar Soap Works",
    "Omkar Soap Works",
    "Shambhu detergent",
    "Dulara Gold",
    "Rajdulara",
    "detergent powder wholesale",
    "detergent cake manufacturer",
    "washing soap wholesale",
    "Chandausi",
    "Sambhal",
    "Uttar Pradesh",
    "detergent supplier UP",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shree Omkar Soap Works — Wholesale Soaps & Detergents Since 1989",
    description:
      "Bulk supplier of quality soaps, detergent powders and cakes across Uttar Pradesh. Brands: Shambhu, Dulara Gold, Rajdulara.",
    url: "https://www.shreeomkarsoapworks.com",
    siteName: "Shree Omkar Soap Works",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Shree Omkar Soap Works logo" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "only light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shree Omkar Soap Works",
    alternateName: "Omkar Soap Works",
    url: "https://www.shreeomkarsoapworks.com",
    logo: "https://www.shreeomkarsoapworks.com/logo.png",
    foundingDate: "1989",
    description:
      "Wholesale manufacturer of soaps, detergent powders and detergent cakes since 1989. Brands: Shambhu, Dulara Gold, Rajdulara.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Village Kaithal, Chandausi",
      addressLocality: "Sambhal",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9319088541",
      contactType: "sales",
      email: "uditchaudhary0406@gmail.com",
    },
  };

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
