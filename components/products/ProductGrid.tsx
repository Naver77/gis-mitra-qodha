import React from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  title: string;
  items: Product[];
  mainCat: string;
}

export const ProductGrid = ({ title, items, mainCat }: ProductGridProps) => {
  return (
    <div className="bg-white rounded-2xl md:rounded-4xl p-4 md:p-8 shadow-lg border border-gray-100 mb-6 md:mb-10">
      <div className="flex items-center justify-between mb-4 md:mb-6 border-b border-gray-50 pb-3 md:pb-4">
        <h3 className="text-lg md:text-2xl font-black text-gray-800 leading-tight">{title}</h3>
        <span className="text-[10px] md:text-xs bg-brand-orange/10 text-brand-orange px-2.5 py-1 md:px-3 md:py-1.5 rounded-full font-bold shrink-0">{items.length} Produk</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
        {items.map(prod => (
          <div key={prod.id_produk} className="col-span-1">
            <ProductCard product={prod} mainCat={mainCat} />
          </div>
        ))}
      </div>
    </div>
  );
};
