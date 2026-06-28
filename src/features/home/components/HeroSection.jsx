import React, { useState, useEffect } from 'react';
import { motion, animate, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaCode, FaDiscord, FaGitlab, FaArrowRight, FaEye } from 'react-icons/fa';
import { useAppContext } from '@/context/AppContext';
import { incrementStats, getSiteConfig } from '@/features/site-config/api/siteConfigApi';
import TerminalAnimation from '@/components/shared/TerminalAnimation';
import ActionButton from '@/components/shared/ActionButton';

const HeroSection = () => {
  const { profile, siteConfig } = useAppContext();
  const [totalVisitorCount, setTotalVisitorCount] = useState(null);
  const [personalVisitorNumber, setPersonalVisitorNumber] = useState(null);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const taglines = siteConfig?.taglines || [];
    if (taglines.length > 1) {
      const interval = setInterval(() => {
        setCurrentTaglineIndex(prev => (prev + 1) % taglines.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [siteConfig?.taglines]);

  useEffect(() => {
    const manageVisitorCount = async () => {
      try {
        const storedVisitorNumber = localStorage.getItem('visitor_number');
        let data;
        
        if (!storedVisitorNumber) {
          data = await incrementStats();
          if (data && data.count != null) {
            localStorage.setItem('visitor_number', data.count.toString());
            setPersonalVisitorNumber(data.count);
          }
        } else {
          setPersonalVisitorNumber(parseInt(storedVisitorNumber, 10));
          data = await getSiteConfig();
        }
        
        if (data && data.count != null) {
          animate(0, data.count, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (latest) => setTotalVisitorCount(Math.round(latest))
          });
        } else if (data && data.count == null) {
          setTotalVisitorCount(0);
          if (!storedVisitorNumber) setPersonalVisitorNumber(0);
        }
      } catch (err) {
        console.error('Failed to fetch/increment visitor count:', err);
      }
    };
    manageVisitorCount();
  }, []);

  if (!profile) return null;

  const getIcon = (platform) => {
    if (!platform) return null;
    switch (platform.toLowerCase()) {
      case 'github': return <FaGithub size={28} />;
      case 'linkedin': return <FaLinkedin size={28} />;
      case 'instagram': return <FaInstagram size={28} />;
      case 'discord': return <FaDiscord size={28} />;
      case 'gitlab': return <FaGitlab size={28} />;
      case 'leetcode': return <FaCode size={28} />;
      default: return null;
    }
  };

  return (
    <section id="home" className="relative min-h-screen  flex flex-col justify-center pt-24 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-shadow/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl scale-95 lg:scale-100 transition-transform origin-center mx-auto px-4 lg:px-4 w-full flex-grow flex flex-col justify-center z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full my-auto pb-4">
          
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left w-full"
          >
            <div className="min-h-[3.5em] lg:min-h-[3em] w-full flex items-start justify-center lg:justify-start mb-8 lg:mb-12">
              <h1 className="text-[clamp(1.75rem,6vw,3.75rem)] font-bold tracking-tight text-primary-soft leading-tight flex flex-wrap justify-center lg:justify-start w-full text-center lg:text-left">
                <AnimatePresence mode="wait">
                  <motion.div key={currentTaglineIndex} className="flex flex-wrap justify-center lg:justify-start w-full">
                  {(siteConfig?.taglines?.[currentTaglineIndex] || "Building beautiful, performant apps.").split(" ").map((word, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block mr-[0.25em]"
                      initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: idx * 0.1,
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </h1>
            </div>
            
            <div className="flex flex-col gap-4 text-left items-start self-start lg:self-auto w-full">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary">
                {siteConfig?.greeting || `Hi, I'm ${profile.name}!!`}
              </h2>
              
              <div className="flex flex-col gap-2 text-lg sm:text-xl text-slate-300 font-medium ml-4">
                {siteConfig?.descriptionLines && siteConfig.descriptionLines.length > 0 ? (
                  siteConfig.descriptionLines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))
                ) : (
                  <>
                    <p>- a passionate Flutter developer</p>
                    <p>- Student from VIT University, Chennai</p>
                  </>
                )}
              </div>
            </div>


          </motion.div>

          {/* Right Column: Terminal Animation & Visitor Stats */}
          <div className="w-full flex flex-col items-center lg:items-end justify-center gap-16 lg:mt-6">
            
            {/* Techy/Cyberpunk Visitor Count */}
            {totalVisitorCount !== null && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="hidden sm:flex w-full max-w-[500px] justify-end px-4"
              >
                <div className="font-mono text-[11px] sm:text-xs tracking-[0.15em] uppercase flex flex-col items-end gap-1.5 select-none">
                  <span className="text-green-500 animate-pulse font-bold mb-1">SYS.LOG ●</span>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 drop-shadow-[0_0_3px_rgba(74,222,128,0.5)]">YOUR VISITOR NO :</span>
                    <span className="text-white font-bold tracking-widest drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
                      {String(personalVisitorNumber || 0).padStart(4, '0')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 drop-shadow-[0_0_3px_rgba(96,165,250,0.5)]">TOTAL VISITORS :</span>
                    <span className="text-white font-bold tracking-widest drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
                      {String(totalVisitorCount).padStart(4, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            <TerminalAnimation commands={siteConfig?.terminalCommands} />

          </div>
        </div>
        
        {/* Bottom Row: CTA & Socials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full mt-auto pt-4 pb-4 flex flex-col xl:flex-row items-center justify-between gap-8"
        >
          {/* Left: CTA Buttons */}
          <div className="flex flex-row flex-wrap justify-center sm:justify-start items-center gap-4">
            <ActionButton 
              text="Get in Touch" 
              href="#contact" 
              bgClass="bg-[#ff5f56]" 
              textClass="text-white font-bold" 
              borderClass="border-transparent" 
            />
            <ActionButton 
              text="See My Works" 
              href="#works" 
            />
          </div>

          {/* Right: Social & Coding Links */}
          <div className="w-full xl:flex-1 overflow-x-auto">
            <div className="flex flex-row flex-nowrap justify-center xl:justify-end items-center gap-x-4 sm:gap-x-4 px-2 py-4 whitespace-nowrap min-w-max xl:min-w-0 mx-auto xl:mr-0 xl:ml-auto">
              {(siteConfig?.socialLinks || []).slice(0, 5).map((link, idx, arr) => {
                
                const getBrandHoverColor = (platform) => {
                  switch (platform?.toLowerCase()) {
                    case 'github': return 'group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]';
                    case 'linkedin': return 'group-hover:text-[#0a66c2] group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.8)]';
                    case 'instagram': return 'group-hover:text-[#E1306C] group-hover:drop-shadow-[0_0_8px_rgba(225,48,108,0.8)]';
                    case 'discord': return 'group-hover:text-[#5865F2] group-hover:drop-shadow-[0_0_8px_rgba(88,101,242,0.8)]';
                    case 'leetcode': return 'group-hover:text-[#FFA116] group-hover:drop-shadow-[0_0_8px_rgba(255,161,22,0.8)]';
                    case 'gitlab': return 'group-hover:text-[#FC6D26] group-hover:drop-shadow-[0_0_8px_rgba(252,109,38,0.8)]';
                    default: return 'group-hover:text-primary-soft group-hover:drop-shadow-[0_0_8px_rgba(58,123,213,0.8)]';
                  }
                };

                return (
                  <React.Fragment key={idx}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1.5 sm:gap-2 text-slate-500 hover:text-text-primary transition-all duration-300 flex-shrink-0"
                    >
                      <span className={`flex items-center justify-center text-slate-600 transition-all duration-300 ${getBrandHoverColor(link.name)}`}>
                        {link.icon ? (
                          <img src={link.icon} alt={link.name} className="w-7 h-7 object-contain opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                        ) : (
                          getIcon(link.name)
                        )}
                      </span>
                      <span className="hidden sm:inline font-mono text-sm sm:text-base font-bold tracking-[0.05em] sm:tracking-[0.1em] uppercase">{link.name}</span>
                    </a>
                    {idx < arr.length - 1 && (
                      <span className="text-slate-800 font-light select-none flex-shrink-0 text-lg">|</span>
                    )}
                  </React.Fragment>
                );
            })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
