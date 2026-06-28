import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { getCertificates } from '../api/certificatesApi';
import CertificateCard from '../components/CertificateCard';

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getCertificates(0, 50);
        setCertificates(Array.isArray(data) ? data : data?.content || []);
      } catch (err) {
        console.error('Failed to fetch certificates', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-28 px-2 sm:px-4 lg:px-6 max-w-[1400px] mx-auto pb-16">
      {/* Floating Top-Left Header */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
        <button 
          onClick={() => {
            if (window.innerWidth >= 768) {
              navigate('/#certificates');
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('app:navigate', { detail: 'certificates' }));
              }, 100);
            } else {
              navigate('/#certificates');
            }
          }}
          className="w-[50px] h-[50px] flex items-center justify-center glass rounded-full text-text-primary z-50 relative shrink-0 shadow-md hover:bg-bg-base/30 transition-colors"
          aria-label="Back to Certificates"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="z-40 px-4 py-1.5 bg-bg-base/50 backdrop-blur-md border border-border-glass rounded-full shadow-sm">
          <span className="text-sm font-bold text-text-primary capitalize tracking-wide">
            Certificates
          </span>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-primary-soft" size={48} />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard key={cert.id} certificate={cert} index={index} />
          ))}
          {certificates.length === 0 && (
            <p className="text-slate-400 col-span-full text-center">No certificates found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
