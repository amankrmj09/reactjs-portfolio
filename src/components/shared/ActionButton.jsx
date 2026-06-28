import React from 'react';
import { motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { useNavigate } from 'react-router-dom';

const ActionButton = ({ 
  text, 
  href, 
  onClick,
  download,
  target,
  bgClass = "bg-transparent", 
  textClass = "text-text-primary", 
  borderClass = "border-border-glass",
  iconColor = "text-primary-soft",
  hoverBgClass = "bg-btn-hover-overlay",
  className = "px-6 h-[48px]",
  showArrow = true,
  icon: Icon = ChevronsDown,
  type = "button",
  disabled = false,
  iconAnimationDirection = "ttb",
  blinkColor = ""
}) => {
  const lenis = useLenis();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else if (href && href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      window.dispatchEvent(new CustomEvent('app:navigate', { detail: targetId }));

      if (window.innerWidth < 768) {
        navigate(`/#${targetId}`);
        return;
      }

      // Also ensure react router tracks it on desktop
      navigate(`/#${targetId}`);

      if (lenis) {
        lenis.scrollTo(href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (href && href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  };

  const baseClasses = `group relative rounded-full border ${borderClass} ${bgClass} ${textClass} font-bold text-sm sm:text-base shadow-sm flex items-center justify-center transition-colors overflow-hidden isolate ${className} ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`;

  const InnerContent = () => (
    <>
      {/* Expanding Drop Overlay (Originating from bottom-left edge) */}
      <motion.div
        className={`absolute inset-0 w-full h-full ${hoverBgClass} pointer-events-none -z-10`}
        variants={{
          initial: { clipPath: 'circle(0% at 0% 100%)' },
          hover: { clipPath: 'circle(150% at 0% 100%)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
        }}
      />

      <span className="relative z-10">{text}</span>
      
      {showArrow && (
        <motion.div
          variants={{
            initial: { width: 0, opacity: 0, y: -20, marginLeft: 0 },
            hover: { width: "auto", opacity: 1, y: 0, marginLeft: 6, transition: { type: "spring", stiffness: 300, damping: 20 } }
          }}
          className={`flex items-center ${iconColor} ${blinkColor} overflow-hidden relative z-10 transition-colors duration-300`}
        >
          <motion.div
            variants={{
              initial: iconAnimationDirection === 'ltr' ? { x: 0 } : { y: 0 },
              hover: iconAnimationDirection === 'ltr'
                ? { x: [ -5, 5 ], opacity: [0, 1, 0], transition: { repeat: Infinity, duration: 0.8, ease: "linear" } }
                : { y: [ -5, 5 ], opacity: [0, 1, 0], transition: { repeat: Infinity, duration: 0.8, ease: "linear" } }
            }}
          >
            {Icon && <Icon size={20} strokeWidth={3} />}
          </motion.div>
        </motion.div>
      )}
    </>
  );

  if (type === "submit" || onClick || (href && (href.startsWith('#') || href.startsWith('/')))) {
    return (
      <motion.button 
        type={type}
        disabled={disabled}
        onClick={handleClick}
        initial="initial"
        whileHover={!disabled ? "hover" : "initial"}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        className={baseClasses}
      >
        <InnerContent />
      </motion.button>
    );
  }

  return (
    <motion.a 
      href={href} 
      download={download}
      target={target}
      rel={target === '_blank' ? "noreferrer" : undefined}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      className={baseClasses}
    >
      <InnerContent />
    </motion.a>
  );
};

export default React.memo(ActionButton);
