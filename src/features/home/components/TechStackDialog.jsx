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
              <div className="flex flex-wrap gap-4 items-center">
                {category.items.map((tech, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-3 bg-bg-base/30 border border-border-glass rounded-xl p-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-bg-base/40 flex items-center justify-center shrink-0">
                      {tech.icon ? (
                        <img src={tech.icon} alt={tech.name} className="w-6 h-6 object-contain" />
                      ) : (
                        <div className="text-sm font-black text-primary-highlight">
                          {tech.name ? tech.name.substring(0, 2).toUpperCase() : '?'}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-text-primary pr-2">{tech.name}</span>
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
