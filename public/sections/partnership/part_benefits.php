<section id="keuntungan" class="py-20 bg-gray-50 border-t border-gray-200">
    <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-10">
            <h1 class="text-4xl font-bold text-gray-900">
                Keuntungan Jadi Mitra <span class="text-brand-gold">Qodha Aromatic</span>
            </h1>
            <p class="text-gray-500 mt-2">Detail lengkap apa saja yang Anda dapatkan di setiap level.</p>
        </div>
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <table class="w-full text-sm border-collapse">
                <thead class="bg-gray-900 text-white">
                    <tr>
                        <th class="px-4 py-4 text-center w-16 font-bold tracking-wide border-r border-gray-700">No</th>
                        <th class="px-6 py-4 text-left w-1/2 font-bold tracking-wide border-r border-gray-700">Fasilitas / Keuntungan</th>
                        <th class="px-4 py-4 text-center w-1/6 font-bold tracking-wide border-r border-gray-700">Reseller</th>
                        <th class="px-4 py-4 text-center w-1/6 font-bold tracking-wide border-r border-gray-700">Agen</th>
                        <th class="px-4 py-4 text-center w-1/6 bg-brand-gold text-gray-900 font-bold tracking-wide">Distributor</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-medium text-gray-700">
                    <?php
                    $icon_yes = '<i class="fa-solid fa-circle-check text-green-500 text-lg"></i>';
                    $icon_no = '<i class="fa-solid fa-minus text-gray-300"></i>';
                    $icon_vip = '<i class="fa-solid fa-crown text-brand-gold text-lg drop-shadow-sm"></i>';
                    
                    $keuntungan = [
                        ['Mendapatkan harga termurah di kategori kemitraan', $icon_yes, $icon_yes, $icon_vip],
                        ['Mendapatkan Banner 3 x 1 m (Free Desain, Cetak & Kirim)', $icon_no, $icon_yes, $icon_yes],
                        ['Jaminan Kemudahan Bermitra', $icon_no, $icon_no, $icon_vip],
                        ['Mendapatkan Soft Copy Katalog', $icon_yes, $icon_yes, $icon_yes],
                        ['Mendapatkan Hard Copy Katalog', $icon_no, $icon_no, $icon_yes],
                        ['Free Konsultasi Advertising, Content Marketing & Sosial Media', $icon_yes, $icon_yes, $icon_yes],
                        ['Free Konsultasi Manajemen & Training', $icon_no, $icon_no, $icon_vip],
                        ['Free Produk Tester', $icon_no, $icon_no, $icon_yes],
                        ['Free Sample Produk Terbaru', $icon_no, $icon_yes, $icon_yes],
                        ['Program Promo Kemitraan', $icon_yes, $icon_yes, $icon_vip],
                        ['Mendapatkan Akrilik display parfum 6ml & 35ml jika ambil produk parfum.', $icon_no, $icon_no, $icon_yes],
                        ['Full Support : ( Katalog lengkap GDrive, Media Desain&video produk promosi, Pengecekan update stok, Info produk terbaru )', $icon_yes, $icon_yes, $icon_vip],
                    ];
                    foreach($keuntungan as $index => $row): ?>
                    <tr class="hover:bg-gray-50 transition <?= $index % 2 == 0 ? 'bg-white' : 'bg-gray-50/30' ?>">
                        <td class="px-4 py-4 text-center font-medium text-gray-500 border-r border-gray-100"><?= $index + 1 ?></td>
                        <td class="px-6 py-4 text-left font-medium text-gray-800 border-r border-gray-100"><?= $row[0] ?></td>
                        <td class="px-4 py-4 text-center border-r border-gray-100"><?= $row[1] ?></td>
                        <td class="px-4 py-4 text-center border-r border-gray-100"><?= $row[2] ?></td>
                        <td class="px-4 py-4 text-center bg-yellow-50/30 border-l border-yellow-100"><?= $row[3] ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</section>