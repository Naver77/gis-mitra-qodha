import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 md:py-32 flex items-center relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <span className="text-brand-gold font-extrabold uppercase tracking-widest text-sm bg-yellow-50 px-4 py-1.5 rounded-full inline-block mb-6 border border-yellow-100">
            Cerita Kami
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
            Menghadirkan Ketenangan <br/> dalam Setiap <span className="text-brand-gold">Helaan Napas</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-16 max-w-3xl mx-auto">
            Berawal dari keinginan untuk menghadirkan ketenangan dalam ibadah, Qodha Aromatic lahir sebagai produsen wewangian Sunnah yang mengutamakan kualitas bahan alami. Kami percaya bahwa aroma yang baik dapat meningkatkan kekhusyukan, kenyamanan, dan membawa memori indah bagi siapapun yang menciumnya.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-8 bg-gray-50 rounded-4xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-leaf text-3xl text-brand-green"></i>
              </div>
              <h3 className="font-extrabold text-gray-900 text-xl mb-3">100% Natural</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Menggunakan bahan dasar kayu gaharu, cendana, dan ekstrak bunga asli tanpa campuran bahan kimia berbahaya yang memicu alergi.
              </p>
            </div>
            
            <div className="p-8 bg-gray-50 rounded-4xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-star text-3xl text-brand-gold"></i>
              </div>
              <h3 className="font-extrabold text-gray-900 text-xl mb-3">Kualitas Premium</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Proses produksi yang higienis dengan *quality control* ketat untuk memastikan konsistensi dan ketahanan aroma yang maksimal.
              </p>
            </div>
            
            <div className="p-8 bg-gray-50 rounded-4xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-users text-3xl text-blue-500"></i>
              </div>
              <h3 className="font-extrabold text-gray-900 text-xl mb-3">Pemberdayaan Umat</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Mendukung ekonomi kreatif dengan membuka peluang kemitraan bisnis bagi siapa saja yang ingin merintis usaha mandiri.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}