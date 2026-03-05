import React from 'react';

const Stats: React.FC = () => {
  const statsData = [
    { count: 95, label: 'Total SKU Produk', icon: 'fa-boxes-stacked', highlight: true },
    { count: 26, label: 'Varian Dupa Kerucut', icon: 'fa-fire-flame-curved' },
    { count: 19, label: 'Aroma Parfum', icon: 'fa-spray-can' },
    { count: 15, label: 'Mitra Aktif', icon: 'fa-handshake' },
    { count: 5, label: 'Provinsi', icon: 'fa-map-location-dot' }
  ];

  return (
    <section className="bg-gray-800 py-12 border-y border-gray-700 relative overflow-hidden group">
      {/* Dekorasi background */}
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl group-hover:bg-brand-green/30 transition duration-700"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x divide-gray-700/50">
          {statsData.map((st, idx) => (
            <div key={idx} className="p-2 flex flex-col items-center justify-center group/item">
              <div className={`text-4xl md:text-5xl font-extrabold mb-2 transition duration-300 transform group-hover/item:scale-110 ${st.highlight ? 'text-brand-gold' : 'text-white'}`}>
                {st.count}<span className="text-lg align-top opacity-50">+</span>
              </div>
              <div className="text-xs md:text-sm text-gray-400 font-medium uppercase tracking-widest flex items-center justify-center gap-2">
                <i className={`fa-solid ${st.icon} ${st.highlight ? 'text-brand-gold' : 'text-gray-500'}`}></i>
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;