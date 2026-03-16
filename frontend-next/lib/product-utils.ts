export const mainCategories = ["Semua", "Bukhur", "Dupa", "Hio", "Parfum", "Perlengkapan", "Paket Hemat"];

export const getMainCategory = (subCategoryName: string) => {
  const lower = subCategoryName.toLowerCase();
  if (lower.includes('bukhur')) return 'Bukhur';
  if (lower.includes('hio')) return 'Hio'; 
  if (lower.includes('dupa') || lower.includes('pelor')) return 'Dupa';
  if (lower.includes('parfum') || lower.includes('kasturi')) return 'Parfum';
  if (lower.includes('paket')) return 'Paket Hemat';
  if (lower.includes('aksesoris') || lower.includes('prapen') || lower.includes('perlengkapan') || lower.includes('mabkhara')) return 'Perlengkapan';
  return 'Lainnya';
};

export const getCategoryIcon = (catName: string) => {
  const lower = catName.toLowerCase();
  if (lower.includes('bukhur')) return 'fa-fire-burner';
  if (lower.includes('dupa')) return 'fa-spa';
  if (lower.includes('hio')) return 'fa-seedling';
  if (lower.includes('parfum')) return 'fa-bottle-droplet';
  if (lower.includes('paket')) return 'fa-gift';
  if (lower.includes('perlengkapan') || lower.includes('aksesoris')) return 'fa-shapes';
  return 'fa-crown'; 
};

export const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
};