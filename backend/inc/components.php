<?php
// Mencegah akses langsung
if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) { die('Akses ditolak'); }

/**
 * Render Card Produk Standar
 * @param array $prod Data produk dari database
 */
function renderProductCard($prod) {
    // Tentukan path gambar
    $img = !empty($prod['foto_produk']) ? 'assets/img/'.$prod['foto_produk'] : 'assets/img/marker_qodha.png';
    $harga = "Rp " . number_format($prod['harga'],0,',','.');
    
    // HTML Card
    return '
    <div class="flex-shrink-0 w-48 snap-center group">
        <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col hover:border-brand-gold">
            <div class="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                <img src="'.$img.'" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="'.$prod['nama_produk'].'">
                <div class="absolute top-2 left-2 bg-brand-gold text-white text-[9px] px-2 py-1 rounded font-bold uppercase shadow-sm">Best Seller</div>
                
                <!-- Overlay Button -->
                <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href="[https://wa.me/6281717302223?text=Order](https://wa.me/6281717302223?text=Order) '.$prod['nama_produk'].'" target="_blank" class="bg-brand-green text-white px-3 py-1.5 rounded text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition">
                        Pesan
                    </a>
                </div>
            </div>
            <div class="p-3 flex flex-col flex-1">
                <h3 class="text-sm font-bold text-gray-800 line-clamp-2 mb-1 leading-snug" title="'.$prod['nama_produk'].'">
                    '.$prod['nama_produk'].'
                </h3>
                <div class="mt-auto pt-2 flex justify-between items-center">
                    <span class="text-sm font-bold text-brand-gold">'.$harga.'</span>
                    <button class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-brand-green hover:text-white transition text-gray-400">
                        <i class="fa-solid fa-cart-plus text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>';
}
?>