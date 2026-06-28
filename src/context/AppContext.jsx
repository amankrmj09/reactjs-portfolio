import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '@/features/profile/api/profileApi';
import { getRecentWorks } from '@/features/works/api/worksApi';
import { getRecentCertificates } from '@/features/certificates/api/certificatesApi';
import { getSiteConfig } from '@/features/site-config/api/siteConfigApi';
import { getResume } from '@/features/resume/api/resumeApi';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [siteConfig, setSiteConfig] = useState(null);
  const [recentWorks, setRecentWorks] = useState([]);
  const [recentCertificates, setRecentCertificates] = useState([]);
  const [resumeData, setResumeData] = useState(null);
  const [selectedWorkId, setSelectedWorkId] = useState(null);
  const [selectedCertId, setSelectedCertId] = useState(null);
  const [isContactOpen, setContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [profData, worksData, certsData, siteConfigData, resumeRes] = await Promise.all([
          getProfile().catch(() => null),
          getRecentWorks().catch(() => []),
          getRecentCertificates().catch(() => []),
          getSiteConfig().catch(() => null),
          getResume().catch(() => null)
        ]);
        
        // Use default empty values if API fails to prevent crashes
        setProfile(profData || {
          name: "Your Name",
          tagline: "Developer",
          about: "Welcome to my portfolio.",
          socialLinks: {}
        });
        setRecentWorks(Array.isArray(worksData) ? worksData : worksData?.content || []);
        setRecentCertificates(Array.isArray(certsData) ? certsData : certsData?.content || []);
        setResumeData(resumeRes);
        setSiteConfig(siteConfigData || {
          taglines: ["Building beautiful, performant apps."],
          greeting: "Hi, I'm Aman Kumar Maurya!!",
          descriptionLines: ["- a passionate Flutter developer", "- Student from VIT University, Chennai"],
          terminalCommands: [],
          socialLinks: [],
          count: 0
        });
      } catch (err) {
        console.error("Error fetching initial data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const value = {
    profile,
    siteConfig,
    recentWorks,
    recentCertificates,
    resumeData,
    isLoading,
    
    selectedWorkId,
    setSelectedWorkId,
    
    selectedCertId,
    setSelectedCertId,
    
    isContactOpen,
    setContactOpen,
    
    theme,
    toggleTheme
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
