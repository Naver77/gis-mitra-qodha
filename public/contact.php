<?php 
$page_title = "Hubungi Kami"; 
include 'header.php'; 
?>

<!-- Leaflet CSS & JS (Khusus halaman ini agar Peta bisa Custom Marker) -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

<!-- 1. HERO SECTION -->
<section class="relative w-full bg-gray-900 py-20 overflow-hidden">
    <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <span class="text-brand-gold font-bold tracking-widest text-sm uppercase mb-2 block">Customer Service</span>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Kami Siapkan Bantuan Terbaik</h1>
        <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Hubungi kami untuk konsultasi produk, pendaftaran kemitraan, atau kunjungi gallery store kami.
        </p>
    </div>
</section>

<!-- 2. CONTACT CARDS -->
<section class="relative z-20 -mt-10 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <!-- WhatsApp -->
            <div class="bg-white rounded-2xl p-8 shadow-xl border-b-4 border-green-500 hover:-translate-y-2 transition duration-300 group">
                <div class="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-6 group-hover:bg-green-500 group-hover:text-white transition">
                    <i class="fa-brands fa-whatsapp"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">WhatsApp Official</h3>
                <p class="text-gray-500 text-sm mb-6">Konsultasi cepat & Info Kemitraan.</p>
                <a href="https://wa.me/6281717302223" target="_blank" class="text-green-600 font-bold hover:underline flex items-center gap-2">
                    +62 817-1730-2223 <i class="fa-solid fa-arrow-right text-xs"></i>
                </a>
            </div>

            <!-- Email -->
            <div class="bg-white rounded-2xl p-8 shadow-xl border-b-4 border-brand-gold hover:-translate-y-2 transition duration-300 group">
                <div class="w-14 h-14 bg-yellow-100 text-brand-gold rounded-full flex items-center justify-center text-2xl mb-6 group-hover:bg-brand-gold group-hover:text-white transition">
                    <i class="fa-solid fa-envelope"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Email Bisnis</h3>
                <p class="text-gray-500 text-sm mb-6">Penawaran kerjasama & komplain.</p>
                <a href="mailto:cs@qodha.id" class="text-brand-gold font-bold hover:underline flex items-center gap-2">
                    cs@qodha.id <i class="fa-solid fa-arrow-right text-xs"></i>
                </a>
            </div>

            <!-- Store -->
            <div class="bg-white rounded-2xl p-8 shadow-xl border-b-4 border-gray-800 hover:-translate-y-2 transition duration-300 group">
                <div class="w-14 h-14 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center text-2xl mb-6 group-hover:bg-gray-800 group-hover:text-white transition">
                    <i class="fa-solid fa-store"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Gallery Store</h3>
                <p class="text-gray-500 text-sm mb-6">Coba tester aroma langsung di toko.</p>
                <a href="#store" class="text-gray-800 font-bold hover:underline flex items-center gap-2">
                    Lihat Peta Lokasi <i class="fa-solid fa-arrow-right text-xs"></i>
                </a>
            </div>

        </div>
    </div>
</section>

