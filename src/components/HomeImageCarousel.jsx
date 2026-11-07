import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

/**
 * Reusable HomeImageCarousel component
 * - Powered by Embla Carousel React & Autoplay
 * - Shows ONE large image at a time
 * - The next image comes smoothly from the right every `interval` ms (default 2500ms = 2.5s)
 * - Supports any number of images in the `images` prop
 * - Interactive navigation: subtle arrows, dot indicators, and pause on hover
 */
const HomeImageCarousel = ({
  images = [],
  interval = 2500,
  className = '',
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      duration: 35,
    },
    [
      Autoplay({
        delay: interval,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative w-full aspect-[4/5] lg:aspect-[3/4] min-h-[460px] lg:min-h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 group bg-black/30 ${className}`}
    >
      {/* Inner shadow/glow to match luxury aesthetic */}
      <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] z-20 pointer-events-none rounded-3xl" />

      {/* Slide Index Badge */}
      <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider text-white/90">
        <span className="text-[#1EA3DE] font-semibold">
          {String(selectedIndex + 1).padStart(2, '0')}
        </span>{' '}
        / {String(images.length).padStart(2, '0')}
      </div>

      {/* Embla Viewport */}
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden"
            >
              <img
                src={src}
                alt={`Water Bubble Wall Showcase ${index + 1}`}
                className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev Navigation Button */}
      <button
        onClick={scrollPrev}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#1EA3DE] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next Navigation Button */}
      <button
        onClick={scrollNext}
        aria-label="Next image"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#1EA3DE] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === index
                  ? 'w-6 bg-[#1EA3DE]'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeImageCarousel;

