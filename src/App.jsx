import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
const FeaturesSection = () => {
  const features = [
    {
      number: '01',
      title: 'Water Walls',
      description: 'Water Walls and Waterfalls are perfect for architectural displays, reception features, entrance lobbies, VIP lounges and sophisticated bars.',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600',
      bgColor: 'bg-[#091534]',
      titleColor: 'text-[#2f7cc5]',
      buttonColor: 'border-[#2f7cc5] text-[#2f7cc5] hover:bg-[#2f7cc5] hover:text-white',
    },
    {
      number: '02',
      title: 'Bubble Walls',
      description: 'Because all our Bubble Walls are individually designed and manufactured by us we can ensure that they will perfectly fit your requirements.',
      image: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=600',
      bgColor: 'bg-[#4a7c99]',
      titleColor: 'text-[#81b5d6]',
      buttonColor: 'border-[#81b5d6] text-[#81b5d6] hover:bg-[#81b5d6] hover:text-[#091534]',
    },
    {
      number: '03',
      title: 'Bubble Tubes',
      description: 'Our bubble tubes are designed to add a unique calming visual effect to a wide variety of retail, leisure and exhibition spaces perfect for sensory rooms.',
      image: 'https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=600',
      bgColor: 'bg-[#a4c9eb]',
      titleColor: 'text-[#5597d2]',
      buttonColor: 'border-[#5597d2] text-[#5597d2] hover:bg-[#5597d2] hover:text-white',
    }
  ];

  return (
    <section className="w-full flex flex-col lg:flex-row relative z-10">
      {features.map((feature, index) => (
        <div key={index} className={`flex-1 ${feature.bgColor} p-8 md:p-12 lg:p-16 flex flex-col`}>
          <div className="text-5xl md:text-6xl font-light text-white mb-2">
            {feature.number}
          </div>
          <h2 className={`text-3xl md:text-4xl font-light ${feature.titleColor} mb-6`}>
            {feature.title}
          </h2>
          <p className="text-xs md:text-sm text-white mb-10 leading-relaxed font-light min-h-[60px]">
            {feature.description}
          </p>
          <div className="mb-10 rounded-xl overflow-hidden shadow-2xl relative group cursor-pointer">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-auto object-cover aspect-[4/3] transform transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <button className={`mt-auto self-start border text-xs font-bold px-8 py-3 rounded uppercase tracking-widest transition-colors ${feature.buttonColor}`}>
            More
          </button>
        </div>
      ))}
    </section>
  );
};

const ReviewsSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ]);

  const baseReviews = [
    {
      name: 'J miah',
      time: '3 years ago',
      avatar: 'J',
      avatarBg: 'bg-[#407B43]', // Greenish
      text: 'Great work and communication from Ben & the team. New waterfall feature looks great. Would highly recommend!',
    },
    {
      name: 'Carrie Darby (Skin ...',
      time: '3 years ago',
      avatarImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100', // Placeholder
      text: 'Great communication, all on time and as promised and love the finished results. Thank you',
    },
    {
      name: 'Chrissie Wilkinson',
      time: '3 years ago',
      avatarImg: 'https://images.unsplash.com/photo-1554727242-741c14fa561c?auto=format&fit=crop&q=80&w=100', // Placeholder
      text: 'We had a bubble wall installed in 2020. Ben and colleague worked professionally with delivery and installation. There...',
    },
    {
      name: 'Dean Hale',
      time: '3 years ago',
      avatar: 'D',
      avatarBg: 'bg-[#7B5E57]', // Brownish
      text: 'Very efficient service turned up on time from the other end of the country. Did the job ahead of the original schedule and...',
    }
  ];

  // Duplicate to allow smooth looping
  const reviews = [...baseReviews, ...baseReviews];

  return (
    <section className="w-full bg-[#f4f4f4] relative flex items-center justify-center overflow-hidden max-h-[50vh] min-h-[400px]">
      {/* Subtle Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10 w-full flex items-center">
        {/* Left Arrow (for visual consistency with design, could be made functional if needed) */}
        <button className="hidden lg:flex absolute left-2 md:left-4 bg-white rounded-full p-2 shadow-sm hover:bg-gray-50 z-20 w-8 h-8 items-center justify-center text-gray-500 border border-gray-100">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div className="overflow-hidden w-full lg:px-12" ref={emblaRef}>
          <div className="flex -ml-6">
            {reviews.map((review, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_25%] pl-6">
                <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col h-full border border-gray-100 relative min-h-[260px]">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      {review.avatarImg ? (
                        <img src={review.avatarImg} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg ${review.avatarBg}`}>
                          {review.avatar}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm leading-tight">{review.name}</h4>
                        <span className="text-gray-500 text-xs">{review.time}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {/* Google G logo */}
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    </div>
                  </div>

                  {/* Stars & Verification Check */}
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} className="w-4 h-4 text-[#FBBC05] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                    {/* Verified Checkmark */}
                    <svg className="w-4 h-4 text-[#4285F4] fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-4 flex-grow">
                    {review.text}
                  </p>

                  {/* Read more */}
                  <a href="#" className="text-[#a0a0a0] hover:text-gray-700 text-xs mt-auto inline-block">Read more</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LatestInstallationsSection = () => {
  const installations = [
    {
      title: 'Palms by H2o – Water Walls',
      description: 'Make a bold first impression, the brief was clear, create something unforgettable',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Eurovea Centre – Bubble Tank',
      description: 'H2o designs has been working alongside Eurovea Group on the redevelopment of the restrooms within a Shopping Mall.',
      image: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Villa Waves – Water Wall',
      description: 'Challenging, certainly but exactly the kind of project that defines what we do.',
      image: 'https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Adidas Goretex – Waterfall',
      description: 'H2o Designs created eye-catching window displays for the launch of a new waterproof footwear range by Adidas.',
      image: 'https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?auto=format&fit=crop&q=80&w=400',
    }
  ];

  return (
    <section
      className="w-full py-20 relative bg-cover bg-center bg-no-repeat z-10"
      style={{ backgroundImage: "url('/liningbg.png')" }}
    >
      {/* Fallback overlay in case image needs darkening to match design */}
      <div className="absolute inset-0 bg-[#020b24]/40 pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-medium text-white text-center mb-16 tracking-wide">
          Latest Installations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {installations.map((item, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col h-full transform transition-transform duration-500 hover:-translate-y-2">
              <div className="h-48 overflow-hidden cursor-pointer group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow items-center text-center">
                <h3 className="text-[#3b82f6] text-xl font-bold mb-4 px-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mb-8 font-light leading-relaxed flex-grow">
                  {item.description}
                </p>
                <button className="bg-[#333333] hover:bg-black text-white text-xs font-semibold py-3 px-8 transition-colors tracking-widest uppercase rounded-sm mt-auto shadow-md">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FooterSection = () => {
  return (
    <footer className="w-full flex flex-col max-h-[25vh] min-h-[120px] shrink-0 z-20 relative">
      {/* Top Part */}
      <div className="bg-[#0b162c] flex-grow flex items-center justify-between px-6 md:px-16 py-4 md:py-8 overflow-hidden">
        
        {/* Logo Area */}
        <div className="flex items-center space-x-2">
          <div className="text-gray-400 text-3xl md:text-5xl flex items-baseline">
            <span className="font-light">H</span>
            <span className="text-base md:text-2xl -ml-0.5 mt-4">2</span>
            <div className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-[#4aa0e0] ml-1 flex items-start justify-start p-1 md:p-1.5 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3)] self-center -mt-1 md:-mt-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
            </div>
            <span className="ml-2 md:ml-3 font-light tracking-wide text-gray-400">designs</span>
          </div>
        </div>

        {/* Address & Contact */}
        <div className="text-center text-[10px] md:text-sm text-gray-200 hidden md:block font-light">
          <p>Unit 7, Brookside Industrial Units, Taylor Street, Clitheroe</p>
          <p>BB7 1NL</p>
          <p className="mt-1 font-medium text-[#4aa0e0]">
            Tel: 01254 825205 <span className="text-gray-300 px-1">|</span> info@h2o-designs.co.uk
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
            {/* Facebook icon */}
            <svg className="w-4 h-4 md:w-5 md:h-5 text-[#1877F2] fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
            {/* Instagram icon */}
            <svg className="w-4 h-4 md:w-5 md:h-5 text-[#E1306C]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
            {/* Youtube icon */}
            <svg className="w-4 h-4 md:w-5 md:h-5 text-[#FF0000] fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
      
      {/* Bottom Part */}
      <div className="bg-[#1f1f1f] text-[gray] text-[8px] md:text-xs py-2 md:py-3 flex justify-center items-center tracking-widest uppercase text-center shrink-0">
        H2O DESIGNS INTERIOR WATER FEATURES | WEB DESIGN BY MCKENZIE CREATIVE
      </div>
    </footer>
  );
};

const AboutPage = () => {
  return (
    <div className="w-full flex flex-col flex-grow">
      {/* Hero Section */}
      <section 
        className="w-full relative bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/bubble-cover.png')", height: '75vh' }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-light tracking-wide uppercase text-center">
          About H2O Designs
        </h1>
      </section>

      {/* Content Section */}
      <section className="w-full relative bg-[#f4f4f4] py-16 md:py-24" style={{ minHeight: '150vh' }}>
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
        
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10 flex flex-col">
          <h2 className="text-[#88cdeb] text-4xl md:text-5xl font-light mb-10">
            Inside Our Bubble
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 text-gray-600 text-sm leading-relaxed font-light">
            {/* Left Column */}
            <div className="flex flex-col space-y-6">
              <p className="text-xl md:text-2xl text-gray-400 font-light leading-snug">
                <strong className="text-gray-700 font-bold">H2o Designs</strong> is a leading UK specialist in the design, manufacture, and installation of bespoke <strong className="text-gray-700 font-bold">interior water features</strong> for commercial, hospitality, and luxury environments.
              </p>
              <p>
                Based in Lancashire, we have over 21 years of industry experience creating high-quality custom water installations for clients throughout the UK and Europe.
              </p>
              <p>
                We specialise in producing visually striking, fully bespoke water features, including custom <strong className="text-gray-700 font-bold">water walls, bubble walls, bubble tanks, bubble tubes, indoor water walls</strong>. Our work is trusted by leading brands, hotels, restaurants, bars, retail spaces, exhibition venues, and corporate environments looking to create memorable interior experiences that leave a lasting impression.
              </p>
              <p>
                Every project is carefully designed and manufactured in-house at our Lancashire studio, allowing us to maintain complete control over quality, craftsmanship, and technical performance. By combining innovative design concepts with precision engineering and durable, high-quality materials, we create water features that are both visually impressive and built for long-term reliability.
              </p>
              <p>
                At <strong className="text-gray-700 font-bold">H2o Designs</strong>, we understand that every space is unique. That is why every installation is individually tailored to suit the client's vision, branding, spatial requirements, and technical specifications.
              </p>
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-6">
              <p>
                From contemporary reception water walls and feature cascades to bespoke bubble systems and statement bar displays, our team works closely with clients to deliver installations that enhance atmosphere, improve customer experience, and elevate interior design.
              </p>
              <p>
                Our bespoke <strong className="text-gray-700 font-bold">commercial water features</strong> are widely used across hotels, restaurants, bars, reception areas, spas, showrooms, retail environments, offices, and exhibition spaces, helping businesses create immersive and luxurious interiors that stand out from the competition.
              </p>
              <p>
                From the initial concept and design consultation through to manufacture, delivery, and final installation, <strong className="text-gray-700 font-bold">H2o Designs</strong> provides a complete fully managed service. Our experienced team is committed to delivering exceptional workmanship, innovative solutions, and outstanding customer service on every project, regardless of size or complexity.
              </p>
              <p>
                Whether you require a stunning statement water wall, a custom-built bubble feature, an illuminated back bar display, or a complete commercial water feature installation, <strong className="text-gray-700 font-bold">H2o Designs</strong> delivers bespoke solutions designed to transform interiors and create unforgettable visual impact.
              </p>
              <p className="text-[#88cdeb] text-2xl md:text-3xl font-light mt-4">
                Who said water has no taste!
              </p>
            </div>
          </div>

          {/* 4 Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400" alt="Gallery 1" className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md" />
            <img src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400" alt="Gallery 2" className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md" />
            <img src="https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400" alt="Gallery 3" className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md" />
            <img src="https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?auto=format&fit=crop&q=80&w=400" alt="Gallery 4" className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md" />
          </div>

          {/* Contact Button */}
          <div className="mt-12">
            <button className="border-2 border-[#88cdeb] text-[#88cdeb] font-semibold tracking-widest text-xs uppercase py-3 px-8 rounded-sm hover:bg-[#88cdeb] hover:text-white transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const WaterWallsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryImages = Array(24).fill('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400');
  
  return (
    <div className="w-full flex flex-col flex-grow">
      {/* Hero Section */}
      <section 
        className="w-full relative bg-cover bg-center flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-24"
        style={{ backgroundImage: "url('/bubble-cover.png')", minHeight: '50vh' }}
      >
        <div className="absolute inset-0 bg-[#050B14]/70 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40 pointer-events-none"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-light tracking-wide uppercase text-center mt-12">
          WATER WALLS | WATERFALLS
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
                <strong className="text-gray-700 font-bold">Water walls</strong> and <strong className="text-gray-700 font-bold">waterfall features</strong> create powerful visual statements that instantly enhance the atmosphere of any interior environment.
              </p>
              <p>
                Combining the natural movement of flowing water with lighting, texture, and contemporary design, these installations bring a sense of luxury, tranquility, and sophistication to commercial spaces.
              </p>
              <p>
                Perfect for reception areas, entrance lobbies, VIP lounges, hotels, restaurants, spas, retail environments, and high-end bar installations, bespoke water walls provide a striking focal point that captures attention while creating a calming and immersive ambience. Whether used as a standalone architectural feature or integrated into a wider interior design scheme, flowing water introduces movement, sound, and visual depth that transforms the overall feel of a space.
              </p>
              <p>
                At <strong className="text-gray-700 font-bold">H2o Designs</strong>, we specialise in the design, manufacture, and installation of custom-built <strong className="text-gray-700 font-bold">water walls</strong> and <strong className="text-gray-700 font-bold">waterfalls</strong> tailored entirely to the client's vision, environment, and technical requirements. We produce installations of every scale, from compact decorative features to large architectural statement pieces for luxury commercial interiors.
              </p>
              <p>
                Every water feature is individually made to measure at our Lancashire studio using premium materials, precision engineering, and high-quality components to ensure exceptional craftsmanship, durability, and long-term reliability. We offer complete flexibility in size, finishes, lighting effects, branding integration, and water flow design, allowing each installation to complement its surroundings perfectly.
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
                <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400" alt="Detail 1" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400" alt="Detail 2" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400" alt="Detail 3" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?auto=format&fit=crop&q=80&w=400" alt="Detail 4" className="w-full aspect-square object-cover rounded-xl shadow-md" />
              </div>
              
              <div className="mt-8 text-gray-600 text-sm leading-relaxed font-light space-y-4">
                <p>
                  Our <strong className="text-gray-700 font-bold">water walls</strong> are designed not only to create impressive visual impact, but also to provide dependable performance and low-maintenance operation for years to come.
                </p>
                <p>
                  Whether you require a contemporary glass water wall, a textured cascading feature, or a large-scale architectural <strong className="text-gray-700 font-bold">waterfall installation</strong>, <strong className="text-gray-700 font-bold">H2o Designs</strong> creates bespoke solutions designed to elevate interiors and create unforgettable spaces.
                </p>
                
                <a href="#gallery" className="inline-flex items-center text-[#88cdeb] text-xs font-semibold tracking-widest uppercase mt-4 hover:text-[#5ea2d8] transition-colors">
                  GALLERY 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Gallery Section */}
      <section id="gallery" className="w-full h-screen grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1 p-1 bg-white">
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

const BubbleWallsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryImages = Array(24).fill('https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400');
  
  return (
    <div className="w-full flex flex-col flex-grow">
      {/* Hero Section */}
      <section 
        className="w-full relative bg-cover bg-center flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-24"
        style={{ backgroundImage: "url('/bubble-cover.png')", minHeight: '50vh' }}
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
                At <strong className="text-gray-700 font-bold">H2o Designs</strong>, we specialise in the design, manufacture, and installation of custom-built <strong className="text-gray-700 font-bold">bubble walls</strong> and <strong className="text-gray-700 font-bold">bubble tanks</strong> tailored entirely to the client's vision, environment, and technical requirements. We produce installations of every scale, from compact decorative features to large architectural statement pieces for luxury commercial interiors.
              </p>
              <p>
                Every feature is individually made to measure at our Lancashire studio using premium materials, precision engineering, and high-quality components to ensure exceptional craftsmanship, durability, and long-term reliability. We offer complete flexibility in size, finishes, lighting effects, branding integration, and water flow design, allowing each installation to complement its surroundings perfectly.
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
                <img src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400" alt="Detail 1" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400" alt="Detail 2" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400" alt="Detail 3" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?auto=format&fit=crop&q=80&w=400" alt="Detail 4" className="w-full aspect-square object-cover rounded-xl shadow-md" />
              </div>
              
              <div className="mt-8 text-gray-600 text-sm leading-relaxed font-light space-y-4">
                <p>
                  Our <strong className="text-gray-700 font-bold">bubble walls</strong> are designed not only to create impressive visual impact, but also to provide dependable performance and low-maintenance operation for years to come.
                </p>
                <p>
                  Whether you require a contemporary glass bubble wall, a textured cascading feature, or a large-scale architectural <strong className="text-gray-700 font-bold">bubble installation</strong>, <strong className="text-gray-700 font-bold">H2o Designs</strong> creates bespoke solutions designed to elevate interiors and create unforgettable spaces.
                </p>
                
                <a href="#gallery" className="inline-flex items-center text-[#88cdeb] text-xs font-semibold tracking-widest uppercase mt-4 hover:text-[#5ea2d8] transition-colors">
                  GALLERY 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Gallery Section */}
      <section id="gallery" className="w-full h-screen grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1 p-1 bg-white">
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
                <img src="https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400" alt="Detail 1" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400" alt="Detail 2" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400" alt="Detail 3" className="w-full aspect-square object-cover rounded-xl shadow-md" />
                <img src="https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?auto=format&fit=crop&q=80&w=400" alt="Detail 4" className="w-full aspect-square object-cover rounded-xl shadow-md" />
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

const ProjectsPage = () => {
  const projects = [
    { title: "Palms by H2o - Water Walls", desc: "Make a bold first impression, the brief was clear, create something unforgettable", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400" },
    { title: "Eurovea Centre - Bubble Tank", desc: "H2o designs has been working alongside Eurovea Group on the redevelopment of the restrooms within...", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400" },
    { title: "Villa Waves - Water Wall", desc: "Challenging, certainly, but exactly the kind of project that defines what we do.", img: "https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400" },
    { title: "Adidas Goretex - Waterfall", desc: "H2o Designs created eye-catching window displays for the launch of a new waterproof footwear range...", img: "https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?auto=format&fit=crop&q=80&w=400" },
    { title: "Berghaus Hydro-shell - Water Walls", desc: "Working closely with the Berghaus design team, we developed a display incorporating our signature waterfall...", img: "https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400" },
    { title: "Nigel Nottingham - Bubble Tanks", desc: "I went to walk through a bubble wall into my changing rooms from the swimming...", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400" },
    { title: "Hideout - Water Wall", desc: "The waterfall was positioned as the focal point visible through the entrance glazing as you...", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400" },
    { title: "Kebabish Cafe - Bubble Wall", desc: "One of the largest bubble walls we've created in recent years, designed to make a...", img: "https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?auto=format&fit=crop&q=80&w=400" },
    { title: "Avante Guard - Water Wall", desc: "H2o designs was commissioned to create a water wall that would subtly separate the backwash...", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400" },
    { title: "Hyatt Lounge - Water Walls", desc: "One of the largest installations ever undertaken by H2o designs, this impressive waterfall wall is...", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400" },
    { title: "Idris Staircase - Water Wall", desc: "Residential projects often present the greatest challenges, as each design must integrate seamlessly into everyday...", img: "https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400" },
    { title: "Marmara Cafe - Water Walls & Bubble Tanks", desc: "A combination of bubble walls and waterfall features was used to define and enhance this...", img: "https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?auto=format&fit=crop&q=80&w=400" },
  ];

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
              At <strong className="text-gray-700 font-bold">H2O Designs</strong>, we believe that every project should be as unique as the space it enhances. That is why every <strong className="text-[#5ea2d8] font-semibold">water wall</strong>, water feature, <strong className="text-[#5ea2d8] font-semibold">bubble wall</strong>, and <strong className="text-[#5ea2d8] font-semibold">bubble tank</strong> we create is individually designed and handcrafted to meet the precise requirements, vision, and objectives of each client.
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
              Over the years, H2O Designs has successfully delivered a wide range of bespoke water features for clients across numerous sectors, creating installations that combine innovative design, expert craftsmanship, and reliable performance. Our portfolio showcases the versatility of our work and demonstrates our commitment to delivering exceptional results, regardless of project size or complexity.
            </p>
            <p>
              Below, you will find a selection of example projects that highlight the quality, creativity, and bespoke nature of our work. These installations provide an insight into the wide range of custom water features we have designed and manufactured, illustrating how H2O Designs transforms individual concepts into captivating and memorable centerpieces.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap gap-4">
          <button className="bg-[#5ea2d8] text-white px-6 py-2 rounded shadow-sm text-sm tracking-wide">All Projects</button>
          <button className="bg-white text-[#5ea2d8] px-6 py-2 rounded shadow-sm text-sm tracking-wide hover:bg-gray-50 transition-colors">Bubble Walls</button>
          <button className="bg-white text-[#5ea2d8] px-6 py-2 rounded shadow-sm text-sm tracking-wide hover:bg-gray-50 transition-colors">Water Walls</button>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full max-w-screen-xl mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col items-center text-center p-4">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <img src={project.img} alt={project.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-[#5ea2d8] font-bold text-sm md:text-base px-2 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm px-4 flex-grow font-light leading-relaxed mb-6">
                {project.desc}
              </p>
              <button className="bg-[#333] hover:bg-black text-white text-xs tracking-wider px-6 py-2 rounded mb-2 transition-colors">
                Read More
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center space-x-2 text-sm text-gray-500">
          <button className="bg-[#050B14] text-white w-8 h-8 rounded flex items-center justify-center font-bold">1</button>
          <button className="w-8 h-8 flex items-center justify-center hover:text-gray-900 transition-colors">2</button>
          <button className="w-8 h-8 flex items-center justify-center hover:text-gray-900 transition-colors">3</button>
          <span>...</span>
          <button className="w-8 h-8 flex items-center justify-center hover:text-gray-900 transition-colors">10</button>
          <button className="px-2 h-8 flex items-center justify-center hover:text-gray-900 transition-colors">Next &gt;</button>
        </div>
      </section>
    </div>
  );
};

const NewsPage = () => {
  const news = [
    { title: "Villa Waves - Water Wall", desc: "Challenging, certainly but exactly the kind of project that defines what we do.", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400" },
    { title: "PERSPEX Cast Acrylic", desc: "We proudly manufacture our waterfalls and bubble walls using premium PERSPEX® clear cast acrylic.", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400" },
    { title: "Egg Leg", desc: "At H2O Designs, sustainability and responsible waste management are at the heart of everything we...", img: "https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400" },
    { title: "FABERTEC - CNC Machine", desc: "At the heart of every high-quality product is complete control over the manufacturing process.", img: "https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?auto=format&fit=crop&q=80&w=400" }
  ];

  return (
    <div className="w-full flex flex-col flex-grow bg-[#f4f4f4]">
      {/* Hero Section */}
      <section 
        className="w-full relative bg-cover bg-center flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-24"
        style={{ backgroundImage: "url('/bubble-cover.png')", minHeight: '40vh' }}
      >
        <div className="absolute inset-0 bg-[#050B14]/60 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050B14]/40 pointer-events-none"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-light tracking-wide uppercase text-center mt-12">
          LATEST NEWS
        </h1>
      </section>

      {/* Intro Content */}
      <section className="w-full relative py-12 md:py-20 text-center px-6 bg-[#f7f7f7]">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <p className="text-gray-400 font-light text-xl md:text-3xl leading-relaxed md:leading-snug max-w-6xl mx-auto px-4 md:px-12">
            Here are some <strong className="text-gray-400 font-bold">news stories</strong> and features that help explain more about our <strong className="text-[#5ea2d8] font-bold">bubble walls</strong>, bubble tanks, <strong className="text-[#5ea2d8] font-bold">water walls</strong>, water falls and <strong className="text-gray-400 font-bold">indoor water features</strong> and what we do here at <strong className="text-gray-400 font-bold">H2o Designs</strong>. Follow our <span className="text-[#5ea2d8] font-light">social media</span> channels to stay up-to-date with relevant issues and latest alerts from <strong className="text-gray-400 font-bold">H2o Designs</strong>.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="w-full max-w-screen-xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {news.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col items-center text-center p-4">
              <div className="w-full aspect-[16/9] md:aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-[#5ea2d8] font-bold text-sm md:text-base px-2 mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm px-2 flex-grow font-light leading-relaxed mb-6">
                {item.desc}
              </p>
              <button className="bg-[#333] hover:bg-black text-white text-xs tracking-wider px-6 py-2 rounded mb-2 transition-colors">
                Read More
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="w-full flex flex-col flex-grow">
      {/* Hero Section */}
      <section 
        className="w-full relative bg-cover bg-center flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-24"
        style={{ backgroundImage: "url('/bubble-cover.png')", minHeight: '50vh' }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-light tracking-wide uppercase text-center mt-12">
          CONTACT US
        </h1>
      </section>

      {/* Content Section */}
      <section className="w-full relative bg-[#f4f4f4] py-16 md:py-24">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
        
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10 flex flex-col">
          
          <h2 className="text-[#88cdeb] text-4xl md:text-5xl font-light mb-10">
            H2o Designs
          </h2>

          {/* 3 Columns Text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600 text-sm leading-relaxed font-light mb-16">
            <div className="flex flex-col space-y-4">
              <p>
                At the heart of our business is a commitment to delivering exceptional customer service and outstanding workmanship on every project we undertake. We understand that choosing the right company for your project is an important decision, which is why we place such a strong emphasis on providing a personal, professional, and reliable service from start to finish.
              </p>
              <p>
                Unlike many larger organisations where <Link to="/projects" className="text-[#5ea2d8] hover:underline">projects</Link> are passed between different departments or managers, every project we complete is personally overseen by our owner and director, Ben Ferguson. Whether the project is a small domestic installation or a large scale commercial undertaking, Ben remains actively involved throughout the entire process. This hands-on approach ensures that every aspect of the project receives the attention it deserves and that our high standards are maintained at every stage.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <p>
                From the initial consultation and planning phase through to final delivery and installation, we work closely with our customers to understand their requirements, expectations, and objectives. By maintaining clear communication throughout the project, we are able to provide expert guidance, address any concerns promptly, and ensure that the finished result meets or exceeds expectations.
              </p>
              <p>
                We believe that personal involvement and accountability are key factors in delivering successful projects. Having a single point of contact overseeing the work provides our customers with confidence, consistency, and peace of mind, knowing that their project is being managed by someone who genuinely cares about the outcome.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <p>
                Our reputation has been built on quality, reliability, and customer satisfaction, and we take great pride in every project we complete. No matter the size, scope, or complexity of the work, our goal remains the same: to provide a seamless experience and deliver results of the highest possible standard.
              </p>
              <p>
                By combining expert knowledge, attention to detail, and a genuine commitment to customer service, we ensure that every project is completed efficiently, professionally, and to the satisfaction of our clients. This dedication to excellence is what sets us apart and continues to earn the trust of customers time and time again.
              </p>
            </div>
          </div>

          <h2 className="text-[#88cdeb] text-4xl md:text-5xl font-light mb-4">
            Contact
          </h2>
          <p className="text-gray-500 text-xs mb-8">* indicates required fields</p>

          {/* Form */}
          <form className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="First Name" className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
              <input type="text" placeholder="Surname" className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Company Name" className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
              <input type="text" placeholder="Location" className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input type="email" placeholder="email" className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
              <input type="tel" placeholder="Telephone" className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
              <input type="tel" placeholder="Mobile" className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
            </div>
            <div className="mb-8">
              <textarea placeholder="Message / Project Brief" rows="6" className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm resize-none"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Interest Areas */}
              <div>
                <h4 className="font-bold text-sm text-gray-800 mb-4">Interest Areas</h4>
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-[#5ea2d8] rounded-sm focus:ring-[#5ea2d8]" />
                    <span>Bubble Tanks</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-[#5ea2d8] rounded-sm focus:ring-[#5ea2d8]" />
                    <span>Bubble Tubes</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-[#5ea2d8] rounded-sm focus:ring-[#5ea2d8]" />
                    <span>Bubble Walls</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-[#5ea2d8] rounded-sm focus:ring-[#5ea2d8]" />
                    <span>Water Walls</span>
                  </label>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <h4 className="font-bold text-sm text-gray-800 mb-4">If you have any drawings or images, please upload....</h4>
                <div className="flex items-center">
                  <input type="file" className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300" />
                </div>
                <p className="text-[#5ea2d8] text-xs mt-4">Max. file size: 1 GB.</p>
              </div>
            </div>

            <button type="button" className="bg-[#5ea2d8] hover:bg-[#4a8fc3] text-white text-xs font-bold py-3 px-8 rounded-sm uppercase tracking-widest transition-colors shadow-md">
              SUBMIT
            </button>
          </form>

          {/* Bottom Info Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start pb-8">
            <div className="w-full md:w-1/2">
              <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600" alt="Water features" className="w-full rounded-xl shadow-md object-cover h-64 md:h-80" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center h-full text-gray-600 text-sm font-light space-y-4">
              <p>
                For more information or to arrange a no obligation estimate please get in touch with Ben on <a href="tel:01254825205" className="text-[#5ea2d8] hover:underline">01254 825205</a>.
              </p>
              <div>
                <p className="font-bold text-gray-800">H2o designs</p>
                <p>Unit 7 Brookside Industrial Units, Taylor Street, Clitheroe, Lancashire, BB7 1NL</p>
                <p>
                  t: <a href="tel:+4401254825205" className="hover:text-gray-800 transition-colors">+44 01254 825205</a> | <a href="mailto:info@h2o-designs.co.uk" className="text-[#5ea2d8] hover:underline">info@h2o-designs.co.uk</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const HomeContent = ({ images }) => (
  <>
    {/* Main Content */}
    <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto min-h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start w-full">

        {/* Left Column: Text Content */}
        <div className="col-span-2 bg-[rgba(0,0,0,0.4)] backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          <h1 className="text-4xl md:text-5xl font-light text-[#5ea2d8] mb-8 tracking-wide">
            Water Artistry
          </h1>

          <div className="space-y-6 text-gray-200 text-sm md:text-base leading-relaxed font-light">
            <p>
              Welcome to H2o Designs, Europe's leading specialists in the design, manufacture, and
              installation of bespoke interior water features for luxury commercial, residential and
              hospitality environments. With more than 21 years of industry experience, we create visually
              striking water installations that transform interiors and deliver unforgettable visual impact.
            </p>

            <p>
              Our bespoke creations include custom bubble walls, <strong className="text-[#5ea2d8] font-semibold">water walls</strong>, <strong className="text-[#5ea2d8] font-semibold">Bubble tanks</strong>, indoor water
              walls, Waterfalls, illuminated <strong className="text-[#5ea2d8] font-semibold">bubble tubes</strong>, feature displays, all carefully designed to enhance
              atmosphere, elevate interiors, and create memorable customer experiences. From high-end
              hotels and stylish bars to restaurants, corporate spaces, retail environments, exhibitions, and
              television productions, our work can be found in prestigious venues throughout the UK and <strong className="text-[#5ea2d8] font-semibold">Europe</strong>.
            </p>

            <p>
              From initial concept and consultation through to manufacture, delivery, and installation, <strong className="text-[#5ea2d8] font-semibold">H2o
                Designs</strong> provides a complete fully managed service, ensuring every project is delivered to the
              highest possible standard.
            </p>

            <p>
              Explore our <strong className="text-[#5ea2d8] font-semibold">latest projects</strong> and discover how bespoke water artistry can transform interiors,
              create atmosphere, and bring exceptional spaces to life.
            </p>
          </div>

          <div className="mt-8 pt-4">
            <p className="text-[#5ea2d8] text-xl md:text-2xl font-light">
              Who said water has no taste!
            </p>
          </div>
        </div>

        {/* Right Column: Images Grid */}
        <div className="flex flex-col h-full justify-center lg:col-span-1">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {images.map((src, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden aspect-[4/5] md:aspect-square shadow-xl group cursor-pointer border border-white/10 relative"
              >
                {/* Inner shadow/glow to match design */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-10 pointer-events-none rounded-2xl"></div>
                <img
                  src={src}
                  alt={`Project ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* Footer Text under images */}
          <div className="mt-8 text-center text-[#5ea2d8] text-xs md:text-sm tracking-[0.2em] uppercase">
            BUBBLE WALLS | BUBBLE TANKS | WATER WALLS |<br className="hidden md:block" />
            WATER FALLS | INDOOR WATER FEATURES
          </div>
        </div>

      </div>
    </main>

    {/* Sections */}
    <FeaturesSection />
    <ReviewsSection />
    <LatestInstallationsSection />
  </>
);

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Water Walls', path: '/water-walls' },
    { name: 'Bubble Walls', path: '/bubble-walls' },
    { name: 'Bubble Tubes', path: '/bubble-tubes' },
    { name: 'Projects', path: '/projects' },
    { name: 'Videos', path: '/videos' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' }
  ];

  const images = [
    'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?auto=format&fit=crop&q=80&w=400'
  ];

  return (
    <div className={`min-h-screen relative flex flex-col ${currentPath === '/' ? 'bg-[#050B14]' : 'bg-[#f4f4f4]'}`}>
      
      {/* Home Background Image */}
      {currentPath === '/' && (
        <>
          <div
            className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bubble-cover.png')" }}
          />
          <div className="fixed inset-0 z-0 mix-blend-multiply" />
        </>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-8' : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Placeholder */}
          <div className="flex-shrink-0">
            <div className={`w-32 h-8 rounded border-2 flex items-center justify-center font-bold tracking-widest transition-colors ${isScrolled ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-white text-white'}`}>
              LOGO
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[12px] font-bold uppercase tracking-wider transition-colors ${
                  isScrolled
                    ? link.path === currentPath ? 'text-[#5ea2d8]' : 'text-gray-600 hover:text-[#5ea2d8]'
                    : link.path === currentPath ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - Placeholder */}
          <div className="lg:hidden">
            <button className={`${isScrolled ? 'text-[#5ea2d8]' : 'text-white'}`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <Routes>
        <Route path="/" element={<HomeContent images={images} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/water-walls" element={<WaterWallsPage />} />
        <Route path="/bubble-walls" element={<BubbleWallsPage />} />
        <Route path="/bubble-tubes" element={<BubbleTubesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
};

export default App;