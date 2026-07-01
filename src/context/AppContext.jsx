import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '@/features/profile/api/profileApi';
import { getWorks, getRecentWorks } from '@/features/works/api/worksApi';
import { getCertificates, getRecentCertificates } from '@/features/certificates/api/certificatesApi';
import { getSiteConfig, incrementStats } from '@/features/site-config/api/siteConfigApi';
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

  // New states for full data caching
  const [allWorks, setAllWorks] = useState([]);
  const [isAllWorksLoaded, setIsAllWorksLoaded] = useState(false);
  const [allCertificates, setAllCertificates] = useState([]);
  const [isAllCertificatesLoaded, setIsAllCertificatesLoaded] = useState(false);

  // New states for visitor stats caching
  const [totalVisitorCount, setTotalVisitorCount] = useState(null);
  const [personalVisitorNumber, setPersonalVisitorNumber] = useState(null);
  const [isVisitorStatsLoaded, setIsVisitorStatsLoaded] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const loadAllWorks = async () => {
    if (isAllWorksLoaded) return;
    try {
      const data = await getWorks(0, 50);
      setAllWorks(Array.isArray(data) ? data : data?.content || []);
      setIsAllWorksLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  const loadAllCertificates = async () => {
    if (isAllCertificatesLoaded) return;
    try {
      const data = await getCertificates(0, 50);
      setAllCertificates(Array.isArray(data) ? data : data?.content || []);
      setIsAllCertificatesLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  const manageVisitorCount = async () => {
    if (isVisitorStatsLoaded) return;
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
        setTotalVisitorCount(data.count);
      } else if (data && data.count == null) {
        setTotalVisitorCount(0);
        if (!storedVisitorNumber) setPersonalVisitorNumber(0);
      }
      setIsVisitorStatsLoaded(true);
    } catch (err) {
      console.error('Failed to fetch/increment visitor count:', err);
    }
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
        
        manageVisitorCount();
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
    
    allWorks,
    isAllWorksLoaded,
    loadAllWorks,
    
    allCertificates,
    isAllCertificatesLoaded,
    loadAllCertificates,
    
    totalVisitorCount,
    personalVisitorNumber,
    isVisitorStatsLoaded,
    manageVisitorCount,
    
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
