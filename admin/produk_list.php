<?php 
require_once 'layout/header.php'; 
require_once 'layout/sidebar.php'; 
require_once '../config/database.php'; 

// Query Data Produk + Kategori
$query = "SELECT p.*, k.nama_kategori 
          FROM tb_produk p 
          LEFT JOIN tb_kategori k ON p.id_kategori = k.id_kategori 
          ORDER BY p.id_produk DESC";
$result = mysqli_query($conn, $query);
?>

<div class="flex justify-between items-center mb-6">
    <div>
        <h1 class="text-2xl font-bold text-gray-800">Manajemen Produk</h1>
        <p class="text-gray-500 text-sm">Kelola katalog produk Qodha Aromatic.</p>
    </div>
    <a href="produk_form.php" class="bg-brand-gold text-white px-6 py-2.5 rounded-lg font-bold hover:bg-amber-600 transition shadow-lg flex items-center gap-2">
        <i class="fa-solid fa-plus"></i> Tambah Produk
    </a>
</div>

<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-100">
                    <th class="p-4 font-bold">Produk</th>
                    <th class="p-4 font-bold">Kategori</th>
                    <th class="p-4 font-bold">Gender</th>
                    <th class="p-4 font-bold">Harga</th>
                    <th class="p-4 font-bold text-center">Aksi</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
                <?php while($row = mysqli_fetch_assoc($result)): 
                    $img = !empty($row['foto_produk']) ? '../public/assets/img/'.$row['foto_produk'] : '../public/assets/img/marker_qodha.png';
                ?>
                <tr class="hover:bg-gray-50 transition">
                    <td class="p-4">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                                <img src="<?= $img ?>" class="w-full h-full object-cover">
                            </div>
                            <div>
                                <p class="font-bold text-gray-800"><?= $row['nama_produk'] ?></p>
                                <p class="text-xs text-gray-400">ID: #<?= $row['id_produk'] ?></p>
                            </div>
                        </div>
                    </td>
                    <td class="p-4">
                        <span class="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                            <?= $row['nama_kategori'] ?? 'Tanpa Kategori' ?>
                        </span>
                    </td>
                    <td class="p-4 capitalize text-gray-600"><?= $row['gender'] ?></td>
                    <td class="p-4 font-bold text-brand-gold">Rp <?= number_format($row['harga'],0,',','.') ?></td>
                    <td class="p-4 text-center">
                        <div class="flex justify-center gap-2">
                            <a href="produk_form.php?id=<?= $row['id_produk'] ?>" class="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded hover:bg-brand-gold hover:text-white transition" title="Edit">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </a>
                            <a href="produk_proses.php?act=delete&id=<?= $row['id_produk'] ?>&img=<?= $row['foto_produk'] ?>" class="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded hover:bg-red-500 hover:text-white transition" onclick="return confirm('Yakin ingin menghapus produk ini?')" title="Hapus">
                                <i class="fa-solid fa-trash"></i>
                            </a>
                        </div>
                    </td>
                </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </div>
    
    <?php if(mysqli_num_rows($result) == 0): ?>
        <div class="p-8 text-center text-gray-400">Belum ada data produk.</div>
    <?php endif; ?>
</div>

<?php require_once 'layout/footer.php'; ?>