export const StatusChip = ({ status, className = '' }) => {
  const isCompleted = status === 'Completed';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide shadow-sm ${isCompleted
        ? 'bg-green-500 text-white'
        : 'bg-amber-500 text-white'
        } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full bg-white ${isCompleted ? '' : 'animate-pulse'}`} />
      {status}
    </span>
  );
};

export const LocationIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ProjectCard = ({ project, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(project)}
    aria-haspopup="dialog"
    className="group flex flex-col text-left bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA3DE]"
  >
    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        decoding="async"
      />
      <StatusChip status={project.status} className="absolute top-3 left-3" />
    </div>

    <div className="flex flex-col flex-1 p-5">
      <h3 className="text-lg font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#1EA3DE] transition-colors">
        {project.title}
      </h3>
      <p className="mt-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gray-500">
        <LocationIcon className="h-4 w-4 shrink-0 text-[#1EA3DE]" />
        <span className="line-clamp-1">{project.location}</span>
      </p>
      <p className="mt-3 text-sm font-light leading-relaxed text-gray-600 line-clamp-3 whitespace-pre-line">
        {project.description}
      </p>
      <span className="mt-4 pt-2 text-sm font-semibold text-[#1EA3DE] inline-flex items-center gap-1">
        View details
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  </button>
);

export default ProjectCard;
