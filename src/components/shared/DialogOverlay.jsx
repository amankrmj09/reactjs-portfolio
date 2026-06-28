import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactLenis } from 'lenis/react';

const DialogOverlay = ({ isOpen, onClose, children, title, noPadding }) => {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-full md:max-h-[85vh] overflow-hidden flex flex-col bg-bg-glass backdrop-blur-3xl border border-border-glass rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-50">
              {/* Fading Frost Background */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-bg-base/90 to-transparent backdrop-blur-2xl [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] pointer-events-none -z-10"></div>
              
              {/* Header Content */}
              <div className="flex items-center justify-between p-2 sm:px-8 sm:py-5">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary truncate pr-2">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-bg-base/30 hover:bg-bg-base/60 border border-border-glass hover:border-primary-soft transition-all text-text-secondary hover:text-primary-highlight flex-shrink-0 backdrop-blur-md"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Body */}
            <ReactLenis options={{ smoothTouch: true }} className={`overflow-y-auto w-full h-full hide-scrollbar pt-[72px] sm:pt-[88px] pb-6 ${noPadding ? '' : 'px-2 sm:px-8'}`} data-lenis-prevent="true">
              {children}
            </ReactLenis>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DialogOverlay;
