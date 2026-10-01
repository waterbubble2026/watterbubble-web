import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomeContent from './pages/HomeContent';
import AboutPage from './pages/AboutPage';
import WaterWallsPage from './pages/WaterWallsPage';
import BubbleWallsPage from './pages/BubbleWallsPage';
import BubbleTubesPage from './pages/BubbleTubesPage';
import ProjectsPage from './pages/ProjectsPage';
import VideosPage from './pages/VideosPage';
import ContactPage from './pages/ContactPage';
import FooterSection from './components/FooterSection';
import AdminPage from './pages/AdminPage';

import ComingSoonPage from './pages/ComingSoonPage';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState({});
  const [subcategories, setSubcategories] = useState([]);

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch all subcategories so they can be shown in the navbar dropdowns
    fetch('/api/subcategories')
      .then(res => res.json())
      .then(data => setSubcategories(data))
      .catch(err => console.error(err));
  }, []);

  const toggleMobileMenu = (name) => {
    setExpandedMobileMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Water Walls', path: '/water-walls' },
    { name: 'Bubble Walls', path: '/bubble-walls' },
    { name: 'Bubble Tubes', path: '/bubble-tubes' },
    { name: 'Projects', path: '/projects' },
    { name: 'Videos', path: '/videos' },
    { name: 'Contact', path: '/contact' }
  ];

  const images = [
    '/home/grid1.png',
    '/home/grid2.png',
    '/home/grid3.png',
    '/home/grid4.png',
  ];

  return (
    <div className={`min-h-screen relative flex flex-col ${currentPath === '/' ? 'bg-[#050B14]' : 'bg-[#f4f4f4]'}`}>

      {/* Home Background Image */}
      {currentPath === '/' && (
        <>
          <div
            className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bubble-cover.png')" }}
          />
          <div className="fixed inset-0 z-0 mix-blend-multiply" />
        </>
      )}

      {/* Navigation */}
      {!currentPath.startsWith('/admin') && (
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-8' : 'bg-transparent py-6'
            }`}
        >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/logo.png" alt="Water Bubble Walls" className="h-10 object-contain" />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isMainCat = ['Water Walls', 'Bubble Walls', 'Bubble Tubes'].includes(link.name);
              const catSubs = isMainCat ? subcategories.filter(s => s.mainCategory === link.name) : [];
              
              return (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-1 text-[12px] font-bold uppercase tracking-wider transition-colors py-2 ${isScrolled
                      ? link.path === currentPath ? 'text-[#5ea2d8]' : 'text-gray-600 hover:text-[#5ea2d8]'
                      : link.path === currentPath ? 'text-white' : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    <span>{link.name}</span>
                    {catSubs.length > 0 && (
                      <svg className="w-3.5 h-3.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  {catSubs.length > 0 && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 min-w-48 z-[60]">
                      <div className="bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden flex flex-col py-2">
                        {catSubs.map(sub => (
                          <Link
                            key={sub._id}
                            to={`${link.path}?tab=${encodeURIComponent(sub.name)}`}
                            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-[#5ea2d8] hover:bg-gray-50 transition-colors whitespace-nowrap"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? 'text-[#5ea2d8]' : 'text-white'}`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#050B14] shadow-xl py-6 px-8 flex flex-col space-y-6 max-h-[70vh] overflow-y-auto z-[60]">
            {navLinks.map((link) => {
              const isMainCat = ['Water Walls', 'Bubble Walls', 'Bubble Tubes'].includes(link.name);
              const catSubs = isMainCat ? subcategories.filter(s => s.mainCategory === link.name) : [];
              
              return (
                <div key={link.name} className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-colors ${link.path === currentPath ? 'text-[#5ea2d8]' : 'text-gray-300 hover:text-white'
                        }`}
                    >
                      {link.name}
                    </Link>
                    {catSubs.length > 0 && (
                      <button 
                        onClick={() => toggleMobileMenu(link.name)}
                        className="text-gray-400 p-2"
                      >
                        <svg className={`w-4 h-4 transition-transform ${expandedMobileMenus[link.name] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </button>
                    )}
                  </div>
                  
                  {catSubs.length > 0 && expandedMobileMenus[link.name] && (
                    <div className="flex flex-col pl-4 mt-4 space-y-4 border-l border-gray-700">
                      {catSubs.map(sub => (
                        <Link
                          key={sub._id}
                          to={`${link.path}?tab=${encodeURIComponent(sub.name)}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-[#5ea2d8] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </nav>
      )}

      {/* Content Area */}
      <Routes>
        <Route path="/" element={<HomeContent images={images} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/water-walls" element={<WaterWallsPage />} />
        <Route path="/bubble-walls" element={<BubbleWallsPage />} />
        <Route path="/bubble-tubes" element={<BubbleTubesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      {/* Footer Section */}
      {!currentPath.startsWith('/admin') && <FooterSection />}
    </div>
  );
};

export default App;
