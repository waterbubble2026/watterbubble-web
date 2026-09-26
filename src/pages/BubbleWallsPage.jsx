import { useState } from 'react';
import { Link } from 'react-router-dom';
import allImages from '../data/projectImages.json';

const BubbleWallsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryImages = allImages
    .filter(img => img.startsWith("projects/Bubble Wall/"))
    .map(img => `/${img}`);

  return (
    <div className="w-full flex flex-col flex-grow">
      {/* Hero Section */}
      <section
        className="w-full relative bg-cover bg-center flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-24"
        style={{ backgroundImage: "url('/bubble-cover.png')", minHeight: '40vh' }}
      >
        <div className="absolute inset-0 bg-[#050B14]/70 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-teal-900/40 pointer-events-none"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-light tracking-wide uppercase text-center mt-12">
          BUBBLE WALLS | BUBBLE TANKS
        </h1>
      </section>

      {/* Content Section */}
      <section className="w-full relative bg-[#f4f4f4] py-16 md:py-24">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>

        <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10 flex flex-col">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Column */}
            <div className="flex flex-col space-y-6 text-gray-600 text-sm leading-relaxed font-light">
              <p className="text-xl md:text-2xl text-gray-400 font-light leading-snug">
                <strong className="text-gray-700 font-bold">Bubble walls</strong> and <strong className="text-gray-700 font-bold">bubble tanks</strong> create powerful visual statements that instantly enhance the atmosphere of any interior environment.
              </p>
              <p>
                Combining the natural movement of flowing water with lighting, texture, and contemporary design, these installations bring a sense of luxury, tranquility, and sophistication to commercial spaces.
              </p>
              <p>
                Perfect for reception areas, entrance lobbies, VIP lounges, hotels, restaurants, spas, retail environments, and high-end bar installations, bespoke bubble features provide a striking focal point that captures attention while creating a calming and immersive ambience. Whether used as a standalone architectural feature or integrated into a wider interior design scheme, dynamic bubbles introduce movement, sound, and visual depth that transforms the overall feel of a space.
              </p>
              <p>
                At <strong className="text-gray-700 font-bold">Water Bubble Walls</strong>, we specialise in the design, manufacture, and installation of custom-built <strong className="text-gray-700 font-bold">bubble walls</strong> and <strong className="text-gray-700 font-bold">bubble tanks</strong> tailored entirely to the client's vision, environment, and technical requirements. We produce installations of every scale, from compact decorative features to large architectural statement pieces for luxury commercial interiors.
              </p>
              <p>
                Every feature is individually made to measure at our Udaipur, Rajasthan studio using premium materials, precision engineering, and high-quality components to ensure exceptional craftsmanship, durability, and long-term reliability. We offer complete flexibility in size, finishes, lighting effects, branding integration, and water flow design, allowing each installation to complement its surroundings perfectly.
              </p>
              <p>
                With over <strong className="text-gray-700 font-bold italic">21 years of experience</strong> creating bespoke commercial water features across the India, <strong className="text-gray-700 font-bold">Water Bubble Walls</strong> delivers fully managed solutions from initial concept and design through to manufacture and final installation.
              </p>

              {/* Contact Button */}
              <div className="mt-8 pt-4">
                <Link to="/contact" className="border-2 border-[#88cdeb] text-[#88cdeb] font-semibold tracking-widest text-xs uppercase py-3 px-8 rounded-sm hover:bg-[#88cdeb] hover:text-white transition-colors text-center inline-block">Contact Us</Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <img src="/bubble-walls/1.png" alt="Detail 1" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="/bubble-walls/2.png" alt="Detail 2" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="/bubble-walls/3.png" alt="Detail 3" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="/bubble-walls/4.png" alt="Detail 4" className="w-full aspect-square object-cover rounded-xl shadow-md" />
              </div>

              <div className="mt-8 text-gray-600 text-sm leading-relaxed font-light space-y-4">
                <p>
                  Our <strong className="text-gray-700 font-bold">bubble walls</strong> are designed not only to create impressive visual impact, but also to provide dependable performance and low-maintenance operation for years to come.
                </p>
                <p>
                  Whether you require a contemporary glass bubble wall, a textured cascading feature, or a large-scale architectural <strong className="text-gray-700 font-bold">bubble installation</strong>, <strong className="text-gray-700 font-bold">Water Bubble Walls</strong> creates bespoke solutions designed to elevate interiors and create unforgettable spaces.
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Gallery Section */}
      <section id="gallery" className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1 p-1 bg-white auto-rows-[150px] md:auto-rows-[200px]">
        {galleryImages.map((src, idx) => (
          <div key={idx} className="relative w-full h-full overflow-hidden group cursor-pointer" onClick={() => setSelectedImage(src)}>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <img src={src} alt={`Gallery Image ${idx + 1}`} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
          </div>
        ))}
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-sm cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 z-[101] bg-black/50 rounded-full p-2"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img src={selectedImage} alt="Fullscreen Gallery" className="max-w-full max-h-full object-contain shadow-2xl rounded-sm" />
        </div>
      )}
    </div>
  );
};

export default BubbleWallsPage;
