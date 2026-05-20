import React from 'react';
import Link from 'next/link';
import { getProdukList } from '@/app/admin/produk/actions'; 
import { Product } from '@/types/product';
import ProductDetailClient from '@/components/products/ProductDetailClient';

// Menggunakan Incremental Static Regeneration (ISR) untuk melakukan cache data detail produk selama 60 detik
export const revalidate = 60; 

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  // Mengamankan pemanggilan objek params agar kompatibel dengan Next.js versi terbaru
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  let product: Product | null = null;

  try {
    const allProducts = await getProdukList() as unknown as Product[];
    
    // Mencari ID produk di tingkat server secara cepat
    // Catatan: Jika ada fungsi getProductById(productId) langsung di 'actions.ts', gunakan itu agar jauh lebih cepat.
    product = allProducts.find((p) => String(p.id_produk) === String(productId)) || null;
  } catch (error) {
    console.error("Gagal memuat detail produk di server:", error);
  }

  // Jika produk tidak ditemukan, langsung kembalikan view 404 dari Server (Sangat Cepat)
  if (!product) {
    return (
      <div className="min-h-[calc(100vh-85px)] flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center bg-white p-8 md:p-12 rounded-4xl shadow-2xl border border-gray-100 max-w-md w-full">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <i className="fa-solid fa-box-open text-4xl text-gray-400"></i>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Produk Tidak Ditemukan</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">Maaf, produk yang Anda cari mungkin telah habis, dihapus, atau URL tidak valid.</p>
          <Link href="/products" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-gold hover:text-gray-900 transition-all duration-300 shadow-xl w-full flex items-center justify-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}