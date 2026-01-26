<?php 
$page_title = "Peluang Kemitraan"; 
require_once '../config/database.php';
require_once '../inc/functions.php'; 

// Ambil Data Lengkap (Sudah diupdate di functions.php)
$pricing_table = getPartnershipPricing();

include 'header.php'; 
?>

<!-- 1. HERO SECTION -->
<section class="relative bg-gray-900 py-20 overflow-hidden">
    <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-block py-1 px-3 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-bold tracking-widest uppercase mb-4 animate-pulse">
            Peluang Bisnis 2026
        </span>
        <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Raih Profit Hingga <span class="text-brand-gold">100%++</span><br>
            Bersama Qodha Aromatic
        </h1>
        <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Bergabunglah menjadi mitra Qodha Aromatic. Produk laris, modal terjangkau, dan full support marketing dari pusat.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#analisa" class="px-8 py-3 bg-brand-gold text-gray-900 font-bold rounded-xl hover:bg-white transition shadow-lg transform hover:-translate-y-1">
                <i class="fa-solid fa-calculator mr-2"></i> Cek Analisa Cuan
            </a>
            <a href="#paket" class="px-8 py-3 bg-gray-800 border border-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 transition">
                Lihat Paket Usaha
            </a>
        </div>
    </div>
</section>

<!-- 2. ANALISA KEUNTUNGAN (TABEL LENGKAP SEMUA PRODUK) -->
<section id="analisa" class="py-20 bg-white border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-10">
            <span class="text-green-600 font-bold tracking-widest text-sm uppercase bg-green-50 px-3 py-1 rounded-full">Transparansi Total</span>
            <h2 class="text-3xl font-bold text-gray-900 mt-3">Analisa Margin Keuntungan Lengkap</h2>
            <p class="text-gray-500 mt-2">Data perbandingan harga modal vs harga jual (HET) untuk seluruh produk Qodha.</p>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-gray-200 shadow-xl">
            <table class="w-full text-sm text-left">
                <thead class="bg-gray-900 text-white uppercase font-bold text-xs">
                    <tr>
                        <th class="px-6 py-5 sticky left-0 bg-gray-900 z-10 w-1/3">Nama Produk</th>
                        <th class="px-6 py-5 text-center bg-blue-600">Harga Ecer (HET)</th>
                        <th class="px-6 py-5 text-center bg-gray-800">Modal Reseller</th>
                        <th class="px-6 py-5 text-center bg-gray-800">Modal Agen</th>
                        <th class="px-6 py-5 text-center bg-brand-gold text-gray-900 border-l-4 border-white">
                            Modal Distributor<br><span class="text-[9px] opacity-80">(Termurah)</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-medium text-gray-700">
                    <?php foreach($pricing_table as $row): ?>
                    <tr class="hover:bg-blue-50/20 transition group">
                        <!-- Nama Produk -->
                        <td class="px-6 py-4 font-bold text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-100 group-hover:bg-blue-50/20">
                            <?= $row[0] ?>
                            <?php 
                                // Hitung Profit % Distributor secara real-time
                                $profit = $row[1] - $row[4];
                                $percent = round(($profit / $row[4]) * 100);
                                if($percent >= 100): 
                            ?>
                                <span class="ml-2 text-[9px] text-white bg-red-500 px-2 py-0.5 rounded-full font-bold animate-pulse">HOT <?= $percent ?>%</span>
                            <?php endif; ?>
                        </td>
                        
                        <!-- HET -->
                        <td class="px-6 py-4 text-center font-bold text-blue-600 bg-blue-50/20 text-base">
                            <?= formatRupiah($row[1]) ?>
                        </td>
                        
                        <!-- Reseller -->
                        <td class="px-6 py-4 text-center text-gray-500">
                            <?= formatRupiah($row[2]) ?>
                        </td>
                        
                        <!-- Agen -->
                        <td class="px-6 py-4 text-center text-gray-600">
                            <?= formatRupiah($row[3]) ?>
                        </td>
                        
                        <!-- Distributor (Highlight) -->
                        <td class="px-6 py-4 text-center font-extrabold text-gray-900 bg-yellow-50/50 border-l-4 border-brand-gold relative">
                            <?= formatRupiah($row[4]) ?>
                            <div class="text-[10px] text-green-600 font-bold mt-1 bg-green-100 inline-block px-2 py-0.5 rounded-full">
                                Cuan <?= formatRupiah($row[1] - $row[4]) ?>
                            </div>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        
        <div class="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 italic">
            <i class="fa-solid fa-circle-info"></i>
            <span>Harga yang tertera adalah harga satuan (pcs). Harga dapat berubah sewaktu-waktu.</span>
        </div>
    </div>
