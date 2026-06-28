import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ProgressiveImage = ({ src, alt, className, isMobile }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-transparent rounded-2xl overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${isMobile ? 'object-contain' : 'object-cover'} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <Loader2 className="animate-spin text-primary-soft w-10 h-10 drop-shadow-lg" />
        </div>
      )}
    </div>
  );
};

const ImageCarousel = ({ images = [], isMobile = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  // Ensure we have enough items for the 7-stage teleportation buffer
  const displayImages = useMemo(() => {
    if (!images || images.length === 0) return [];
    let arr = [...images];
    while (arr.length < 7) {
      arr = [...arr, ...images];
    }
    return arr;
  }, [images]);

  if (!displayImages || displayImages.length === 0) return null;

  if (displayImages.length === 1) {
    return (
      <div className="w-full max-w-4xl mx-auto h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] p-4">
        <ProgressiveImage src={displayImages[0]} alt="Screenshot" />
      </div>
    );
  }

  // Infinite auto-scroll
  useEffect(() => {
    if (!displayImages || displayImages.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500); // Scroll every 3.5 seconds
    return () => clearInterval(interval);
  }, [displayImages]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const getVariant = (i) => {
    const len = displayImages.length;
    if (i === currentIndex) return "center";
    if (i === (currentIndex - 1 + len) % len) return "left";
    if (i === (currentIndex + 1) % len) return "right";
    if (i === (currentIndex - 2 + len) % len) return "farLeft";
    if (i === (currentIndex + 2 + len) % len) return "farRight";
    if (i === (currentIndex - 3 + len) % len) return "superFarLeft";
    if (i === (currentIndex + 3 + len) % len) return "superFarRight";
    return "hidden";
  };

  const webVariants = {
    center: { x: "0%", scale: 1, zIndex: 10, opacity: 1, filter: "blur(0px) brightness(1)", transition: { duration: 0.4, ease: "linear" } },
    left: { x: "-100%", scale: 0.85, zIndex: 5, opacity: 1, filter: "blur(2px) brightness(0.9)", transition: { duration: 0.4, ease: "linear" } },
    right: { x: "100%", scale: 0.85, zIndex: 5, opacity: 1, filter: "blur(2px) brightness(0.9)", transition: { duration: 0.4, ease: "linear" } },
    farLeft: { x: "-200%", scale: 0.85, zIndex: 0, opacity: 0, filter: "blur(2px)", transition: { duration: 0.4, ease: "linear" } },
    farRight: { x: "200%", scale: 0.85, zIndex: 0, opacity: 0, filter: "blur(2px)", transition: { duration: 0.4, ease: "linear" } },
    superFarLeft: (dir) => ({ 
      x: "-300%", scale: 0.85, zIndex: 0, opacity: 0, filter: "blur(2px)",
      transition: { duration: dir === 1 ? 0.4 : 0, ease: "linear" } 
    }),
    superFarRight: (dir) => ({ 
      x: "300%", scale: 0.85, zIndex: 0, opacity: 0, filter: "blur(2px)",
      transition: { duration: dir === -1 ? 0.4 : 0, ease: "linear" } 
    }),
    hidden: { x: "0%", scale: 0.5, zIndex: 0, opacity: 0, transition: { duration: 0 } },
  };

  const mobileVariants = {
    center: { x: "0%", scale: 1, zIndex: 10, opacity: 1, filter: "blur(0px) brightness(1)", transition: { duration: 0.4, ease: "linear" } },
    left: { x: "-105%", scale: 1, zIndex: 5, opacity: 1, filter: "blur(0px) brightness(0.85)", transition: { duration: 0.4, ease: "linear" } },
    right: { x: "105%", scale: 1, zIndex: 5, opacity: 1, filter: "blur(0px) brightness(0.85)", transition: { duration: 0.4, ease: "linear" } },
    farLeft: { x: "-210%", scale: 0.85, zIndex: 2, opacity: 1, filter: "blur(2px) brightness(0.5)", transition: { duration: 0.4, ease: "linear" } },
    farRight: { x: "210%", scale: 0.85, zIndex: 2, opacity: 1, filter: "blur(2px) brightness(0.5)", transition: { duration: 0.4, ease: "linear" } },
    superFarLeft: (dir) => ({ 
      x: "-315%", scale: 0.85, zIndex: 0, opacity: 0, filter: "blur(2px)",
      transition: { duration: dir === 1 ? 0.4 : 0, ease: "linear" } 
    }),
    superFarRight: (dir) => ({ 
      x: "315%", scale: 0.85, zIndex: 0, opacity: 0, filter: "blur(2px)",
      transition: { duration: dir === -1 ? 0.4 : 0, ease: "linear" } 
    }),
    hidden: { x: "0%", scale: 0.5, zIndex: 0, opacity: 0, transition: { duration: 0 } },
  };

  const activeVariants = isMobile ? mobileVariants : webVariants;
  
  const containerHeight = isMobile 
    ? "h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]" 
    : "h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]";

  const trackWidth = isMobile 
    ? "w-[55%] sm:w-[28%]" 
    : "w-[72%]";

  return (
    <div className={`relative w-full flex flex-col items-center justify-center overflow-hidden ${containerHeight}`}>
      
      {/* Carousel Track */}
      <div className={`relative h-full flex-1 flex items-center justify-center ${trackWidth}`}>

        {displayImages.map((img, i) => {
          const variant = getVariant(i);
          return (
            <motion.div
              key={i}
              custom={direction}
              variants={activeVariants}
              initial={false}
              animate={variant}
              className={`absolute w-full h-full rounded-2xl overflow-hidden ${variant === 'left' || variant === 'right' || variant === 'farLeft' || variant === 'farRight' ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (variant === "left" || variant === "farLeft") prevSlide();
                if (variant === "right" || variant === "farRight") nextSlide();
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  nextSlide();
                } else if (swipe > swipeConfidenceThreshold) {
                  prevSlide();
                }
              }}
            >
              <ProgressiveImage src={img} alt={`Screenshot ${i + 1}`} isMobile={isMobile} />
            </motion.div>
          );
        })}
      </div>

      {/* Dots (Manual Navigation) */}
      <div className="absolute bottom-0 z-20 flex items-center gap-2">
        {displayImages.map((_, i) => {
          // If we duplicated array to hit 5, only show dots for the true original images
          const originalLen = images.length;
          if (i >= originalLen) return null;
          
          const isActive = (currentIndex % originalLen) === i;
          
          return (
            <button
              key={i}
              onClick={() => {
                const newIndex = i;
                setDirection(newIndex > (currentIndex % originalLen) ? 1 : -1);
                setCurrentIndex(newIndex);
              }}
              className={`transition-all duration-300 rounded-full ${isActive ? 'w-6 h-2 bg-primary-soft shadow-[0_0_10px_rgba(74,222,128,0.8)]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageCarousel;
