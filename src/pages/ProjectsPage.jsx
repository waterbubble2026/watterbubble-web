
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

export default ProjectsPage;
