import { useState, useEffect } from 'react';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('Water Walls');
  const [subcategories, setSubcategories] = useState([]);
  const [latestInstallations, setLatestInstallations] = useState([]);

  const [newSubName, setNewSubName] = useState('');
  const [newSubOrder, setNewSubOrder] = useState(0);
  const [selectedSubId, setSelectedSubId] = useState('');
  const [newSubFiles, setNewSubFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState('');

  // Editing state for subcategory
  const [editingSubId, setEditingSubId] = useState(null);
  const [editSubName, setEditSubName] = useState('');
  const [editSubOrder, setEditSubOrder] = useState(0);

  // Latest Installations state
  const [liTitle, setLiTitle] = useState('');
  const [liDesc, setLiDesc] = useState('');
  const [liFile, setLiFile] = useState(null);
  const [isLiUploading, setIsLiUploading] = useState(false);

  const mainCategories = ['Water Walls', 'Bubble Walls', 'Bubble Tubes', 'Latest Installations'];

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchSubcategories();
      fetchLatestInstallations();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        fetchSubcategories();
        fetchLatestInstallations();
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (err) {
      setLoginError('Error connecting to server');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  };

  const fetchSubcategories = async () => {
    try {
      const res = await fetch('/api/subcategories');
      const data = await res.json();
      setSubcategories(data);
    } catch (err) {
      console.error('Error fetching subcategories', err);
    }
  };

  const fetchLatestInstallations = async () => {
    try {
      const res = await fetch('/api/latest-installations');
      const data = await res.json();
      setLatestInstallations(data);
    } catch (err) {
      console.error('Error fetching latest installations', err);
    }
  };

  const handleCreateSubcategory = async (e) => {
    e.preventDefault();
    if (!newSubName) {
      alert('Please provide a name');
      return;
    }

    try {
      const res = await fetch('/api/subcategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newSubName, mainCategory: activeTab, order: Number(newSubOrder) })
      });
      if (res.ok) {
        setNewSubName('');
        setNewSubOrder(0);
        fetchSubcategories();
      } else {
        alert('Failed to create subcategory');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating subcategory');
    }
  };

  // Fast client-side image compression: prevents huge multi-megabyte mobile photos
  // from choking bandwidth and ensures requests stay well below Vercel's 4.5MB limit
  const compressImage = async (file) => {
    if (!file.type.startsWith('image/') || file.type === 'image/gif' || file.type === 'image/svg+xml') {
      return file;
    }
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1920;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob && blob.size < file.size) {
              const cleanName = file.name.replace(/\.[^/.]+$/, '') + '.jpg';
              resolve(new File([blob], cleanName, { type: 'image/jpeg' }));
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          0.85
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(file);
      };
      img.src = url;
    });
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!selectedSubId || newSubFiles.length === 0) {
      alert('Please select a subcategory and at least one image');
      return;
    }

    const targetSub = subcategories.find(s => s._id === selectedSubId);
    const currentCount = targetSub?.images?.length || 0;
    const availableSlots = 25 - currentCount;

    if (availableSlots <= 0) {
      alert('This subcategory has already reached the maximum limit of 25 images.');
      return;
    }

    if (newSubFiles.length > availableSlots) {
      alert(`Cannot upload ${newSubFiles.length} images. Only ${availableSlots} slot(s) remaining for this subcategory (maximum 25).`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatusText(`Preparing to upload ${newSubFiles.length} image(s)...`);

    const total = newSubFiles.length;
    let successfulUploads = 0;
    let failedUploads = 0;

    // Upload each image sequentially to avoid Vercel 4.5MB payload limit & function timeouts
    for (let i = 0; i < total; i++) {
      const originalFile = newSubFiles[i];
      const currentNum = i + 1;
      setUploadStatusText(`Processing & uploading ${currentNum} of ${total}: ${originalFile.name}...`);

      // Compress client-side if large
      const fileToUpload = await compressImage(originalFile);

      const formData = new FormData();
      formData.append('images', fileToUpload);

      try {
        const res = await fetch(`/api/subcategories/${selectedSubId}/images`, {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          successfulUploads++;
        } else {
          const errData = await res.json().catch(() => ({}));
          console.error(`Failed to upload ${originalFile.name}:`, errData);
          failedUploads++;
        }
      } catch (err) {
        console.error(`Network error uploading ${originalFile.name}:`, err);
        failedUploads++;
      }

      const percent = Math.round((currentNum / total) * 100);
      setUploadProgress(percent);
    }

    setIsUploading(false);
    fetchSubcategories();

    if (failedUploads === 0) {
      setUploadStatusText(`All ${successfulUploads} image(s) uploaded successfully!`);
      alert(`Successfully uploaded all ${successfulUploads} image(s)!`);
      setNewSubFiles([]);
      e.target.reset();
      setTimeout(() => {
        setUploadProgress(0);
        setUploadStatusText('');
      }, 4000);
    } else {
      setUploadStatusText(`Uploaded ${successfulUploads} image(s). ${failedUploads} failed.`);
      alert(`Uploaded ${successfulUploads} of ${total} images. (${failedUploads} failed)`);
      setNewSubFiles([]);
      e.target.reset();
    }
  };

  const handleDeleteSubcategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subcategory and ALL its images?')) return;
    try {
      const res = await fetch(`/api/subcategories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchSubcategories();
      } else {
        alert('Failed to delete subcategory');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting');
    }
  };

  const handleDeleteImage = async (subId, imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`/api/subcategories/${subId}/images/${imageId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchSubcategories();
      } else {
        alert('Failed to delete image');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting image');
    }
  };

  const startEditing = (sub) => {
    setEditingSubId(sub._id);
    setEditSubName(sub.name);
    setEditSubOrder(sub.order || 0);
  };

  const handleUpdateSubcategory = async (e, id) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/subcategories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editSubName, order: Number(editSubOrder) })
      });
      if (res.ok) {
        setEditingSubId(null);
        fetchSubcategories();
      } else {
        alert('Failed to update subcategory');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating subcategory');
    }
  };

  const handleCreateLatestInstallation = async (e) => {
    e.preventDefault();
    if (!liTitle || !liDesc || !liFile) {
      alert('Please provide title, description, and image');
      return;
    }

    if (latestInstallations.length >= 4) {
      alert('Max limit reached. Delete one then add new.');
      return;
    }

    setIsLiUploading(true);
    const formData = new FormData();
    formData.append('title', liTitle);
    formData.append('description', liDesc);
    formData.append('image', liFile);

    try {
      const res = await fetch('/api/latest-installations', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setLiTitle('');
        setLiDesc('');
        setLiFile(null);
        e.target.reset();
        fetchLatestInstallations();
      } else {
        alert(data.error || 'Failed to create');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating latest installation');
    }
    setIsLiUploading(false);
  };

  const handleDeleteLatestInstallation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this installation?')) return;
    try {
      const res = await fetch(`/api/latest-installations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchLatestInstallations();
      } else {
        alert('Failed to delete installation');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Login</h2>
          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#999999] text-sm font-bold mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-[#999999] text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const activeSubcategories = subcategories.filter(s => s.mainCategory === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 tracking-wide">Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-800">
          Logout
        </button>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12">
        <div className="flex space-x-1 border-b border-gray-200 mb-8 overflow-x-auto">
          {mainCategories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setSelectedSubId('');
                setEditingSubId(null);
              }}
              className={`py-3 px-6 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === cat
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-[#999999] hover:border-gray-300'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage {activeTab}</h2>

          {activeTab === 'Latest Installations' ? (
            <div className="space-y-10">
              {/* Form for Latest Installations */}
              <form onSubmit={handleCreateLatestInstallation} className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-2xl">
                <h3 className="text-lg font-medium text-[#999999] mb-4">Add New Installation</h3>
                {latestInstallations.length >= 4 && (
                  <div className="mb-4 text-sm text-red-600 font-bold bg-red-100 p-3 rounded">
                    Max limit reached (4 items). Delete one then add new.
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#999999] mb-2">Title</label>
                    <input
                      type="text"
                      value={liTitle}
                      onChange={e => setLiTitle(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={latestInstallations.length >= 4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#999999] mb-2">Description</label>
                    <textarea
                      value={liDesc}
                      onChange={e => setLiDesc(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                      required
                      disabled={latestInstallations.length >= 4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#999999] mb-2">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setLiFile(e.target.files[0])}
                      className="w-full px-3 py-2 border rounded-md bg-white text-sm"
                      required
                      disabled={latestInstallations.length >= 4}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLiUploading || latestInstallations.length >= 4}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    {isLiUploading ? 'Uploading...' : 'Add Installation'}
                  </button>
                </div>
              </form>

              {/* List of Latest Installations */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Existing Installations ({latestInstallations.length}/4)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {latestInstallations.map(item => (
                    <div key={item._id} className="border rounded-lg overflow-hidden bg-white shadow-sm flex flex-col">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                      <div className="p-4 flex flex-col flex-1">
                        <h4 className="font-bold text-gray-800 mb-2 line-clamp-1">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                        <div className="mt-auto">
                          <button
                            onClick={() => handleDeleteLatestInstallation(item._id)}
                            className="w-full bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-md transition text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* Create Subcategory Form */}
                <form onSubmit={handleCreateSubcategory} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-[#999999] mb-4">1. Create New Subcategory</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#999999] mb-2">Subcategory Name</label>
                      <input
                        type="text"
                        value={newSubName}
                        onChange={e => setNewSubName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Round Tubes"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#999999] mb-2">Order (Lower numbers appear first)</label>
                      <input
                        type="number"
                        value={newSubOrder}
                        onChange={e => setNewSubOrder(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Create Subcategory
                    </button>
                  </div>
                </form>

                {/* Upload Image Form */}
                <form onSubmit={handleUploadImage} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-[#999999] mb-4">2. Upload Images to Subcategory</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#999999] mb-2">Select Subcategory</label>
                      <select
                        value={selectedSubId}
                        onChange={e => setSelectedSubId(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                        required
                      >
                        <option value="" disabled>Select a subcategory...</option>
                        {activeSubcategories.map(sub => (
                          <option key={sub._id} value={sub._id}>
                            {sub.name} ({sub.images?.length || 0}/25 images)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#999999] mb-2">
                        Choose Images (Select multiple)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={e => setNewSubFiles(Array.from(e.target.files || []))}
                        className="w-full px-3 py-2 border rounded-md bg-white text-sm"
                        required
                      />
                      {newSubFiles.length > 0 && (
                        <p className="mt-2 text-xs text-blue-600 font-medium">
                          ✓ {newSubFiles.length} image{newSubFiles.length > 1 ? 's' : ''} selected
                        </p>
                      )}
                    </div>
                    {/* Live Progress Bar */}
                    {isUploading && (
                      <div className="space-y-2 pt-2 bg-blue-50/70 p-3 rounded-lg border border-blue-100">
                        <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                          <span className="truncate pr-2 text-blue-900">{uploadStatusText}</span>
                          <span className="text-blue-600 font-bold shrink-0">{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                          <div
                            className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out shadow-sm"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isUploading || !selectedSubId || newSubFiles.length === 0}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-4 rounded-md transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isUploading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                          </svg>
                          <span>Uploading ({uploadProgress}%)</span>
                        </>
                      ) : (
                        <span>Upload {newSubFiles.length > 0 ? `${newSubFiles.length} ` : ''}Image{newSubFiles.length > 1 ? 's' : ''}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* List of Subcategories and their Images */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Existing Subcategories & Images</h3>

                {activeSubcategories.length === 0 ? (
                  <p className="text-gray-500 italic text-sm">No subcategories found for {activeTab}.</p>
                ) : (
                  <div className="space-y-8">
                    {activeSubcategories.map(sub => (
                      <div key={sub._id} className="border rounded-xl p-6 bg-white shadow-sm">
                        {editingSubId === sub._id ? (
                          <form onSubmit={(e) => handleUpdateSubcategory(e, sub._id)} className="mb-6 p-4 bg-gray-50 rounded-lg border flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1">
                              <label className="block text-xs text-gray-500 mb-1 uppercase font-semibold">Edit Name</label>
                              <input
                                type="text"
                                value={editSubName}
                                onChange={e => setEditSubName(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                                required
                              />
                            </div>
                            <div className="w-24">
                              <label className="block text-xs text-gray-500 mb-1 uppercase font-semibold">Order</label>
                              <input
                                type="number"
                                value={editSubOrder}
                                onChange={e => setEditSubOrder(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                                required
                              />
                            </div>
                            <div className="flex gap-2">
                              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Save</button>
                              <button type="button" onClick={() => setEditingSubId(null)} className="px-4 py-2 bg-gray-300 text-[#999999] rounded hover:bg-gray-400 transition">Cancel</button>
                            </div>
                          </form>
                        ) : (
                          <div className="flex justify-between items-center mb-4 border-b pb-4">
                            <div>
                              <h4 className="text-lg font-bold text-gray-800">
                                {sub.name}
                                <span className="text-sm font-normal text-gray-500 ml-2">({sub.images?.length || 0} images)</span>
                              </h4>
                              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wider mt-1 inline-block">Order: {sub.order || 0}</span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => startEditing(sub)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center px-3 py-1 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteSubcategory(sub._id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center px-3 py-1 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}

                        {(!sub.images || sub.images.length === 0) ? (
                          <p className="text-sm text-gray-400 italic">No images uploaded yet.</p>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {sub.images.map(img => (
                              <div key={img._id} className="relative group rounded-lg overflow-hidden border aspect-square bg-gray-100">
                                <img src={img.url} alt="Uploaded" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button
                                    onClick={() => handleDeleteImage(sub._id, img._id)}
                                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                                    title="Delete Image"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
