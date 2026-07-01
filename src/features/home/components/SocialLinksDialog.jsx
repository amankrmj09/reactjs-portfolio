import React from 'react';
import DialogOverlay from '@/components/shared/DialogOverlay';
import { ExternalLink } from 'lucide-react';

const SocialLinksDialog = ({ isOpen, onClose, profile }) => {
  if (!profile) return null;
  
  const codingPlatforms = profile.codingPlatforms || [];
  const socialLinks = profile.socialLinks || [];

  if (codingPlatforms.length === 0 && socialLinks.length === 0) return null;

  return (
    <DialogOverlay isOpen={isOpen} onClose={onClose} title="Connect & Profiles">
      <div className="flex flex-col gap-8 pb-8">
        
        {/* Coding Platforms Section */}
        {codingPlatforms.length > 0 && (
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-primary-highlight uppercase tracking-widest border-b border-border-glass pb-2">
              Coding Platforms
            </h4>
            <div className="flex flex-wrap gap-4">
              {codingPlatforms.map((link, idx) => (
                <a
                  key={`coding-${idx}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-bg-base/30 border border-border-glass rounded-xl p-3 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-bg-base/40 flex items-center justify-center shrink-0">
                    {link.icon ? (
                      <img src={link.icon} alt={link.name} className="w-6 h-6 object-contain" />
                    ) : (
                      <ExternalLink size={20} className="text-text-secondary" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-text-primary pr-2">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Social Platforms Section */}
        {socialLinks.length > 0 && (
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-primary-highlight uppercase tracking-widest border-b border-border-glass pb-2">
              Social Profiles
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, idx) => (
                <a
                  key={`social-${idx}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-bg-base/30 border border-border-glass rounded-xl p-3 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-bg-base/40 flex items-center justify-center shrink-0">
                    {link.icon ? (
                      <img src={link.icon} alt={link.name} className="w-6 h-6 object-contain" />
                    ) : (
                      <ExternalLink size={20} className="text-text-secondary" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-text-primary pr-2">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </DialogOverlay>
  );
};

export default SocialLinksDialog;
