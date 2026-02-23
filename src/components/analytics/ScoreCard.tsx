'use client';

import { motion } from 'framer-motion';
import CircularProgress from './CircularProgress';

interface ScoreCardProps {
  score: number;
}

export default function ScoreCard({ score }: ScoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-8 flex flex-col items-center gap-6 shadow-sm border border-gray-100"
    >
      <div className="text-center">
        <p className="text-xs tracking-widest uppercase text-blue-600 font-semibold mb-1">Overall Performance Score</p>
        <p className="text-gray-400 text-sm">Composite biomechanical rating</p>
      </div>
      <CircularProgress score={score} />
      <p className="text-gray-400 text-xs text-center max-w-xs leading-relaxed">
        Derived from entry straightness, leg separation, splash impact, and somersault position tightness.
      </p>
    </motion.div>
  );
}
