'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
  score: number; // 0–100
}

function getScoreColor(score: number): string {
  if (score >= 90) return '#059669'; // Emerald-600
  if (score >= 70) return '#2563eb'; // Blue-600
  return '#d97706'; // Amber-600
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Elite';
  if (score >= 70) return 'Strong';
  return 'Developing';
}

export default function CircularProgress({ score }: CircularProgressProps) {
  const radius = 70;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const clampedScore = Math.max(0, Math.min(100, score));
  const offset = circumference - (clampedScore / 100) * circumference;
  const color = getScoreColor(clampedScore);
  const label = getScoreLabel(clampedScore);

  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;
    let start = 0;
    const end = clampedScore;
    const duration = 1400;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = (start + Math.floor(progress * (end - start))).toFixed(0);
      if (progress < 1) {
        requestAnimationFrame((ts) => step(ts, startTime));
      } else {
        el.textContent = end.toFixed(1);
      }
    };
    requestAnimationFrame((ts) => step(ts, ts));
  }, [clampedScore]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
        {/* Track */}
        <svg width={radius * 2} height={radius * 2} className="rotate-[-90deg]">
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
        </svg>
        {/* Center score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            ref={countRef}
            className="text-4xl font-black tabular-nums"
            style={{ color }}
          >
            0
          </span>
          <span className="text-xs text-gray-400 mt-0.5">/ 100</span>
        </div>
      </div>
      <span
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}
