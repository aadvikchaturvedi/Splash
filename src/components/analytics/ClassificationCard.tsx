'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface ClassificationCardProps {
  position: string;
}

export default function ClassificationCard({ position }: ClassificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-gray-100"
    >
      <p className="text-xs tracking-widest uppercase font-semibold text-blue-600">
        Somersault Position
      </p>

      <div className="flex items-center gap-4">
        <Badge className="bg-blue-50 text-blue-700 border border-blue-100 px-4 py-1 text-lg font-bold hover:bg-blue-100">
          {position}
        </Badge>
      </div>

      <p className="text-gray-400 text-xs">
        Biomechanical classification of posture during rotation. Proper {position} position requires maximum core tension.
      </p>
    </motion.div>
  );
}
