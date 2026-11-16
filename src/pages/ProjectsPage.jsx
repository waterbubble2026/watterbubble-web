import { useState, useEffect, useCallback, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

const FILTERS = ['All', 'Ongoing', 'Completed'];

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects', { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to load projects');
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Failed to fetch projects', err);
        setError('We could not load the projects right now. Please try again later.');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    fetchProjects();

    return () => controller.abort();
  }, []);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  const visibleProjects = useMemo(
    () => (activeFilter === 'All' ? projects : projects.filter(p => p.status === activeFilter)),
    [projects, activeFilter]
  );

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
              At <strong className="text-[#999999] font-bold">Water Bubble Walls</strong>, we believe that every project should be as unique as the space it enhances. That is why every <strong className="text-[#1EA3DE] font-semibold">water wall</strong>, water feature, <strong className="text-[#1EA3DE] font-semibold">bubble wall</strong>, and <strong className="text-[#1EA3DE] font-semibold">bubble tank</strong> we create is individually designed and handcrafted to meet the precise requirements, vision, and objectives of each client.
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
              Over the years, Water Bubble Walls has successfully delivered a wide range of bespoke water features for clients across numerous sectors, creating installations that combine innovative design, expert craftsmanship, and reliable performance. Our portfolio showcases the versatility of our work and demonstrates our commitment to delivering exceptional results, regardless of project size or complexity.
            </p>
            <p>
              Below, you will find a selection of example projects that highlight the quality, creativity, and bespoke nature of our work. These installations provide an insight into the wide range of custom water features we have designed and manufactured, illustrating how Water Bubble Walls transforms individual concepts into captivating and memorable centerpieces.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="w-full max-w-screen-xl mx-auto px-6 md:px-12 pb-20">
        {/* Status filter */}
        {!isLoading && !error && projects.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-10" role="group" aria-label="Filter projects by status">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`px-6 py-2.5 rounded-lg shadow-sm text-sm font-medium tracking-wide transition-all ${activeFilter === filter
                  ? 'bg-[#1EA3DE] text-white shadow-md'
                  : 'bg-white text-[#1EA3DE] hover:bg-gray-50 border border-gray-100'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="w-full aspect-[4/3] bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-gray-500 py-12">{error}</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No projects to show yet. Please check back soon.</div>
        ) : visibleProjects.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No {activeFilter.toLowerCase()} projects at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project) => (
              <ProjectCard key={project._id} project={project} onOpen={setSelectedProject} />
            ))}
          </div>
        )}
      </section>

      <ProjectModal project={selectedProject} onClose={closeModal} />
    </div>
  );
};

export default ProjectsPage;
