import React, { useState } from 'react';
import DialogOverlay from '@/components/shared/DialogOverlay';
import { useAppContext } from '@/context/AppContext';
import { submitContactForm } from '../api/contactApi';

const ContactDialog = () => {
  const { isContactOpen, setContactOpen } = useAppContext();
  const [formData, setFormData] = useState({ name: '', email: '', message: '', instagramId: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
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
        setContactOpen(false);
        setStatus('idle');
        setFormData({ name: '', email: '', message: '', instagramId: '', phone: '' });
      }, 2000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.error || 'Failed to send message. Please try again.');
    }
  };

  return (
    <DialogOverlay 
      isOpen={isContactOpen} 
      onClose={() => setContactOpen(false)} 
      title="Contact Me"
    >
      <div className="p-2 sm:p-4">
        {status === 'success' ? (
          <div className="text-center py-8">
            <h3 className="text-2xl font-semibold text-primary-soft mb-2">Message Sent!</h3>
            <p className="text-slate-300">I'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-300">Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-primary-soft text-white transition-colors" 
                  placeholder="Your Name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-300">Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-primary-soft text-white transition-colors" 
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-300">Instagram ID (Optional)</label>
                <input 
                  type="text" 
                  name="instagramId" 
                  value={formData.instagramId} 
                  onChange={handleChange} 
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-primary-soft text-white transition-colors" 
                  placeholder="@yourhandle"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-300">Phone (Optional)</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-primary-soft text-white transition-colors" 
                  placeholder="+1234567890"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-300">Message *</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                rows="4"
                className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-primary-soft text-white transition-colors resize-none custom-scrollbar" 
                placeholder="How can I help you?"
              ></textarea>
            </div>
            
            {status === 'error' && (
              <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
            )}
            
            <div className="mt-4 flex justify-end">
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="btn-primary w-full sm:w-auto"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </DialogOverlay>
  );
};

export default ContactDialog;
