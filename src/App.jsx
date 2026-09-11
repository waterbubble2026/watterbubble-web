import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomeContent from './pages/HomeContent';
import AboutPage from './pages/AboutPage';
import WaterWallsPage from './pages/WaterWallsPage';
import BubbleWallsPage from './pages/BubbleWallsPage';
import BubbleTubesPage from './pages/BubbleTubesPage';
import ProjectsPage from './pages/ProjectsPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import FooterSection from './components/FooterSection';

import ComingSoonPage from './pages/ComingSoonPage';

const App = () => {
  return <ComingSoonPage />;


  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

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
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' }
  ];

  const images = [
    'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1518778278964-db097be6a17b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?auto=format&fit=crop&q=80&w=400'
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
          {/* Logo Placeholder */}
          <div className="flex-shrink-0">
            <div className={`w-32 h-8 rounded border-2 flex items-center justify-center font-bold tracking-widest transition-colors ${isScrolled ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-white text-white'}`}>
              LOGO
            </div>
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

          {/* Mobile Menu Button - Placeholder */}
          <div className="lg:hidden">
            <button className={`${isScrolled ? 'text-[#5ea2d8]' : 'text-white'}`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <Routes>
        <Route path="/" element={<HomeContent images={images} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/water-walls" element={<WaterWallsPage />} />
        <Route path="/bubble-walls" element={<BubbleWallsPage />} />
        <Route path="/bubble-tubes" element={<BubbleTubesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
};

export default App;
