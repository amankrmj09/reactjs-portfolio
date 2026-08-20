import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    'Connecting to server...',
    'Fetching user\'s data...',
    'Preparing the experience...',
];

const LoadingScreen = () => {
    const [stepIndex, setStepIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStepIndex(prev => (prev + 1) % steps.length);
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="min-h-screen w-full bg-bg-base flex flex-col items-center justify-center gap-4"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-[2px] border-white/10 border-t-white rounded-full"
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={stepIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="text-white/60 font-mono tracking-[0.3em] uppercase text-[10px]"
                >
                    {steps[stepIndex]}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default LoadingScreen;
