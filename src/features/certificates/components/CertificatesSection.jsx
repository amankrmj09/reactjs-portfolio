import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { getCertificates } from '../api/certificatesApi';
import CertificateCard from './CertificateCard';
import ActionButton from '@/components/shared/ActionButton';

const CertificatesSection = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getCertificates(0, 4);
        setCertificates(Array.isArray(data) ? data : data?.content || []);
      } catch (err) {
        console.error('Failed to fetch certificates', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <section id="certificates" className="min-h-screen  flex flex-col pt-[100px] pb-[20px] px-4 lg:px-8 w-full relative">
      {/* Top Separator */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-border-glass" 
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }} 
      />
      <motion.div
        className="w-full max-w-7xl scale-95 lg:scale-100 transition-transform origin-center mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Desktop Header */}
        <div className="hidden md:flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Certificates
          </h2>
          <ActionButton 
            text="All Certificates" 
            href="/certificates" 
            icon={ArrowRight}
            className="px-5 h-[42px]"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary-soft" size={32} />
          </div>
        ) : (
          <>
            <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 pb-8 pt-4 px-2 -mx-2 mt-4 md:mt-0">
              {certificates.map((cert, index) => (
                <CertificateCard key={cert.id} certificate={cert} index={index} />
              ))}
            </div>
            
            {/* Mobile All Certificates Button */}
            <div className="flex md:hidden justify-center mt-2 pb-8">
              <ActionButton 
                text="All Certificates" 
                href="/certificates" 
                icon={ArrowRight}
                className="px-6 h-[50px]"
              />
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default CertificatesSection;
