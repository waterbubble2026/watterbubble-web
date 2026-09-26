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

import ComingSoonPage from './pages/ComingSoonPage';

const App = () => {
  // return <ComingSoonPage />;


  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[12px] font-bold uppercase tracking-wider transition-colors ${isScrolled
                  ? link.path === currentPath ? 'text-[#5ea2d8]' : 'text-gray-600 hover:text-[#5ea2d8]'
                  : link.path === currentPath ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#050B14] shadow-xl py-6 px-8 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${link.path === currentPath ? 'text-[#5ea2d8]' : 'text-gray-300 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

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
      </Routes>

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
};

export default App;
