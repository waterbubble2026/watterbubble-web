import FeaturesSection from '../components/FeaturesSection';
import ReviewsSection from '../components/ReviewsSection';
import LatestInstallationsSection from '../components/LatestInstallationsSection';

const HomeContent = ({ images }) => (
  <>
    {/* Main Content */}
    <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto min-h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start w-full">

        {/* Left Column: Text Content */}
        <div className="col-span-2 bg-[rgba(0,0,0,0.4)] backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          <h1 className="text-4xl md:text-5xl font-light text-[#5ea2d8] mb-8 tracking-wide">
            Masterpieces in Water & Light
          </h1>

          <div className="space-y-6 text-gray-200 text-sm md:text-base leading-relaxed font-light">
            <p>
              Welcome to <strong className="text-[#5ea2d8] font-semibold">Water Bubble Walls</strong> by Ninja Lights & Designs, India's leading specialists in the design, manufacture, and installation of bespoke interior water features for luxury commercial, residential, and hospitality environments. Based in Udaipur, Rajasthan, we create visually striking water installations that transform interiors and deliver unforgettable visual impact.
            </p>

            <p>
              Our bespoke creations include custom bubble walls, <strong className="text-[#5ea2d8] font-semibold">water walls</strong>, <strong className="text-[#5ea2d8] font-semibold">bubble tanks</strong>, indoor water walls, waterfalls, illuminated <strong className="text-[#5ea2d8] font-semibold">bubble tubes</strong>, and exclusively designed <strong className="text-[#5ea2d8] font-semibold">Lord walls</strong>. All are carefully crafted to enhance atmosphere, elevate interiors, and create memorable experiences. From high-end hotels and stylish corporate spaces to highly secure government sectors, our work can be found in prestigious venues throughout India, including esteemed installations for the <strong className="text-[#5ea2d8] font-semibold">DRDO, Indian Air Force, Indian Navy, and Indian Army</strong>.
            </p>

            <p>
              From initial concept and consultation through to manufacture, delivery, and installation, <strong className="text-[#5ea2d8] font-semibold">Water Bubble Walls</strong> provides a complete, fully managed service, ensuring every project is delivered to the highest possible standard.
            </p>

            <p>
              Explore our <strong className="text-[#5ea2d8] font-semibold">latest projects</strong> and discover how bespoke water artistry can transform interiors, create atmosphere, and bring exceptional spaces to life.
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

export default HomeContent;
