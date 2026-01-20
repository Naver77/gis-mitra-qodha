/**
 * Qodha WebGIS Core Logic
 * Standard: Enterprise Scale - Modular
 */

// --- GLOBAL VARIABLES ---
let map, markersLayer, userMarker;
let allData = [];       // Data mentah dari DB
let processedData = []; // Data setelah hitung jarak
let currentFilter = 'all';
let userLat = null, userLng = null;

// --- 1. INITIALIZATION ---
function initMap() {
    map = L.map('map', { zoomControl: false }).setView([-2.5, 118], 5); 
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB & OSM',
        maxZoom: 19
    }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);
    
    // Fix rendering issue
    setTimeout(() => { map.invalidateSize(); }, 500);
}

// --- 2. DATA FETCHING ---
function loadData() {
    fetch('../api/map_data.php')
        .then(res => res.json())
        .then(data => {
            allData = data.features;
            // Saat pertama load, processedData sama dengan data mentah
            processedData = allData.map(item => {
                item.distance = null; // Belum ada jarak
                return item;
            });
            
            renderData(processedData);
            autoZoom(processedData);
        })
        .catch(err => {
            console.error("API Error:", err);
            document.getElementById('mitraList').innerHTML = `<div class="p-8 text-center text-red-500 text-xs">Gagal koneksi server.</div>`;
        });
}

