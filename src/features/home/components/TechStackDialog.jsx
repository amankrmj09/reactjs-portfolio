import React from 'react';
import DialogOverlay from '@/components/shared/DialogOverlay';

const TechStackDialog = ({ isOpen, onClose, profile }) => {
  if (!profile?.techStack || profile.techStack.length === 0) return null;

  return (
    <DialogOverlay isOpen={isOpen} onClose={onClose} title="Full Tech Stack">
      <div className="flex flex-col gap-8 pb-8">
        {profile.techStack.map((category, idx) => {
          if (!category.items || category.items.length === 0) return null;
          return (
            <div key={idx} className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-primary-highlight uppercase tracking-widest border-b border-border-glass pb-2">
                {category.category}
              </h4>
              <div className="flex flex-wrap gap-6 items-center">
                {category.items.map((tech, tIdx) => (
                  <div key={tIdx} className="flex flex-col items-center justify-center gap-2 group/tech w-16">
                    {tech.icon ? (
                      <div className="w-12 h-12 rounded-xl bg-bg-base/30 border border-border-glass flex items-center justify-center shadow-sm p-2 hover:bg-bg-base/60 transition-colors">
                        <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain group-hover/tech:scale-110 transition-transform" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-bg-base/80 border border-border-glass flex items-center justify-center text-sm font-black text-primary-highlight shadow-sm hover:scale-110 transition-transform">
                        {tech.name ? tech.name.substring(0, 2).toUpperCase() : '?'}
                      </div>
                    )}
                    <span className="text-xs font-medium text-text-secondary text-center truncate w-full">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </DialogOverlay>
  );
};

export default TechStackDialog;
