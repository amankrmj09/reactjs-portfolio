import React, { useState, useEffect } from 'react';
import { Loader2, Globe } from 'lucide-react';
import { FaGithub, FaGooglePlay, FaApple, FaFigma } from 'react-icons/fa';
import { ReactLenis } from 'lenis/react';
import DialogOverlay from '@/components/shared/DialogOverlay';
import ImageCarousel from '@/components/shared/ImageCarousel';
import ProjectLinkButton from '@/components/shared/ProjectLinkButton';
import { useAppContext } from '@/context/AppContext';
import { getWorkDetail } from '../api/worksApi';

const WorkDetailDialog = () => {
  const { selectedWorkId, setSelectedWorkId } = useAppContext();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWork = async () => {
      if (!selectedWorkId) {
        setWork(null);
        return;
      }
      setLoading(true);
      try {
        const data = await getWorkDetail(selectedWorkId);
        setWork(data);
      } catch (err) {
        console.error('Failed to fetch work detail', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWork();
  }, [selectedWorkId]);

  return (
    <DialogOverlay 
      isOpen={!!selectedWorkId} 
      onClose={() => setSelectedWorkId(null)} 
      title={work?.title || "Project Details"}
      noPadding={true}
    >
      {loading ? (
        <div className="flex justify-center items-center py-24 min-h-[400px]">
          <Loader2 className="animate-spin text-primary-soft" size={48} />
        </div>
      ) : work ? (
        <div className="flex flex-col w-full">
          {/* Top Panel: Media */}
          {/* DEBUG: Log the full work object to verify API response shape */}
          {console.log('[WorkDetailDialog] work object:', work)}
          <div className="w-full flex flex-col items-center">
            {(() => {
              // ── The backend WorkDTO flattens media fields: ──────────────────────────
              //   work.screenshotUrls  ← comes from work.media.screenshots in MongoDB
              //   work.thumbnailUrl    ← comes from work.media.thumbnailKey in MongoDB
              //   work.demoVideoUrl    ← comes from work.media.demoVideoUrl in MongoDB
              // There is NO nested `work.media` object in the API response.

              // Prefer the flat DTO field, with defensive fallbacks for any
              // legacy or alternate shape that may arrive.
              let screenshots = work.screenshotUrls || work.screenshots || work.images || [];

              // Defensive: if it somehow arrives as a JSON string, parse it.
              if (typeof screenshots === 'string') {
                try { screenshots = JSON.parse(screenshots); } catch(e) { screenshots = [screenshots]; }
              }

              // Defensive: if media object is present (admin panel shape), extract from it.
              if ((!screenshots || screenshots.length === 0) && work.media) {
                let mediaObj = work.media;
                if (typeof mediaObj === 'string') {
                  try { mediaObj = JSON.parse(mediaObj); } catch(e) { mediaObj = {}; }
                }
                screenshots = mediaObj?.screenshots || [];
              }

              const thumbnail = work.thumbnailUrl || work.thumbnail ||
                (work.media?.thumbnailKey) || (work.media?.thumbnailUrl);

              console.log('[WorkDetailDialog] screenshots:', screenshots, '| thumbnail:', thumbnail);

              if (screenshots && screenshots.length > 0) {
                const isMobileProject = work.type && (work.type.toLowerCase().includes('mobile') || work.type.toLowerCase().includes('app'));
                return <ImageCarousel images={screenshots} isMobile={isMobileProject} />;
              } else if (thumbnail) {
                return (
                  <img src={thumbnail} alt="Thumbnail" className="max-w-full rounded-2xl shadow-[0_10px_40px_rgba(255,255,255,0.1)] object-contain" style={{ maxHeight: '600px' }} />
                );
              } else {
                return (
                  <div className="w-full max-w-2xl aspect-video bg-bg-base/30 border border-border-glass rounded-2xl flex items-center justify-center shadow-[0_10px_40px_rgba(255,255,255,0.1)]">
                    <span className="text-text-secondary font-medium">No Image Available</span>
                  </div>
                );
              }
            })()}
          </div>
          
          {/* Bottom Panel: Info */}
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 sm:gap-8 px-2 sm:px-8 mt-8 sm:mt-10 pb-8 sm:pb-12">
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <span className="text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full bg-primary-soft/10 text-primary-soft border border-primary-soft/30 shadow-[0_0_15px_rgba(255,255,255,0.05)] uppercase tracking-widest">
                  {work.type}
                </span>
                {work.status && (
                  <span className="text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full bg-bg-base/30 text-text-secondary border border-border-glass uppercase tracking-widest">
                    {work.status}
                  </span>
                )}
                
                {work.tags && work.tags.length > 0 && (
                  <>
                    <div className="hidden sm:block w-px h-6 bg-border-glass mx-1"></div>
                    {work.tags.map(tag => (
                      <span key={tag} className="text-[10px] sm:text-xs font-medium bg-bg-base/30 border border-border-glass text-text-secondary px-3 py-1.5 rounded-full hover:bg-bg-base/50 hover:text-text-primary transition-colors cursor-default">
                        {tag}
                      </span>
                    ))}
                  </>
                )}
              </div>
              
              <div className="flex flex-row items-center justify-between w-full text-sm sm:text-base bg-bg-base/30 border border-border-glass rounded-2xl p-4 sm:p-5 mt-2">
                <span className="flex flex-col items-start gap-1">
                  <span className="text-text-secondary text-[10px] sm:text-xs uppercase tracking-wider font-bold">Role</span>
                  <strong className="text-text-primary text-xs sm:text-base text-left truncate max-w-[100px] sm:max-w-xs">{work.role}</strong>
                </span>
                <div className="w-px h-8 sm:h-10 bg-border-glass"></div>
                <span className="flex flex-col items-start gap-1">
                  <span className="text-text-secondary text-[10px] sm:text-xs uppercase tracking-wider font-bold">Duration</span>
                  <strong className="text-text-primary text-xs sm:text-base text-left truncate max-w-[100px] sm:max-w-xs">{work.duration}</strong>
                </span>

                {work.links?.live && (
                  <div className="flex-shrink-0 ml-2">
                    {/* Mobile: Circular Icon */}
                    <a href={work.links.live} target="_blank" rel="noreferrer" className="sm:hidden w-10 h-10 flex items-center justify-center rounded-full bg-transparent ring-1 ring-border-glass hover:ring-2 hover:ring-primary-soft hover:bg-bg-base/40 text-text-secondary hover:text-primary-soft transition-all group" title="Live Demo">
                      <Globe size={20} className="drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                    </a>
                    {/* Desktop: Full Button with Animation */}
                    <div className="hidden sm:block">
                      <ProjectLinkButton 
                        href={work.links.live} 
                        text="Live Demo" 
                        icon={Globe}
                        hoverBgClass="bg-primary-soft/30"
                        iconClass="group-hover:text-primary-soft group-hover:drop-shadow-[0_0_8px_rgba(93,173,226,0.8)] text-text-secondary"
                        className="h-[40px] px-4 sm:h-[48px] sm:px-6"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {(work.longDesc || work.description) && (
              <div className="prose prose-invert max-w-none mt-2">
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed whitespace-pre-line text-justify">{work.longDesc || work.description}</p>
              </div>
            )}

            {work.highlights && work.highlights.length > 0 && (
              <div className="bg-bg-base/30 border border-border-glass rounded-2xl p-5 sm:p-6 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                <h3 className="text-base sm:text-lg font-bold text-text-primary mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-soft shadow-[0_0_10px_rgba(255,255,255,0.1)]"></span> Key Highlights
                </h3>
                <ul className="space-y-3 text-sm sm:text-base text-text-secondary">
                  {work.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary-soft/50 mt-1">▹</span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {work.links && (work.links.repo || work.links.playStore || work.links.appStore || work.links.figma) && (
              <div className="mt-auto pt-6 border-t border-border-glass flex flex-wrap items-center justify-center w-full gap-4">
                {work.links.repo && (
                  <>
                    <a href={work.links.repo} target="_blank" rel="noreferrer" className="sm:hidden w-12 h-12 flex items-center justify-center rounded-full bg-transparent ring-1 ring-border-glass hover:ring-2 hover:ring-text-primary hover:bg-bg-base/40 text-text-primary transition-all group" title="Repository">
                      <FaGithub size={22} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                    </a>
                    <div className="hidden sm:block">
                      <ProjectLinkButton 
                        href={work.links.repo} 
                        text="Repository" 
                        icon={FaGithub}
                        hoverBgClass="bg-slate-400/30"
                        iconClass="group-hover:text-text-primary group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-text-secondary"
                        className="h-[48px] px-6"
                      />
                    </div>
                  </>
                )}
                {work.links.playStore && (
                  <>
                    <a href={work.links.playStore} target="_blank" rel="noreferrer" className="sm:hidden w-12 h-12 flex items-center justify-center rounded-full bg-transparent ring-1 ring-border-glass hover:ring-2 hover:ring-[#34A853] hover:bg-[#34A853]/20 text-[#34A853] transition-all group" title="Play Store">
                      <FaGooglePlay size={20} className="drop-shadow-[0_0_8px_rgba(52,168,83,0.5)]" />
                    </a>
                    <div className="hidden sm:block">
                      <ProjectLinkButton 
                        href={work.links.playStore} 
                        text="Play Store" 
                        icon={FaGooglePlay}
                        hoverBgClass="bg-emerald-500/40"
                        iconClass="group-hover:text-[#34A853] group-hover:drop-shadow-[0_0_8px_rgba(52,168,83,0.8)] text-text-secondary"
                        className="h-[48px] px-6"
                      />
                    </div>
                  </>
                )}
                {work.links.appStore && (
                  <>
                    <a href={work.links.appStore} target="_blank" rel="noreferrer" className="sm:hidden w-12 h-12 flex items-center justify-center rounded-full bg-transparent ring-1 ring-border-glass hover:ring-2 hover:ring-[#007AFF] hover:bg-[#007AFF]/20 text-[#007AFF] transition-all group" title="App Store">
                      <FaApple size={22} className="drop-shadow-[0_0_8px_rgba(0,122,255,0.5)]" />
                    </a>
                    <div className="hidden sm:block">
                      <ProjectLinkButton 
                        href={work.links.appStore} 
                        text="App Store" 
                        icon={FaApple}
                        hoverBgClass="bg-blue-500/40"
                        iconClass="group-hover:text-[#007AFF] group-hover:drop-shadow-[0_0_8px_rgba(0,122,255,0.8)] text-text-secondary"
                        className="h-[48px] px-6"
                      />
                    </div>
                  </>
                )}
                {work.links.figma && (
                  <>
                    <a href={work.links.figma} target="_blank" rel="noreferrer" className="sm:hidden w-12 h-12 flex items-center justify-center rounded-full bg-transparent ring-1 ring-border-glass hover:ring-2 hover:ring-[#F24E1E] hover:bg-[#F24E1E]/20 text-[#F24E1E] transition-all group" title="Figma">
                      <FaFigma size={20} className="drop-shadow-[0_0_8px_rgba(242,78,30,0.5)]" />
                    </a>
                    <div className="hidden sm:block">
                      <ProjectLinkButton 
                        href={work.links.figma} 
                        text="Figma" 
                        icon={FaFigma}
                        hoverBgClass="bg-[#F24E1E]/40"
                        iconClass="group-hover:text-[#F24E1E] group-hover:drop-shadow-[0_0_8px_rgba(242,78,30,0.8)] text-text-secondary"
                        className="h-[48px] px-6"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400">Failed to load work details.</div>
      )}
    </DialogOverlay>
  );
};

export default WorkDetailDialog;