// --- 3. RENDERING (SAMSUNG STYLE UI) ---
function renderData(data) {
    markersLayer.clearLayers();
    const listContainer = document.getElementById('mitraList');
    listContainer.innerHTML = '';

    if(data.length === 0) {
        listContainer.innerHTML = `<div class="text-center p-8 text-gray-400 text-xs">Tidak ada lokasi dalam jangkauan ini.</div>`;
        return;
    }

    const qodhaIcon = L.icon({
        iconUrl: 'assets/img/marker_qodha.png',
        iconSize: [46, 46],     // Sedikit diperbesar
        iconAnchor: [23, 46],
        popupAnchor: [0, -50]
    });

    data.forEach((feature, index) => {
        const props = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;
        
        // --- LOGIC UI DATA ---
        
        // 1. Ambil Kota/Kecamatan dari Alamat (Simulasi Pintar)
        // Mengambil 2 kata terakhir dari alamat jika kolom kota belum ada di DB
        let locationSuffix = props.alamat.split(',').pop().trim(); 
        
        // 2. Info Jarak (Format Samsung: "Sawangan, 21.09 km")
        let distanceInfo = '';
        if(feature.distance !== null) {
            let km = (feature.distance / 1000).toFixed(2);
            distanceInfo = `<span class="text-xs font-bold text-amber-600 block mt-1">
                                <i class="fa-solid fa-location-arrow"></i> ${km} km dari lokasi Anda
                            </span>`;
        }

        // 3. Badge Jenis Mitra
        let badgeClass = 'bg-gray-100 text-gray-600';
        if(props.jenis === 'Agen') badgeClass = 'bg-blue-50 text-blue-700 border border-blue-100';
        if(props.jenis === 'Reseller') badgeClass = 'bg-green-50 text-green-700 border border-green-100';

        // --- A. POPUP MAP (LAYOUT SAMSUNG) ---
        const popupContent = `
            <div class="font-sans text-left relative">
                <div class="h-2 bg-brand-gold w-full"></div>
                
                <div class="p-4 pt-3">
                    <h3 class="font-bold text-gray-900 text-base leading-tight mb-1">${props.nama}</h3>
                    
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                        <span class="text-[10px] px-2 py-0.5 rounded ${badgeClass} font-bold uppercase tracking-wide">${props.jenis}</span>
                        ${feature.distance !== null ? `<span class="text-xs font-bold text-gray-500">• ${locationSuffix}</span>` : ''}
                    </div>

                    ${distanceInfo}

                    <p class="text-xs text-gray-500 mt-2 leading-relaxed border-t border-gray-100 pt-2">
                        ${props.alamat}
                    </p>

                    <div class="grid grid-cols-2 gap-2 mt-4">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" 
                           class="flex items-center justify-center gap-1 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition">
                            <i class="fa-solid fa-diamond-turn-right"></i> Rute
                        </a>
                        <a href="https://wa.me/${props.hp}" onclick="catatKlik('klik_mitra', ${props.id})" target="_blank" 
                           class="flex items-center justify-center gap-1 py-2 rounded-lg bg-green-500 text-white text-xs font-bold hover:bg-green-600 shadow-md transition">
                            <i class="fa-brands fa-whatsapp"></i> Hubungi
                        </a>
                    </div>
                </div>
            </div>
        `;

        const marker = L.marker([lat, lng], { icon: qodhaIcon }).bindPopup(popupContent);
        
        // Event saat Marker diklik -> Highlight Sidebar
        marker.on('click', () => {
            highlightSidebarItem(props.id);
        });

        markersLayer.addLayer(marker);

        // --- B. LIST SIDEBAR ---
        const item = document.createElement('div');
        item.id = `mitra-item-${props.id}`; // ID unik untuk scrolling
        item.className = "mitra-item bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md cursor-pointer transition group relative overflow-hidden";
        
        item.innerHTML = `
            ${feature.distance !== null ? `<div class="absolute top-0 right-0 bg-gray-100 text-gray-600 px-2 py-1 rounded-bl-lg text-[10px] font-bold">#${index + 1}</div>` : ''}
            
            <div class="flex items-start gap-3">
                <div class="mt-1">
                    <h4 class="font-bold text-gray-800 text-sm group-hover:text-brand-gold transition">${props.nama}</h4>
                    <div class="flex items-center gap-2 mt-1">
                        <span class="text-[10px] px-2 py-0.5 rounded border ${badgeClass} font-bold uppercase">${props.jenis}</span>
                        ${feature.distance !== null ? `<span class="text-xs font-bold text-amber-600">${(feature.distance / 1000).toFixed(1)} km</span>` : ''}
                    </div>
                    <p class="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">${props.alamat}</p>
                </div>
            </div>
        `;

        item.addEventListener('click', () => {
            map.flyTo([lat, lng], 16, { duration: 1.5 });
            marker.openPopup();
            highlightSidebarItem(props.id); // Panggil fungsi highlight
            if(window.innerWidth < 768) toggleSidebar();
        });

        listContainer.appendChild(item);
    });
}

// --- FUNGSI BARU: HIGHLIGHT SIDEBAR ---
function highlightSidebarItem(id) {
    // 1. Hapus class active dari semua item
    document.querySelectorAll('.mitra-item').forEach(el => {
        el.classList.remove('active');
        el.classList.remove('border-brand-gold');
    });

    // 2. Tambah class active ke item yang dipilih
    const activeItem = document.getElementById(`mitra-item-${id}`);
    if(activeItem) {
        activeItem.classList.add('active');
        
        // 3. Auto Scroll ke item tersebut (Smooth)
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// --- 4. LOGIC NEAR ME (SAMSUNG STYLE) ---
function getLocation() {
    if (navigator.geolocation) {
        // Tampilkan loading di tombol
        const btn = document.querySelector('button[title="Cari Terdekat"]');
        const oriText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';

        navigator.geolocation.getCurrentPosition(pos => {
            userLat = pos.coords.latitude;
            userLng = pos.coords.longitude;

            // 1. Tampilkan Marker User
            if(userMarker) map.removeLayer(userMarker);
            userMarker = L.circleMarker([userLat, userLng], {
                radius: 8, color: '#fff', fillColor: '#3b82f6', fillOpacity: 1, weight: 3
            }).addTo(map).bindPopup("Lokasi Saya").openPopup();

            // 2. Hitung Jarak ke Semua Mitra
            calculateDistances();

            // 3. Update Tampilan (Sort by Distance)
            applyFilters(); 

            // 4. Zoom ke User
            map.flyTo([userLat, userLng], 12);
            
            // Kembalikan tombol
            btn.innerHTML = oriText;

        }, () => {
            alert("Gagal mendeteksi lokasi. Pastikan GPS aktif.");
            btn.innerHTML = oriText;
        });
    } else {
        alert("Browser tidak mendukung Geolokasi.");
    }
}

function calculateDistances() {
    if(userLat === null || userLng === null) return;

    // Tambahkan properti 'distance' ke setiap item data
    processedData = allData.map(item => {
        const [lng, lat] = item.geometry.coordinates;
        // Hitung jarak (meter) menggunakan Leaflet method
        const dist = map.distance([userLat, userLng], [lat, lng]); 
        item.distance = dist; 
        return item;
    });

    // URUTKAN DARI TERDEKAT (Ascending)
    processedData.sort((a, b) => a.distance - b.distance);
}

// --- 5. FILTERING (Search + Kategori + Radius) ---
function filterStatus(jenis) {
    currentFilter = jenis;
    // Update Style Tombol
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if(btn.dataset.jenis === jenis) {
            btn.className = "filter-btn active flex-1 py-1.5 text-xs font-bold rounded-lg border border-brand-dark bg-brand-dark text-white transition shadow-md whitespace-nowrap px-3";
        } else {
            btn.className = "filter-btn flex-1 py-1.5 text-xs font-bold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition whitespace-nowrap px-3";
        }
    });
    applyFilters();
}

function applyRadiusFilter() {
    applyFilters();
}

document.getElementById('searchBox').addEventListener('input', () => applyFilters());

function applyFilters() {
    const keyword = document.getElementById('searchBox').value.toLowerCase();
    const radiusVal = document.getElementById('radiusFilter').value; // 'all', '5', '10'

    // Gunakan processedData (yang mungkin sudah diurutkan jaraknya)
    const filtered = processedData.filter(item => {
        const props = item.properties;
        
        // 1. Filter Text
        const matchText = props.nama.toLowerCase().includes(keyword) || props.alamat.toLowerCase().includes(keyword);
        
        // 2. Filter Jenis
        const matchJenis = currentFilter === 'all' || props.jenis === currentFilter;

        // 3. Filter Radius (Hanya jika user sudah share lokasi)
        let matchRadius = true;
        if(radiusVal !== 'all' && item.distance !== null) {
            const maxMeter = parseInt(radiusVal) * 1000;
            matchRadius = item.distance <= maxMeter;
        }

        return matchText && matchJenis && matchRadius;
    });

    renderData(filtered);
}

// --- 6. UTILITIES ---
function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    sb.classList.toggle('open');
    if(window.innerWidth < 768) {
        sb.style.transform = sb.style.transform === 'translateX(0%)' ? 'translateX(-100%)' : 'translateX(0%)';
    }
    // Refresh map size saat sidebar berubah
    setTimeout(() => { map.invalidateSize(); }, 300);
}

function autoZoom(data) {
    if(data.length > 0) {
        setTimeout(() => {
            const group = new L.featureGroup(markersLayer.getLayers());
            map.fitBounds(group.getBounds().pad(0.1));
        }, 500);
    }
}

// START
initMap();
loadData();