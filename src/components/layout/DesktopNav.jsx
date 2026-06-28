import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const DesktopNav = ({ isHomePage, navLinks, activeSection, handleNavClick }) => {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex justify-center items-center pointer-events-none h-[60px]">
            <AnimatePresence mode="wait">
                {isHomePage && (
                    <motion.nav
                        key="desktop-nav"
                        initial={{
                            y: 0,
                            opacity: 0,
                            scale: 0.7,
                            maxWidth: "60px",
                            paddingLeft: "0rem",
                            paddingRight: "0rem"
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            maxWidth: "800px",
                            paddingLeft: "2rem",
                            paddingRight: "2rem",
                            transition: {
                                scale: { duration: 0.5, ease: "easeInOut" },
                                opacity: { duration: 0.5, ease: "easeInOut" },
                                maxWidth: { duration: 0.5, ease: "easeInOut" },
                                paddingLeft: { duration: 0.5, ease: "easeInOut" },
                                paddingRight: { duration: 0.5, ease: "easeInOut" }
                            }
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.7,
                            maxWidth: "60px",
                            paddingLeft: "0rem",
                            paddingRight: "0rem",
                            transition: {
                                maxWidth: { duration: 0.5, ease: "easeInOut" },
                                paddingLeft: { duration: 0.5, ease: "easeInOut" },
                                paddingRight: { duration: 0.5, ease: "easeInOut" },
                                scale: { duration: 0.5, ease: "easeInOut" },
                                opacity: { duration: 0.5, ease: "easeInOut" }
                            }
                        }}
                        className="pointer-events-auto flex items-center justify-center glass h-full rounded-full shadow-lg origin-center overflow-hidden whitespace-nowrap"
                    >
                        <motion.ul
                            className="flex items-center h-full gap-10 text-base font-medium flex-shrink-0 flex-nowrap whitespace-nowrap"
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        >
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href;
                                return (
                                    <li key={link.name}>
                                        <motion.a
                                            href={`/#${link.href}`}
                                            className="relative block px-2 py-1"
                                            initial="initial"
                                            whileHover="hover"
                                            animate={isActive ? "hover" : "initial"}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                        >
                                            {/* Default Text (Inactive) */}
                                            <motion.span
                                                className="block text-text-secondary"
                                                variants={{
                                                    initial: { y: 0, scale: 1, opacity: 1 },
                                                    hover: {
                                                        y: "-100%",
                                                        scale: 0.8,
                                                        opacity: 0,
                                                        transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
                                                    }
                                                }}
                                            >
                                                {link.name}
                                            </motion.span>

                                            {/* Active/Hover Text */}
                                            <motion.span
                                                className="absolute inset-0 flex items-center justify-center text-primary-soft font-bold"
                                                variants={{
                                                    initial: { y: "100%", scale: 0.8, opacity: 0 },
                                                    hover: {
                                                        y: 0,
                                                        scale: 1.2,
                                                        opacity: 1,
                                                        transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] }
                                                    }
                                                }}
                                            >
                                                {link.name}
                                            </motion.span>

                                            {/* Underline Indicator */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNavIndicator"
                                                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary-soft rounded-full"
                                                />
                                            )}
                                        </motion.a>
                                    </li>
                                );
                            })}
                        </motion.ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DesktopNav;
