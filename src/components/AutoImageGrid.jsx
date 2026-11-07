import React, { useState, useEffect, useRef } from 'react';

/**
 * Reusable AutoImageGrid component
 * - Displays a grid of images (default 2x2 = 4 slots)
 * - Automatically transitions images randomly every `interval` ms (default 2500ms = 2.5s)
 * - Seamlessly works with 4 images (swapping slots) and automatically uses additional images
 *   from the pool once more images are provided without showing duplicates.
 * - Buttery smooth crossfade animations using dual-layer transitions.
 */
const AutoImageGrid = ({
  images = [],
  interval = 2500,
  slotCount = 4,
  columns = 2,
  className = '',
  aspectRatioClass = 'aspect-[4/5] md:aspect-square',
  pauseOnHover = true,
}) => {
  // Preload images into browser cache
  useEffect(() => {
    if (!images || images.length === 0) return;
    images.forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [images]);

  // Initial slot state: each slot has imageA, imageB, and which one is active
  const [slots, setSlots] = useState(() => {
    const initialSlots = [];
    for (let i = 0; i < slotCount; i++) {
      const src = images[i % (images.length || 1)] || '';
      initialSlots.push({
        layerA: src,
        layerB: src,
        activeLayer: 'A',
      });
    }
    return initialSlots;
  });

  const [isHovered, setIsHovered] = useState(false);
  const lastChangedSlotRef = useRef(-1);

  // Sync if images array changes dynamically
  useEffect(() => {
    if (!images || images.length === 0) return;
    setSlots((prev) => {
      return Array.from({ length: slotCount }, (_, i) => {
        const existing = prev[i];
        const initialSrc = images[i % images.length];
        if (existing) {
          return existing;
        }
        return {
          layerA: initialSrc,
          layerB: initialSrc,
          activeLayer: 'A',
        };
      });
    });
  }, [images, slotCount]);

  // Auto transition effect
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      if (pauseOnHover && isHovered) return;

      setSlots((currentSlots) => {
        if (!currentSlots || currentSlots.length === 0) return currentSlots;

        // Find currently visible image in each slot
        const visibleImages = currentSlots.map((s) =>
          s.activeLayer === 'A' ? s.layerA : s.layerB
        );

        // Pick a random slot to change (prefer different from last slot)
        const possibleSlots = Array.from({ length: currentSlots.length }, (_, idx) => idx);
        const candidates =
          possibleSlots.length > 1
            ? possibleSlots.filter((idx) => idx !== lastChangedSlotRef.current)
            : possibleSlots;
        const targetSlot = candidates[Math.floor(Math.random() * candidates.length)];
        lastChangedSlotRef.current = targetSlot;

        // Unused images from the full pool
        const unusedPool = images.filter((img) => !visibleImages.includes(img));

        // If we have extra unused images in the pool:
        if (unusedPool.length > 0) {
          const nextImg = unusedPool[Math.floor(Math.random() * unusedPool.length)];

          return currentSlots.map((slot, idx) => {
            if (idx !== targetSlot) return slot;

            const nextActiveLayer = slot.activeLayer === 'A' ? 'B' : 'A';
            return {
              ...slot,
              layerA: nextActiveLayer === 'A' ? nextImg : slot.layerA,
              layerB: nextActiveLayer === 'B' ? nextImg : slot.layerB,
              activeLayer: nextActiveLayer,
            };
          });
        }

        // If we only have 4 (or fewer/equal) images available in the pool:
        // Swap targetSlot with another slot so images randomly shuffle and transition smoothly
        const otherSlots = possibleSlots.filter((idx) => idx !== targetSlot);
        if (otherSlots.length === 0) return currentSlots;
        const swapPartner = otherSlots[Math.floor(Math.random() * otherSlots.length)];

        const targetCurrentImg = visibleImages[targetSlot];
        const partnerCurrentImg = visibleImages[swapPartner];

        return currentSlots.map((slot, idx) => {
          if (idx === targetSlot) {
            const nextActiveLayer = slot.activeLayer === 'A' ? 'B' : 'A';
            return {
              ...slot,
              layerA: nextActiveLayer === 'A' ? partnerCurrentImg : slot.layerA,
              layerB: nextActiveLayer === 'B' ? partnerCurrentImg : slot.layerB,
              activeLayer: nextActiveLayer,
            };
          }
          if (idx === swapPartner) {
            const nextActiveLayer = slot.activeLayer === 'A' ? 'B' : 'A';
            return {
              ...slot,
              layerA: nextActiveLayer === 'A' ? targetCurrentImg : slot.layerA,
              layerB: nextActiveLayer === 'B' ? targetCurrentImg : slot.layerB,
              activeLayer: nextActiveLayer,
            };
          }
          return slot;
        });
      });
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval, pauseOnHover, isHovered, slotCount]);

  const gridColsClass =
    columns === 1
      ? 'grid-cols-1'
      : columns === 3
      ? 'grid-cols-3'
      : columns === 4
      ? 'grid-cols-2 md:grid-cols-4'
      : 'grid-cols-2';

  return (
    <div
      className={`grid ${gridColsClass} gap-4 md:gap-6 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slots.map((slot, index) => {
        return (
          <div
            key={index}
            className={`rounded-2xl overflow-hidden ${aspectRatioClass} shadow-xl group cursor-pointer border border-white/10 relative bg-black/20`}
          >
            {/* Inner shadow/glow to match design */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-20 pointer-events-none rounded-2xl" />

            {/* Layer A */}
            <img
              src={slot.layerA}
              alt={`Gallery image ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 ${
                slot.activeLayer === 'A'
                  ? 'opacity-100 z-10 scale-100'
                  : 'opacity-0 z-0'
              }`}
            />

            {/* Layer B */}
            <img
              src={slot.layerB}
              alt={`Gallery image ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 ${
                slot.activeLayer === 'B'
                  ? 'opacity-100 z-10 scale-100'
                  : 'opacity-0 z-0'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AutoImageGrid;

