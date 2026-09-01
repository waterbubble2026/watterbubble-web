import { useState, useEffect } from 'react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    'Home', 'About', 'Water Walls', 'Bubble Walls',
    'Bubble Tubes', 'Projects', 'Videos', 'News', 'Contact'
  ];

  const images = [
    'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?auto=format&fit=crop&q=80&w=400'
  ];

  return (
    <div className="min-h-[200vh] bg-[#050B14] relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bubble-cover.png')" }}
      />

      {/* Dark overlay for better readability if needed, though design seems to just use the image */}
      <div className="fixed inset-0 z-0 mix-blend-multiply" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Placeholder */}
          <div className="flex-shrink-0">
            <div className={`w-32 h-8 rounded border-2 flex items-center justify-center font-bold tracking-widest ${isScrolled ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-white text-white'}`}>
              LOGO
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${isScrolled
                  ? 'text-[#5ea2d8] hover:text-[#3170a1]'
                  : 'text-white hover:text-gray-300'
                  }`}
              >
                {link}
              </a>
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

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full">

          {/* Left Column: Text Content */}
          <div className="bg-[#0c1427]/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5">
            <h1 className="text-4xl md:text-5xl font-light text-[#5ea2d8] mb-8 tracking-wide">
              Water Artistry
            </h1>

            <div className="space-y-6 text-gray-300 text-sm md:text-base leading-relaxed font-light">
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
          <div className="flex flex-col h-full justify-center">
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
    </div>
  );
};

export default App;