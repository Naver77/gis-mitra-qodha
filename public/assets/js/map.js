// Extracted map JS from index.php
// QODHA MAPS - SISTEM INFORMASI GEOGRAFIS

// --- STATE MANAGEMENT ---
let currentActiveMarker = null; 
let currentActiveItem = null;
let allMitraData = [];
let currentFilter = 'all';
const cityCounts = {};

// --- INITIALIZE MAP ---
const map = L.map('map', { 
    zoomControl: false,
    dragging: true,
    touchZoom: true
}).setView([-6.200000, 106.816666], 11);

// Tile Layer - Professional & Clean
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19,
    className: 'tile-layer'
}).addTo(map);

// Layer Groups
const markersLayer = L.layerGroup().addTo(map);
const zoomControl = L.control.zoom({ position: 'bottomright' }).addTo(map);

// --- LOAD DATA ---
async function loadData() {
    try {
        const response = await fetch('../api/map_data.php');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        allMitraData = data.features;
        calculateStats();
        renderMitra(allMitraData);
    } catch (err) {
        console.error('Data load error:', err);
        showErrorState('Gagal memuat data. Periksa koneksi Anda.');
    }
}

// --- STATISTICS CALCULATION ---
function calculateStats() {
    const stats = {
        total: allMitraData.length,
        active: 0,
        closed: 0,
        cities: {}
    };

    allMitraData.forEach(feature => {
        const props = feature.properties;
        if (props.status_aktif === '1') {
            stats.active++;
        } else {
            stats.closed++;
        }
        stats.cities[props.kota] = (stats.cities[props.kota] || 0) + 1;
    });

    // Update UI
    document.getElementById('totalMitra').textContent = stats.total;
    document.getElementById('activeMitra').textContent = stats.active;
    document.getElementById('closedMitra').textContent = stats.closed;
    document.getElementById('statTotal').textContent = stats.total;
    document.getElementById('statActive').textContent = stats.active;
    document.getElementById('statClosed').textContent = stats.closed;

    // City List
    const topCities = Object.entries(stats.cities)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const citiesHTML = topCities.map(([city, count]) => `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            <span class="font-medium text-sm text-gray-700">${city}</span>
            <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">${count}</span>
        </div>
    `).join('');
    
    document.getElementById('citiesList').innerHTML = citiesHTML || '<p class="text-gray-400 text-sm">Tidak ada data.</p>';
}

// --- CREATE SIDEBAR ITEM (Card) ---
function createSidebarItem(props, lat, lng, marker) {
    const item = document.createElement('div');
    const isActive = props.status_aktif === '1';
    
    item.className = "group bg-white border border-var(--color-gray-200) rounded-xl p-4 card-hover cursor-pointer active-card";
    
    item.innerHTML = `
        <div class="flex items-start gap-3">
            <div class="w-12 h-12 rounded-lg ${isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'} flex items-center justify-center shrink-0 font-bold text-lg group-hover:scale-110 transition-transform">
                ${props.nama.charAt(0)}
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-800 text-sm leading-tight group-hover:text-emerald-700 transition-colors truncate">${props.nama}</h4>
                <p class="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">${props.alamat}</p>
                <div class="mt-3 flex items-center gap-2 flex-wrap">
                    <span class="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-semibold border border-var(--color-gray-200) truncate">
                        ${props.kota}
                    </span>
                    <span class="text-[11px] font-semibold ${isActive ? 'badge-active' : 'badge-closed'} px-2 py-1 rounded-md flex items-center gap-1">
                        <i class="fa-solid fa-circle text-[4px]"></i>
                        ${isActive ? 'Buka' : 'Tutup'}
                    </span>
                </div>
            </div>
        </div>
    `;

    item.addEventListener('click', () => {
        selectLocation(marker, item, lat, lng);
        if(window.innerWidth < 768) toggleSidebar();
    });

    return item;
}

// --- SELECT LOCATION (Main Logic) ---
function selectLocation(marker, sidebarItem, lat, lng) {
    // Reset previous marker
    if (currentActiveMarker) {
        if (currentActiveMarker._icon) {
            currentActiveMarker._icon.classList.remove('marker-selected');
        }
        currentActiveMarker.closePopup();
        try {
            // restore z-index offset for previous marker
            if (typeof currentActiveMarker.setZIndexOffset === 'function') currentActiveMarker.setZIndexOffset(0);
        } catch (e) { /* ignore */ }
    }

    // Reset previous sidebar item
    if (currentActiveItem) {
        currentActiveItem.classList.remove('ring-2', 'ring-emerald-400', 'bg-emerald-50');
    }

    // Set new state
    currentActiveMarker = marker;
    currentActiveItem = sidebarItem;

    // Highlight sidebar item
    if(sidebarItem) {
        sidebarItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        sidebarItem.classList.add('ring-2', 'ring-emerald-400', 'bg-emerald-50');
    }

    // Smooth map animation
    map.flyTo([lat, lng], 16, {
        animate: true,
        duration: 1.2
    });

    // Highlight marker
    setTimeout(() => {
        if (marker._icon) marker._icon.classList.add('marker-selected');
        try {
            if (typeof marker.setZIndexOffset === 'function') marker.setZIndexOffset(1000);
            if (typeof marker.bringToFront === 'function') marker.bringToFront();
        } catch (e) { /* ignore */ }
        marker.openPopup();
    }, 300);
}

