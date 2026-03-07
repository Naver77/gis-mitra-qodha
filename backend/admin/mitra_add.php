<?php
session_start();
if (!isset($_SESSION['login'])) { header("Location: login.php"); exit; }
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Mitra Baru - QodhaMaps</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
    <style>
        #mapInput { height: 400px; width: 100%; border-radius: 0.5rem; z-index: 0; }
    </style>
</head>
<body class="bg-gray-50 font-sans">

    <nav class="bg-emerald-600 p-4 shadow-lg fixed w-full z-10 top-0">
        <div class="container mx-auto text-white font-bold text-xl">
            <i class="fa-solid fa-layer-group"></i> Qodha Admin
        </div>
    </nav>

    <div class="flex pt-16 h-screen">
        <aside class="w-64 bg-white border-r hidden md:block shadow-sm">
            <ul class="p-4 space-y-2">
                <li><a href="mitra_list.php" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"><i class="fa-solid fa-arrow-left"></i> Kembali</a></li>
            </ul>
        </aside>

        <main class="flex-1 p-6 overflow-y-auto">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">Tambah Mitra Baru</h1>

            <form action="mitra_save.php" method="POST" enctype="multipart/form-data" class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-1">Nama Mitra</label>
                            <input type="text" name="nama" required class="w-full border rounded p-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Contoh: Agen Qodha Bogor">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-1">Nomor HP (WhatsApp)</label>
                            <input type="number" name="hp" required class="w-full border rounded p-2" placeholder="628123456789">
                            <p class="text-xs text-gray-400 mt-1">*Gunakan format 628xxx (tanpa 0 di depan)</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-1">Provinsi</label>
                                <input type="text" name="provinsi" required class="w-full border rounded p-2" placeholder="Jawa Barat">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-1">Kota/Kabupaten</label>
                                <input type="text" name="kota" required class="w-full border rounded p-2" placeholder="Bogor">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-1">Alamat Lengkap</label>
                            <textarea name="alamat" rows="3" required class="w-full border rounded p-2" placeholder="Jl. Raya..."></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-1">Status</label>
                            <select name="status" class="w-full border rounded p-2">
                                <option value="1">Aktif</option>
                                <option value="0">Tutup</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Lokasi Titik (Geser Pin)</label>
                        
                        <div id="mapInput" class="border-2 border-emerald-500 shadow-inner"></div>
                        
                        <div class="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label class="text-xs font-bold text-gray-500">Latitude</label>
                                <input type="text" name="lat" id="lat" readonly class="w-full bg-gray-100 border rounded p-2 text-sm font-mono cursor-not-allowed">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-gray-500">Longitude</label>
                                <input type="text" name="lng" id="lng" readonly class="w-full bg-gray-100 border rounded p-2 text-sm font-mono cursor-not-allowed">
                            </div>
                        </div>
                        <p class="text-xs text-emerald-600 mt-2"><i class="fa-solid fa-info-circle"></i> Geser pin biru di peta untuk mengisi koordinat otomatis.</p>
                    </div>
                </div>

                <div class="mt-8 pt-4 border-t flex justify-end">
                    <button type="submit" name="simpan" class="bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-700 shadow-lg transition transform hover:scale-105">
                        <i class="fa-solid fa-save"></i> SIMPAN DATA
                    </button>
                </div>

            </form>
        </main>
    </div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
        // 1. Inisialisasi Peta (Default Jakarta)
        var map = L.map('mapInput').setView([-6.200000, 106.816666], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        // 2. Tambah Marker Draggable (Bisa Digeser)
        var marker = L.marker([-6.200000, 106.816666], {
            draggable: true
        }).addTo(map);

        // 3. Fungsi Update Input saat Marker Digeser
        function updateInput(lat, lng) {
            document.getElementById('lat').value = lat;
            document.getElementById('lng').value = lng;
        }

        // Event: Saat marker selesai digeser (Drag End)
        marker.on('dragend', function(e) {
            var position = marker.getLatLng();
            updateInput(position.lat, position.lng);
        });

        // Event: Saat peta diklik (Pindah marker ke lokasi klik)
        map.on('click', function(e) {
            var lat = e.latlng.lat;
            var lng = e.latlng.lng;
            marker.setLatLng([lat, lng]); // Pindah marker
            updateInput(lat, lng);        // Update input
        });

        // Trigger awal agar input tidak kosong
        updateInput(-6.200000, 106.816666);
    </script>
</body>
</html>