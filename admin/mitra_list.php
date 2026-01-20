<?php 
require_once 'layout/header.php'; 
require_once 'layout/sidebar.php'; 
require_once '../config/database.php'; 

// Query mengambil data terbaru
$query = "SELECT * FROM tb_mitra ORDER BY id_mitra DESC";
$result = mysqli_query($conn, $query);
?>

<div class="flex justify-between items-center mb-6">
    <div>
        <h1 class="text-2xl font-bold text-gray-800">Data Mitra Sebaran</h1>
        <p class="text-gray-500 text-sm">Kelola lokasi agen dan reseller Qodha.</p>
    </div>
    <a href="mitra_form.php" class="bg-brand-dark text-white px-6 py-2.5 rounded-lg font-bold hover:bg-gray-700 transition shadow-lg flex items-center gap-2">
        <i class="fa-solid fa-map-pin"></i> Tambah Mitra Baru
    </a>
</div>

<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-100">
                    <th class="p-4 font-bold">Mitra</th>
                    <th class="p-4 font-bold">Jenis</th>
                    <th class="p-4 font-bold">Lokasi</th>
                    <th class="p-4 font-bold">Terdaftar</th> <th class="p-4 font-bold text-center">Aksi</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
                <?php while($row = mysqli_fetch_assoc($result)): 
                    // Warna Badge Jenis Mitra
                    $badgeColor = match($row['jenis_mitra'] ?? 'Reseller') {
                        'Distributor' => 'bg-purple-100 text-purple-700',
                        'Agen' => 'bg-blue-100 text-blue-700',
                        'Reseller' => 'bg-green-100 text-green-700',
                        default => 'bg-gray-100 text-gray-600'
                    };
                    
                    // Format Tanggal
                    $tanggal = date('d M Y', strtotime($row['created_at']));
                ?>
                <tr class="hover:bg-gray-50 transition">
                    <td class="p-4">
                        <p class="font-bold text-gray-800"><?= $row['nama_toko'] ?></p>
                        <p class="text-xs text-gray-500 mb-1"><i class="fa-solid fa-user mr-1"></i> <?= $row['pemilik'] ?></p>
                        <a href="https://wa.me/<?= $row['no_hp'] ?>" target="_blank" class="text-green-600 text-xs font-bold hover:underline">
                            <i class="fa-brands fa-whatsapp"></i> <?= $row['no_hp'] ?>
                        </a>
                    </td>
                    <td class="p-4">
                        <span class="<?= $badgeColor ?> px-3 py-1 rounded-full text-xs font-bold uppercase">
                            <?= $row['jenis_mitra'] ?>
                        </span>
                    </td>
                    <td class="p-4">
                        <div class="text-xs text-gray-600 mb-1 line-clamp-1 w-48" title="<?= $row['alamat'] ?>">
                            <?= $row['alamat'] ?>
                        </div>
                        <a href="http://maps.google.com/maps?q=<?= $row['latitude'] ?>,<?= $row['longitude'] ?>" target="_blank" class="text-blue-500 hover:text-blue-700 text-xs font-bold border border-blue-200 px-2 py-1 rounded inline-block">
                            <i class="fa-solid fa-map-location-dot"></i> Maps
                        </a>
                    </td>
                    <td class="p-4 text-xs text-gray-500">
                        <?= $tanggal ?>
                    </td>
                    <td class="p-4 text-center">
                        <div class="flex justify-center gap-2">
                            <a href="mitra_form.php?id=<?= $row['id_mitra'] ?>" class="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded hover:bg-brand-gold hover:text-white transition">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </a>
                            <a href="mitra_proses.php?act=delete&id=<?= $row['id_mitra'] ?>" class="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded hover:bg-red-500 hover:text-white transition" onclick="return confirm('Hapus data mitra ini?')">
                                <i class="fa-solid fa-trash"></i>
                            </a>
                        </div>
                    </td>
                </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </div>
</div>

<?php require_once 'layout/footer.php'; ?>