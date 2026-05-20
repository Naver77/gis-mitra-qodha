import React from 'react';
import { getProdukList } from '@/app/admin/produk/actions';
import { Product } from '@/types/product';
import ProductCatalogClient from '@/components/products/ProductCatalogClient';

// Memaksa halaman untuk mengambil data terbaru dari server
export const revalidate = 0; 

export default async function ProductsPage() {
  let products: Product[] = [];
  let isError = false;

  try {
    // Pengambilan data langsung dari database
    const data = await getProdukList();
    products = data as unknown as Product[];
  } catch (error) {
    console.error("Gagal memuat data produk di server:", error);
    isError = true;
  }

  return (
    <ProductCatalogClient initialProducts={products} initialError={isError} />
  );
}