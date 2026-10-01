import { useState, useEffect } from 'react';

const ProjectsPage = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await fetch('/api/subcategories');
        const data = await res.json();
        setSubcategories(data);
        if (data.length > 0) {
          setActiveTab(data[0].name);
        }
      } catch (err) {
        console.error('Failed to fetch subcategories', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubs();
  }, []);

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
        <div className="absolute inset-0 bg-[#050B14]/60 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-black/30 pointer-events-none"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-light tracking-wide uppercase text-center mt-12">
          PROJECTS | WATER FEATURES
        </h1>
      </section>

      {/* Intro Content */}
      <section className="w-full max-w-screen-xl mx-auto px-6 md:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div className="flex flex-col text-gray-600 text-sm leading-relaxed font-light">
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-snug mb-6">
              At <strong className="text-gray-700 font-bold">Water Bubble Walls</strong>, we believe that every project should be as unique as the space it enhances. That is why every <strong className="text-[#5ea2d8] font-semibold">water wall</strong>, water feature, <strong className="text-[#5ea2d8] font-semibold">bubble wall</strong>, and <strong className="text-[#5ea2d8] font-semibold">bubble tank</strong> we create is individually designed and handcrafted to meet the precise requirements, vision, and objectives of each client.
            </p>
            <p className="mb-4">
              Rather than offering off-the-shelf products, we take a bespoke approach to every commission, ensuring that each installation is tailored to complement its surroundings while delivering a striking visual impact.
            </p>
            <p>
              Our experienced design and fabrication team works closely with architects, interior designers, contractors, and private clients to transform ideas into stunning water features that become focal points within residential, commercial, hospitality, healthcare, and public environments. From the initial concept and design stage through to manufacturing, installation, and final commissioning, every aspect of the process is carefully managed to ensure exceptional quality and attention to detail.
            </p>
          </div>
          <div className="flex flex-col text-gray-600 text-sm leading-relaxed font-light space-y-4">
            <p>
              Whether the requirement is for a contemporary water wall that creates a sense of tranquility, an illuminated bubble wall that adds movement and visual interest, or a custom-designed bubble tank that enhances an interior space, each feature is built using premium materials and crafted to the highest standards. We understand that every project presents its own challenges and opportunities, which is why we tailor dimensions, finishes, lighting options, branding elements, and technical specifications to suit the unique needs of each installation.
            </p>
            <p>
              Over the years, Water Bubble Walls has successfully delivered a wide range of bespoke water features for clients across numerous sectors, creating installations that combine innovative design, expert craftsmanship, and reliable performance. Our portfolio showcases the versatility of our work and demonstrates our commitment to delivering exceptional results, regardless of project size or complexity.
            </p>
            <p>
              Below, you will find a selection of example projects that highlight the quality, creativity, and bespoke nature of our work. These installations provide an insight into the wide range of custom water features we have designed and manufactured, illustrating how Water Bubble Walls transforms individual concepts into captivating and memorable centerpieces.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center md:justify-start">
          {isLoading ? (
            <p className="text-gray-500">Loading categories...</p>
          ) : subcategories.length === 0 ? (
            <p className="text-gray-500">No projects found.</p>
          ) : (
            subcategories.map((sub) => (
              <button
                key={sub._id}
                onClick={() => {
                  setActiveTab(sub.name);
                  setVisibleCount(8);
                }}
                className={`px-6 py-2 rounded shadow-sm text-sm tracking-wide transition-colors ${
                  activeTab === sub.name
                    ? "bg-[#5ea2d8] text-white"
                    : "bg-white text-[#5ea2d8] hover:bg-gray-50"
                }`}
              >
                {sub.name}
              </button>
            ))
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full max-w-screen-xl mx-auto px-6 md:px-12 pb-16">
        {filteredImages.length === 0 && !isLoading ? (
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
                    alt={`Project ${idx}`} 
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
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  className="px-8 py-3 bg-[#5ea2d8] text-white rounded shadow-sm hover:bg-[#4a89bd] transition-colors text-sm tracking-wider uppercase"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && filteredImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          {/* Close Button */}
          <button 
            onClick={closeLightbox} 
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white z-[60] p-2 bg-black/30 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-2 md:left-8 text-white/70 hover:text-white z-[60] p-2 bg-black/30 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Main Content (Image/Video) */}
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

          {/* Next Button */}
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

export default ProjectsPage;
