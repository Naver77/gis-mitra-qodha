/**
 * Qodha WebGIS Core Logic
 * Standard: Enterprise Scale - Modular
 * Optimized by: AI Assistant
 */

// --- GLOBAL VARIABLES ---
let map, markersLayer, userMarker;
let allData = [];       // Data mentah dari DB
let processedData = []; // Data setelah hitung jarak
let currentFilter = 'all';
let userLat = null, userLng = null;
let activeMarkerId = null; // Melacak marker yang aktif

// --- 0. UTILITY: DEBOUNCE (Performance Booster) ---
// Mencegah fungsi dipanggil terlalu sering saat mengetik
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// --- 1. INITIALIZATION ---
function initMap() {
    // Set view awal (Indonesia Centric)
    map = L.map('map', { 
        zoomControl: false,
        tap: false // Fix bug di beberapa mobile browser
    }).setView([-2.5, 118], 5); 
    
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Tile Layer: CartoDB Voyager (Tampilan Bersih & Modern)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB & OSM',
        maxZoom: 19
    }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);
    
    // Fix rendering issue saat load pertama
    setTimeout(() => { map.invalidateSize(); }, 500);
}

// --- 2. DATA FETCHING ---
function loadData() {
    // Menampilkan Skeleton Loading (Opsional UI improvement)
    document.getElementById('mitraList').innerHTML = `<div class="p-4 animate-pulse space-y-3"><div class="h-20 bg-gray-200 rounded-xl"></div><div class="h-20 bg-gray-200 rounded-xl"></div></div>`;

    fetch('../api/map_data.php')
        .then(res => {
            if (!res.ok) throw new Error("HTTP Status " + res.status);
            return res.json();
        })
        .then(data => {
            allData = data.features || []; // Safety check jika data kosong
            
            // Inisialisasi data
            processedData = allData.map(item => {
                item.distance = null; 
                return item;
            });
            
            renderData(processedData);
            autoZoom(processedData);
        })
        .catch(err => {
            console.error("API Error:", err);
            document.getElementById('mitraList').innerHTML = 
                `<div class="p-8 text-center text-red-500 text-xs">
                    <i class="fa-solid fa-wifi-slash text-2xl mb-2"></i><br>
                    Gagal memuat data mitra. Periksa koneksi internet.
                </div>`;
        });
}

// --- 3. RENDERING (SAMSUNG STYLE UI) ---
function renderData(data) {
    markersLayer.clearLayers();
    const listContainer = document.getElementById('mitraList');
    listContainer.innerHTML = '';

    if(data.length === 0) {
        listContainer.innerHTML = 
            `<div class="flex flex-col items-center justify-center h-64 text-center p-8 text-gray-400">
                <i class="fa-solid fa-map-location-dot text-4xl mb-3 opacity-30"></i>
                <p class="text-xs">Tidak ada lokasi mitra yang cocok dengan filter ini.</p>
            </div>`;
        return;
    }

    const qodhaIcon = L.icon({
        iconUrl: 'assets/img/marker_qodha.png',
        iconSize: [46, 46],      
        iconAnchor: [23, 46],
        popupAnchor: [0, -50],
        // Fallback jika gambar marker 404 (Sangat penting untuk production)
        className: 'marker-icon-img' 
    });

    data.forEach((feature, index) => {
        const props = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;
        
        // --- LOGIC UI DATA ---
        let locationSuffix = props.alamat.split(',').pop().trim(); 
        
        let distanceInfo = '';
        if(feature.distance !== null) {
            let km = (feature.distance / 1000).toFixed(2);
            distanceInfo = `<span class="text-xs font-bold text-amber-600 block mt-1">
                                <i class="fa-solid fa-location-arrow"></i> ${km} km
                            </span>`;
        }

        let badgeClass = 'bg-gray-100 text-gray-600';
        if(props.jenis === 'Agen') badgeClass = 'bg-blue-50 text-blue-700 border border-blue-100';
        if(props.jenis === 'Reseller') badgeClass = 'bg-green-50 text-green-700 border border-green-100';

        // --- A. POPUP MAP ---
        const popupContent = `
            <div class="font-sans text-left relative min-w-[200px]">
                <div class="h-1.5 bg-brand-gold w-full rounded-t-sm"></div>
                <div class="p-3">
                    <h3 class="font-bold text-gray-900 text-sm leading-tight mb-1">${props.nama}</h3>
                    <div class="flex flex-wrap items-center gap-2 mb-2">
                        <span class="text-[10px] px-2 py-0.5 rounded ${badgeClass} font-bold uppercase tracking-wide">${props.jenis}</span>
                    </div>
                    ${distanceInfo}
                    <p class="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed border-t border-gray-100 pt-2">
                        ${props.alamat}
                    </p>
                    <div class="grid grid-cols-2 gap-2 mt-3">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" 
                           class="flex items-center justify-center gap-1 py-1.5 rounded bg-gray-50 border border-gray-200 text-gray-600 text-[10px] font-bold hover:bg-gray-100 transition">
                            <i class="fa-solid fa-diamond-turn-right"></i> Rute
                        </a>
                        <a href="https://wa.me/${props.hp}" target="_blank" 
                           class="flex items-center justify-center gap-1 py-1.5 rounded bg-green-500 text-white text-[10px] font-bold hover:bg-green-600 shadow-sm transition">
                            <i class="fa-brands fa-whatsapp"></i> Chat
                        </a>
                    </div>
                </div>
            </div>
        `;

        const marker = L.marker([lat, lng], { icon: qodhaIcon }).bindPopup(popupContent);
        
        marker.on('click', () => {
            highlightSidebarItem(props.id);
            activeMarkerId = props.id;
        });

        markersLayer.addLayer(marker);

        // --- B. LIST SIDEBAR ---
        const item = document.createElement('div');
        item.id = `mitra-item-${props.id}`; 
        item.className = "mitra-item bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 group relative overflow-hidden mb-3";
        
        item.innerHTML = `
            ${feature.distance !== null ? `<div class="absolute top-0 right-0 bg-gray-50 text-gray-400 px-2 py-1 rounded-bl-lg text-[10px] font-bold">#${index + 1}</div>` : ''}
            
            <div class="flex items-start gap-3">
                <div class="mt-1 w-full">
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
            highlightSidebarItem(props.id);
            if(window.innerWidth < 768) toggleSidebar(); // Close sidebar on mobile
        });

        listContainer.appendChild(item);
    });
}

