'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface SplashCardProps {
  maxSplashFrame: number;
  splashRef: React.RefObject<HTMLDivElement | null>;
}

export default function SplashCard({ maxSplashFrame, splashRef }: SplashCardProps) {
  const handleScrollToSplash = () => {
    splashRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-gray-100"
    >
      <p className="text-xs tracking-widest uppercase font-semibold text-blue-600">
        Max Splash Frame
      </p>

      <div className="flex items-end gap-2">
        <motion.span
          className="text-5xl font-black tabular-nums text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {maxSplashFrame}
        </motion.span>
        <span className="text-gray-400 text-sm mb-2 font-medium">frame</span>
      </div>

      <p className="text-gray-400 text-xs">
        Frame index of maximum splash displacement. Lower numbers suggest a cleaner entry.
      </p>

      <Button
        onClick={handleScrollToSplash}
        variant="outline"
        className="mt-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all font-semibold"
      >
        Jump to Splash Analysis
      </Button>
    </motion.div>
  );
}
