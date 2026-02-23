'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface AlertCardProps {
  interpretation: string;
}

function isDeduction(interpretation: string): boolean {
  const lower = interpretation.toLowerCase();
  return lower.includes('deduction') || lower.includes('apart') || lower.includes('penalty') || lower.includes('error');
}

export default function AlertCard({ interpretation }: AlertCardProps) {
  const hasDeduction = isDeduction(interpretation);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs tracking-widest uppercase font-semibold text-blue-600">
          Leg Separation Analysis
        </p>
        <Badge
          variant={hasDeduction ? 'destructive' : 'default'}
          className={!hasDeduction ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
        >
          {hasDeduction ? 'Deduction' : 'Clean'}
        </Badge>
      </div>

      <div
        className={`rounded-xl p-4 border ${
          hasDeduction
            ? 'bg-red-50 border-red-100'
            : 'bg-emerald-50 border-emerald-100'
        }`}
      >
        <p className={`text-sm leading-relaxed font-medium ${hasDeduction ? 'text-red-700' : 'text-emerald-700'}`}>
          {interpretation}
        </p>
      </div>

      <p className="text-gray-400 text-xs">
        Judges assess foot separation at the moment of water entry. Any visible gap results in a 0.5–2 point deduction.
      </p>
    </motion.div>
  );
}
