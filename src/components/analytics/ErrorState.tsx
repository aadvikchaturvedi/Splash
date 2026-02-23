'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-3xl p-12 max-w-lg mx-auto text-center border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]"
    >
      <div className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4">Analysis Failed</h3>
      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4 mb-8">
        <p className="text-red-300/80 text-sm leading-relaxed">{message}</p>
      </div>

      <Button
        onClick={onRetry}
        className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-6 rounded-2xl flex items-center gap-3 transition-all mx-auto"
      >
        <RefreshCcw className="h-5 w-5" />
        RETRY UPLOAD
      </Button>
    </motion.div>
  );
}
