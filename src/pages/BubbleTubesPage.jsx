import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BubbleTubesPage = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Lightbox & Pagination State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(10);

  const location = useLocation();
  const tabParam = new URLSearchParams(location.search).get('tab');

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await fetch('/api/subcategories');
        const data = await res.json();
        const bubbleTubeSubs = data.filter(sub => sub.mainCategory === 'Bubble Tubes');
        setSubcategories(bubbleTubeSubs);
        if (bubbleTubeSubs.length > 0) {
          if (tabParam && bubbleTubeSubs.some(sub => sub.name === tabParam)) {
            setActiveTab(tabParam);
          } else {
            setActiveTab(bubbleTubeSubs[0].name);
          }
        }
      } catch (err) {
        console.error('Failed to fetch subcategories', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubs();
  }, []); // Only fetch on mount

  useEffect(() => {
    if (tabParam && subcategories.some(sub => sub.name === tabParam)) {
      setActiveTab(tabParam);
      setVisibleCount(10);
    }
  }, [tabParam, subcategories]);

  const activeSubcategory = subcategories.find(sub => sub.name === activeTab);
  const filteredImages = activeSubcategory?.images || [];
  const displayedImages = filteredImages.slice(0, visibleCount);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const goToPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="w-full flex flex-col flex-grow bg-[#f4f4f4]">
      {/* Hero Section */}
      <section
        className="w-full relative bg-cover bg-center flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-24"
        style={{ backgroundImage: "url('/bubble-cover.png')", minHeight: '40vh' }}
      >
        <div className="absolute inset-0 bg-[#050B14]/70 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 to-green-900/40 pointer-events-none"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-light tracking-wide uppercase text-center mt-12">
          BUBBLE TUBES
        </h1>
      </section>

      {/* Content Section */}
      <section className="w-full relative py-16 md:py-24">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>

        <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10 flex flex-col">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Column */}
            <div className="flex flex-col space-y-6 text-gray-600 text-sm leading-relaxed font-light">
              <p className="text-xl md:text-2xl text-gray-400 font-light leading-snug">
                <strong className="text-[#999999] font-bold">Bubble tubes</strong> are designed to add a unique calming visual effect to a wide variety of retail, leisure, and exhibition spaces, and are especially perfect for sensory rooms.
              </p>
              <p>
                Combining the natural movement of flowing water with lighting, texture, and contemporary design, these installations bring a sense of luxury, tranquility, and sophistication to commercial spaces.
              </p>
              <p>
                Perfect for reception areas, entrance lobbies, VIP lounges, hotels, restaurants, spas, retail environments, and high-end bar installations, bespoke bubble features provide a striking focal point that captures attention while creating a calming and immersive ambience.
              </p>
              <p>
                At <strong className="text-[#999999] font-bold">Water Bubble Walls</strong>, we specialise in the design, manufacture, and installation of custom-built <strong className="text-[#999999] font-bold">bubble tubes</strong> tailored entirely to the client's vision, environment, and technical requirements.
              </p>
              <p>
                Every feature is individually made to measure at our Udaipur, Rajasthan studio using premium materials, precision engineering, and high-quality components to ensure exceptional craftsmanship, durability, and long-term reliability. We offer complete flexibility in size, finishes, lighting effects, branding integration, and water flow design.
              </p>
              <p>
                With over <strong className="text-[#999999] font-bold italic">21 years of experience</strong> creating bespoke commercial water features across the India, <strong className="text-[#999999] font-bold">Water Bubble Walls</strong> delivers fully managed solutions from initial concept and design through to manufacture and final installation.
              </p>

              {/* Contact Button */}
              <div className="mt-8 pt-4">
                <Link to="/contact" className="border-2 border-[#1EA4DE] text-[#1EA4DE] font-semibold tracking-widest text-xs uppercase py-3 px-8 rounded-sm hover:bg-[#1EA4DE] hover:text-white transition-colors text-center inline-block">Contact Us</Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <img src="/bubble-tubes/1.png" alt="Detail 1" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="/bubble-tubes/3.png" alt="Detail 2" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="/bubble-tubes/4.png" alt="Detail 3" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="/bubble-tubes/2.png" alt="Detail 4" className="w-full aspect-square object-cover rounded-xl shadow-md" />
              </div>

              <div className="mt-8 text-gray-600 text-sm leading-relaxed font-light space-y-4">
                <p>
                  Our <strong className="text-[#999999] font-bold">bubble tubes</strong> are designed not only to create impressive visual impact, but also to provide dependable performance and low-maintenance operation for years to come.
                </p>
                <p>
                  Whether you require a contemporary glass tube, a textured cascading feature, or a large-scale architectural <strong className="text-[#999999] font-bold">bubble installation</strong>, <strong className="text-[#999999] font-bold">Water Bubble Walls</strong> creates bespoke solutions designed to elevate interiors and create unforgettable spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Subcategories & Gallery Section */}
      <section id="subcategories" className="w-full max-w-screen-xl mx-auto px-6 md:px-12 py-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-12 text-gray-500">Loading categories...</div>
        ) : subcategories.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No categories available yet.</div>
        ) : (
          <>
            {/* Tabs */}
            <div className="mb-12 flex flex-wrap gap-4 justify-center md:justify-start">
              {subcategories.map((sub) => (
                <button
                  key={sub._id}
                  onClick={() => {
                    setActiveTab(sub.name);
                    setVisibleCount(10);
                  }}
                  className={`px-6 py-2 rounded shadow-sm text-sm tracking-wide transition-colors ${activeTab === sub.name
                    ? "bg-[#1EA3DE] text-white"
                    : "bg-white text-[#1EA3DE] hover:bg-gray-50"
                    }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>

            {/* Images Grid */}
            {filteredImages.length === 0 ? (
              <div className="text-center text-gray-500 py-12">No images found for this category.</div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {displayedImages.map((img, idx) => (
                    <div
                      key={img._id}
                      className="w-full aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all group bg-gray-200"
                      onClick={() => openLightbox(idx)}
                    >
                      <img
                        src={img.url}
                        alt={`${activeTab} ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>

                {visibleCount < filteredImages.length && (
                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 10)}
                      className="px-8 py-3 bg-[#1EA3DE] text-white rounded shadow-sm hover:bg-[#4a89bd] transition-colors text-sm tracking-wider uppercase"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && filteredImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white z-[60] p-2 bg-black/30 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-2 md:left-8 text-white/70 hover:text-white z-[60] p-2 bg-black/30 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className="w-full h-full flex items-center justify-center px-4 md:px-24 py-12"
            onClick={closeLightbox}
          >
            <img
              src={filteredImages[currentImageIndex].url}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-2 md:right-8 text-white/70 hover:text-white z-[60] p-2 bg-black/30 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default BubbleTubesPage;
