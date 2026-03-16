import React, { useRef } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { getMainCategory } from '@/lib/product-utils';

interface ProductShelfProps {
  title: string;
  items: Product[];
  mainCat: string;
  setActiveCategory: (category: string) => void;
}

export const ProductShelf = ({ title, items, mainCat, setActiveCategory }: ProductShelfProps) => {
  const shelfRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (shelfRef.current) {
      shelfRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-4xl p-4 md:p-8 shadow-lg border border-gray-100 mb-6 md:mb-10 relative group/shelf">
      <div className="flex items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-50">
        <h3 className="text-lg md:text-2xl font-black text-gray-800 leading-tight">{title}</h3>
        <div className="flex items-center gap-3">
          <span className="text-[10px] md:text-xs bg-brand-orange/10 text-brand-orange px-2.5 py-1 md:px-3 md:py-1.5 rounded-full font-bold shrink-0">{items.length} Varian</span>
          {items.length > 2 && (
            <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest shrink-0 animate-pulse md:animate-none">
              <i className="fa-solid fa-arrows-left-right"></i> Geser
            </span>
          )}
        </div>
      </div>
      
      <div className="relative">
        <button onClick={() => scroll('left')} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-xl items-center justify-center text-gray-600 hover:text-brand-gold hover:scale-110 transition-all opacity-0 group-hover/shelf:opacity-100 -ml-5 border border-gray-100">
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <div ref={shelfRef} className="flex overflow-x-auto pb-4 gap-3 md:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] scroll-smooth relative z-10 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-1">
          {items.map(prod => (
            <div key={prod.id_produk} className="w-37.5 md:w-60 shrink-0 snap-start">
              <ProductCard product={prod} mainCat={mainCat} />
            </div>
          ))}
          
          <div className="w-32.5 md:w-50 shrink-0 snap-start flex items-center justify-center">
             <button onClick={() => { setActiveCategory(getMainCategory(title)); window.scrollTo(0,0); }} className="flex flex-col items-center justify-center gap-2 md:gap-3 text-gray-400 hover:text-brand-gold transition-all p-3 md:p-4 border-2 border-dashed border-gray-200 rounded-2xl md:rounded-3xl w-full h-full md:h-[80%] hover:bg-yellow-50 hover:border-brand-gold/50 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white shadow-sm transition-transform group-hover:scale-110">
                  <i className="fa-solid fa-arrow-right text-base md:text-lg"></i>
                </div>
                <span className="text-[10px] md:text-xs font-bold text-center tracking-wide leading-tight">Lihat Semua<br/>Varian</span>
             </button>
          </div>
        </div>

        <button onClick={() => scroll('right')} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-xl items-center justify-center text-gray-600 hover:text-brand-gold hover:scale-110 transition-all opacity-0 group-hover/shelf:opacity-100 -mr-5 border border-gray-100">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};