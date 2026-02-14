<?php
// 1. LOGIKA GROUPING DATA
// Kita kelompokkan data berdasarkan 'kategori' agar bisa menggunakan rowspan
$grouped_pricelist = [];
foreach ($pricelist as $row) {
    $kategori = $row['kategori']; // Pastikan key 'kategori' ada di array hasil query database
    $grouped_pricelist[$kategori][] = $row;
}
?>

<section class="py-12 bg-white border-b border-gray-100">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <i class="fa-solid fa-tag text-blue-600"></i>Harga Eceran Terendah (HET)
            </h1>
            <p class="text-sm text-gray-500">Harga jual kepada konsumen akhir (End User).</p>
        </div>
        
        <div class="overflow-hidden rounded-xl shadow-lg">
            <!-- Tambahkan border-collapse agar border-2 bekerja dengan baik -->
            <table class="w-full text-sm text-left border-collapse border-2 border-gray-300">
                <thead class="bg-gray-800 text-white uppercase font-bold text-xs tracking-wide">
                    <tr>
                        <!-- Kolom No -->
                        <th class="px-4 py-4 w-12 text-center border-2 border-gray-400">No</th>
                        
                        <!-- Kolom Kategori (Baru) -->
                        <th class="px-4 py-4 w-32 text-center border-2 border-gray-400">Kategori</th>
                        
                        <!-- Kolom Nama Produk -->
                        <th class="px-4 py-4 border-2 border-gray-400">Nama Produk</th>
                        
                        <!-- Kolom Isi (Pengganti Kemasan) -->
                        <th class="px-4 py-4 text-center w-24 border-2 border-gray-400">Isi</th>
                        
                        <!-- Kolom Qty2 (Baru) -->
                        <th class="px-4 py-4 text-center w-16 border-2 border-gray-400">Qty</th>
                        
                        <!-- Kolom Harga -->
                        <th class="px-4 py-4 text-right border-2 border-gray-400">Harga Satuan</th>
                    </tr>
                </thead>
                <tbody class="bg-white text-gray-700">
                    <?php 
                    $no = 1; // Nomor urut berdasarkan Kategori
                    foreach($grouped_pricelist as $kategori => $items): 
                        // Hitung jumlah item dalam kategori ini untuk nilai rowspan
                        $rowspan = count($items);
                        
                        foreach($items as $index => $row): 
                    ?>
                    <tr class="hover:bg-blue-50/30 transition">
                        
                        <?php if($index === 0): // Cek jika ini baris pertama dalam kategori tersebut ?>
                            <!-- Kolom No (Merged) -->
                            <td class="px-4 py-3 text-center font-bold text-gray-900 border-2 border-gray-300 bg-gray-50 align-middle" rowspan="<?= $rowspan ?>">
                                <?= $no++ ?>
                            </td>
                            
                            <!-- Kolom Kategori (Merged) -->
                            <td class="px-4 py-3 text-center font-bold text-blue-800 border-2 border-gray-300 bg-blue-50/50 align-middle uppercase tracking-wider text-xs" rowspan="<?= $rowspan ?>">
                                <?= $kategori ?>
                            </td>
                        <?php endif; ?>

                        <!-- Kolom Nama Produk -->
                        <td class="px-4 py-3 font-medium text-gray-800 border-2 border-gray-300">
                            <?= $row['nama_produk'] ?>
                        </td>

                        <!-- Kolom Isi -->
                        <td class="px-4 py-3 text-center border-2 border-gray-300 font-semibold bg-yellow-50/20">
                            <?= $row['isi'] ?>
                        </td>

                        <!-- Kolom Qty 2 -->
                        <td class="px-4 py-3 text-center border-2 border-gray-300 text-gray-500">
                            <?= $row['qty2'] ?>
                        </td>

                        <!-- Kolom Harga -->
                        <td class="px-4 py-3 text-right font-bold text-blue-600 border-2 border-gray-300 bg-gray-50/30">
                            <?= formatRupiah($row['harga_het']) ?>
                        </td>

                    </tr>
                        <?php endforeach; ?>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</section>