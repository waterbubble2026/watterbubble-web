import { useState, useEffect } from 'react';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const channelId = 'UCSxxYXBWapZMoxWFNxCJ9fw';
        // Using rss2json to convert YouTube RSS feed to JSON
        const url = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3D${channelId}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'ok') {
          setVideos(data.items);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const displayedVideos = videos.slice(0, visibleCount);

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
          VIDEOS | Water Bubble Walls DESIGNS
        </h1>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-screen-xl mx-auto px-6 md:px-12 py-16 relative z-10">
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl text-gray-400 font-light leading-snug mb-6">
              <strong className="text-gray-700 font-bold">Water Bubble Walls</strong> are the premier designer and installer of <strong className="text-gray-700 font-bold">interior water features</strong> and have installed our water features at hundreds of premier venues in the India.
            </h2>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              Every water feature is uniquely designed and crafted at our water feature design studio and factory in Udaipur, Rajasthan.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              Our <a href="https://www.youtube.com/channel/UCSxxYXBWapZMoxWFNxCJ9fw" target="_blank" rel="noopener noreferrer" className="text-[#5ea2d8] hover:underline font-medium">Youtube channel</a> is a great showcase of our work and we try and publish new projects regularly. Please subscribe to our channel to keep in touch with our new projects as they come online.
            </p>
          </div>
        </div>

        {/* Videos Grid */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading latest videos...</div>
        ) : videos.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No videos found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {displayedVideos.map((video, idx) => (
                <a 
                  href={video.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  key={idx} 
                  className="flex flex-col group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 relative"
                >
                  <div className="w-full aspect-[9/16] relative overflow-hidden bg-gray-900">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* YouTube Shorts Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Title Overlay on top of image at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                    <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug drop-shadow-md">
                      {video.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
            
            {visibleCount < videos.length && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 4)}
                  className="px-8 py-3 bg-[#5ea2d8] text-white font-semibold rounded shadow-md hover:bg-[#4a89bd] transition-colors text-sm tracking-wider uppercase"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default VideosPage;
