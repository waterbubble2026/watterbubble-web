
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

export default NewsPage;
