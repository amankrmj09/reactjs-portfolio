import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { getResume } from '../api/resumeApi';

import { useAppContext } from '@/context/AppContext';

const ResumePage = () => {
  const { resumeData: contextResume } = useAppContext();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const lenis = useLenis();
  const navigate = useNavigate();

  // Intersection Observer for active section
  useEffect(() => {
    if (!resume?.sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    resume.sections.forEach((section) => {
      const id = (section.title || section.type).toLowerCase().replace(/\s+/g, '-');
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [resume]);

  useEffect(() => {
    if (contextResume) {
      setResume(contextResume);
      setLoading(false);
    } else {
      const fetchResume = async () => {
        try {
          const data = await getResume();
          setResume(data);
        } catch (err) {
          console.error('Failed to fetch resume', err);
        } finally {
          setLoading(false);
        }
      };
      fetchResume();
    }
    window.scrollTo(0, 0);
  }, [contextResume]);

  return (
    <div className="min-h-screen pt-28 px-2 sm:px-4 lg:px-6 max-w-4xl mx-auto pb-[40vh]">
      
      {/* Floating Top-Left Header */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
        <button 
          onClick={() => {
            if (window.innerWidth >= 768) {
              navigate('/#home');
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('app:navigate', { detail: 'home' }));
              }, 100);
            } else {
              navigate('/#home');
            }
          }}
          className="w-[50px] h-[50px] flex items-center justify-center glass rounded-full text-text-primary z-50 relative shrink-0 shadow-md hover:bg-bg-base/30 transition-colors"
          aria-label="Back to Home"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="z-40 px-4 py-1.5 bg-bg-base/50 backdrop-blur-md border border-border-glass rounded-full shadow-sm">
          <span className="text-sm font-bold text-text-primary capitalize tracking-wide">
            Resume
          </span>
        </div>
      </div>

      
      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-primary-soft" size={48} />
        </div>
      ) : resume ? (
        <>
          {/* Floating Navigation Sidebar */}
          <div className="hidden lg:flex fixed right-8 xl:right-16 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 py-5 px-4 glass rounded-2xl border border-border-glass shadow-xl group transition-all duration-300">
            {resume.sections?.sort((a, b) => a.order - b.order).map((section, idx) => {
              const id = (section.title || section.type).toLowerCase().replace(/\s+/g, '-');
              const isActive = activeSection === id;
              const title = section.title || section.type;

              return (
                <a
                  key={idx}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (lenis) {
                      lenis.scrollTo(`#${id}`, { offset: -128, duration: 1.2 });
                    } else {
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center justify-end gap-3 cursor-pointer group/item"
                >
                  <span className={`text-sm font-medium capitalize whitespace-nowrap overflow-hidden transition-all duration-300 max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover/item:text-text-primary'}`}>
                    {title}
                  </span>
                  <div className="w-6 flex justify-end items-center">
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${isActive ? 'w-6 bg-text-primary' : 'w-2 bg-border-glass group-hover/item:bg-text-secondary group-hover/item:w-4'}`}></div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-10 relative">
            
            {resume.sections?.sort((a, b) => a.order - b.order).map((section, idx) => {
              const sectionId = (section.title || section.type).toLowerCase().replace(/\s+/g, '-');
              return (
              <div key={idx} id={sectionId} className="glass p-6 sm:p-8 rounded-3xl relative z-10 scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-bold text-gradient capitalize">{section.title || section.type}</h2>
                <div className="flex-1 h-px bg-border-glass"></div>
              </div>
              
              {section.items ? (
                <div className="grid grid-cols-1 gap-6">
                  {section.items.map((item, itemIdx) => {
                    const isString = typeof item === 'string';
                    // Dynamic mappings based on the actual backend data structure
                    const itemTitle = item.title || item.name || item.institution || item.company;
                    const itemSubtitle = item.subtitle || item.role || item.degree || item.issuer || item.event;
                    const itemDate = item.dateRange || item.duration;
                    const itemDesc = item.description || item.content || item.summary;
                    const itemLocation = item.location;
                    const itemTechStack = item.techStack;

                    return (
                      <div key={itemIdx} className="glass-card p-6 sm:p-8 flex flex-col relative group transition-all duration-300 hover:shadow-lg">
                        <div className="absolute inset-0 bg-primary-depth/5 group-hover:bg-primary-depth/10 transition-colors duration-500 rounded-2xl pointer-events-none"></div>

                        {isString ? (
                           <p className="text-text-secondary whitespace-pre-line leading-relaxed relative z-10">{item}</p>
                        ) : (
                          <>
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2 relative z-10">
                              <div className="flex flex-col gap-1">
                                {itemTitle && <h3 className="text-[clamp(1.125rem,4vw,1.5rem)] font-bold text-text-primary group-hover:text-primary-soft transition-colors">{itemTitle}</h3>}
                                {itemSubtitle && (
                                  <p className="text-primary-highlight font-semibold text-[clamp(0.875rem,3vw,1.125rem)]">{itemSubtitle}</p>
                                )}
                              </div>
                              <div className="flex flex-row flex-wrap items-center w-full justify-between sm:w-auto sm:justify-end gap-3 shrink-0 mt-3 sm:mt-0">
                                {itemDate && (
                                  <span className="text-[clamp(0.7rem,2vw,0.875rem)] font-semibold text-text-secondary bg-bg-base/80 border border-border-glass px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap">
                                    {itemDate}
                                  </span>
                                )}
                                {itemLocation && (
                                  <span className="text-[clamp(0.7rem,2vw,0.875rem)] text-text-secondary flex items-center gap-1 whitespace-nowrap">
                                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    {itemLocation}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {itemDesc && (
                              <p className="text-[clamp(0.875rem,2.5vw,1rem)] text-text-secondary mt-4 whitespace-pre-line leading-relaxed relative z-10 text-justify">
                                {itemDesc}
                              </p>
                            )}

                            {itemTechStack && Array.isArray(itemTechStack) && (
                              <div className="flex flex-wrap gap-2 mt-5 relative z-10">
                                {itemTechStack.map((tech, tIdx) => (
                                  <span key={tIdx} className="text-xs font-semibold text-text-secondary bg-bg-base/60 border border-border-glass px-3 py-1 rounded-md">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {item.bullets && item.bullets.length > 0 && (
                              <ul className="space-y-2 mt-5 relative z-10">
                                {item.bullets.map((bullet, bIdx) => (
                                  <li key={bIdx} className="flex items-start text-text-secondary leading-relaxed">
                                    <span className="text-primary-soft mr-3 mt-1.5 shrink-0 text-xs">●</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : section.content ? (
                <div className="glass-card p-6 sm:p-8 relative">
                   <p className="text-text-secondary leading-relaxed whitespace-pre-line text-lg relative z-10">{section.content}</p>
                </div>
              ) : null}
            </div>
            );
          })}
        </div>
        </>
      ) : (
        <div className="glass-card p-12 rounded-3xl text-center flex flex-col items-center justify-center min-h-[300px]">
          <p className="text-text-secondary text-lg">No resume data found.</p>
        </div>
      )}
    </div>
  );
};

export default ResumePage;
