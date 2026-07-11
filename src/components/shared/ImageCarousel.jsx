import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import {Loader2} from 'lucide-react';

const ProgressiveImage = React.memo(({src, alt, className}) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div
            className={`relative w-full h-full flex items-center justify-center bg-transparent ${className || ''}`}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`max-w-full max-h-full object-contain rounded-2xl shadow-theme-img transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
            />
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <Loader2 className="animate-spin text-primary-soft w-10 h-10 drop-shadow-lg"/>
                </div>
            )}
        </div>
    );
});
ProgressiveImage.displayName = 'ProgressiveImage';

const WEB_VARIANTS = {
    center: {x: '0%', scale: 1, zIndex: 10, opacity: 1, transition: {duration: 0.4, ease: 'easeOut'}},
    left: {x: '-104%', scale: 0.85, zIndex: 5, opacity: 0.7, transition: {duration: 0.4, ease: 'easeOut'}},
    right: {x: '104%', scale: 0.85, zIndex: 5, opacity: 0.7, transition: {duration: 0.4, ease: 'easeOut'}},
    farLeft: {x: '-208%', scale: 0.75, zIndex: 0, opacity: 0, transition: {duration: 0.4, ease: 'easeOut'}},
    farRight: {x: '208%', scale: 0.75, zIndex: 0, opacity: 0, transition: {duration: 0.4, ease: 'easeOut'}},
    superFarLeft: (dir) => ({
        x: '-312%', scale: 0.75, zIndex: 0, opacity: 0,
        transition: {duration: dir === 1 ? 0.4 : 0, ease: 'easeOut'},
    }),
    superFarRight: (dir) => ({
        x: '312%', scale: 0.75, zIndex: 0, opacity: 0,
        transition: {duration: dir === -1 ? 0.4 : 0, ease: 'easeOut'},
    }),
    hidden: {x: '0%', scale: 0.5, zIndex: 0, opacity: 0, transition: {duration: 0}},
};

const MOBILE_VARIANTS = {
    center: {x: '0%', scale: 1, zIndex: 10, opacity: 1, transition: {duration: 0.4, ease: 'easeOut'}},
    left: {x: '-105%', scale: 0.9, zIndex: 5, opacity: 0.7, transition: {duration: 0.4, ease: 'easeOut'}},
    right: {x: '105%', scale: 0.9, zIndex: 5, opacity: 0.7, transition: {duration: 0.4, ease: 'easeOut'}},
    farLeft: {x: '-210%', scale: 0.8, zIndex: 2, opacity: 0.5, transition: {duration: 0.4, ease: 'easeOut'}},
    farRight: {x: '210%', scale: 0.8, zIndex: 2, opacity: 0.5, transition: {duration: 0.4, ease: 'easeOut'}},
    superFarLeft: (dir) => ({
        x: '-315%', scale: 0.8, zIndex: 0, opacity: 0,
        transition: {duration: dir === 1 ? 0.4 : 0, ease: 'easeOut'},
    }),
    superFarRight: (dir) => ({
        x: '315%', scale: 0.8, zIndex: 0, opacity: 0,
        transition: {duration: dir === -1 ? 0.4 : 0, ease: 'easeOut'},
    }),
    hidden: {x: '0%', scale: 0.5, zIndex: 0, opacity: 0, transition: {duration: 0}},
};

const SWIPE_CONFIDENCE_THRESHOLD = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

// Minimum buffer needed to safely show the ±3 window without index collisions.
const MIN_BUFFER = 7;

const ImageCarousel = ({images = [], isMobile = false}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const originalLen = images.length;

    // Only duplicate as much as actually needed (avoids blowing up small
    // arrays like [imgA, imgB] into 7 copies when 2x would already exceed MIN_BUFFER
    // is never true for len>=7, and for tiny lengths we just need >= MIN_BUFFER items).
    const displayImages = useMemo(() => {
        if (originalLen === 0) return [];
        if (originalLen >= MIN_BUFFER) return images;
        const repeats = Math.ceil(MIN_BUFFER / originalLen);
        return Array.from({length: repeats}, () => images).flat();
    }, [images, originalLen]);

    const displayLen = displayImages.length;

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % displayLen);
    }, [displayLen]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + displayLen) % displayLen);
    }, [displayLen]);

    // Hooks must run unconditionally (fixes Rules-of-Hooks violation from the
    // original, which put useEffect after an early return).
    useEffect(() => {
        if (displayLen <= 1) return;
        const interval = setInterval(nextSlide, 3500);
        return () => clearInterval(interval);
    }, [displayLen, nextSlide]);

    const getVariant = useCallback(
        (i) => {
            if (i === currentIndex) return 'center';
            if (i === (currentIndex - 1 + displayLen) % displayLen) return 'left';
            if (i === (currentIndex + 1) % displayLen) return 'right';
            if (i === (currentIndex - 2 + displayLen) % displayLen) return 'farLeft';
            if (i === (currentIndex + 2) % displayLen) return 'farRight';
            if (i === (currentIndex - 3 + displayLen) % displayLen) return 'superFarLeft';
            if (i === (currentIndex + 3) % displayLen) return 'superFarRight';
            return 'hidden';
        },
        [currentIndex, displayLen]
    );

    const activeVariants = isMobile ? MOBILE_VARIANTS : WEB_VARIANTS;

    const containerHeight = useMemo(
        () => 'h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] xl:h-[450px]',
        []
    );

    const trackWidth = useMemo(
        () =>
            isMobile
                ? 'w-[45%] sm:w-[35%] md:w-[30%] lg:w-[25%] xl:w-[22%]'
                : 'w-[85%] sm:w-[80%] md:w-[75%] lg:w-[70%]',
        [isMobile]
    );

    const handleDotClick = useCallback(
        (i) => {
            setDirection(i > currentIndex % originalLen ? 1 : -1);
            setCurrentIndex(i);
        },
        [currentIndex, originalLen]
    );

    if (displayLen === 0) return null;

    if (displayLen === 1) {
        return (
            <div className={`mx-auto ${trackWidth} ${containerHeight} py-4`}>
                <ProgressiveImage src={displayImages[0]} alt="Screenshot" />
            </div>
        );
    }

    return (
        <div className={`relative w-full flex flex-col items-center justify-center overflow-hidden py-8 ${containerHeight}`}>
            {/* Carousel Track */}
            <div className={`relative flex-1 flex items-center justify-center ${trackWidth} h-full`}>
                {displayImages.map((img, i) => {
                    const variant = getVariant(i);
                    const isSide = variant === 'left' || variant === 'right' || variant === 'farLeft' || variant === 'farRight';
                    return (
                        <motion.div
                            key={i}
                            custom={direction}
                            variants={activeVariants}
                            initial={false}
                            animate={variant}
                            className={`absolute w-full h-full flex items-center justify-center will-change-transform transform-gpu ${isSide ? 'cursor-pointer' : ''}`}
                            onClick={() => {
                                if (variant === 'left' || variant === 'farLeft') prevSlide();
                                if (variant === 'right' || variant === 'farRight') nextSlide();
                            }}
                            drag="x"
                            dragConstraints={{left: 0, right: 0}}
                            dragElastic={0.2}
                            onDragEnd={(e, {offset, velocity}) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) nextSlide();
                                else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) prevSlide();
                            }}
                        >
                            <ProgressiveImage src={img} alt={`Screenshot ${i + 1}`} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Dots */}
            {displayLen > 1 && (
                <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-10 bg-bg-base/50 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-border-glass shadow-lg">
                    {Array.from({length: originalLen}, (_, i) => {
                        const isCurrent = i === currentIndex % originalLen;
                        return (
                            <button
                                key={i}
                                onClick={() => handleDotClick(i)}
                                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${isCurrent ? 'w-6 sm:w-8 bg-primary-soft shadow-theme-dot' : 'w-1.5 sm:w-2 bg-text-secondary/30 hover:bg-text-secondary/60'}`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;