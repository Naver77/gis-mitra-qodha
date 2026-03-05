import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';

// 1. IMPORT HALAMAN HOME ASLI (Dari folder pages)
import Home from './pages/Home';

// Komponen Halaman Partnership (Sementara)
// Catatan: const Home sementara sudah kita hapus agar tidak bentrok
const Partnership = () => <div className="pt-32 p-8 min-h-[800px]"><h1 className="text-4xl font-bold">Halaman Kemitraan</h1></div>;

function App() {
  // Global State untuk Modal Lead Capture
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState('');

  // Fungsi untuk membuka modal dari komponen manapun
  const triggerLeadModal = (context: string) => {
    setModalContext(context);
    setIsModalOpen(true);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 antialiased selection:bg-brand-gold selection:text-white">
        
        {/* Navbar Global */}
        <Header />
        
        {/* Area Konten Utama yang berganti-ganti (Routing) */}
        <main className="flex-grow w-full relative pt-[85px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/partnership" element={<Partnership />} />
            {/* Nanti kita tambah route lain di sini */}
          </Routes>
        </main>

        {/* Footer Global (Termasuk Tombol WA Melayang) */}
        <Footer onFloatingWaClick={() => triggerLeadModal("Pertanyaan Umum (Dari Tombol Melayang Bawah)")} />

        {/* Modal Global yang Siap Dipanggil Kapan Saja */}
        <LeadModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          sourceContext={modalContext} 
        />

      </div>
    </Router>
  );
}

export default App;