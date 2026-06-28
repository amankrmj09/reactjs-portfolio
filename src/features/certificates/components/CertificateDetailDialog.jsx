import React, { useState, useEffect } from 'react';
import { Loader2, Download, ExternalLink } from 'lucide-react';
import DialogOverlay from '@/components/shared/DialogOverlay';
import { useAppContext } from '@/context/AppContext';
import { getCertificateDetail } from '../api/certificatesApi';

const CertificateDetailDialog = () => {
  const { selectedCertId, setSelectedCertId } = useAppContext();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCert = async () => {
      if (!selectedCertId) {
        setCert(null);
        return;
      }
      setLoading(true);
      try {
        const data = await getCertificateDetail(selectedCertId);
        setCert(data);
      } catch (err) {
        console.error('Failed to fetch certificate detail', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCert();
  }, [selectedCertId]);

  return (
    <DialogOverlay 
      isOpen={!!selectedCertId} 
      onClose={() => setSelectedCertId(null)} 
      title={cert?.title || "Certificate Details"}
    >
      {loading ? (
        <div className="flex justify-center items-center py-24 min-h-[400px]">
          <Loader2 className="animate-spin text-primary-soft" size={48} />
        </div>
      ) : cert ? (
        <div className="flex flex-col gap-6 sm:gap-8 max-w-3xl mx-auto w-full">
          {(cert.media?.imageKey || cert.imageUrl) && (
            <div className="w-full flex justify-center mb-2 sm:mb-6">
              <img 
                src={cert.media?.imageKey || cert.imageUrl} 
                alt={cert.title} 
                className="max-w-full rounded-2xl shadow-[0_10px_40px_rgba(255,255,255,0.1)] object-contain" 
                style={{ maxHeight: '600px' }} 
              />
            </div>
          )}

          <div className="text-center mt-2">
            <p className="text-lg sm:text-xl text-primary-soft font-extrabold tracking-wide uppercase">{cert.issuer}</p>
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 text-text-secondary text-xs sm:text-sm mt-3 font-medium">
              <span className="bg-bg-base/40 px-3 py-1.5 rounded-full border border-border-glass">Issued: {new Date(cert.issuedDate).toLocaleDateString()}</span>
              {cert.expiryDate ? (
                <span className="bg-bg-base/40 px-3 py-1.5 rounded-full border border-border-glass">Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
              ) : (
                <span className="bg-bg-base/40 px-3 py-1.5 rounded-full border border-border-glass">No Expiration</span>
              )}
            </div>
          </div>

          {(cert.shortDesc || cert.longDesc || cert.description) && (
            <div className="bg-bg-base/30 border border-border-glass rounded-2xl p-5 sm:p-6 text-sm sm:text-base text-text-secondary">
              {cert.shortDesc && <p className="text-text-primary font-bold mb-2">{cert.shortDesc}</p>}
              {(cert.longDesc || cert.description) && <p className="leading-relaxed whitespace-pre-line text-justify">{cert.longDesc || cert.description}</p>}
            </div>
          )}

          {cert.skills && cert.skills.length > 0 && (
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-3">Skills Assessed</h3>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-2.5">
                {cert.skills.map(skill => (
                  <span key={skill} className="text-xs sm:text-sm bg-primary-soft/10 text-primary-soft border border-primary-soft/30 shadow-[0_0_10px_rgba(255,255,255,0.05)] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {cert.issuerMetadata && (cert.issuerMetadata.examCode || cert.issuerMetadata.score) && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-bg-base/30 p-4 sm:p-5 rounded-2xl border border-border-glass">
              {cert.issuerMetadata.examCode && (
                <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
                  <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-widest font-bold">Exam Code</p>
                  <p className="text-text-primary font-bold text-sm sm:text-base">{cert.issuerMetadata.examCode}</p>
                </div>
              )}
              {cert.issuerMetadata.score && (
                <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
                  <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-widest font-bold">Score</p>
                  <p className="text-text-primary font-bold text-sm sm:text-base">{cert.issuerMetadata.score}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-2">
            {cert.credentialUrl && (
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:flex-1 flex items-center justify-between p-4 sm:p-5 bg-bg-base/30 border border-border-glass rounded-2xl hover:bg-bg-base/50 transition-all group shadow-sm">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-primary mb-1">Verify Credential</span>
                  <span className="text-xs text-text-secondary truncate max-w-[200px] sm:max-w-xs">{cert.credentialId || cert.credentialUrl}</span>
                </div>
                <ExternalLink size={20} className="text-text-secondary group-hover:text-text-primary transition-colors flex-shrink-0 ml-2" />
              </a>
            )}

            {cert.media?.pdfKey && (
              <a href={cert.media.pdfKey} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 px-6 sm:px-8 py-4 sm:py-0 sm:h-[74px] rounded-2xl text-sm sm:text-base shadow-[0_0_20px_rgba(255,255,255,0.1)] font-bold">
                <Download size={20} /> Download PDF
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-text-secondary">Failed to load certificate details.</div>
      )}
    </DialogOverlay>
  );
};

export default CertificateDetailDialog;
