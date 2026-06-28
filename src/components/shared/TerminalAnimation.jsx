import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const usernames = ["Eren Yeager", "Mikasa Ackerman", "Armin Arlert", "Levi Ackerman", "Erwin Smith"];

const TerminalAnimation = ({ commands = [] }) => {
  // Boot Sequence State
  const [isBootSequence, setIsBootSequence] = useState(true);
  const [bootStep, setBootStep] = useState(-1);
  const [terminalTitle, setTerminalTitle] = useState('terminal');
  const [promptText, setPromptText] = useState('skynet : ~%');
  const [username, setUsername] = useState('');
  const [loginDetails, setLoginDetails] = useState('');
  const [quoteData, setQuoteData] = useState('');

  // Normal Sequence State
  const [cmdIndex, setCmdIndex] = useState(0);
  const [step, setStep] = useState(0); 
  const [typedText, setTypedText] = useState('');

  const activeCommands = commands && commands.length > 0 ? commands : [
    {
      command: 'java Life.java',
      loadingText: '[=========> ] Executing....',
      output: '  (\\__/)\n  (o.o)\n  > ^ <',
      statusLine: 'Error: No life found for a developer.',
      statusColor: 'red'
    }
  ];

  const currentCmd = activeCommands[cmdIndex];

  // Component Mount - Init Boot Sequence Data
  useEffect(() => {
    const randomUser = usernames[Math.floor(Math.random() * usernames.length)];
    const usernameSlug = randomUser.toLowerCase().replace(/ /g, '_'); 
    setUsername(usernameSlug);
    
    const getISTTime = () => {
      return new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'long' }) + ' (IST)';
    };
    const storedLogin = localStorage.getItem('last_login');
    const currentLogin = getISTTime();
    setLoginDetails(storedLogin || currentLogin);
    localStorage.setItem('last_login', currentLogin);
    
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();
        if (data && data.quote) {
          const qText = `\n"${data.quote}"\n  — ${data.author}\n`;
          localStorage.setItem('quote', qText);
          return qText;
        }
      } catch (err) {
        // Silently fallback if quote API is unreachable
      }
      return '\n"The only thing we are allowed to do is believe that we won\'t regret the choice we made."\n  — Levi Ackerman\n';
    };

    const storedQuote = localStorage.getItem('quote');
    if (storedQuote) {
      setQuoteData(storedQuote);
      fetchQuote(); // prefetch for next time
    } else {
      fetchQuote().then(q => setQuoteData(q));
    }

    const initTimeout = setTimeout(() => setBootStep(0), 1000);
    return () => clearTimeout(initTimeout);
  }, []);

  // Boot Sequence Animation
  useEffect(() => {
    if (!isBootSequence || bootStep === -1) return;
    let timeout;
    let typeInterval;
    
    if (bootStep === 0) {
      const cmd = `ssh ${username}@blubug.tech`;
      let curr = 0;
      setTypedText('');
      typeInterval = setInterval(() => {
        if (curr <= cmd.length) {
          setTypedText(cmd.slice(0, curr));
          curr++;
        } else {
          clearInterval(typeInterval);
          timeout = setTimeout(() => setBootStep(1), 300);
        }
      }, 80);
    } else if (bootStep === 1) {
      timeout = setTimeout(() => setBootStep(2), 1500);
    } else if (bootStep === 2) {
      timeout = setTimeout(() => setBootStep(3), 5000);
    } else if (bootStep === 3) {
      const cmd = "clear";
      let curr = 0;
      setTypedText('');
      typeInterval = setInterval(() => {
        if (curr <= cmd.length) {
          setTypedText(cmd.slice(0, curr));
          curr++;
        } else {
          clearInterval(typeInterval);
          timeout = setTimeout(() => setBootStep(4), 500);
        }
      }, 100);
    } else if (bootStep === 4) {
      timeout = setTimeout(() => {
        setIsBootSequence(false);
        setTerminalTitle(username);
        setPromptText(`${username}@blubug.tech:~$`);
        setCmdIndex(0);
        setStep(0);
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(typeInterval);
    }
  }, [isBootSequence, bootStep, username]);

  // Normal Command Sequence Animation
  useEffect(() => {
    if (isBootSequence) return;
    let timeout;
    let typeInterval;

    if (step === 0) {
      let currentIndex = 0;
      setTypedText('');
      typeInterval = setInterval(() => {
        if (currentIndex <= (currentCmd?.command?.length || 0)) {
          setTypedText((currentCmd?.command || '').slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          timeout = setTimeout(() => setStep(1), 500);
        }
      }, 100);
    } else if (step === 1) {
      timeout = setTimeout(() => {
        setStep(2);
      }, 2000);
    } else if (step === 2) {
      timeout = setTimeout(() => {
        setStep(3);
      }, 3000); 
    } else if (step === 3) {
      let currentIndex = 0;
      setTypedText('');
      const clearCmd = "clear";
      typeInterval = setInterval(() => {
        if (currentIndex <= clearCmd.length) {
          setTypedText(clearCmd.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          timeout = setTimeout(() => setStep(4), 500);
        }
      }, 100);
    } else if (step === 4) {
      timeout = setTimeout(() => {
        setStep(0);
        setCmdIndex((prev) => (prev + 1) % activeCommands.length);
      }, 1000);
    }
    
    return () => {
      clearTimeout(timeout);
      clearInterval(typeInterval);
    };
  }, [step, cmdIndex, activeCommands, isBootSequence]);

  const getStatusColorClass = (color) => {
    switch (color) {
      case 'red': return 'text-[#ff5f56]';
      case 'blue': return 'text-[#2196F3]';
      case 'green': return 'text-[#4CAF50]';
      default: return 'text-text-primary';
    }
  };

  const renderBootContent = () => {
    if (bootStep < 4) {
      return (
        <>
          <div className="flex gap-[6px]">
            <span className="font-semibold text-text-primary">skynet : ~%</span>
            <span>{bootStep === 0 ? typedText : `ssh ${username}@blubug.tech`}</span>
            {bootStep === 0 && (
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-[7px] h-[15px] bg-text-secondary inline-block ml-0.5 align-middle"
              />
            )}
          </div>
          {bootStep >= 1 && (
            <div className="mt-1 text-text-secondary">
              <div>connecting to blubug.tech...</div>
              {bootStep >= 2 && (
                <div className="mt-2 text-text-primary font-medium animate-in fade-in duration-500">
                  <div className="mb-2 text-text-secondary">Last login: {loginDetails} from sshd</div>
                  <div className="whitespace-pre-wrap text-primary-soft opacity-90">{quoteData || "Loading quote..."}</div>
                </div>
              )}
            </div>
          )}
          {bootStep >= 3 && (
            <div className="mt-4 flex gap-[6px]">
              <span className="font-semibold text-text-primary">{`${username}@blubug.tech:~$`}</span>
              <span>{typedText}</span>
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-[7px] h-[15px] bg-text-secondary inline-block ml-0.5 align-middle"
              />
            </div>
          )}
        </>
      );
    }
    return (
      <div className="flex gap-[6px]">
        <span className="font-semibold text-text-primary">{`${username}@blubug.tech:~$`}</span>
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-[7px] h-[15px] bg-text-secondary inline-block ml-0.5 align-middle"
        />
      </div>
    );
  };

  const renderNormalContent = () => {
    if (step < 4) {
      return (
        <>
          <div className="flex gap-[6px]">
            <span className="font-semibold text-text-primary">{promptText}</span>
            <span>{step === 0 ? typedText : (currentCmd?.command || '')}</span>
            {step === 0 && (
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-[7px] h-[15px] bg-text-secondary inline-block ml-0.5 align-middle"
              />
            )}
          </div>
          {step >= 1 && (
            <div className="mt-1">
              {step === 1 ? (
                <div className="flex items-center gap-[6px] mt-1 text-text-secondary">
                  <span>{currentCmd?.loadingText || '[=========> ] Executing....'}</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >...</motion.span>
                </div>
              ) : (
                <div className="mt-3 text-text-secondary">
                  {currentCmd?.output && (
                    <pre className="leading-snug">
                      {currentCmd.output}
                    </pre>
                  )}
                  {currentCmd?.statusLine && (
                    <div className={`mt-2 font-bold ${getStatusColorClass(currentCmd.statusColor)}`}>
                      {currentCmd.statusLine}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {step >= 2 && (
            <div className="mt-4 flex gap-[6px]">
              <span className="font-semibold text-text-primary">{promptText}</span>
              <span>{step === 3 ? typedText : ''}</span>
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-[7px] h-[15px] bg-text-secondary inline-block ml-0.5 align-middle"
              />
            </div>
          )}
        </>
      );
    }
    return (
      <div className="flex gap-[6px]">
        <span className="font-semibold text-text-primary">{promptText}</span>
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-[7px] h-[15px] bg-text-secondary inline-block ml-0.5 align-middle"
        />
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="flex flex-col w-full max-w-[500px] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-border-glass bg-bg-glass backdrop-blur-2xl backdrop-saturate-150 z-20 mx-auto lg:ml-auto relative before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')] before:opacity-[0.03] before:mix-blend-overlay before:pointer-events-none"
    >
      <div className="relative bg-black/5 dark:bg-white/5 h-[38px] flex items-center border-b border-border-glass">
        <div className="flex gap-[8px] pl-[14px]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-center text-[13px] text-text-secondary font-medium select-none">
          <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10z"/>
          </svg>
          {terminalTitle}
        </div>
      </div>
      
      <div className="p-4 font-mono text-[13px] leading-[1.4] text-text-primary min-h-[240px]">
        {isBootSequence ? renderBootContent() : renderNormalContent()}
      </div>
    </motion.div>
  );
};

export default TerminalAnimation;
