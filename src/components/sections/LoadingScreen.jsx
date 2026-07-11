import React from 'react';
import {motion} from 'framer-motion';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5, ease: "easeInOut"}}
            className="min-h-screen w-full bg-bg-base flex flex-col items-center justify-center"
        >
            <motion.div
                animate={{rotate: 360}}
                transition={{duration: 0.8, repeat: Infinity, ease: "linear"}}
                className="w-8 h-8 border-[2px] border-white/10 border-t-white rounded-full mb-6"
            />
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.8, delay: 0.1}}
                className="text-white/60 font-mono tracking-[0.3em] uppercase text-[10px]"
            >
                Authenticating
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;
