"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar"; // Make sure the filename matches exactly (NavBar.tsx vs Navbar.tsx)
import Footer from "@/components/footer";
import WhatsAppChat from "@/components/WhatsAppChat";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Google Tag (gtag.js)
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.setAttribute("async", "");
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-WHXP5YHDZF";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-WHXP5YHDZF');
    `;
    document.head.appendChild(script2);

    // Cleanup function to remove scripts if needed
    return () => {
      try {
        document.head.removeChild(script1);
        document.head.removeChild(script2);
      } catch (error) {
        // Ignore cleanup errors
      }
    };
  }, []);


  return (
    <>
    {!isAdminRoute && <Navbar />}
      
      {/* Main content */}
      <main >
        {children}
      </main>
      
      {!isAdminRoute && <Footer />}
       
      {/* WhatsApp Chat Widget */}
      {!isAdminRoute && <WhatsAppChat />}
    </>
  );
}