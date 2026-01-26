<?php
// Mencegah akses langsung
if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) { die('Akses ditolak'); }

// --- HELPER FUNCTIONS ---
function formatRupiah($angka){ 
    return "Rp " . number_format($angka,0,',','.'); 
}

// --- DATA PROVIDER ---

function getHeroProducts($conn) {
    // ... (Kode sama seperti sebelumnya) ...
    $data = [];
    $query = "SELECT * FROM tb_produk ORDER BY id_produk DESC LIMIT 5";
    $result = mysqli_query($conn, $query);
    if($result && mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $data[] = [
                'name'  => htmlspecialchars($row['nama_produk']),
                'desc'  => htmlspecialchars($row['deskripsi'] ?? 'Keharuman alami berkualitas premium.'),
                'image' => !empty($row['foto_produk']) ? 'assets/img/'.$row['foto_produk'] : 'https://placehold.co/600x400/f3f4f6/9ca3af?text=Qodha+Product',
                'price' => formatRupiah($row['harga'])
            ];
        }
    } else {
        $data[] = ['name' => 'Produk Qodha', 'desc' => 'Segera hadir.', 'image' => 'https://placehold.co/600x400/f3f4f6/9ca3af?text=Coming+Soon', 'price' => 'Rp 0'];
    }
    return $data;
}

function getBestSellers($conn, $limit = 6) {
    $query = "SELECT * FROM tb_produk ORDER BY RAND() LIMIT $limit";
    return mysqli_query($conn, $query); 
}

// --- DATA STATIC UPDATE (SESUAI KATALOG & PRICE LIST) ---

/**
 * Statistik Produk untuk Halaman Depan
 * Data diambil dari rekapitulasi Katalog 2026
 */
function getProductStats() {
    return [
        ['count' => 95, 'label' => 'Total SKU Produk', 'icon' => 'fa-boxes-stacked', 'highlight' => true],
        ['count' => 26, 'label' => 'Varian Dupa Kerucut', 'icon' => 'fa-fire-flame-curved'],
        ['count' => 19, 'label' => 'Aroma Parfum (6ml)', 'icon' => 'fa-spray-can'],
        ['count' => 17, 'label' => 'Varian Dupa Pelor', 'icon' => 'fa-circle-dot'],
        ['count' => 14, 'label' => 'Varian Bukhur Kayu', 'icon' => 'fa-cloud']
    ];
}

/**
 * Data Harga Kemitraan Lengkap
 * Sesuai Dokumen: Poster - Price List Toko.pdf
 */
function getPartnershipPricing() {
    return [
        // Format: Nama, HET, Modal Reseller, Modal Agen, Modal Distributor
        ['Parfum Roll On (6ml)', 15000, 10000, 8000, 7000],
        ['Parfum Sajadah (250ml)', 45000, 36000, 34000, 32000],
        ['Dupa Pelor (Isi 40)', 20000, 17000, 16000, 14000],
        ['Dupa Kerucut (Isi 50)', 25000, 22000, 21000, 20000],
        ['Dupa Kerucut Mika (Isi 60)', 30000, 26000, 24000, 22000],
        ['Dupa Maharaja (Premium)', 45000, 36000, 34000, 32000],
        ['Hio Stick (Isi 20)', 15000, 11000, 9000, 8000],
        ['Bukhur Pouch (100gr)', 25000, 22000, 21000, 19000],
        ['Bukhur Kaca (50gr)', 60000, 45000, 43000, 40000],
        ['Bukhur Kayu (50gr)', 65000, 45000, 43000, 40000],
        ['Bukhur Travel (20gr)', 40000, 35000, 33000, 30000],
    ];
}

function getHomeCategories() {
    return [
        ['id'=>'bukhur', 'icon'=>'fa-cloud', 'bg'=>'bg-stone-50', 'col'=>'text-stone-600', 'name'=>'Bukhur'],
        ['id'=>'dupa', 'icon'=>'fa-fire-flame-curved', 'bg'=>'bg-orange-50', 'col'=>'text-orange-500', 'name'=>'Dupa'],
        ['id'=>'hio', 'icon'=>'fa-wind', 'bg'=>'bg-red-50', 'col'=>'text-red-500', 'name'=>'Hio Stick'],
        ['id'=>'parfum', 'icon'=>'fa-spray-can', 'bg'=>'bg-purple-50', 'col'=>'text-purple-500', 'name'=>'Parfum']
    ];
}

