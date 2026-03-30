import { Plus_Jakarta_Sans } from "next/font/google";
import LayoutWrapper from '@/components/LayoutWrapper';
import "./globals.css";

// Konfigurasi Font Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// METADATA SERVER (Sangat penting untuk SEO Skripsi)
export const metadata = {
  title: "Qodha Aromatic - Wewangian Sunnah Premium",
  description: "Pusat Kemitraan dan Produk Wewangian Qodha Aromatic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      
      <body className={`${plusJakartaSans.className} bg-gray-50 text-gray-800 antialiased selection:bg-brand-orange selection:text-white`}>
        
        {/* SEMUA LOGIKA (Navbar, Footer, Modal, Jarak) DIKENDALIKAN DI SINI */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>

      </body>
    </html>
  );
}