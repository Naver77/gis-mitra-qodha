<?php $page_title = "Peta Distributor"; ?>
<?php include 'header.php'; ?>

<style>
    /* Reset layout agar peta fullscreen di area konten */
    html, body { height: 100%; overflow: hidden; }
    
    /* Layout Utama */
    .map-layout {
        display: flex;
        height: calc(100vh - 85px); /* Kurangi tinggi navbar */
        width: 100%;
        position: relative;
    }

    /* Sidebar Kiri */
    .map-sidebar {
        width: 400px;
        background: white;
        z-index: 20;
        box-shadow: 4px 0 24px rgba(0,0,0,0.08);
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease-in-out;
    }

    /* Peta Kanan */
    .map-wrapper {
        flex: 1;
        position: relative;
        z-index: 10;
    }
    #map { height: 100%; width: 100%; background: #f0f0f0; }

    /* Custom Scrollbar Sidebar */
    .custom-scroll::-webkit-scrollbar { width: 6px; }
    .custom-scroll::-webkit-scrollbar-track { background: #f9fafb; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }

    /* Responsiveness Mobile */
    @media (max-width: 768px) {
        .map-sidebar {
            position: absolute;
            top: 0; left: 0; bottom: 0;
            width: 100%; /* Sidebar full width di HP */
            transform: translateX(-100%); /* Sembunyi default */
        }
        .map-sidebar.open { transform: translateX(0); }
    }

    /* Loading Spinner */
    .loader {
        border: 3px solid #f3f3f3; border-top: 3px solid #f59e0b;
        border-radius: 50%; width: 30px; height: 30px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>

<div class="map-layout">
    
    <aside id="sidebar" class="map-sidebar">
        <div class="p-5 border-b border-gray-100 bg-white z-10 shadow-sm">
            <h1 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <i class="fa-solid fa-map-location-dot text-brand-gold"></i> Lokasi Mitra
            </h1>
            <p class="text-xs text-gray-500 mt-1">Temukan agen resmi Qodha terdekat.</p>
            
            <div class="mt-4 space-y-3">
                <div class="relative">
                    <input type="text" id="searchBox" placeholder="Cari Toko / Kota..." 
                        class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold transition shadow-sm">
                    <i class="fa-solid fa-search absolute left-3.5 top-3 text-gray-400"></i>
                </div>
                
                <div class="flex gap-2">
                    <button onclick="filterStatus('all')" class="filter-btn active flex-1 py-1.5 text-xs font-bold rounded-lg border border-gray-200 bg-brand-dark text-white transition hover:opacity-90">Semua</button>
                    <button onclick="filterStatus('1')" class="filter-btn flex-1 py-1.5 text-xs font-bold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition">Buka</button>
                    <button onclick="getLocation()" class="px-3 py-1.5 bg-brand-gold text-white rounded-lg hover:bg-amber-600 transition" title="Cari Sekitar Saya">
                        <i class="fa-solid fa-crosshairs"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="mitraList" class="flex-1 overflow-y-auto custom-scroll p-4 space-y-3 bg-gray-50/50">
            <div class="flex flex-col items-center justify-center h-40 text-gray-400">
                <div class="loader mb-3"></div>
                <p class="text-xs">Memuat data peta...</p>
            </div>
        </div>

        <div class="p-3 border-t border-gray-100 text-center bg-white text-[10px] text-gray-400">
            &copy; 2026 Qodha WebGIS System
        </div>
    </aside>

    <main class="map-wrapper">
        <button onclick="toggleSidebar()" class="absolute top-4 left-4 z-[400] bg-white p-3 rounded-xl shadow-lg md:hidden text-brand-dark hover:text-brand-gold transition">
            <i class="fa-solid fa-bars text-lg"></i>
        </button>

        <div id="map"></div>
    </main>

</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
    // --- 1. CONFIGURATION ---
    let map, markersLayer;
    let allData = []; // Simpan data mentah disini
    let currentFilter = 'all';

    // Inisialisasi Peta
    function initMap() {
        map = L.map('map', { zoomControl: false }).setView([-6.200000, 106.816666], 6); // View Indonesia
        
        // Pindahkan Zoom Control ke kanan bawah
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Tile Layer (CartoDB Voyager - Bersih & Modern)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap',
            maxZoom: 19
        }).addTo(map);

        markersLayer = L.layerGroup().addTo(map);
    }

    // --- 2. FETCH DATA DARI API ---
    function loadData() {
        // Panggil API PHP yang sudah kita buat
        fetch('../api/map_data.php')
            .then(res => res.json())
            .then(data => {
                allData = data.features;
                renderData(allData); // Tampilkan awal
            })
            .catch(err => {
                console.error(err);
                document.getElementById('mitraList').innerHTML = `
                    <div class="text-center p-8 text-red-500">
                        <i class="fa-solid fa-triangle-exclamation text-2xl mb-2"></i>
                        <p class="text-sm">Gagal memuat data server.</p>
                    </div>`;
            });
    }

    // --- 3. RENDER DATA (List & Marker) ---
    function renderData(data) {
        markersLayer.clearLayers();
        const listContainer = document.getElementById('mitraList');
        listContainer.innerHTML = '';

        if(data.length === 0) {
            listContainer.innerHTML = `<div class="text-center p-8 text-gray-400 text-sm">Tidak ada lokasi ditemukan.</div>`;
            return;
        }

        // Custom Icon
        const qodhaIcon = L.icon({
            iconUrl: 'assets/img/marker_qodha.png', // Pastikan path benar
            iconSize: [42, 42],
            iconAnchor: [21, 42],
            popupAnchor: [0, -45]
        });

        data.forEach(feature => {
            const props = feature.properties;
            const [lng, lat] = feature.geometry.coordinates;

            // A. Buat Marker
            const marker = L.marker([lat, lng], { icon: qodhaIcon })
                .bindPopup(`
                    <div class="text-center font-sans min-w-[180px]">
                        <div class="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-amber-600">
                            <i class="fa-solid fa-shop"></i>
                        </div>
                        <h3 class="font-bold text-gray-800">${props.nama}</h3>
                        <p class="text-xs text-gray-500 my-1">${props.kota}</p>
                        <a href="https://wa.me/${props.hp}" target="_blank" class="block mt-2 bg-green-500 text-white py-1 px-3 rounded text-xs font-bold hover:bg-green-600">
                            Chat WhatsApp
                        </a>
                    </div>
                `);
            
            markersLayer.addLayer(marker);

            // B. Buat List Item di Sidebar
            const item = document.createElement('div');
            item.className = "bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-gold cursor-pointer transition group";
            item.innerHTML = `
                <div class="flex items-start gap-3">
                    <div class="bg-gray-100 text-gray-500 p-2 rounded-lg shrink-0 group-hover:bg-brand-gold group-hover:text-white transition">
                        <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-800 text-sm group-hover:text-brand-gold transition">${props.nama}</h4>
                        <p class="text-xs text-gray-500 mt-1 line-clamp-2">${props.alamat}</p>
                        <div class="mt-2 flex items-center gap-2">
                            <span class="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200 font-medium">
                                ${props.kota}
                            </span>
                            ${props.status_aktif == '1' 
                                ? '<span class="text-[10px] text-green-600 flex items-center gap-1"><i class="fa-solid fa-circle text-[6px]"></i> Buka</span>' 
                                : '<span class="text-[10px] text-red-500">Tutup</span>'}
                        </div>
                    </div>
                </div>
            `;

            // Event Klik Item List
            item.addEventListener('click', () => {
                map.flyTo([lat, lng], 16, { duration: 1.5 });
                marker.openPopup();
                if(window.innerWidth < 768) toggleSidebar(); // Tutup sidebar di HP
            });

            listContainer.appendChild(item);
        });
    }

    // --- 4. FITUR PENCARIAN & FILTER ---
    document.getElementById('searchBox').addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        applyFilters(keyword, currentFilter);
    });

    function filterStatus(status) {
        currentFilter = status;
        // Update UI Button active state
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('bg-brand-dark', 'text-white');
            btn.classList.add('text-gray-600');
        });
        // Highlight tombol yang diklik (tambahkan logic class manual atau pakai event.target)
        applyFilters(document.getElementById('searchBox').value.toLowerCase(), status);
    }

    function applyFilters(keyword, status) {
        const filtered = allData.filter(item => {
            const matchName = item.properties.nama.toLowerCase().includes(keyword) || 
                              item.properties.kota.toLowerCase().includes(keyword);
            const matchStatus = status === 'all' || item.properties.status_aktif === status;
            return matchName && matchStatus;
        });
        renderData(filtered);
    }

    // --- 5. UTILITIES ---
    function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
        document.getElementById('sidebar').classList.toggle('-translate-x-full'); // Khusus logic tailwind class mobile
        // Koreksi manual classList untuk mobile logic yg lebih simpel
        const sb = document.getElementById('sidebar');
        if(window.innerWidth < 768) {
            if(sb.style.transform === 'translateX(0%)') {
                sb.style.transform = 'translateX(-100%)';
            } else {
                sb.style.transform = 'translateX(0%)';
            }
        }
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const { latitude, longitude } = pos.coords;
                L.circleMarker([latitude, longitude], {
                    radius: 8, color: '#fff', fillColor: '#3b82f6', fillOpacity: 1, weight: 2
                }).addTo(map).bindPopup("Lokasi Anda").openPopup();
                map.flyTo([latitude, longitude], 13);
            }, () => alert("Gagal mendeteksi lokasi."));
        }
    }

    // Start System
    initMap();
    loadData();

</script>

<?php // Footer tidak dipanggil di sini agar layout map full height ?>
</body>
</html>