function getValuePropositions() {
    return [
        ['icon'=>'fa-tags', 'title'=>'Harga Terjangkau', 'desc'=>'Kualitas tinggi, harga bersaing.'],
        ['icon'=>'fa-box-open', 'title'=>'Packaging Mewah', 'desc'=>'Elegan, cocok untuk hadiah.'],
        ['icon'=>'fa-wind', 'title'=>'Aroma Terkenal', 'desc'=>'Pilihan aroma best-seller.'],
        ['icon'=>'fa-mosque', 'title'=>'Bernilai Ibadah', 'desc'=>'Meningkatkan kekhusyukan.'],
        ['icon'=>'fa-hand-holding-dollar', 'title'=>'Harga Termurah', 'desc'=>'Langsung dari produsen.'],
        ['icon'=>'fa-headset', 'title'=>'Support Penjualan', 'desc'=>'Bantuan penuh untuk mitra.'],
        ['icon'=>'fa-photo-film', 'title'=>'Konten Promosi', 'desc'=>'Bank foto & video siap pakai.'],
        ['icon'=>'fa-handshake', 'title'=>'Kekeluargaan', 'desc'=>'Hubungan mitra yang amanah.']
    ];
}

function getGroupedCategories($conn) {
    $main_menus = ['Dupa'=>'dupa', 'Bukhur'=>'bukhur', 'Parfum'=>'parfum', 'Perlengkapan'=>'alat', 'Paket Hemat'=>'paket'];
    $q_cat = mysqli_query($conn, "SELECT * FROM tb_kategori ORDER BY nama_kategori ASC");
    $categories = [];
    if ($q_cat) { while($row = mysqli_fetch_assoc($q_cat)) { $categories[] = $row; } }

    $grouped_data = [];
    foreach($main_menus as $menuLabel => $keyword) {
        $grouped_data[$menuLabel] = [];
        foreach($categories as $cat) {
            $match = false;
            if($menuLabel == 'Perlengkapan') {
                if(stripos($cat['nama_kategori'], 'aksesoris') !== false || stripos($cat['nama_kategori'], 'alat') !== false || stripos($cat['nama_kategori'], 'arang') !== false || stripos($cat['nama_kategori'], 'prapen') !== false) { $match = true; }
            } else { if(stripos($cat['nama_kategori'], $keyword) !== false) $match = true; }
            if($match) $grouped_data[$menuLabel][] = $cat;
        }
    }
    return [$main_menus, $grouped_data];
}

function renderProductCard($prod) {
    $foto = $prod['foto_produk'] ?? '';
    $nama = htmlspecialchars($prod['nama_produk'] ?? 'Produk');
    $harga = formatRupiah($prod['harga'] ?? 0);
    $id = $prod['id_produk'] ?? 0;
    $img = !empty($foto) ? "assets/img/{$foto}" : "https://placehold.co/300x300/f3f4f6/9ca3af?text=Qodha";
    $pesan_wa = "Halo Admin Qodha, saya tertarik dengan produk {$nama}. Apakah stok masih ada?";
    $link_wa = "https://wa.me/628123456789?text=" . urlencode($pesan_wa);
    
    return '
    <div class="flex-shrink-0 w-44 md:w-56 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 group h-full flex flex-col snap-center relative overflow-hidden">
        <div class="aspect-square bg-gray-50 overflow-hidden relative">
            <img src="'.$img.'" alt="'.$nama.'" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
             <div class="absolute top-2 right-2 translate-x-10 group-hover:translate-x-0 transition duration-300">
                <button onclick="copyLink(\''.$id.'\')" class="bg-white text-gray-500 hover:text-brand-gold w-8 h-8 flex items-center justify-center rounded-full shadow-md text-xs" title="Salin Link Produk"><i class="fa-solid fa-link"></i></button>
            </div>
        </div>
        <div class="p-3 flex flex-col flex-grow">
            <h4 class="font-bold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-brand-gold transition leading-snug">'.$nama.'</h4>
            <div class="mt-auto pt-2 flex items-center justify-between">
                <span class="text-brand-gold font-bold text-sm">'.$harga.'</span>
                 <a href="'.$link_wa.'" target="_blank" class="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition shadow-sm"><i class="fa-brands fa-whatsapp text-sm"></i></a>
            </div>
        </div>
    </div>';
}
?>