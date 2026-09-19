
const BubbleTubesPage = () => {
  return (
    <div className="w-full flex flex-col flex-grow">
      {/* Hero Section */}
      <section
        className="w-full relative bg-cover bg-center flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-24"
        style={{ backgroundImage: "url('/bubble-cover.png')", minHeight: '50vh' }}
      >
        <div className="absolute inset-0 bg-[#050B14]/70 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 to-green-900/40 pointer-events-none"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-light tracking-wide uppercase text-center mt-12">
          BUBBLE TUBES
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
                <strong className="text-gray-700 font-bold">Bubble tubes</strong> are designed to add a unique calming visual effect to a wide variety of retail, leisure, and exhibition spaces, and are especially perfect for sensory rooms.
              </p>
              <p>
                Combining the natural movement of flowing water with lighting, texture, and contemporary design, these installations bring a sense of luxury, tranquility, and sophistication to commercial spaces.
              </p>
              <p>
                Perfect for reception areas, entrance lobbies, VIP lounges, hotels, restaurants, spas, retail environments, and high-end bar installations, bespoke bubble features provide a striking focal point that captures attention while creating a calming and immersive ambience.
              </p>
              <p>
                At <strong className="text-gray-700 font-bold">H2o Designs</strong>, we specialise in the design, manufacture, and installation of custom-built <strong className="text-gray-700 font-bold">bubble tubes</strong> tailored entirely to the client's vision, environment, and technical requirements.
              </p>
              <p>
                Every feature is individually made to measure at our Lancashire studio using premium materials, precision engineering, and high-quality components to ensure exceptional craftsmanship, durability, and long-term reliability. We offer complete flexibility in size, finishes, lighting effects, branding integration, and water flow design.
              </p>
              <p>
                With over <strong className="text-gray-700 font-bold italic">21 years of experience</strong> creating bespoke commercial water features across the UK and Europe, <strong className="text-gray-700 font-bold">H2o Designs</strong> delivers fully managed solutions from initial concept and design through to manufacture and final installation.
              </p>

              {/* Contact Button */}
              <div className="mt-8 pt-4">
                <button className="border-2 border-[#88cdeb] text-[#88cdeb] font-semibold tracking-widest text-xs uppercase py-3 px-8 rounded-sm hover:bg-[#88cdeb] hover:text-white transition-colors">
                  Contact Us
                </button>
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
                  Our <strong className="text-gray-700 font-bold">bubble tubes</strong> are designed not only to create impressive visual impact, but also to provide dependable performance and low-maintenance operation for years to come.
                </p>
                <p>
                  Whether you require a contemporary glass tube, a textured cascading feature, or a large-scale architectural <strong className="text-gray-700 font-bold">bubble installation</strong>, <strong className="text-gray-700 font-bold">H2o Designs</strong> creates bespoke solutions designed to elevate interiors and create unforgettable spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BubbleTubesPage;
