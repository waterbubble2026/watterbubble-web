
const LatestInstallationsSection = () => {
  const installations = [
    {
      title: 'Palms by Water Bubble Walls – Water Walls',
      description: 'Make a bold first impression, the brief was clear, create something unforgettable',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Eurovea Centre – Bubble Tank',
      description: 'Water Bubble Walls has been working alongside Eurovea Group on the redevelopment of the restrooms within a Shopping Mall.',
      image: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Villa Waves – Water Wall',
      description: 'Challenging, certainly but exactly the kind of project that defines what we do.',
      image: 'https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Adidas Goretex – Waterfall',
      description: 'Water Bubble Walls created eye-catching window displays for the launch of a new waterproof footwear range by Adidas.',
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

export default LatestInstallationsSection;
