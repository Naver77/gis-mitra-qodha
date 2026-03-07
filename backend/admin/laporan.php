<?php 
require_once 'layout/header.php'; 
require_once 'layout/sidebar.php'; 
require_once '../config/database.php'; 

// Analisis 1: Top 5 Produk Terpopuler (Berdasarkan Klik)
$q_top_produk = "SELECT p.nama_produk, COUNT(l.id_log) as total_klik 
                 FROM tb_log_aktivitas l
                 JOIN tb_produk p ON l.id_ref = p.id_produk
                 WHERE l.tipe_log = 'klik_produk'
                 GROUP BY l.id_ref
                 ORDER BY total_klik DESC LIMIT 5";
$r_top_produk = mysqli_query($conn, $q_top_produk);

// Analisis 2: Top 5 Mitra Paling Dicari
$q_top_mitra = "SELECT m.nama_toko, m.kota, COUNT(l.id_log) as total_klik 
                FROM tb_log_aktivitas l
                JOIN tb_mitra m ON l.id_ref = m.id_mitra
                WHERE l.tipe_log = 'klik_mitra'
                GROUP BY l.id_ref
                ORDER BY total_klik DESC LIMIT 5";
// Catatan: Pastikan logic join sesuai jika ada perubahan struktur tabel
// Jika tabel mitra pakai 'alamat' bukan 'kota', sesuaikan query-nya.
?>

<div class="flex justify-between items-center mb-6">
    <div>
        <h1 class="text-2xl font-bold text-gray-800">Laporan Analisis Performa</h1>
        <p class="text-gray-500 text-sm">Insight perilaku pengunjung bulan ini.</p>
    </div>
    <button onclick="window.print()" class="bg-brand-dark text-white px-6 py-2.5 rounded-lg font-bold hover:bg-gray-700 transition shadow-lg flex items-center gap-2">
        <i class="fa-solid fa-print"></i> Cetak Laporan (PDF)
    </button>
</div>

<style>
    @media print {
        aside, header, button { display: none !important; }
        body { background: white; }
        .print-area { width: 100%; }
        /* Reset colors for printing */
        .bg-white { background: none !important; box-shadow: none !important; border: 1px solid #ddd !important; }
    }
</style>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 print-area">
    
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fa-solid fa-fire text-orange-500"></i> Produk Paling Diminati
        </h3>
        <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                    <th class="p-3">Nama Produk</th>
                    <th class="p-3 text-right">Interaksi (Klik)</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                <?php 
                if(mysqli_num_rows($r_top_produk) > 0) {
                    while($row = mysqli_fetch_assoc($r_top_produk)): ?>
                    <tr>
                        <td class="p-3 font-medium"><?= $row['nama_produk'] ?></td>
                        <td class="p-3 text-right font-bold text-brand-gold"><?= $row['total_klik'] ?></td>
                    </tr>
                    <?php endwhile; 
                } else {
                    echo "<tr><td colspan='2' class='p-4 text-center text-gray-400'>Belum ada data interaksi.</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fa-solid fa-map-location-dot text-blue-500"></i> Mitra Paling Dicari
        </h3>
        <div class="p-8 text-center border-2 border-dashed border-gray-100 rounded-lg">
            <p class="text-gray-400 text-sm">Data akan muncul setelah ada interaksi user di peta.</p>
        </div>
    </div>

</div>

<div class="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 print:hidden">
    <i class="fa-solid fa-info-circle mr-2"></i> 
    <strong>Tips Profesional:</strong> Gunakan data ini untuk menentukan stok produk mana yang harus diperbanyak atau wilayah mana yang butuh promosi lebih gencar.
</div>

<?php require_once 'layout/footer.php'; ?>