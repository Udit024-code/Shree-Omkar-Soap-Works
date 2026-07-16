"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFab from "./WhatsAppFab";
import Chatbot from "./Chatbot";

// The public site shows header/footer/chatbot; the /admin area renders bare.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path?.startsWith("/admin")) return <>{children}</>;
  return (
    <>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
      <WhatsAppFab />
      <Chatbot />
    </>
  );
}
