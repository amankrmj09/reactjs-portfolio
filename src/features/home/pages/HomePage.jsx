import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import LoadingScreen from '@/components/sections/LoadingScreen';
import AboutSection from '../components/AboutSection';
import WorksSection from '@/features/works/components/WorksSection';
import CertificatesSection from '@/features/certificates/components/CertificatesSection';
import ContactSection from '@/features/contact/components/ContactSection';
import FooterSection from '@/components/sections/FooterSection';

const HomePage = () => {
  const location = useLocation();
  const [activeHash, setActiveHash] = useState(location.hash || '#home');

  useEffect(() => {
    setActiveHash(location.hash || '#home');
  }, [location.hash]);

  const isActive = (id) => activeHash === `#${id}`;

  return (
    <div className="min-h-screen">
      <LoadingScreen />
      
      <div className={`${isActive('home') ? 'block' : 'hidden'} md:block`}>
        <HeroSection />
      </div>
      <div className={`${isActive('about') ? 'block' : 'hidden'} md:block`}>
        <AboutSection />
      </div>
      <div className={`${isActive('works') ? 'block' : 'hidden'} md:block`}>
        <WorksSection />
      </div>
      <div className={`${isActive('certificates') ? 'block' : 'hidden'} md:block`}>
        <CertificatesSection />
      </div>
      <div className={`${isActive('contact') ? 'block' : 'hidden'} md:block`}>
        <ContactSection />
      </div>
      <div className={`${isActive('contact') ? 'block' : 'hidden'} md:block`}>
        <FooterSection />
      </div>
    </div>
  );
};

export default HomePage;
