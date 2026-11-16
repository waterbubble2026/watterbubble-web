import { useState, useEffect, useRef } from 'react';
import { compressImage } from '../../utils/compressImage';

const STATUSES = ['Ongoing', 'Completed'];
const EMPTY_FORM = { title: '', location: '', status: 'Ongoing', description: '' };

const statusChipClass = (status) =>
  status === 'Completed'
    ? 'bg-green-100 text-green-700'
    : 'bg-amber-100 text-amber-700';

// Reads a JSON error body safely (server may return HTML on a platform-level failure)
const readError = async (res, fallback) => {
  try {
    const data = await res.json();
    return data.error || fallback;
  } catch {
    return fallback;
  }
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  // Bump to re-fetch the list after a create / update / delete
  const [reloadKey, setReloadKey] = useState(0);
  const fetchProjects = () => setReloadKey(k => k + 1);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch('/api/projects', { signal: controller.signal });
        if (!res.ok) throw new Error(await readError(res, 'Failed to load projects'));
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
        setLoadError('');
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Error fetching projects', err);
        setLoadError(err.message || 'Failed to load projects');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    load();

    return () => controller.abort();
  }, [reloadKey]);

  const updateField = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setFile(null);
    setEditingId(null);
    setFormError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startEditing = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title || '',
      location: project.location || '',
      status: project.status || 'Ongoing',
      description: project.description || ''
    });
    setFile(null);
    setFormError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const title = form.title.trim();
    const location = form.location.trim();
    const description = form.description.trim();

    if (!title || !location || !description) {
      setFormError('Please fill in title, location and description.');
      return;
    }
    if (!editingId && !file) {
      setFormError('Please choose a cover image.');
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('location', location);
      formData.append('status', form.status);
      formData.append('description', description);
      if (file) {
        // Compress client-side to stay well under Vercel's 4.5MB request limit
        formData.append('image', await compressImage(file));
      }

      const res = await fetch(editingId ? `/api/projects/${editingId}` : '/api/projects', {
        method: editingId ? 'PUT' : 'POST',
        body: formData
      });

      if (!res.ok) {
        setFormError(await readError(res, `Failed to ${editingId ? 'update' : 'create'} project`));
        return;
      }

      resetForm();
      fetchProjects();
    } catch (err) {
      console.error(err);
      setFormError('Network error. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete project "${project.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/projects/${project._id}`, { method: 'DELETE' });
      if (!res.ok) {
        alert(await readError(res, 'Failed to delete project'));
        return;
      }
      if (editingId === project._id) resetForm();
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Error deleting project');
    }
  };

  const inputClass = 'w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500';
  const labelClass = 'block text-sm font-medium text-[#999999] mb-2';

  return (
    <div className="space-y-10">
      {/* Add / Edit form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-2xl"
      >
        <h3 className="text-lg font-medium text-[#999999] mb-4">
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h3>

        {formError && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-300 p-3 rounded">
            {formError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={updateField('title')}
              className={inputClass}
              maxLength={150}
              placeholder="e.g., Hotel Lobby Bubble Wall"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={form.location}
                onChange={updateField('location')}
                className={inputClass}
                maxLength={150}
                placeholder="e.g., Mumbai, India"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.status}
                onChange={updateField('status')}
                className={`${inputClass} bg-white`}
              >
                {STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={form.description}
              onChange={updateField('description')}
              className={`${inputClass} min-h-[140px]`}
              maxLength={5000}
              placeholder="Full project details. A short preview is shown on the card; the full text appears in the popup."
              required
            />
            <p className="mt-1 text-xs text-gray-400 text-right">{form.description.length}/5000</p>
          </div>

          <div>
            <label className={labelClass}>
              Cover Image{editingId ? ' (leave empty to keep the current image)' : ''}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border rounded-md bg-white text-sm"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Project'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                disabled={isSaving}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Existing projects */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Existing Projects ({projects.length})
        </h3>

        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading projects...</p>
        ) : loadError ? (
          <p className="text-red-600 text-sm">{loadError}</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500 italic text-sm">No projects added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div
                key={project._id}
                className={`border rounded-lg overflow-hidden bg-white shadow-sm flex flex-col ${editingId === project._id ? 'ring-2 ring-blue-500' : ''}`}
              >
                <img src={project.imageUrl} alt={project.title} className="w-full h-44 object-cover bg-gray-100" />
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-gray-800 line-clamp-1">{project.title}</h4>
                    <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${statusChipClass(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">{project.location}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 whitespace-pre-line">{project.description}</p>
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => startEditing(project)}
                      className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-md transition text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project)}
                      className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-md transition text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManager;
