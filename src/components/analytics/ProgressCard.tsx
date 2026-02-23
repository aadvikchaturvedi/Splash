'use client';

import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface ProgressCardProps {
  percentile: number;
}

function getClassification(p: number): { label: string; color: string } {
  if (p >= 90) return { label: 'Elite', color: '#059669' };
  if (p >= 75) return { label: 'Strong', color: '#2563eb' };
  return { label: 'Needs Improvement', color: '#d97706' };
}

export default function ProgressCard({ percentile }: ProgressCardProps) {
  const clamped = Math.max(0, Math.min(100, percentile));
  const { label, color } = getClassification(clamped);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs tracking-widest uppercase font-semibold text-blue-600">
          Entry Straightness
        </p>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full border" style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
          {label}
        </span>
      </div>

      <div className="flex items-end gap-2">
        <motion.span
          className="text-5xl font-black tabular-nums"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {clamped}
        </motion.span>
        <span className="text-gray-400 text-sm mb-2 font-medium">th percentile</span>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        style={{ originX: 0 }}
      >
        <Progress value={clamped} className="h-2 bg-gray-100" />
      </motion.div>

      <p className="text-gray-400 text-xs">
        Measures body alignment from lift-off through water entry. Higher percentile indicates a more vertical entry trajectory.
      </p>
    </motion.div>
  );
}
