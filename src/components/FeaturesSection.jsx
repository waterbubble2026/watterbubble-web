import { href, Link } from "react-router-dom";

const FeaturesSection = () => {
  const features = [
    {
      number: '01',
      title: 'Water Walls',
      description: 'Our bespoke Water Walls are the premier architectural choice for luxury hotel lobbies, corporate reception areas, and upscale residential developments across India. They create a sophisticated atmosphere, combining natural elegance with contemporary design, perfect for high-traffic public spaces.',
      image: '/home/feat-1.png',
      bgColor: 'bg-[#001D4A]',
      titleColor: 'text-[#1EA4DE]',
      buttonColor: 'border-[#2f7cc5] text-[#2f7cc5] hover:bg-[#2f7cc5] hover:text-white',
      href: 'water-walls'
    },
    {
      number: '02',
      title: 'Bubble Walls',
      description: 'Designed and manufactured by Ninja Lights & Designs in Udaipur, Rajasthan, each custom Bubble Wall is tailored to your exact specifications. We ensure impeccable quality and fit, transforming any wall into a mesmerizing, color-changing centerpiece that enhances branding and atmosphere in corporate and commercial environments.',
      image: '/home/feat-2.png',
      bgColor: 'bg-[#247B9F]',
      titleColor: 'text-[#1EA4DE]',
      buttonColor: 'border-[#81b5d6] text-[#81b5d6] hover:bg-[#81b5d6] hover:text-[#091534]',
      href: 'bubble-walls'
    },
    {
      number: '03',
      title: 'Bubble Tubes',
      description: 'Our captivating Bubble Tubes add a distinct, calming visual element to sensory rooms, healthcare facilities, children’s play areas, and unique retail displays throughout India. These interactive, freestanding features create dynamic focal points that enhance wellness, engage customers, and bring spaces to life.',
      image: '/home/feat-3.png',
      bgColor: 'bg-[#A1CDF4]',
      titleColor: 'text-[#1EA4DE]',
      buttonColor: 'border-[#5597d2] text-[#5597d2] hover:bg-[#5597d2] hover:text-white',
      href: 'bubble-tubes'
    }
  ];

  return (
    <section className="w-full flex flex-col lg:flex-row relative z-10">
      {features.map((feature, index) => (
        <div key={index} className={`flex-1 ${feature.bgColor} p-8 md:p-12 lg:p-16 flex flex-col`}>
          <div className="text-5xl md:text-[72px] font-semibold text-white mb-2">
            {feature.number}
          </div>
          <h2 className={`text-3xl md:text-[42px] font-light ${feature.titleColor} mb-6`}>
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
          <Link to={feature.href} className={`mt-auto self-start border text-xs font-bold px-8 py-3 rounded uppercase tracking-widest transition-colors ${feature.buttonColor}`}>
            More
          </Link>
        </div>
      ))}
    </section>
  );
};

export default FeaturesSection;
