import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const MobileNav = ({ isHomePage, navLinks, activeSection, handleNavClick, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    return (
        <>
            {/* Mobile Navbar Toggle */}
            <AnimatePresence mode="wait">
                {isHomePage && (
                    <motion.div
                        className="md:hidden fixed top-6 left-6 z-50 flex items-center gap-3"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="w-[50px] h-[50px] flex items-center justify-center glass rounded-full text-text-primary z-50 relative shrink-0 shadow-md"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        
                        <AnimatePresence mode="wait">
                            {activeSection !== 'home' && !isMobileMenuOpen && (
                                <motion.div
                                    key={activeSection}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="z-40 px-4 py-1.5 bg-bg-base/50 backdrop-blur-md border border-border-glass rounded-full shadow-sm"
                                >
                                    <span className="text-sm font-bold text-text-primary capitalize tracking-wide">
                                        {activeSection === 'works' ? 'Featured Works' : activeSection}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Slide-Out Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden"
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-64 z-40 bg-bg-base border-r border-border-glass shadow-2xl flex flex-col pt-24 px-6 md:hidden"
                        >
                            <ul className="flex flex-col gap-6 text-lg font-medium w-full">
                                {navLinks.map((link) => {
                                    const isActive = activeSection === link.href;
                                    return (
                                        <li key={link.name} className="w-full">
                                            <a
                                                href={`/#${link.href}`}
                                                className={`block w-full py-2 transition-colors ${isActive ? 'text-primary-soft font-bold inline-block border-b-2 border-primary-soft' : 'text-text-secondary hover:text-text-primary'}`}
                                                onClick={(e) => handleNavClick(e, link.href)}
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    );
                                })}
                                <li key="Contact Me" className="w-full">
                                    <a
                                        href="/#contact"
                                        className={`block w-full py-2 transition-colors ${activeSection === 'contact' ? 'text-primary-soft font-bold inline-block border-b-2 border-primary-soft' : 'text-text-secondary hover:text-text-primary'}`}
                                        onClick={(e) => handleNavClick(e, 'contact')}
                                    >
                                        Contact Me
                                    </a>
                                </li>
                            </ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileNav;
