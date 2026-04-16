// Format Rupiah Reusable
export const formatRupiah = (angka: number | string) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(angka));
};

// Statistik Produk (Dari rekapitulasi Katalog 2026)
export const productStats = [
  { count: 95, label: 'Total SKU Produk', icon: 'fa-boxes-stacked', highlight: true },
  { count: 26, label: 'Varian Dupa Kerucut', icon: 'fa-fire-flame-curved' },
  { count: 19, label: 'Aroma Parfum (6ml)', icon: 'fa-spray-can' },
  { count: 17, label: 'Varian Dupa Pelor', icon: 'fa-circle-dot' },
  { count: 14, label: 'Varian Bukhur Kayu', icon: 'fa-cloud' }
];

// Kategori Beranda
export const homeCategories = [
  { id: 'bukhur', icon: 'fa-cloud', bg: 'bg-stone-50', col: 'text-stone-600', name: 'Bukhur' },
  { id: 'dupa', icon: 'fa-fire-flame-curved', bg: 'bg-orange-50', col: 'text-orange-500', name: 'Dupa' },
  { id: 'hio', icon: 'fa-wind', bg: 'bg-red-50', col: 'text-red-500', name: 'Hio Stick' },
  { id: 'parfum', icon: 'fa-spray-can', bg: 'bg-purple-50', col: 'text-purple-500', name: 'Parfum' }
];

// Value Propositions (Keunggulan)
export const valuePropositions = [
  { icon: 'fa-tags', title: 'Harga Terjangkau', desc: 'Kualitas tinggi, harga bersaing.' },
  { icon: 'fa-box-open', title: 'Packaging Mewah', desc: 'Elegan, cocok untuk hadiah.' },
  { icon: 'fa-wind', title: 'Aroma Terkenal', desc: 'Pilihan aroma best-seller.' },
  { icon: 'fa-mosque', title: 'Bernilai Ibadah', desc: 'Meningkatkan kekhusyukan.' },
  { icon: 'fa-hand-holding-dollar', title: 'Harga Termurah', desc: 'Langsung dari produsen.' },
  { icon: 'fa-headset', title: 'Support Penjualan', desc: 'Bantuan penuh untuk mitra.' },
  { icon: 'fa-photo-film', title: 'Konten Promosi', desc: 'Bank foto & video siap pakai.' },
  { icon: 'fa-handshake', title: 'Kekeluargaan', desc: 'Hubungan mitra yang amanah.' }
];