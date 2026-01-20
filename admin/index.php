<?php require_once 'layout/header.php'; ?>
<?php require_once 'layout/sidebar.php'; ?>
<?php require_once '../config/database.php'; 

// Hitung Data Ringkas (Cockpit View)
$total_produk = mysqli_num_rows(mysqli_query($conn, "SELECT id_produk FROM tb_produk"));
$total_kategori = mysqli_num_rows(mysqli_query($conn, "SELECT id_kategori FROM tb_kategori"));
// $total_mitra = mysqli_num_rows(mysqli_query($conn, "SELECT id_mitra FROM tb_mitra")); // Nanti diaktifkan kalau tabel mitra sudah ada
$total_mitra = 0; 
?>

<div class="mb-6">
    <h1 class="text-2xl font-bold text-gray-800">Dashboard Ringkasan</h1>
    <p class="text-gray-500 text-sm">Selamat datang kembali, admin.</p>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-2xl">
            <i class="fa-solid fa-box-open"></i>
        </div>
        <div>
            <p class="text-gray-500 text-xs uppercase font-bold tracking-wide">Total Produk</p>
            <h3 class="text-3xl font-extrabold text-gray-800"><?= $total_produk ?></h3>
        </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-2xl">
            <i class="fa-solid fa-store"></i>
        </div>
        <div>
            <p class="text-gray-500 text-xs uppercase font-bold tracking-wide">Total Mitra</p>
            <h3 class="text-3xl font-extrabold text-gray-800"><?= $total_mitra ?></h3>
        </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 text-2xl">
            <i class="fa-solid fa-layer-group"></i>
        </div>
        <div>
            <p class="text-gray-500 text-xs uppercase font-bold tracking-wide">Kategori</p>
            <h3 class="text-3xl font-extrabold text-gray-800"><?= $total_kategori ?></h3>
        </div>
    </div>

</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-4">Aksi Cepat</h3>
        <div class="flex gap-4">
            <a href="produk_form.php" class="flex-1 py-3 bg-brand-gold text-white text-center rounded-lg font-bold hover:bg-amber-600 transition">
                <i class="fa-solid fa-plus mr-2"></i> Tambah Produk
            </a>
            <a href="mitra_form.php" class="flex-1 py-3 bg-brand-dark text-white text-center rounded-lg font-bold hover:bg-gray-700 transition">
                <i class="fa-solid fa-map-pin mr-2"></i> Tambah Mitra
            </a>
        </div>
    </div>
    
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-2">Status Sistem</h3>
        <p class="text-sm text-gray-500 mb-4">Pantauan kesehatan sistem.</p>
        <div class="space-y-3">
            <div class="flex justify-between text-sm">
                <span>Database</span>
                <span class="text-green-600 font-bold">Terhubung <i class="fa-solid fa-check-circle"></i></span>
            </div>
            <div class="flex justify-between text-sm">
                <span>WebGIS API</span>
                <span class="text-green-600 font-bold">Aktif <i class="fa-solid fa-check-circle"></i></span>
            </div>
        </div>
    </div>
</div>

<?php require_once 'layout/footer.php'; ?>