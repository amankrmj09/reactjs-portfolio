import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { ReactLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import 'lenis/dist/lenis.css';

// Pages handled by AnimatedRoutes

// Layout & Dialogs
import Navbar from '@/components/layout/Navbar';
import ContactDialog from '@/features/contact/components/ContactDialog';
import WorkDetailDialog from '@/features/works/components/WorkDetailDialog';
import CertificateDetailDialog from '@/features/certificates/components/CertificateDetailDialog';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { AuraBackground } from '@/components/shared/AuraBackground';
import AnimatedRoutes from '@/components/layout/AnimatedRoutes';

import ServerUnavailable from '@/components/ServerUnavailable/ServerUnavailable';
import { apiClient } from '@/lib/axios';

function App() {
  const [isServerUp, setIsServerUp] = useState(null);

  useEffect(() => {
    const checkServer = async () => {
      try {
        await apiClient.get('/ping');
        setIsServerUp(true);
      } catch (error) {
        console.error('Server ping failed:', error);
        setIsServerUp(false);
      }
    };
    checkServer();
  }, []);

  if (isServerUp === null) {
    return (
      <div className="fixed inset-0 z-50 bg-bg-base flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-[2px] border-white/10 border-t-white rounded-full mb-6"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white/60 font-mono tracking-[0.3em] uppercase text-[10px]"
        >
          Authenticating
        </motion.div>
      </div>
    );
  }

  if (isServerUp === false) {
    return <ServerUnavailable />;
  }

  return (
    <AppProvider>
      <ReactLenis root options={{ lerp: 0.05, smoothWheel: true, smoothTouch: true }}>
        <Router>
          <div className="min-h-screen bg-bg-base text-text-primary transition-colors duration-300 relative z-10">
            <AuraBackground />
            <Navbar />
            <ThemeToggle />

            <AnimatedRoutes />

            {/* Global Overlays */}
            <ContactDialog />
            <WorkDetailDialog />
            <CertificateDetailDialog />
          </div>
        </Router>
      </ReactLenis>
    </AppProvider>
  );
}

export default App;
