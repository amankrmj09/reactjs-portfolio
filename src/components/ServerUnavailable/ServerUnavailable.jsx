import React from 'react';
import './ServerUnavailable.css';

const ServerUnavailable = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="server-unavailable-wrapper">
            <div className="su-blob su-blob-1"></div>
            <div className="su-blob su-blob-2"></div>

            <div className="su-glass-container">
                <div className="su-icon-container">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="4" width="20" height="4" rx="1"></rect>
                        <circle cx="6" cy="6" r="1" className="su-error-dot"></circle>
                        <line x1="10" y1="6" x2="20" y2="6"></line>
                        
                        <rect x="2" y="10" width="20" height="4" rx="1"></rect>
                        <circle cx="6" cy="12" r="1" className="su-error-dot"></circle>
                        <line x1="10" y1="12" x2="20" y2="12"></line>
                        
                        <rect x="2" y="16" width="20" height="4" rx="1"></rect>
                        <circle cx="6" cy="18" r="1" className="su-error-dot"></circle>
                        <line x1="10" y1="18" x2="20" y2="18"></line>
                    </svg>
                </div>
                <h1>503 Service Unavailable</h1>
                <p>Our servers are currently taking a quick breather. We're working diligently to bring everything back online in a proper professional manner.</p>
                <button className="su-btn" onClick={handleRefresh}>
                    <svg viewBox="0 0 24 24">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.22-10.27l-2.6 2.6"/>
                    </svg>
                    Refresh Page
                </button>
            </div>
        </div>
    );
};

export default ServerUnavailable;
