'use client';

import { motion } from 'framer-motion';

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-950/80 backdrop-blur-xl">
      <div className="relative w-24 h-24 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t-4 border-cyan-400 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-3 h-3 bg-cyan-400 rounded-full"
          />
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h3 className="text-xl font-bold text-white mb-2 tracking-widest uppercase font-mono">Analyzing Biometrics</h3>
        <p className="text-cyan-400/60 text-sm animate-pulse">Running AI inference on motion paths...</p>
      </motion.div>
    </div>
  );
}
