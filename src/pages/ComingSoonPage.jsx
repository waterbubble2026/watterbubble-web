import React from 'react';

const ComingSoonPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#050B14] via-[#0a1e3f] to-[#050B14] overflow-hidden flex flex-col items-center justify-center font-sans">
      {/* Background Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 80 + 20; // 20px to 100px
          const left = Math.random() * 100; // 0% to 100%
          const animationDuration = Math.random() * 15 + 10; // 10s to 25s
          const animationDelay = Math.random() * 15; // 0s to 15s

          return (
            <div
              key={i}
              className="absolute bottom-[-150px] rounded-full border border-white/20 bg-white/5 backdrop-blur-sm animate-bubble"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                animationDuration: `${animationDuration}s`,
                animationDelay: `${animationDelay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-widest uppercase mb-3 text-center">
            Water Bubble Walls
          </h2>
          <p className="text-xs md:text-sm text-gray-400 tracking-[0.2em] uppercase text-center">
            Powered by Ninja Lights & Design
          </p>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-[0.15em] uppercase drop-shadow-lg">
          Coming <span className="text-[#5ea2d8] font-medium">Soon</span>
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-md">
          We are currently crafting a new digital experience. 
          Our bespoke water features and bubble walls will be making a splash online very soon.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <span className="text-[#5ea2d8] text-xs uppercase tracking-widest mb-3 font-bold">Location</span>
            <span className="text-white text-lg md:text-xl font-light">Udaipur, Rajasthan, India</span>
          </div>
          <div className="hidden sm:block w-px h-16 bg-white/20"></div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[#5ea2d8] text-xs uppercase tracking-widest mb-3 font-bold">Call Us</span>
            <a href="tel:+918947032360" className="text-white hover:text-[#5ea2d8] transition-colors text-lg md:text-xl font-light">+91 89470 32360</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
