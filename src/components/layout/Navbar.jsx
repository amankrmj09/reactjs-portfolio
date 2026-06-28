import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { useLenis } from 'lenis/react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navbar = () => {
    const { setContactOpen } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    const lenis = useLenis();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const isNavigating = React.useRef(false);

    useEffect(() => {
        if (location.pathname !== '/') return;
        const handleScroll = () => {
            if (window.innerWidth < 768) return; // Disable scroll tracking on mobile

            setIsScrolled(window.scrollY > 20);

            if (isNavigating.current) return;

            const sectionIds = ['home', 'about', 'works', 'certificates', 'contact'];
            let currentActive = '';

            for (const id of sectionIds) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        currentActive = id;
                        break;
                    }
                }
            }

            if (window.scrollY < 100) {
                currentActive = 'home';
            }

            setActiveSection((prev) => (prev !== currentActive ? currentActive : prev));
        };

        const handleGlobalClick = (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                const targetId = link.getAttribute('href').substring(1);
                const sectionIds = ['home', 'about', 'works', 'certificates', 'contact'];
                if (sectionIds.includes(targetId)) {
                    isNavigating.current = true;
                    setActiveSection(targetId);
                    setTimeout(() => {
                        isNavigating.current = false;
                    }, 1000);
                }
            }
        };

        const handleCustomNavigate = (e) => {
            const targetId = e.detail;
            const sectionIds = ['home', 'about', 'works', 'certificates', 'contact'];
            if (sectionIds.includes(targetId)) {
                isNavigating.current = true;
                setActiveSection(targetId);
                setTimeout(() => {
                    isNavigating.current = false;
                }, 1000);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('click', handleGlobalClick);
        window.addEventListener('app:navigate', handleCustomNavigate);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleGlobalClick);
            window.removeEventListener('app:navigate', handleCustomNavigate);
        };
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', href: 'home' },
        { name: 'About', href: 'about' },
        { name: 'Works', href: 'works' },
        { name: 'Certificates', href: 'certificates' },
    ];

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        isNavigating.current = true;
        setActiveSection(targetId);

        if (window.innerWidth < 768) {
            navigate(`/#${targetId}`);
            setTimeout(() => {
                isNavigating.current = false;
            }, 100);
            return;
        }

        const element = document.getElementById(targetId);
        if (element) {
            // Push hash into React Router state to keep it consistent
            navigate(`/#${targetId}`);
            
            if (lenis) {
                lenis.scrollTo(`#${targetId}`);
            } else {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            setTimeout(() => {
                isNavigating.current = false;
            }, 1000);
        } else {
            navigate(`/#${targetId}`);
        }
    };

    const isHomePage = location.pathname === '/';

    return (
        <>
            <DesktopNav 
                isHomePage={isHomePage} 
                navLinks={navLinks} 
                activeSection={activeSection} 
                handleNavClick={handleNavClick} 
            />
            <MobileNav 
                isHomePage={isHomePage} 
                navLinks={navLinks} 
                activeSection={activeSection} 
                handleNavClick={handleNavClick} 
                isMobileMenuOpen={isMobileMenuOpen} 
                setIsMobileMenuOpen={setIsMobileMenuOpen} 
            />
        </>
    );
};

export default Navbar;
