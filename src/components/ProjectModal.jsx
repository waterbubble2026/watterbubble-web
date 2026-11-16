import { useEffect, useRef } from 'react';
import { StatusChip, LocationIcon } from './ProjectCard';

const ProjectModal = ({ project, onClose }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative w-full bg-gray-100">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full max-h-[50vh] object-cover"
          />
          <StatusChip status={project.status} className="absolute bottom-3 left-3" />
        </div>

        <div className="p-6 sm:p-8">
          <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-semibold text-gray-800 leading-snug">
            {project.title}
          </h2>
          <p className="mt-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500">
            <LocationIcon className="h-5 w-5 shrink-0 text-[#1EA3DE]" />
            <span>{project.location}</span>
          </p>
          <div className="mt-6 border-t border-gray-100 pt-6">
            <p className="text-base font-light leading-relaxed text-gray-600 whitespace-pre-line break-words">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
