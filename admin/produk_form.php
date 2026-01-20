<?php 
require_once 'layout/header.php'; 
require_once 'layout/sidebar.php'; 
require_once '../config/database.php'; 

// Cek Mode: Tambah atau Edit?
$is_edit = false;
$data = null;

if(isset($_GET['id'])) {
    $id = $_GET['id'];
    $q = mysqli_query($conn, "SELECT * FROM tb_produk WHERE id_produk = '$id'");
    if(mysqli_num_rows($q) > 0) {
        $is_edit = true;
        $data = mysqli_fetch_assoc($q);
    }
}

// Ambil Data Kategori untuk Dropdown
$cat_q = mysqli_query($conn, "SELECT * FROM tb_kategori ORDER BY nama_kategori ASC");
?>

<div class="flex items-center gap-4 mb-6">
    <a href="produk_list.php" class="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 transition">
        <i class="fa-solid fa-arrow-left"></i>
    </a>
    <h1 class="text-2xl font-bold text-gray-800"><?= $is_edit ? 'Edit Produk' : 'Tambah Produk Baru' ?></h1>
</div>

<form action="produk_proses.php" method="POST" enctype="multipart/form-data" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    <input type="hidden" name="id_produk" value="<?= $data['id_produk'] ?? '' ?>">
    <input type="hidden" name="foto_lama" value="<?= $data['foto_produk'] ?? '' ?>">
    <input type="hidden" name="act" value="<?= $is_edit ? 'update' : 'insert' ?>">

    <div class="lg:col-span-2 space-y-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 class="font-bold text-gray-800 mb-4 border-b pb-2">Informasi Dasar</h3>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Nama Produk</label>
                    <input type="text" name="nama_produk" value="<?= $data['nama_produk'] ?? '' ?>" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition" required placeholder="Contoh: Dupa Kerucut Jasmine">
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Harga (Rp)</label>
                        <input type="number" name="harga" value="<?= $data['harga'] ?? '' ?>" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" required placeholder="15000">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
                        <select name="id_kategori" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" required>
                            <option value="">-- Pilih Kategori --</option>
                            <?php while($c = mysqli_fetch_assoc($cat_q)): ?>
                                <option value="<?= $c['id_kategori'] ?>" <?= ($data && $data['id_kategori'] == $c['id_kategori']) ? 'selected' : '' ?>>
                                    <?= $c['nama_kategori'] ?>
                                </option>
                            <?php endwhile; ?>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Deskripsi</label>
                    <textarea name="deskripsi" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" placeholder="Jelaskan detail produk..."><?= $data['deskripsi'] ?? '' ?></textarea>
                </div>
            </div>
        </div>
    </div>

    <div class="space-y-6">
        
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 class="font-bold text-gray-800 mb-4 border-b pb-2">Media & Atribut</h3>
            
            <div class="mb-4">
                <label class="block text-sm font-bold text-gray-700 mb-2">Foto Produk</label>
                
                <div class="w-full aspect-[4/5] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group mb-3">
                    <img id="imgPreview" src="<?= !empty($data['foto_produk']) ? '../public/assets/img/'.$data['foto_produk'] : '../public/assets/img/marker_qodha.png' ?>" class="w-full h-full object-cover">
                    
                    <div class="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs">
                        Klik untuk ganti
                    </div>
                    <input type="file" name="foto" id="fotoInput" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onchange="previewImage(event)">
                </div>
                <p class="text-xs text-gray-500">Format: JPG, PNG, WEBP. Maks 2MB.</p>
            </div>

            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Rekomendasi Gender</label>
                <div class="space-y-2">
                    <label class="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="radio" name="gender" value="pria" class="text-brand-gold focus:ring-brand-gold" <?= ($data && $data['gender']=='pria') ? 'checked' : '' ?>>
                        <span class="text-sm"><i class="fa-solid fa-mars text-blue-600 w-5"></i> Pria</span>
                    </label>
                    <label class="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="radio" name="gender" value="wanita" class="text-brand-gold focus:ring-brand-gold" <?= ($data && $data['gender']=='wanita') ? 'checked' : '' ?>>
                        <span class="text-sm"><i class="fa-solid fa-venus text-pink-500 w-5"></i> Wanita</span>
                    </label>
                    <label class="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="radio" name="gender" value="unisex" class="text-brand-gold focus:ring-brand-gold" <?= (!$data || $data['gender']=='unisex') ? 'checked' : '' ?>>
                        <span class="text-sm"><i class="fa-solid fa-venus-mars text-purple-600 w-5"></i> Unisex</span>
                    </label>
                </div>
            </div>
        </div>

        <button type="submit" class="w-full py-3 bg-brand-gold text-gray-900 font-bold rounded-xl shadow-lg hover:bg-amber-500 transition transform active:scale-95">
            <i class="fa-solid fa-save mr-2"></i> SIMPAN PRODUK
        </button>
    </div>

</form>

<script>
    // Script Sederhana untuk Preview Gambar
    function previewImage(event) {
        const reader = new FileReader();
        reader.onload = function(){
            const output = document.getElementById('imgPreview');
            output.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
</script>

<?php require_once 'layout/footer.php'; ?>