import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="w-full flex flex-col flex-grow">
      {/* Hero Section */}
      <section
        className="w-full relative bg-cover bg-center flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-24"
        style={{ backgroundImage: "url('/bubble-cover.png')", minHeight: '40vh' }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-light tracking-wide uppercase text-center mt-12">
          About Water Bubble Walls
        </h1>
      </section>

      {/* Content Section */}
      <section className="w-full relative bg-[#f4f4f4] py-16 md:py-24" style={{ minHeight: '150vh' }}>
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>

        <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10 flex flex-col">
          <h2 className="text-[#1EA4DE] text-4xl md:text-[48px] font-light mb-10">
            Inside Our Bubble
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 text-gray-600 text-sm leading-relaxed font-light">
            {/* Left Column */}
            <div className="flex flex-col space-y-6">
              <p className="text-xl md:text-2xl text-black font-light leading-snug">
                <strong className="text-[#999999] font-bold">Water Bubble Walls</strong> is a leading specialist in India in the design, manufacture, and installation of bespoke <strong className="text-[#999999] font-bold">interior water features</strong> for commercial, hospitality, and luxury environments.
              </p>
              <p className="text-black text-[16px]">
                Based in Udaipur, Rajasthan, we have over 21 years of industry experience creating high-quality custom water installations for clients throughout the India.
              </p>
              <p className="text-black text-[16px]">
                We specialise in producing visually striking, fully bespoke water features, including custom <strong className="text-[#999999] font-bold">water walls, bubble walls, bubble tanks, bubble tubes, indoor water walls</strong>. Our work is trusted by leading brands, hotels, restaurants, bars, retail spaces, exhibition venues, and corporate environments looking to create memorable interior experiences that leave a lasting impression.
              </p>
              <p className="text-black text-[16px]">
                Every project is carefully designed and manufactured in-house at our Udaipur, Rajasthan studio, allowing us to maintain complete control over quality, craftsmanship, and technical performance. By combining innovative design concepts with precision engineering and durable, high-quality materials, we create water features that are both visually impressive and built for long-term reliability.
              </p>
              <p className="text-black text-[16px]">
                At <strong className="text-[#999999] font-bold">Water Bubble Walls</strong>, we understand that every space is unique. That is why every installation is individually tailored to suit the client's vision, branding, spatial requirements, and technical specifications.
              </p>
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-6">
              <p className="text-black text-[16px]">
                From contemporary reception water walls and feature cascades to bespoke bubble systems and statement bar displays, our team works closely with clients to deliver installations that enhance atmosphere, improve customer experience, and elevate interior design.
              </p>
              <p className="text-black text-[16px]">
                Our bespoke <strong className="text-[#999999] font-bold">commercial water features</strong> are widely used across hotels, restaurants, bars, reception areas, spas, showrooms, retail environments, offices, and exhibition spaces, helping businesses create immersive and luxurious interiors that stand out from the competition.
              </p>
              <p className="text-black text-[16px]">
                From the initial concept and design consultation through to manufacture, delivery, and final installation, <strong className="text-[#999999] font-bold">Water Bubble Walls</strong> provides a complete fully managed service. Our experienced team is committed to delivering exceptional workmanship, innovative solutions, and outstanding customer service on every project, regardless of size or complexity.
              </p>
              <p className="text-black text-[16px]">
                Whether you require a stunning statement water wall, a custom-built bubble feature, an illuminated back bar display, or a complete commercial water feature installation, <strong className="text-[#999999] font-bold">Water Bubble Walls</strong> delivers bespoke solutions designed to transform interiors and create unforgettable visual impact.
              </p>
              <p className="text-[#1EA4DE] text-2xl md:text-3xl font-light mt-4">
                Who said water has no taste!
              </p>
            </div>
          </div>

          {/* 4 Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <img src="/about/grid1.png" alt="Gallery 1" className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md" />
            <img src="/about/grid2.png" alt="Gallery 2" className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md" />
            <img src="/about/grid3.png" alt="Gallery 3" className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md" />
            <img src="/about/grid4.png" alt="Gallery 4" className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md" />
          </div>

          {/* Contact Button */}
          <div className="mt-12">
            <Link to="/contact" className="border-2 border-[#1EA4DE] text-[#1EA4DE] font-semibold tracking-widest text-xs uppercase py-3 px-8 rounded-sm hover:bg-[#1EA4DE] hover:text-white transition-colors text-center inline-block">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