// --- RENDER MITRA GRID ---
function renderMitra(data) {
    // Clean previous layers and clear any selected marker state
    if (currentActiveMarker) {
        if (currentActiveMarker._icon) currentActiveMarker._icon.classList.remove('marker-selected');
        try { if (typeof currentActiveMarker.setZIndexOffset === 'function') currentActiveMarker.setZIndexOffset(0); } catch(e){}
    }
    currentActiveMarker = null;
    currentActiveItem = null;
    markersLayer.clearLayers();
    const listContainer = document.getElementById('mitraList');
    listContainer.innerHTML = '';

    if(data.length === 0) {
        listContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-gray-400">
                <i class="fa-solid fa-map text-4xl mb-3 opacity-40"></i>
                <p class="text-sm font-medium">Tidak ada mitra ditemukan.</p>
                <p class="text-xs mt-1 opacity-70">Coba ubah filter atau pencarian</p>
            </div>`;
        return;
    }

    // Custom Marker Icon
    const qodhaIcon = L.icon({
        iconUrl: 'http://localhost/gis_mitraqodha/assets/img/marker_qodha.png',
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -50],
        className: 'marker-icon-custom'
    });

    // Render each marker and item
    data.forEach(feature => {
        const props = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;
        const isActive = props.status_aktif === '1';

        // Popup Content
        const popupContent = `
            <div class="w-full">
                <div class="h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 relative">
                    <div class="absolute -bottom-5 left-4 bg-white p-1 rounded-xl shadow-md border border-var(--color-gray-100)">
                        <img src="../assets/img/marker_qodha.png" class="w-12 h-12 object-contain"> 
                    </div>
                </div>
                <div class="pt-10 px-5 pb-5">
                    <h3 class="font-bold text-gray-800 text-base leading-snug">${props.nama}</h3>
                    <p class="text-sm text-gray-500 mt-2 leading-relaxed">${props.alamat}</p>
                    <p class="text-xs text-gray-400 mt-1">📍 ${props.kota}</p>
                    ${props.hp ? `
                        <a href="https://wa.me/${props.hp}" target="_blank" 
                           class="mt-4 flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-semibold text-sm transition-all shadow-emerald-300 shadow-lg">
                            <i class="fa-brands fa-whatsapp"></i> Chat WhatsApp
                        </a>
                    ` : ''}
                </div>
            </div>
        `;

        // Add Marker
        const marker = L.marker([lat, lng], { icon: qodhaIcon, title: props.nama })
            .bindPopup(popupContent, { maxWidth: 330 });
        
        markersLayer.addLayer(marker);

        // Create Sidebar Item
        const sidebarItem = createSidebarItem(props, lat, lng, marker);
        
        // Marker click event
        marker.on('click', () => {
            selectLocation(marker, sidebarItem, lat, lng);
        });

        listContainer.appendChild(sidebarItem);
    });
}

// --- FILTER FUNCTIONS ---
function filterByStatus(status) {
    currentFilter = status;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${status}"]`).classList.add('active');

    // Filter data
    let filtered = allMitraData;
    if (status === 'active') {
        filtered = allMitraData.filter(i => i.properties.status_aktif === '1');
    } else if (status === 'closed') {
        filtered = allMitraData.filter(i => i.properties.status_aktif !== '1');
    }

    renderMitra(filtered);
}

// --- SEARCH FUNCTIONALITY ---
document.getElementById('searchBox').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    let filtered = allMitraData.filter(i => 
        i.properties.nama.toLowerCase().includes(keyword) || 
        i.properties.alamat.toLowerCase().includes(keyword) ||
        i.properties.kota.toLowerCase().includes(keyword)
    );

    // Apply current filter
    if (currentFilter === 'active') {
        filtered = filtered.filter(i => i.properties.status_aktif === '1');
    } else if (currentFilter === 'closed') {
        filtered = filtered.filter(i => i.properties.status_aktif !== '1');
    }

    renderMitra(filtered);
});

// --- GEOLOCATION ---
function getLocation() {
    if (!navigator.geolocation) {
        alert('Fitur geolokasi tidak didukung browser Anda.');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            
            // Add user location marker
            L.circleMarker([latitude, longitude], {
                radius: 8,
                fillColor: '#3b82f6',
                color: '#fff',
                weight: 3,
                fillOpacity: 0.8
            }).addTo(map).bindPopup('<div class="text-sm font-semibold">📍 Lokasi Anda</div>');
            
            map.flyTo([latitude, longitude], 15, { duration: 1.5 });
        },
        (error) => {
            console.error('Geolocation error:', error);
            alert('Gagal mendeteksi lokasi. Pastikan GPS aktif.');
        }
    );
}

// --- UI TOGGLES ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('-translate-x-full');
}

function toggleDetailPanel() {
    const panel = document.getElementById('detailPanel');
    panel.classList.toggle('hidden');
}

// --- ERROR STATE ---
function showErrorState(message) {
    document.getElementById('mitraList').innerHTML = `
        <div class="flex flex-col items-center justify-center h-40 text-red-500">
            <i class="fa-solid fa-triangle-exclamation text-3xl mb-3"></i>
            <p class="text-sm font-medium">${message}</p>
        </div>`;
}

// --- INIT ---
window.addEventListener('DOMContentLoaded', () => {
    loadData();
});

// Responsive adjustments
window.addEventListener('resize', () => {
    if(window.innerWidth >= 768) {
        document.getElementById('sidebar').classList.remove('-translate-x-full');
    }
});
