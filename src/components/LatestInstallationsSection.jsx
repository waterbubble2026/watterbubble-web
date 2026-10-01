import { useState, useEffect } from 'react';

const LatestInstallationsSection = () => {
  const [installations, setInstallations] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchInstallations = async () => {
      try {
        const res = await fetch('/api/latest-installations');
        const data = await res.json();
        setInstallations(data);
      } catch (err) {
        console.error('Failed to fetch latest installations', err);
      }
    };
    fetchInstallations();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  if (installations.length === 0) return null;

  return (
    <section
      className="w-full py-20 relative bg-cover bg-center bg-no-repeat z-10"
      style={{ backgroundImage: "url('/liningbg.png')" }}
    >
      <div className="absolute inset-0 bg-[#020b24]/40 pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-medium text-white text-center mb-16 tracking-wide">
          Latest Installations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {installations.map((item, index) => (
            <div key={item._id || index} className="bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col h-full transform transition-transform duration-500 hover:-translate-y-2">
              <div className="h-48 overflow-hidden cursor-pointer group" onClick={() => openModal(item)}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow items-center text-center">
                <h3 className="text-[#3b82f6] text-xl font-bold mb-4 px-2 leading-snug">
                  {item.title}
                </h3>
                {/* Apply line-clamp-3 so it truncates to max 3 lines */}
                <p className="text-gray-500 text-sm mb-8 font-light leading-relaxed flex-grow line-clamp-3">
                  {item.description}
                </p>
                <button 
                  onClick={() => openModal(item)}
                  className="bg-[#333333] hover:bg-black text-white text-xs font-semibold py-3 px-8 transition-colors tracking-widest uppercase rounded-sm mt-auto shadow-md"
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full p-2 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="h-64 sm:h-80 relative flex-shrink-0">
              <img src={selectedItem.imageUrl} alt={selectedItem.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <h3 className="absolute bottom-4 left-6 right-6 text-white text-2xl font-bold drop-shadow-md">
                {selectedItem.title}
              </h3>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto">
              <p className="text-gray-700 leading-relaxed font-light whitespace-pre-wrap">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestInstallationsSection;
