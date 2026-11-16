const NINJA_IMAGES = [
  '/ninja/1.jpeg',
  '/ninja/2.jpeg',
  '/ninja/3.jpeg',
  '/ninja/4.jpeg',
  '/ninja/5.jpeg',
];

// One row of 5 images on tablet/desktop, stacked one-by-one on mobile
const NinjaGallerySection = () => (
  <section className="w-full bg-[#050B14] relative z-10 px-6 md:px-12 py-12 md:py-16">
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
      {NINJA_IMAGES.map((src, index) => (
        <div
          key={src}
          className="group relative overflow-hidden rounded-xl shadow-2xl border border-white/10 aspect-[3/4] bg-black/30"
        >
          <img
            src={src}
            alt={`Water Bubble Walls installation ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  </section>
);

export default NinjaGallerySection;
