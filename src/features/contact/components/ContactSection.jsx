import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaCode, FaDiscord, FaLink } from 'react-icons/fa';
import { useAppContext } from '@/context/AppContext';
import { submitContactForm } from '../api/contactApi';
import ActionButton from '@/components/shared/ActionButton';

const ContactSection = () => {
  const { profile, siteConfig, theme } = useAppContext();
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', instagramId: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await submitContactForm(formData);
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', instagramId: '', message: '' });
      }, 3000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.error || 'Failed to send message. Please try again.');
    }
  };

  const emailLink = siteConfig?.contactEmail ? `mailto:${siteConfig.contactEmail}` : 'mailto:hello@example.com';
  const displayEmail = emailLink.replace('mailto:', '');

  const getIcon = (platform) => {
    if (!platform) return <FaLink size={18} />;
    switch (platform.toLowerCase()) {
      case 'github': return <FaGithub size={18} />;
      case 'linkedin': return <FaLinkedin size={18} />;
      case 'instagram': return <FaInstagram size={18} />;
      case 'discord': return <FaDiscord size={18} />;
      case 'leetcode': return <FaCode size={18} />;
      default: return <FaLink size={18} />;
    }
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center pt-[120px] pb-[40px] relative overflow-hidden">
      {/* Top Separator */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-border-glass" 
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }} 
      />
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary-depth/30 blur-[100px] -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-4 lg:px-8 w-full flex flex-col items-center">
        
        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card w-full p-8 md:p-12 relative overflow-hidden bg-slate-900 border-border-glass rounded-[2rem]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 relative z-10">
            {/* Left Column */}
            <div className="flex flex-col">
              <h4 className="text-primary-soft font-semibold text-sm tracking-wider uppercase mb-4">
                Get In Touch
              </h4>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
                {(siteConfig?.contactTagline || "Let's work together").split('<br />').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-slate-400 text-lg mb-12 max-w-md leading-relaxed text-justify">
                {siteConfig?.contactDescription || "I'm open to UI/UX and frontend missions, short or long-term. Landing page, full product redesign, or just a second pair of eyes — let's talk."}
              </p>
              
              <div className="flex flex-col gap-4 mt-auto">
                <a href={emailLink} className="flex items-center gap-4 text-slate-300 hover:text-primary-highlight transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-primary-soft group-hover:scale-[1.08] transition-all duration-300 flex-shrink-0">
                    <Mail size={20} className="text-slate-400 group-hover:text-primary-soft transition-colors" />
                  </div>
                  <span className="font-medium">{displayEmail}</span>
                </a>
                
                {(siteConfig?.socialLinks || []).slice(0, 2).map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-primary-highlight transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-primary-soft group-hover:scale-[1.08] overflow-hidden transition-all duration-300 flex-shrink-0">
                      {link.icon ? (
                        <img src={link.icon} alt="" className="w-6 h-6 object-contain transition-all duration-300" />
                      ) : (
                        <div className="text-slate-400 group-hover:text-primary-soft transition-colors flex items-center justify-center">
                            {getIcon(link.name)}
                        </div>
                      )}
                    </div>
                    <span className="font-medium">@{link.url.split('/').filter(Boolean).pop()}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="flex flex-col">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-6">
                    <Mail size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-text-primary mb-2">Message Sent!</h3>
                  <p className="text-slate-400 text-lg">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-300">Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        maxLength={50}
                        className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-soft focus:ring-1 focus:ring-primary-soft text-text-primary transition-all" 
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-300">Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        maxLength={100}
                        className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-soft focus:ring-1 focus:ring-primary-soft text-text-primary transition-all" 
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-300">Phone (Optional)</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        maxLength={20}
                        className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-soft focus:ring-1 focus:ring-primary-soft text-text-primary transition-all" 
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-300">Instagram ID (Optional)</label>
                      <input 
                        type="text" 
                        name="instagramId" 
                        value={formData.instagramId} 
                        onChange={handleChange} 
                        maxLength={50}
                        className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-soft focus:ring-1 focus:ring-primary-soft text-text-primary transition-all" 
                        placeholder="Enter Instagram handle"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-300">Message *</label>
                      <span className={`text-xs font-medium transition-colors ${formData.message.length >= 250 ? 'text-red-400' : 'text-slate-500'}`}>
                        {formData.message.length}/250
                      </span>
                    </div>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                      rows="4"
                      maxLength={250}
                      className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-primary-soft focus:ring-1 focus:ring-primary-soft text-text-primary transition-all resize-none" 
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
                  )}
                  
                  <ActionButton 
                    type="submit" 
                    text={status === 'loading' ? 'Sending...' : 'Send message'}
                    disabled={status === 'loading'}
                    icon={Send}
                    showArrow={status !== 'loading'}
                    className="mt-2 w-full sm:w-auto self-start px-8 h-[56px] text-lg rounded-full"
                    bgClass="bg-transparent"
                    borderClass="border-border-glass hover:border-yellow-500/50"
                    textClass="text-text-primary group-hover:text-yellow-300"
                    hoverBgClass="bg-yellow-500/20"
                    iconColor="text-text-primary group-hover:text-yellow-300"
                    iconAnimationDirection="ltr"
                    blinkColor="group-hover:text-yellow-400"
                  />
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
