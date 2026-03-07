<?php 
require_once 'layout/header.php'; 
require_once 'layout/sidebar.php'; 
require_once '../config/database.php'; 

$is_edit = false;
$data = null;

if(isset($_GET['id'])) {
    $id = $_GET['id'];
    $q = mysqli_query($conn, "SELECT * FROM tb_kategori WHERE id_kategori = '$id'");
    if(mysqli_num_rows($q) > 0) {
        $is_edit = true;
        $data = mysqli_fetch_assoc($q);
    }
}
?>

<div class="flex items-center gap-4 mb-6">
    <a href="kategori_list.php" class="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 transition">
        <i class="fa-solid fa-arrow-left"></i>
    </a>
    <h1 class="text-2xl font-bold text-gray-800"><?= $is_edit ? 'Edit Kategori' : 'Tambah Kategori Baru' ?></h1>
</div>

<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full md:w-1/2">
    <form action="kategori_proses.php" method="POST">
        <input type="hidden" name="id_kategori" value="<?= $data['id_kategori'] ?? '' ?>">
        <input type="hidden" name="act" value="<?= $is_edit ? 'update' : 'insert' ?>">

        <div class="mb-6">
            <label class="block text-sm font-bold text-gray-700 mb-2">Nama Kategori</label>
            <input type="text" name="nama_kategori" value="<?= $data['nama_kategori'] ?? '' ?>" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none transition" required placeholder="Contoh: Paket Hemat">
        </div>

        <button type="submit" class="w-full py-3 bg-brand-gold text-gray-900 font-bold rounded-xl shadow-lg hover:bg-amber-500 transition">
            <i class="fa-solid fa-save mr-2"></i> SIMPAN DATA
        </button>
    </form>
</div>

<?php require_once 'layout/footer.php'; ?>