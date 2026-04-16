// --- 1. DEFINISI TIPE DATA ---
export interface Mitra {
  id: string;
  nama_toko: string;
  level: 'Distributor' | 'Agen' | 'Reseller';
  kecamatan: string;
  alamat_lengkap: string;
  lat: number;
  lng: number;
  no_wa: string;
  distance?: number; // Jarak kalkulasi (opsional)
}

// --- 2. DATA DUMMY ---
// Nanti ini bisa dihapus jika Anda sudah full menggunakan fetch API dari MySQL
export const mockMitra: Mitra[] = [
  { id: '1', nama_toko: 'Qodha Center Jakarta', level: 'Distributor', kecamatan: 'Kebayoran Baru', alamat_lengkap: 'Jl. Melawai Raya No. 12, Jakarta Selatan', lat: -6.244, lng: 106.800, no_wa: '628111' },
  { id: '2', nama_toko: 'Aroma Sunnah Bintaro', level: 'Agen', kecamatan: 'Pondok Aren', alamat_lengkap: 'Ruko Emerald Bintaro Sektor 7', lat: -6.275, lng: 106.711, no_wa: '628222' },
  { id: '3', nama_toko: 'Berkah Bukhur', level: 'Reseller', kecamatan: 'Ciputat Timur', alamat_lengkap: 'Jl. WR Supratman, Kp. Utan', lat: -6.301, lng: 106.758, no_wa: '628333' },
  { id: '4', nama_toko: 'Grosir Wangi Depok', level: 'Distributor', kecamatan: 'Margonda', alamat_lengkap: 'Jl. Margonda Raya No. 100', lat: -6.373, lng: 106.833, no_wa: '628444' },
  { id: '5', nama_toko: 'Reseller Qodha Pamulang', level: 'Reseller', kecamatan: 'Pamulang', alamat_lengkap: 'Pamulang Permai 1 Blok A', lat: -6.345, lng: 106.732, no_wa: '628555' },
];

// --- 3. ALGORITMA HAVERSINE FORMULA ---
// Mengkalkulasi jarak lurus (Garis Udara) antara dua titik koordinat bumi dalam KM.
// Ini adalah poin plus untuk Skripsi S1 (Matematika Geospasial).
export const calculateHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius Bumi dalam Kilometer
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};