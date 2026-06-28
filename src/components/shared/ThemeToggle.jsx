import React from 'react';
import { Moon, Sun, Download } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import ActionButton from './ActionButton';
import { getResume } from '@/features/resume/api/resumeApi';

const ThemeToggle = () => {
  const { theme, toggleTheme, setContactOpen, resumeData } = useAppContext();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isResumePage = location.pathname === '/resume';

  // Force Vite HMR reload
  // console.log("ThemeToggle loaded with resume:", resumeData?.pdfKey);

  const handleDownloadClick = (e) => {
    e.preventDefault();
    const url = resumeData?.pdfUrl || resumeData?.pdfKey;
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error("No resume URL found in resumeData:", resumeData);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 glass h-[50px] rounded-full shadow-lg flex items-center justify-end overflow-hidden pr-0 transition-all duration-300">
        <AnimatePresence mode="wait">
          {isHomePage && (
            <motion.div
              key="hire-me-btn"
              initial={{ maxWidth: 0, opacity: 0, scale: 0, marginRight: 0, paddingLeft: 0 }}
              animate={{ maxWidth: 200, opacity: 1, scale: 1, marginRight: 2, paddingLeft: 6 }}
              exit={{ maxWidth: 0, opacity: 0, scale: 0, marginRight: 0, paddingLeft: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-shrink-0 origin-right whitespace-nowrap overflow-hidden hidden md:flex items-center"
            >
              <ActionButton 
                text="Hire Me" 
                href="#contact"
                bgClass="bg-[#ff5f56]" 
                textClass="text-white font-bold" 
                borderClass="border-transparent" 
                className="px-5 h-[40px] text-sm"
              />
            </motion.div>
          )}

          {isResumePage && (
            <motion.div
              key="download-btn"
              initial={{ maxWidth: 0, opacity: 0, scale: 0, marginRight: 0, paddingLeft: 0 }}
              animate={{ maxWidth: 200, opacity: 1, scale: 1, marginRight: 2, paddingLeft: 6 }}
              exit={{ maxWidth: 0, opacity: 0, scale: 0, marginRight: 0, paddingLeft: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-shrink-0 origin-right whitespace-nowrap overflow-hidden flex items-center"
            >
              <ActionButton 
                text="Download" 
                onClick={handleDownloadClick}
                icon={Download}
                bgClass="bg-green-500" 
                textClass="text-white font-bold" 
                borderClass="border-transparent"
                iconColor="text-white"
                className="px-5 h-[40px] text-sm"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="w-[48px] h-[48px] text-text-primary hover:text-primary-soft transition-colors flex items-center justify-center hover:bg-bg-base/30 shrink-0 rounded-full"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>
  );
};

export default ThemeToggle;
