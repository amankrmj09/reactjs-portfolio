import React from 'react';
import { motion } from 'framer-motion';

const ProjectLinkButton = ({ 
  text, 
  href,
  icon: Icon,
  bgClass = "bg-transparent", 
  textClass = "text-text-primary", 
  borderClass = "border-border-glass",
  hoverBgClass = "bg-bg-base/40",
  iconClass = "",
  className = "px-6 h-[48px]",
}) => {
  if (!href) return null;

  const baseClasses = `group relative rounded-full border ${borderClass} ${bgClass} ${textClass} font-bold text-sm sm:text-base shadow-sm flex items-center justify-center transition-colors overflow-hidden isolate ${className} cursor-pointer`;

  return (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      className={baseClasses}
    >
      {/* Expanding Drop Overlay (Originating from bottom-left edge) */}
      <motion.div
        className={`absolute -bottom-8 -left-8 w-16 h-16 rounded-full ${hoverBgClass} pointer-events-none -z-10`}
        variants={{
          initial: { scale: 0 },
          hover: { scale: 12, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
        }}
      />

      <div className="relative z-10 flex items-center justify-center">
        {Icon && <span className={`transition-all duration-300 ${iconClass}`}><Icon size={18} /></span>}
        {text && <span className="ml-2 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">{text}</span>}
      </div>
    </motion.a>
  );
};

export default ProjectLinkButton;
