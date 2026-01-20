<?php 
require_once 'layout/header.php'; 
require_once 'layout/sidebar.php'; 
require_once '../config/database.php'; 

$query = "SELECT * FROM tb_kategori ORDER BY id_kategori ASC";
$result = mysqli_query($conn, $query);
?>

<div class="flex justify-between items-center mb-6">
    <div>
        <h1 class="text-2xl font-bold text-gray-800">Master Kategori</h1>
        <p class="text-gray-500 text-sm">Atur pengelompokan produk di sini.</p>
    </div>
    <a href="kategori_form.php" class="bg-brand-dark text-white px-6 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2">
        <i class="fa-solid fa-plus"></i> Tambah Kategori
    </a>
</div>

<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full md:w-1/2">
    <table class="w-full text-left border-collapse">
        <thead>
            <tr class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-100">
                <th class="p-4 font-bold w-16 text-center">ID</th>
                <th class="p-4 font-bold">Nama Kategori</th>
                <th class="p-4 font-bold text-center w-32">Aksi</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-sm">
            <?php while($row = mysqli_fetch_assoc($result)): ?>
            <tr class="hover:bg-gray-50 transition">
                <td class="p-4 text-center text-gray-500">#<?= $row['id_kategori'] ?></td>
                <td class="p-4 font-bold text-gray-800"><?= $row['nama_kategori'] ?></td>
                <td class="p-4 text-center">
                    <div class="flex justify-center gap-2">
                        <a href="kategori_form.php?id=<?= $row['id_kategori'] ?>" class="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded hover:bg-brand-gold hover:text-white transition">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="kategori_proses.php?act=delete&id=<?= $row['id_kategori'] ?>" class="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded hover:bg-red-500 hover:text-white transition" onclick="return confirm('Hapus kategori ini? Produk di dalamnya mungkin akan kehilangan kategori.')">
                            <i class="fa-solid fa-trash"></i>
                        </a>
                    </div>
                </td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</div>

<?php require_once 'layout/footer.php'; ?>