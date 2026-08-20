import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const ServerUnavailable = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto py-8 px-4 font-[Inter,system-ui,sans-serif]"
            style={{ background: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)' }}>

            {/* Animated blobs */}
            <div className="absolute -top-[10vw] -left-[10vw] w-[40vw] h-[40vw] rounded-full opacity-60 blur-[80px] animate-blob pointer-events-none"
                style={{ background: '#8ec5fc' }} />
            <div className="absolute -bottom-[15vw] -right-[10vw] w-[50vw] h-[50vw] rounded-full opacity-60 blur-[80px] pointer-events-none"
                style={{ background: '#e0c3fc', animation: 'blob 10s -6s infinite alternate' }} />

            <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-[500px]">

                {/* Main error card */}
                <div className="w-full rounded-3xl p-10 text-center shadow-[0_8px_32px_rgba(0,0,0,0.15)] animate-[slideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 translate-y-10"
                    style={{
                        background: 'rgba(255,255,255,0.65)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.8)',
                    }}>

                    {/* Server icon */}
                    <div className="w-[90px] h-[90px] mx-auto mb-6">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full fill-none stroke-[#4a90e2] stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]"
                            style={{ animation: 'su-floatIcon 4s infinite ease-in-out' }}>
                            <rect x="2" y="4" width="20" height="4" rx="1" />
                            <circle cx="6" cy="6" r="1" className="fill-[#f85149] stroke-none" style={{ animation: 'su-blink 2s infinite' }} />
                            <line x1="10" y1="6" x2="20" y2="6" />
                            <rect x="2" y="10" width="20" height="4" rx="1" />
                            <circle cx="6" cy="12" r="1" className="fill-[#f85149] stroke-none" style={{ animation: 'su-blink 2s infinite' }} />
                            <line x1="10" y1="12" x2="20" y2="12" />
                            <rect x="2" y="16" width="20" height="4" rx="1" />
                            <circle cx="6" cy="18" r="1" className="fill-[#f85149] stroke-none" style={{ animation: 'su-blink 2s infinite' }} />
                            <line x1="10" y1="18" x2="20" y2="18" />
                        </svg>
                    </div>

                    <h1 className="text-[2rem] font-bold tracking-tight text-[#2d3748] mb-3">
                        503 Service Unavailable
                    </h1>
                    <p className="text-[#4a5568] text-[1.05rem] leading-relaxed mb-10">
                        Blame <strong>Render</strong> — they put our server to sleep the second
                        nobody's watching. 😤💤 The culprit is their free tier. Give it{' '}
                        <strong>~30–60 seconds</strong> to wake up, then hit refresh.
                        We promise the server is just lazy, not broken. 🙃
                    </p>

                    <button
                        onClick={handleRefresh}
                        className="inline-flex items-center gap-2 bg-[#4a90e2] hover:bg-[#357abd] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] border-none cursor-pointer group"
                    >
                        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round] transition-transform duration-300 group-hover:rotate-180">
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.22-10.27l-2.6 2.6" />
                        </svg>
                        Refresh Page
                    </button>
                </div>

                {/* Social card */}
                <div className="w-full rounded-3xl px-8 py-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.15)] animate-[slideUp_0.8s_0.15s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 translate-y-10"
                    style={{
                        background: 'rgba(255,255,255,0.65)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.8)',
                    }}>
                    <p className="text-[#4a5568] text-xs font-semibold uppercase tracking-widest mb-4">
                        While you wait, connect with me
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <a href="https://github.com/amankrmj09"
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#24292e] hover:bg-[#1a1f24] text-white font-semibold text-sm px-5 py-2.5 rounded-full no-underline transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]">
                            <FaGithub className="text-lg flex-shrink-0" />
                            <span>amankrmj09</span>
                        </a>
                        <a href="https://www.linkedin.com/in/amankrmj09"
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold text-sm px-5 py-2.5 rounded-full no-underline transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(10,102,194,0.35)]">
                            <FaLinkedin className="text-lg flex-shrink-0" />
                            <span>amankrmj09</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Keyframe styles — only for animations not covered by Tailwind */}
            <style>{`
                @keyframes slideUp {
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes su-floatIcon {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes su-blink {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0.3; }
                }
            `}</style>
        </div>
    );
};

export default ServerUnavailable;