</section>

<!-- 3. PILIHAN PAKET (SAMA SEPERTI SEBELUMNYA) -->
<section id="paket" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900">3 Pilihan Paket Kemitraan</h2>
            <p class="text-gray-500 mt-2">Mulai bisnis Anda dengan modal yang terjangkau.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <!-- RESELLER -->
            <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition relative">
                <div class="text-center pb-6 border-b border-gray-100">
                    <h3 class="text-lg font-bold text-gray-500 uppercase tracking-wider">Reseller</h3>
                    <div class="mt-4">
                        <span class="text-3xl font-extrabold text-gray-900">Rp 1 Juta</span>
                        <span class="text-gray-400 text-xs block mt-1">Min. Belanja Awal</span>
                    </div>
                    <div class="mt-2 text-xs font-bold text-gray-500 bg-gray-100 py-1 px-2 rounded inline-block">Atau 1 Karton Mix</div>
                </div>
                <div class="pt-6">
                    <ul class="space-y-3 text-sm text-gray-600">
                        <li class="flex items-start"><i class="fa-solid fa-check text-green-500 mt-1 mr-2"></i> Harga Reseller (Hemat)</li>
                        <li class="flex items-start"><i class="fa-solid fa-check text-green-500 mt-1 mr-2"></i> Soft Copy Katalog</li>
                        <li class="flex items-start"><i class="fa-solid fa-check text-green-500 mt-1 mr-2"></i> Grup Support</li>
                    </ul>
                    <a href="https://wa.me/6281717302223?text=Halo Admin, saya mau daftar RESELLER" class="block w-full py-3 mt-8 border border-gray-300 text-gray-600 font-bold text-center rounded-xl hover:border-gray-900 hover:text-gray-900 transition">Daftar Reseller</a>
                </div>
            </div>

            <!-- AGEN -->
            <div class="bg-white rounded-2xl p-6 border-2 border-brand-green shadow-xl relative transform md:-translate-y-4">
                <div class="absolute top-0 right-0 bg-brand-green text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                <div class="text-center pb-6 border-b border-gray-100">
                    <h3 class="text-lg font-bold text-brand-green uppercase tracking-wider">Agen</h3>
                    <div class="mt-4">
                        <span class="text-3xl font-extrabold text-gray-900">Rp 3 Juta</span>
                        <span class="text-gray-400 text-xs block mt-1">Min. Belanja Awal</span>
                    </div>
                    <div class="mt-2 text-xs font-bold text-green-700 bg-green-50 py-1 px-2 rounded inline-block">Atau 3 Karton Mix</div>
                </div>
                <div class="pt-6">
                    <ul class="space-y-3 text-sm text-gray-600">
                        <li class="flex items-start"><i class="fa-solid fa-check text-green-500 mt-1 mr-2"></i> <strong>Harga Agen</strong></li>
                        <li class="flex items-start"><i class="fa-solid fa-check text-green-500 mt-1 mr-2"></i> <strong>Hard Copy Katalog</strong></li>
                        <li class="flex items-start"><i class="fa-solid fa-check text-green-500 mt-1 mr-2"></i> Free Tester Produk</li>
                    </ul>
                    <a href="https://wa.me/6281717302223?text=Halo Admin, saya mau daftar AGEN" class="block w-full py-3 mt-8 bg-brand-green text-white font-bold text-center rounded-xl hover:bg-emerald-600 transition shadow-lg">Daftar Agen</a>
                </div>
            </div>

            <!-- DISTRIBUTOR -->
            <div class="bg-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl relative text-white">
                <div class="absolute top-0 right-0 bg-brand-gold text-gray-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl">VIP</div>
                <div class="text-center pb-6 border-b border-gray-700">
                    <h3 class="text-lg font-bold text-brand-gold uppercase tracking-wider">Distributor</h3>
                    <div class="mt-4">
                        <span class="text-3xl font-extrabold text-white">Rp 6 Juta</span>
                        <span class="text-gray-400 text-xs block mt-1">Min. Belanja Awal</span>
                    </div>
                    <div class="mt-2 text-xs font-bold text-gray-900 bg-brand-gold py-1 px-2 rounded inline-block">Atau 6 Karton Mix</div>
                </div>
                <div class="pt-6">
                    <ul class="space-y-3 text-sm text-gray-300">
                        <li class="flex items-start"><i class="fa-solid fa-crown text-brand-gold mt-1 mr-2"></i> <strong>Harga Termurah (Margin Max)</strong></li>
                        <li class="flex items-start"><i class="fa-solid fa-check text-brand-gold mt-1 mr-2"></i> <strong>Free Spanduk 3x1 Meter</strong></li>
                        <li class="flex items-start"><i class="fa-solid fa-check text-brand-gold mt-1 mr-2"></i> <strong>Free Akrilik Display</strong></li>
                    </ul>
                    <a href="https://wa.me/6281717302223?text=Halo Admin, saya mau daftar DISTRIBUTOR" class="block w-full py-3 mt-8 bg-brand-gold text-gray-900 font-bold text-center rounded-xl hover:bg-white transition">Daftar Distributor</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 4. KEUNTUNGAN JADI MITRA (CHECKLIST) -->
