
const FooterSection = () => {
  return (
    <footer className="w-full flex flex-col max-h-[25vh] min-h-[120px] shrink-0 z-20 relative">
      {/* Top Part */}
      <div className="bg-[#0b162c] flex-grow flex items-center justify-between px-6 md:px-16 py-4 md:py-8 overflow-hidden">
        
        {/* Logo Area */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Water Bubble Walls" className="h-12 object-contain" />
        </div>

        {/* Address & Contact */}
        <div className="text-center text-[10px] md:text-sm text-gray-200 hidden md:block font-light">
          <p>Udaipur, Rajasthan, India</p>
          <p className="mt-1 font-medium text-[#4aa0e0]">
            Tel: +91 89470 32360
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
            {/* Facebook icon */}
            <svg className="w-4 h-4 md:w-5 md:h-5 text-[#1877F2] fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
            {/* Instagram icon */}
            <svg className="w-4 h-4 md:w-5 md:h-5 text-[#E1306C]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
            {/* Youtube icon */}
            <svg className="w-4 h-4 md:w-5 md:h-5 text-[#FF0000] fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
      
      {/* Bottom Part */}
      <div className="bg-[#1f1f1f] text-[gray] text-[8px] md:text-xs py-2 md:py-3 flex justify-center items-center tracking-widest uppercase text-center shrink-0">
        WATER BUBBLE WALLS | POWERED BY NINJA LIGHTS & DESIGN
      </div>
    </footer>
  );
};

export default FooterSection;
