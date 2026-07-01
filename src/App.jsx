import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { ReactLenis } from 'lenis/react';
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
      <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center">
        <div className="relative">
          {/* Outer rings */}
          <div className="w-24 h-24 rounded-full border-t-2 border-primary-highlight border-solid animate-spin" style={{ animationDuration: '2s' }} />
          <div className="w-20 h-20 rounded-full border-b-2 border-primary-soft border-solid absolute top-2 left-2 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
          {/* Center dot */}
          <div className="w-4 h-4 rounded-full bg-white absolute top-10 left-10 animate-pulse" />
        </div>
        <p className="mt-8 text-primary-soft font-medium tracking-widest uppercase text-sm animate-pulse">
          Waking up server...
        </p>
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
