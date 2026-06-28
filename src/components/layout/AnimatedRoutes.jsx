import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import HomePage from '@/features/home/pages/HomePage';
import WorksPage from '@/features/works/pages/WorksPage';
import CertificatesPage from '@/features/certificates/pages/CertificatesPage';
import ResumePage from '@/features/resume/pages/ResumePage';
import PageTransition from '@/components/shared/PageTransition';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/works" element={<PageTransition><WorksPage /></PageTransition>} />
        <Route path="/certificates" element={<PageTransition><CertificatesPage /></PageTransition>} />
        <Route path="/resume" element={<PageTransition><ResumePage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
