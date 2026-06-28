import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Building2, Calendar, ExternalLink, Mail, MapPin, Maximize2, User} from 'lucide-react';
import {useAppContext} from '@/context/AppContext';
import ActionButton from '@/components/shared/ActionButton';
import TechStackDialog from './TechStackDialog';
import SocialLinksDialog from './SocialLinksDialog';

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const staggerItem = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, y: -10, transition: { duration: 0.3, ease: "easeIn" } },
};

const AboutSection = () => {
    const {profile, theme} = useAppContext();
    const [currentJourneyIndex, setCurrentJourneyIndex] = useState(0);

    const [isTechDialogOpen, setIsTechDialogOpen] = useState(false);
    const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);

    const [currentTechRowIndex, setCurrentTechRowIndex] = useState(0);
    const [currentSocialRowIndex, setCurrentSocialRowIndex] = useState(0);
    const [currentInterestsRowIndex, setCurrentInterestsRowIndex] = useState(0);
    const [currentTechInterestsRowIndex, setCurrentTechInterestsRowIndex] = useState(0);

    const [techItemsPerRow, setTechItemsPerRow] = useState(4);
    const [socialItemsPerRow, setSocialItemsPerRow] = useState(5);
    const [interestsItemsPerRow, setInterestsItemsPerRow] = useState(4);
    const [techInterestsItemsPerRow, setTechInterestsItemsPerRow] = useState(4);

    const techContainerRef = useRef(null);
    const socialContainerRef = useRef(null);
    const interestsContainerRef = useRef(null);
    const techInterestsContainerRef = useRef(null);

    useEffect(() => {
        if (!profile?.journey || profile.journey.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentJourneyIndex((prev) => (prev + 1) % profile.journey.length);
        }, 5000); // 5 seconds interval
        return () => clearInterval(interval);
    }, [profile?.journey]);

    // Calculate items per row based on container width using ResizeObserver
    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const width = entry.contentRect.width;
                if (width <= 0) continue;
                
                if (entry.target === techContainerRef.current) {
                    // Item width is ~48px (w-12) + gap-4 (16px) = 64px. Padding is roughly 48px.
                    setTechItemsPerRow(Math.max(1, Math.floor((width - 32) / 64)));
                } else if (entry.target === socialContainerRef.current) {
                    setSocialItemsPerRow(Math.max(1, Math.floor((width - 32) / 64)));
                } else if (entry.target === interestsContainerRef.current) {
                    setInterestsItemsPerRow(Math.max(1, Math.floor(width / 90)));
                } else if (entry.target === techInterestsContainerRef.current) {
                    setTechInterestsItemsPerRow(Math.max(1, Math.floor(width / 90)));
                }
            }
        });

        if (techContainerRef.current) observer.observe(techContainerRef.current);
        if (socialContainerRef.current) observer.observe(socialContainerRef.current);
        if (interestsContainerRef.current) observer.observe(interestsContainerRef.current);
        if (techInterestsContainerRef.current) observer.observe(techInterestsContainerRef.current);

        return () => observer.disconnect();
    }, [profile]);

    const allTechItems = profile?.techStack?.flatMap(cat => cat.items || []) || [];
    const allSocialLinks = [...(profile?.socialLinks || []), ...(profile?.codingPlatforms || [])];
    const allInterests = profile?.interests || [];
    const allTechInterests = profile?.technicalInterests || [];

    const techRows = [];
    for (let i = 0; i < allTechItems.length; i += techItemsPerRow) {
        techRows.push(allTechItems.slice(i, i + techItemsPerRow));
    }

    const socialRows = [];
    for (let i = 0; i < allSocialLinks.length; i += socialItemsPerRow) {
        socialRows.push(allSocialLinks.slice(i, i + socialItemsPerRow));
    }
    
    const interestsRows = [];
    for (let i = 0; i < allInterests.length; i += interestsItemsPerRow) {
        interestsRows.push(allInterests.slice(i, i + interestsItemsPerRow));
    }
    
    const techInterestsRows = [];
    for (let i = 0; i < allTechInterests.length; i += techInterestsItemsPerRow) {
        techInterestsRows.push(allTechInterests.slice(i, i + techInterestsItemsPerRow));
    }

    useEffect(() => {
        if (techRows.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentTechRowIndex((prev) => (prev + 1) % techRows.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [techRows.length]);

    useEffect(() => {
        if (socialRows.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSocialRowIndex((prev) => (prev + 1) % socialRows.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [socialRows.length]);

    useEffect(() => {
        if (interestsRows.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentInterestsRowIndex((prev) => (prev + 1) % interestsRows.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [interestsRows.length]);

    useEffect(() => {
        if (techInterestsRows.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentTechInterestsRowIndex((prev) => (prev + 1) % techInterestsRows.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [techInterestsRows.length]);

    if (!profile) return null;

    return (
        <section id="about"
                 className="min-h-screen  flex flex-col pt-[100px] pb-[20px] px-4 lg:px-8 w-full relative z-10">
            <motion.div
                className="grow flex flex-col"
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.8, ease: "easeOut"}}
            >
                {/* Master Frosted Glass Container */}
                <div
                    className="grow bg-bg-glass backdrop-blur-2xl border border-border-glass rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col">
                    <div className="flex flex-col lg:flex-row flex-grow">

                        {/* Left Column: Identity & Contact */}
                        <div
                            className="lg:w-2/5 bg-bg-base/20 p-6 lg:p-8 flex flex-col items-start text-left border-b lg:border-b-0 lg:border-r border-border-glass">

                            <div className="flex flex-row items-center gap-5 w-full mb-8">
                                {/* Avatar Placeholder */}
                                <div
                                    className="w-[clamp(100px,25vw,192px)] h-[clamp(100px,25vw,192px)] shrink-0 rounded-[1.5rem] bg-primary-depth/20 border border-primary-highlight/50 shadow-[0_0_20px_rgba(58,123,213,0.2)] flex items-center justify-center text-primary-highlight overflow-hidden">
                                    {profile.avatar ? (
                                        <img src={profile.avatar} alt={profile.name}
                                             className="w-full h-full object-cover"/>
                                    ) : (
                                        <User size={48}/>
                                    )}
                                </div>

                                {/* Identity & Details */}
                                <div className="flex flex-col flex-grow min-w-0">
                                    <h3 className="text-[clamp(1.25rem,4vw,1.875rem)] font-extrabold text-text-primary mb-1 tracking-tight truncate"
                                        title={profile.name}>{profile.name}</h3>
                                    <p className="text-[clamp(0.7rem,2vw,0.875rem)] text-primary-soft font-bold uppercase tracking-wider mb-3 truncate"
                                       title={profile.profession}>{profile.profession}</p>

                                    {/* Email & Location */}
                                    <div className="flex flex-col gap-2 w-full">
                                        {profile.email && (
                                            <a href={`mailto:${profile.email}`}
                                               className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-xs truncate"
                                               title={profile.email}>
                                                <Mail size={14} className="shrink-0"/>
                                                <span className="truncate font-medium">{profile.email}</span>
                                            </a>
                                        )}
                                        {profile.location && (
                                            <div
                                                className="flex items-center gap-2 text-text-secondary text-xs truncate"
                                                title={profile.location}>
                                                <MapPin size={14} className="shrink-0"/>
                                                <span className="truncate font-medium">{profile.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                            {/* Experience & Education Stats */}
                            <div className="flex flex-row justify-center gap-3 w-full px-2">
                                <div
                                    className="flex-1 bg-bg-base/30 border border-border-glass rounded-xl p-3 flex flex-col items-center justify-center hover:bg-bg-base/50 transition-colors">
                                    <span
                                        className="text-[9px] uppercase font-bold text-text-secondary tracking-widest mb-1">Experience</span>
                                    <span
                                        className="text-sm font-extrabold text-text-primary text-center leading-tight">{profile.experience || 'Fresher'}</span>
                                </div>
                                <div
                                    className="flex-1 bg-bg-base/30 border border-border-glass rounded-xl p-3 flex flex-col items-center justify-center hover:bg-bg-base/50 transition-colors">
                                    <span
                                        className="text-[9px] uppercase font-bold text-text-secondary tracking-widest mb-1">Education</span>
                                    <span
                                        className="text-xs font-bold text-text-primary text-center leading-tight">{profile.education}</span>
                                </div>
                            </div>


                            {/* Journey So Far */}
                            {profile.journey && profile.journey.length > 0 && (
                                <div className="w-full mt-8 flex flex-col gap-6">
                                    <h4 className="text-xl font-black text-text-primary tracking-wide flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-primary-highlight rounded-full"></span>
                                        Journey So Far
                                    </h4>
                                    <div className="relative h-[280px] w-full flex flex-col justify-start">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentJourneyIndex}
                                                initial={{opacity: 0, y: 40}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: -40}}
                                                transition={{duration: 0.5, ease: "easeInOut"}}
                                                className="bg-bg-base/30 backdrop-blur-md border border-border-glass rounded-[1.5rem] p-6 flex flex-col shadow-lg hover:bg-bg-base/50 transition-colors w-full h-auto max-h-full"
                                            >
                                                {(() => {
                                                    const item = profile.journey[currentJourneyIndex];
                                                    return (
                                                        <>
                                                            <div className="mb-4">
                                                                <h5 className="text-xl font-bold text-text-primary tracking-tight truncate">{item.title?.trim()}</h5>
                                                            </div>

                                                            <div
                                                                className="flex items-center justify-between gap-4 text-sm font-medium text-text-secondary mb-3">
                                                                <div className="flex items-center gap-2 truncate">
                                                                    <Building2 size={16} className="shrink-0"/>
                                                                    <span className="truncate">{item.company}</span>
                                                                </div>
                                                                {item.location && (
                                                                    <div className="flex items-center gap-2 shrink-0">
                                                                        <MapPin size={16} className="shrink-0"/>
                                                                        <span
                                                                            className="truncate max-w-[100px]">{item.location}</span>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {item.date && (
                                                                <div
                                                                    className="flex items-center gap-2 text-sm font-semibold text-text-secondary mb-4">
                                                                    <Calendar size={16} className="shrink-0"/>
                                                                    <span className="truncate">{item.date}</span>
                                                                </div>
                                                            )}

                                                            {item.description && (
                                                                <p className="text-sm text-text-primary leading-relaxed mb-5 line-clamp-3 text-justify">{item.description}</p>
                                                            )}

                                                            {item.tags && item.tags.length > 0 && (
                                                                <div
                                                                    className="flex flex-wrap gap-2 mt-auto max-h-[28px] overflow-hidden">
                                                                    {item.tags.map((tag, tIdx) => (
                                                                        <span key={tIdx}
                                                                              className="px-3 py-1 bg-bg-base/40 border border-primary-highlight/30 rounded-full text-xs font-bold text-text-primary shadow-sm hover:bg-primary-depth/30 transition-colors whitespace-nowrap">
                                      {tag}
                                    </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </>
                                                    );
                                                })()}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )}


                            {/* Action Buttons pushed to bottom */}
                            <div className="mt-auto w-full flex flex-row gap-3 pt-4">
                                <ActionButton
                                    text="View Resume"
                                    href="/resume"
                                    showArrow={false}
                                    className="h-[54px] flex-1"
                                    bgClass="bg-primary-soft/10"
                                    borderClass="border-primary-soft/50 hover:border-yellow-500/50"
                                    textClass="text-primary-soft group-hover:text-yellow-300 text-xs sm:text-base"
                                    hoverBgClass="bg-yellow-500/20"
                                />
                                <ActionButton
                                    text="Get in Touch"
                                    href="#contact"
                                    showArrow={false}
                                    className="h-[54px] flex-1"
                                    bgClass="bg-bg-glass"
                                    borderClass="border-border-glass hover:border-red-500/50"
                                    textClass="text-text-primary group-hover:text-red-100 text-xs sm:text-base"
                                    hoverBgClass="bg-red-500/40"
                                />
                            </div>
                        </div>

                        {/* Right Column: Bento Box UI */}
                        <div className="lg:w-3/5 p-4 lg:p-8 flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-4 lg:gap-6">

                                {/* Bento 1: Minimal Bio */}
                                <div
                                    className="col-span-2 bg-bg-base/30 backdrop-blur-md border border-border-glass rounded-[1.5rem] p-6 lg:p-8 hover:bg-bg-base/50 transition-colors">
                                    <h4 className="text-xs font-bold text-primary-highlight uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary-soft animate-pulse"></span>
                                        The Architect
                                    </h4>
                                    <p className="text-text-primary text-lg lg:text-2xl font-medium leading-relaxed text-justify">
                                        {profile.summary || "Building robust, scalable, and visually stunning digital experiences."}
                                    </p>
                                </div>

                                {/* Bento 4: Tech Stack Simple */}
                                {allTechItems.length > 0 && (
                                    <div
                                        className="col-span-2 bg-bg-base/30 backdrop-blur-md border border-border-glass rounded-[1.5rem] flex flex-col gap-2 p-4 hover:bg-bg-base/50 transition-colors relative"
                                    >
                                        <button
                                            onClick={() => setIsTechDialogOpen(true)}
                                            className="absolute top-4 right-4 text-text-secondary hover:text-primary-highlight transition-colors flex items-center justify-center p-2 rounded-full hover:bg-bg-base/50 z-20"
                                            title="Show All Tech Stack"
                                        >
                                            <Maximize2 size={16}/>
                                        </button>
                                        <div
                                            ref={techContainerRef}
                                            className="relative h-[50px] w-full flex flex-col justify-center"
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={currentTechRowIndex}
                                                    variants={staggerContainer}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="absolute inset-0 flex flex-wrap justify-center gap-4"
                                                >
                                                    {techRows[currentTechRowIndex]?.map((tech, idx) => (
                                                        <motion.a key={idx}
                                                             variants={staggerItem}
                                                             href={tech.url || '#'}
                                                             target={tech.url ? "_blank" : undefined}
                                                             rel={tech.url ? "noreferrer" : undefined}
                                                             className="w-12 h-12 rounded-full bg-bg-base/40 border border-border-glass hover:bg-bg-base/80 hover:scale-[1.08] transition-all flex items-center justify-center shadow-sm group"
                                                             title={tech.name}
                                                        >
                                                            {tech.icon ? (
                                                                <img src={tech.icon} alt={tech.name}
                                                                     className="w-6 h-6 object-contain transition-all"/>
                                                            ) : (
                                                                <div className="text-xs font-black text-text-secondary group-hover:text-primary-highlight">
                                                                    {tech.name ? tech.name.substring(0, 2).toUpperCase() : '?'}
                                                                </div>
                                                            )}
                                                        </motion.a>
                                                    ))}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                )}

                                {/* Social Connect Box */}
                                {allSocialLinks.length > 0 && (
                                    <div
                                        className="col-span-2 bg-bg-base/30 backdrop-blur-md border border-border-glass rounded-[1.5rem] flex flex-col gap-2 p-4 hover:bg-bg-base/50 transition-colors relative"
                                    >
                                        <button
                                            onClick={() => setIsSocialDialogOpen(true)}
                                            className="absolute top-4 right-4 text-text-secondary hover:text-primary-highlight transition-colors flex items-center justify-center p-2 rounded-full hover:bg-bg-base/50 z-20"
                                            title="Show All Social Links"
                                        >
                                            <Maximize2 size={16}/>
                                        </button>
                                        <div
                                            ref={socialContainerRef}
                                            className="relative h-[50px] w-full flex flex-col justify-center"
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={currentSocialRowIndex}
                                                    variants={staggerContainer}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="absolute inset-0 flex flex-wrap justify-center gap-4"
                                                >
                                                    {socialRows[currentSocialRowIndex]?.map((link, idx) => (
                                                        <motion.a
                                                            key={idx}
                                                            variants={staggerItem}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="w-12 h-12 rounded-full bg-bg-base/40 border border-border-glass hover:bg-bg-base/80 hover:scale-[1.08] transition-all flex items-center justify-center shadow-sm group"
                                                            title={link.name}
                                                        >
                                                            {link.icon ? (
                                                                <img src={link.icon} alt={link.name}
                                                                     className="w-6 h-6 object-contain transition-all"/>
                                                            ) : (
                                                                <ExternalLink size={20}
                                                                              className="text-text-secondary group-hover:text-text-primary"/>
                                                            )}
                                                        </motion.a>
                                                    ))}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                )}

                                {/* Bento 5: Interests */}
                                {allInterests.length > 0 && (
                                    <div
                                        className="col-span-1 hidden sm:flex flex-col bg-bg-base/30 backdrop-blur-md border border-border-glass rounded-[1.5rem] p-4 lg:p-5 hover:bg-bg-base/50 transition-colors group">
                                        <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-3 group-hover:text-primary-soft transition-colors text-center">Hobbies</h4>
                                        <div 
                                            ref={interestsContainerRef}
                                            className="relative h-[32px] w-full flex flex-col justify-center overflow-hidden"
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={currentInterestsRowIndex}
                                                    variants={staggerContainer}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="absolute inset-0 flex flex-wrap justify-center gap-2"
                                                >
                                                    {interestsRows[currentInterestsRowIndex]?.map((interest, idx) => (
                                                        <motion.span key={idx}
                                                              variants={staggerItem}
                                                              className="px-3 py-1 bg-bg-base/50 border border-border-glass rounded-full text-xs font-medium text-text-primary hover:bg-bg-base/80 transition-colors whitespace-nowrap">
                                                          {interest}
                                                        </motion.span>
                                                    ))}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                )}

                                {/* Bento 6: Technical Interests */}
                                {allTechInterests.length > 0 && (
                                    <div
                                        className="col-span-1 hidden sm:flex flex-col bg-bg-base/30 backdrop-blur-md border border-border-glass rounded-[1.5rem] p-4 lg:p-5 hover:bg-bg-base/50 transition-colors group">
                                        <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-3 group-hover:text-primary-soft transition-colors text-center">Tech Focus</h4>
                                        <div 
                                            ref={techInterestsContainerRef}
                                            className="relative h-[32px] w-full flex flex-col justify-center overflow-hidden"
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={currentTechInterestsRowIndex}
                                                    variants={staggerContainer}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="absolute inset-0 flex flex-wrap justify-center gap-2"
                                                >
                                                    {techInterestsRows[currentTechInterestsRowIndex]?.map((interest, idx) => (
                                                        <motion.span key={idx}
                                                              variants={staggerItem}
                                                              className="px-3 py-1 bg-bg-base/50 border border-border-glass rounded-full text-xs font-medium text-text-primary hover:bg-bg-base/80 transition-colors whitespace-nowrap">
                                                          {interest}
                                                        </motion.span>
                                                    ))}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <TechStackDialog isOpen={isTechDialogOpen} onClose={() => setIsTechDialogOpen(false)} profile={profile}/>
            <SocialLinksDialog isOpen={isSocialDialogOpen} onClose={() => setIsSocialDialogOpen(false)}
                               profile={profile}/>
        </section>
    );
};

export default AboutSection;
