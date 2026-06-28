import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const FooterSection = () => {
  const { profile } = useAppContext();
  
  return (
    <footer className="w-full relative bg-bg-base/80 border-t border-slate-800/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 w-full flex flex-col items-center">
        {/* Simple Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm py-6"
        >
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p>&copy; BluBug Tech all rights reserved.</p>
            <p className="mt-1">
              Developed by <span className="font-semibold text-text-primary">{profile?.name || 'Your Name'}</span>
            </p>
          </div>
          
          <p className="flex items-center gap-1">
            Built with React.js <Heart size={14} className="text-red-500 mx-1" /> & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