<section id="keuntungan" class="py-16 bg-white border-t border-gray-200">
    <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-10">
            <h2 class="text-2xl font-bold text-gray-900">Keuntungan Jadi Mitra</h2>
            <p class="text-gray-500">Perbandingan fasilitas dukungan yang Anda dapatkan di setiap level.</p>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="w-full text-sm">
                <thead class="bg-gray-900 text-white">
                    <tr>
                        <th class="px-4 py-3 text-left w-1/3">Fasilitas / Keuntungan</th>
                        <th class="px-4 py-3 text-center w-1/5">Reseller</th>
                        <th class="px-4 py-3 text-center w-1/5">Agen</th>
                        <th class="px-4 py-3 text-center w-1/5 bg-brand-gold text-gray-900">Distributor</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-medium text-gray-700">
                    <?php
                    $icon_yes = '<i class="fa-solid fa-circle-check text-green-500 text-lg"></i>';
                    $icon_no = '<i class="fa-solid fa-minus text-gray-300"></i>';
                    $icon_vip = '<i class="fa-solid fa-crown text-brand-gold text-lg"></i>';
                    
                    $keuntungan = [
                        ['Harga Termurah (Modal)', $icon_yes, $icon_yes, $icon_vip],
                        ['Soft Copy Katalog (PDF)', $icon_yes, $icon_yes, $icon_yes],
                        ['Free Konsultasi (Grup)', $icon_yes, $icon_yes, $icon_yes],
                        ['Hard Copy Katalog (Buku)', $icon_no, $icon_yes, $icon_yes],
                        ['Free Tester Produk', $icon_no, $icon_yes, $icon_yes],
                        ['Spanduk Banner Toko', $icon_no, $icon_yes, $icon_vip],
                        ['Akrilik Display Eksklusif', $icon_no, $icon_no, $icon_vip],
                    ];
                    foreach($keuntungan as $row): ?>
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3 text-left"><?= $row[0] ?></td>
                        <td class="px-4 py-3 text-center"><?= $row[1] ?></td>
                        <td class="px-4 py-3 text-center"><?= $row[2] ?></td>
                        <td class="px-4 py-3 text-center bg-yellow-50/50"><?= $row[3] ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</section>

<!-- 5. WEBGIS PETA -->
<section id="lokasi" class="bg-gray-50 py-16 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900">Jaringan Mitra Kami</h2>
            <p class="text-gray-500">Cek lokasi mitra terdekat di kota Anda</p>
        </div>
        <div class="bg-white p-2 rounded-2xl shadow-lg border border-gray-200 h-[500px] overflow-hidden relative">
            <iframe src="distributor.php" class="w-full h-full border-0 rounded-xl relative z-10" title="Peta Mitra"></iframe>
            <a href="distributor.php" class="absolute top-4 right-4 bg-white shadow-md text-gray-700 px-4 py-2 rounded-lg text-sm font-bold z-20 hover:text-brand-gold transition opacity-0 group-hover:opacity-100">
                <i class="fa-solid fa-expand mr-1"></i> Fullscreen
            </a>
        </div>
    </div>
</section>

<?php include 'footer.php'; ?>