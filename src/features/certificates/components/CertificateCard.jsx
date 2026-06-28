import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const CertificateCard = ({ certificate, index, className }) => {
  const { setSelectedCertId } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card overflow-hidden group cursor-pointer flex flex-col h-auto hover:bg-bg-glass transition-colors ${className || "shrink-0 w-[85vw] sm:w-[400px] snap-start"}`}
      onClick={() => setSelectedCertId(certificate.id)}
    >
      <div className="relative aspect-[4/3] overflow-hidden shrink-0 bg-bg-base/40">
        {certificate.imageUrl ? (
          <img 
            src={certificate.imageUrl} 
            alt={certificate.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-text-secondary">
            <Award size={48} className="mb-2 opacity-30" />
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}

        <div className="absolute inset-0 bg-primary-depth/20 group-hover:bg-transparent transition-colors duration-500"></div>

        {/* Floating Date */}
        {certificate.issuedDate && (
          <div className="absolute top-3 right-3 bg-bg-glass backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-text-primary shadow-lg tracking-wide border border-border-glass">
            {new Date(certificate.issuedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
          </div>
        )}

        {/* Frosted Title Overlay (Extended to fix WebKit blur edge gap) */}
        <div className="absolute -bottom-1 -left-1 -right-1 bg-bg-base/60 backdrop-blur-md px-5 pt-3 pb-4">
          <h3 className="text-lg font-bold text-text-primary group-hover:text-primary-soft transition-colors line-clamp-2 leading-tight">
            {certificate.title}
          </h3>
        </div>
      </div>
      
      <div className="px-6 pb-6 pt-4 flex flex-col flex-grow">
        <p className="text-primary-highlight text-xs mb-3 font-bold uppercase tracking-wider">
          {certificate.issuer}
        </p>

        <p className="text-text-secondary text-sm mb-4 line-clamp-3 min-h-[1.25rem] text-justify">
          {certificate.shortDesc || "No description available."}
        </p>
        
        {/* Tech stack or skills */}
        <div className="flex items-center gap-2 flex-wrap mb-4 mt-auto max-h-[60px] overflow-hidden">
          {certificate.skills && certificate.skills.slice(0, 4).map(skill => (
            <span key={skill} className="text-xs text-text-secondary bg-bg-base/40 border border-border-glass px-2.5 py-1 rounded-md font-semibold truncate max-w-full">
              {skill}
            </span>
          ))}
        </div>
        
        <div className="mt-auto pt-4 border-t border-border-glass flex items-center justify-end">
          <span className="text-primary-highlight text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Details &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