// --- FUNGSI BARU: HIGHLIGHT SIDEBAR ---
function highlightSidebarItem(id) {
    // Reset Style
    document.querySelectorAll('.mitra-item').forEach(el => {
        el.classList.remove('ring-2', 'ring-brand-gold', 'bg-yellow-50');
        el.classList.add('bg-white');
    });

    // Set Active Style
    const activeItem = document.getElementById(`mitra-item-${id}`);
    if(activeItem) {
        activeItem.classList.remove('bg-white');
        activeItem.classList.add('ring-2', 'ring-brand-gold', 'bg-yellow-50');
        
        // Auto Scroll
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// --- 4. LOGIC NEAR ME ---
function getLocation() {
    if (navigator.geolocation) {
        const btn = document.querySelector('button[title="Cari Terdekat"]');
        if(!btn) return; // Safety
        
        const oriText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
        btn.disabled = true;

        navigator.geolocation.getCurrentPosition(pos => {
            userLat = pos.coords.latitude;
            userLng = pos.coords.longitude;

            if(userMarker) map.removeLayer(userMarker);
            userMarker = L.circleMarker([userLat, userLng], {
                radius: 8, color: '#fff', fillColor: '#3b82f6', fillOpacity: 1, weight: 3
            }).addTo(map).bindPopup("Lokasi Saya").openPopup();

            calculateDistances();
            applyFilters(); 
            map.flyTo([userLat, userLng], 13);
            
            btn.innerHTML = oriText;
            btn.disabled = false;

        }, (err) => {
            console.warn("Geolocation Error: " + err.code);
            let msg = "Gagal mendeteksi lokasi.";
            if(err.code === 1) msg = "Izin lokasi ditolak. Harap aktifkan GPS.";
            alert(msg);
            btn.innerHTML = oriText;
            btn.disabled = false;
        }, { timeout: 10000 }); // Timeout 10 detik
    } else {
        alert("Browser tidak mendukung Geolokasi.");
    }
}

function calculateDistances() {
    if(userLat === null || userLng === null) return;
    processedData = allData.map(item => {
        const [lng, lat] = item.geometry.coordinates;
        // Leaflet distanceTo returns meters
        const dist = map.distance([userLat, userLng], [lat, lng]); 
        item.distance = dist; 
        return item;
    });
    // Sort
    processedData.sort((a, b) => a.distance - b.distance);
}

// --- 5. FILTERING ---
function filterStatus(jenis) {
    currentFilter = jenis;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        // Toggle Logic UI Class
        const isActive = btn.dataset.jenis === jenis;
        btn.className = isActive 
            ? "filter-btn active flex-1 py-2 text-xs font-bold rounded-lg bg-gray-900 text-white shadow-lg transform scale-105 transition-all" 
            : "filter-btn flex-1 py-2 text-xs font-bold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition";
    });
    applyFilters();
}

// Implementasi Debounce pada Search Box
const searchBox = document.getElementById('searchBox');
if(searchBox) {
    searchBox.addEventListener('input', debounce(() => applyFilters(), 300));
}

// Radius Filter Listener
const radiusFilter = document.getElementById('radiusFilter');
if(radiusFilter) {
    radiusFilter.addEventListener('change', () => applyFilters());
}

function applyFilters() {
    const keyword = document.getElementById('searchBox') ? document.getElementById('searchBox').value.toLowerCase() : '';
    const radiusVal = document.getElementById('radiusFilter') ? document.getElementById('radiusFilter').value : 'all';

    const filtered = processedData.filter(item => {
        const props = item.properties;
        const matchText = props.nama.toLowerCase().includes(keyword) || props.alamat.toLowerCase().includes(keyword);
        const matchJenis = currentFilter === 'all' || props.jenis === currentFilter;
        
        let matchRadius = true;
        if(radiusVal !== 'all' && item.distance !== null) {
            matchRadius = item.distance <= (parseInt(radiusVal) * 1000);
        }

        return matchText && matchJenis && matchRadius;
    });

    renderData(filtered);
}

// --- 6. UTILITIES ---
function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    if(!sb) return;
    sb.classList.toggle('translate-x-full'); // Assuming Tailwind class for hiding off-canvas
    sb.classList.toggle('translate-x-0');
    setTimeout(() => { map.invalidateSize(); }, 300);
}

function autoZoom(data) {
    if(data.length > 0) {
        // Create bounds from all points
        const bounds = L.latLngBounds(data.map(f => [f.geometry.coordinates[1], f.geometry.coordinates[0]]));
        map.fitBounds(bounds, { padding: [50, 50] });
    }
}

// START
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadData();
});