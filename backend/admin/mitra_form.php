<?php 
require_once 'layout/header.php'; 
require_once 'layout/sidebar.php'; 
require_once '../config/database.php'; 

// Inisialisasi Variabel
$is_edit = false;
$data = null;

// Default Lokasi (Pusat Jakarta/Indonesia) - Jika Tambah Baru
$lat = -6.200000;
$lng = 106.816666;

// Cek Mode Edit
if(isset($_GET['id'])) {
    $id = $_GET['id'];
    $q = mysqli_query($conn, "SELECT * FROM tb_mitra WHERE id_mitra = '$id'");
    if(mysqli_num_rows($q) > 0) {
        $is_edit = true;
        $data = mysqli_fetch_assoc($q);
        // Jika edit, ambil koordinat dari database
        $lat = $data['latitude'];
        $lng = $data['longitude'];
    }
}
?>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<div class="flex items-center gap-4 mb-6">
    <a href="mitra_list.php" class="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 transition">
        <i class="fa-solid fa-arrow-left"></i>
    </a>
    <div>
        <h1 class="text-2xl font-bold text-gray-800"><?= $is_edit ? 'Edit Data Mitra' : 'Tambah Mitra Baru' ?></h1>
        <p class="text-sm text-gray-500">Tentukan titik lokasi mitra pada peta.</p>
    </div>
</div>

<form action="mitra_proses.php" method="POST" class="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
    <input type="hidden" name="id_mitra" value="<?= $data['id_mitra'] ?? '' ?>">
    <input type="hidden" name="act" value="<?= $is_edit ? 'update' : 'insert' ?>">

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
        <h3 class="font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
            <i class="fa-solid fa-id-card text-brand-gold"></i> Informasi Mitra
        </h3>
        
        <div class="space-y-4">
            <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Toko / Usaha</label>
                <input type="text" name="nama_toko" value="<?= $data['nama_toko'] ?? '' ?>" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none transition" required placeholder="Contoh: Agen Qodha Depok">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Pemilik</label>
                    <input type="text" name="pemilik" value="<?= $data['pemilik'] ?? '' ?>" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" required placeholder="Bpk. Fulan">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Jenis Kemitraan</label>
                    <select name="jenis_mitra" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none bg-white">
                        <option value="Reseller" <?= ($data && $data['jenis_mitra']=='Reseller')?'selected':'' ?>>Reseller</option>
                        <option value="Agen" <?= ($data && $data['jenis_mitra']=='Agen')?'selected':'' ?>>Agen</option>
                        <option value="Distributor" <?= ($data && $data['jenis_mitra']=='Distributor')?'selected':'' ?>>Distributor</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">WhatsApp Aktif</label>
                <div class="relative">
                    <span class="absolute left-3 top-2 text-gray-500 font-bold text-sm"><i class="fa-brands fa-whatsapp text-green-500"></i></span>
                    <input type="number" name="no_hp" value="<?= $data['no_hp'] ?? '' ?>" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" required placeholder="628123456789">
                </div>
                <p class="text-[10px] text-gray-400 mt-1 ml-1">*Gunakan format 62 di awal (Contoh: 62812...)</p>
            </div>

            <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Alamat Lengkap</label>
                <textarea name="alamat" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" placeholder="Jalan, Nomor Rumah, RT/RW, Kelurahan, Kecamatan..."><?= $data['alamat'] ?? '' ?></textarea>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
            <i class="fa-solid fa-map-location-dot text-brand-green"></i> Titik Lokasi (Geser Pin)
        </h3>
        
        <div class="mb-4 relative">
            <div id="mapInput" class="w-full h-80 rounded-lg border-2 border-gray-200 z-0 shadow-inner"></div>
            
            <div class="grid grid-cols-2 gap-4 mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                    <label class="text-[10px] font-bold text-gray-400 uppercase">Latitude</label>
                    <input type="text" name="latitude" id="lat" value="<?= $lat ?>" class="w-full bg-transparent border-none p-0 text-sm font-mono font-bold text-gray-700 focus:ring-0" readonly>
                </div>
                <div>
                    <label class="text-[10px] font-bold text-gray-400 uppercase">Longitude</label>
                    <input type="text" name="longitude" id="lng" value="<?= $lng ?>" class="w-full bg-transparent border-none p-0 text-sm font-mono font-bold text-gray-700 focus:ring-0" readonly>
                </div>
            </div>
        </div>

        <button type="submit" class="w-full py-3 bg-brand-gold text-white font-bold rounded-xl shadow-lg hover:bg-amber-500 transition transform active:scale-95 flex justify-center items-center gap-2">
            <i class="fa-solid fa-save"></i> SIMPAN DATA MITRA
        </button>
    </div>
</form>

<script>
    // 1. Inisialisasi Peta
    var map = L.map('mapInput').setView([<?= $lat ?>, <?= $lng ?>], 13);

    // 2. Tile Layer (Rupa Peta)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // 3. Tambahkan Marker (Draggable = Bisa Digeser)
    var marker = L.marker([<?= $lat ?>, <?= $lng ?>], {
        draggable: true,
        autoPan: true
    }).addTo(map);

    // Tambahkan Popup Instruksi
    marker.bindPopup("<b>Geser Saya!</b><br>Letakkan di lokasi toko.").openPopup();

    // 4. Event Listener: Saat Marker Digeser (Drag End)
    marker.on('dragend', function(e) {
        var coord = e.target.getLatLng();
        document.getElementById('lat').value = coord.lat.toFixed(6);
        document.getElementById('lng').value = coord.lng.toFixed(6);
    });

    // 5. Fitur Klik Peta (Pindah Marker ke titik klik)
    map.on('click', function(e) {
        marker.setLatLng(e.latlng);
        document.getElementById('lat').value = e.latlng.lat.toFixed(6);
        document.getElementById('lng').value = e.latlng.lng.toFixed(6);
    });
</script>

<?php require_once 'layout/footer.php'; ?>