<!-- 3. STORE LOCATION (CUSTOM MARKER) -->
<section id="store" class="py-16 bg-white border-t border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            
            <!-- Info Text -->
            <div class="space-y-6">
                <span class="text-brand-gold font-bold tracking-widest text-sm uppercase bg-yellow-50 px-3 py-1 rounded-full">Gallery Pusat</span>
                <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900">Kunjungi Gallery Qodha Aromatic</h2>
                <p class="text-gray-600 text-lg leading-relaxed">
                    Kami berlokasi di pusat kota Bogor. Silakan mampir untuk mencium langsung keharuman 95+ varian aroma kami.
                </p>
                
                <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                    <div class="flex items-start gap-4">
                        <i class="fa-solid fa-map-location-dot text-brand-gold text-xl mt-1"></i>
                        <div>
                            <h4 class="font-bold text-gray-900">Alamat Lengkap</h4>
                            <p class="text-gray-600 text-sm mt-1">
                                Jl. Empang No.29B, Empang, Kec. Bogor Sel., Kota Bogor, Jawa Barat 16132
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4">
                        <i class="fa-solid fa-clock text-brand-gold text-xl mt-1"></i>
                        <div>
                            <h4 class="font-bold text-gray-900">Jam Operasional</h4>
                            <p class="text-gray-600 text-sm mt-1">
                                Senin - Sabtu: 08.00 - 17.00 WIB<br>
                                <span class="text-red-500 font-medium">Minggu Tutup</span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Tombol ke Google Maps Asli -->
                <a href="https://www.google.com/maps/place/Qodha+Aromatic/@-6.6071015,106.7926591,17z/data=!3m1!4b1!4m6!3m5!1s0x231c73fc211b5ca5:0xb98552cc128471ab!8m2!3d-6.6071015!4d106.795234" target="_blank" class="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg w-full sm:w-auto justify-center">
                    <i class="fa-solid fa-diamond-turn-right mr-2"></i> Buka Petunjuk Arah
                </a>
            </div>

            <!-- Interactive Map -->
            <div class="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                <!-- Wadah Peta Leaflet -->
                <div id="contactMap" class="h-full w-full z-10"></div>
                
                <!-- Label Overlay -->
                <div class="absolute bottom-6 left-6 z-[500] bg-white/95 backdrop-blur px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 border-l-4 border-brand-gold">
                    <img src="assets/img/marker_qodha.png" alt="Qodha" class="h-8 w-auto">
                    <div>
                        <p class="text-xs font-bold text-gray-900 uppercase">Official Store</p>
                        <p class="text-[10px] text-gray-500">Bogor, Jawa Barat</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- 4. CONTACT FORM -->
<section class="py-20 bg-gray-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-gray-900">Kirim Pesan</h2>
            <p class="text-gray-500">Isi formulir di bawah ini, tim kami akan membalas secepatnya.</p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10">
            <form action="#" method="POST" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                        <input type="text" placeholder="Nama Anda" class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition" required>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp</label>
                        <input type="tel" placeholder="08123xxxx" class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition" required>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Subjek</label>
                    <select class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition">
                        <option>Pertanyaan Produk</option>
                        <option>Info Kemitraan</option>
                        <option>Lainnya</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Pesan</label>
                    <textarea rows="4" class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition" required></textarea>
                </div>
                <button type="submit" class="w-full py-4 bg-brand-gold text-gray-900 font-bold rounded-xl hover:bg-yellow-500 transition shadow-lg transform hover:-translate-y-1">
                    <i class="fa-solid fa-paper-plane mr-2"></i> Kirim Pesan
                </button>
            </form>
        </div>
    </div>
</section>

<!-- SCRIPT MAP INTERAKTIF -->
<script>
    document.addEventListener('DOMContentLoaded', () => {
        // Koordinat Toko Qodha (Sesuai Google Maps)
        const lat = -6.6071015;
        const lng = 106.795234;

        // Inisialisasi Peta Leaflet
        const map = L.map('contactMap', {
            center: [lat, lng],
            zoom: 17,
            scrollWheelZoom: false // Agar tidak scroll saat user scroll halaman
        });

        // Tile Layer (Tampilan Peta Bersih)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap & CartoDB',
            maxZoom: 20
        }).addTo(map);

        // Custom Icon Qodha
        const qodhaIcon = L.icon({
            iconUrl: 'assets/img/marker_qodha.png', // Pastikan file ini ada
            iconSize: [50, 50],     // Ukuran lebih besar agar jelas
            iconAnchor: [25, 50],   // Titik tunjuk (tengah bawah)
            popupAnchor: [0, -50],  // Posisi popup di atas icon
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            shadowSize: [50, 50]
        });

        // Tambah Marker
        L.marker([lat, lng], {icon: qodhaIcon})
            .addTo(map)
            .bindPopup(`
                <div class="text-center p-1">
                    <h3 class="font-bold text-sm mb-1">Qodha Aromatic Pusat</h3>
                    <p class="text-xs text-gray-500">Jl. Empang No. 29B, Bogor</p>
                    <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank" class="block mt-2 text-xs bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600">Buka Maps</a>
                </div>
            `)
            .openPopup();
    });
</script>

<?php include 'footer.php'; ?>