
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

export default FeaturesSection;
