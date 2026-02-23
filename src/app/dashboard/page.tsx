"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/navbar";
import UploadCard from "@/components/analytics/UploadCard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ScoreCard } from "@/components/dashboard/score-card";
import { DeductionCard } from "@/components/dashboard/deduction-card";
import { EntryPerformanceCard } from "@/components/dashboard/entry-performance-card";
import { SplashCard } from "@/components/dashboard/splash-card";
import { FormCard } from "@/components/dashboard/form-card";
import { LoadingSkeleton } from "@/components/dashboard/loading-skeleton";
import { ErrorState } from "@/components/dashboard/error-state";
import { mockDiveData, mockDiveDataPerfect, mockDiveDataLow } from "@/lib/mock-data";
import type { DiveAnalysis } from "@/lib/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const diveProfilesBase = [
  { label: "Dive 1", data: mockDiveData },
  { label: "Dive 2", data: mockDiveDataPerfect },
  { label: "Dive 3", data: mockDiveDataLow },
];

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<DiveAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState(0);
  const [diveProfiles, setDiveProfiles] = useState(diveProfilesBase);

  // Update comparison list when a new dive is uploaded
  useEffect(() => {
    if (analytics) {
      // Normalize score if it's in 100-scale
      const normalizedData = {
        ...analytics,
        overall_score: {
          ...analytics.overall_score,
          raw_score: analytics.overall_score.raw_score > 10 
            ? analytics.overall_score.raw_score / 10 
            : analytics.overall_score.raw_score
        }
      };
      
      setDiveProfiles([
        { label: "Current Analysis", data: normalizedData },
        ...diveProfilesBase,
      ]);
      setSelected(0);
    }
  }, [analytics]);

  const handleRetry = () => {
    setAnalytics(null);
    setError(null);
    setIsLoading(false);
  };

  const data = diveProfiles[selected]?.data;

  /* Build comparison data from all available profiles */
  const comparisonData = diveProfiles.map((p) => ({
    name: p.label,
    score: p.data.overall_score.raw_score,
    entry: p.data.error_scores.straightness_during_entry.percentile,
  }));

  /* Doughnut for breakdown */
  const breakdownData = data
    ? [
        { name: "Score", value: data.overall_score.raw_score },
        { name: "Lost", value: 10 - data.overall_score.raw_score },
      ]
    : [];

  // Show upload screen if no analytics or error/loading happened yet
  if (!analytics && !isLoading && !error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col pt-16 relative overflow-hidden">
        {/* Background effect to mimic the subtle radial/galaxy swirl from the design */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black -z-10 pointer-events-none"></div>

        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 space-y-8 relative z-10">
          <div className="bg-zinc-950/40 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Dive Performance Lab</h1>
                <p className="text-gray-400 text-lg">Upload a video to get Olympic-grade biomechanical insights.</p>
              </div>
            </div>

            <div className="max-w-xl">
              <UploadCard
                onAnalysisComplete={(data) => {
                  setAnalytics(data);
                  setError(null);
                }}
                onLoadingStart={() => {
                  setIsLoading(true);
                  setAnalytics(null);
                  setError(null);
                }}
                onLoadingEnd={() => setIsLoading(false)}
                onError={(err) => setError(err)}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Once uploading/processing starts, or after upload, use the DashboardLayout
  return (
    <DashboardLayout activeTab="overview" onTabChange={() => {}}>
      {error && (
        <div className="space-y-4">
          <ErrorState onRetry={handleRetry} />
          <div className="p-4 bg-red-950/30 border border-red-900/50 text-red-400 rounded-xl text-center">
            {error}
          </div>
        </div>
      )}
      
      {isLoading && !error && <LoadingSkeleton />}

      {!isLoading && !error && data && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold tracking-widest text-emerald-500 uppercase">Analysis Overview</h2>
            <button 
              onClick={handleRetry}
              className="px-4 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all"
            >
              + NEW UPLOAD
            </button>
          </div>

          {/* ---- Score Header ---- */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {diveProfiles.map((profile, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className="rounded-2xl text-left transition-all"
                style={{
                  outline: selected === idx ? "2px solid var(--dash-accent)" : "2px solid transparent",
                  outlineOffset: "-2px",
                  borderRadius: "1rem",
                }}
              >
                <ScoreCard score={profile.data.overall_score.raw_score} />
              </button>
            ))}
          </div>

          {/* ---- Metrics Detail ---- */}
          <div
            className="space-y-2 rounded-2xl p-5"
            style={{
              backgroundColor: "var(--dash-card)",
              border: "1px solid var(--dash-border)",
            }}
          >
            <p className="mb-3 text-xs font-medium" style={{ color: "var(--dash-text-secondary)" }}>
              {diveProfiles[selected].label} Breakdown
            </p>
            <DeductionCard interpretation={data.error_scores.feet_apart.interpretation} />
            <EntryPerformanceCard percentile={data.error_scores.straightness_during_entry.percentile} />
            <SplashCard maxSplashFrame={data.error_scores.splash.max_splash_frame} />
            <FormCard position={data.error_scores.som_position_tightness.position} />
          </div>

          {/* ---- Comparison Chart ---- */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div
              className="rounded-2xl p-5 lg:col-span-2"
              style={{
                backgroundColor: "var(--dash-card)",
                border: "1px solid var(--dash-border)",
              }}
            >
              <p className="text-xs font-medium" style={{ color: "var(--dash-text-secondary)" }}>
                Score vs Entry Percentile
              </p>
              <div className="mt-4 h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={comparisonData}>
                    <defs>
                      <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1FA97A" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#1FA97A" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="fillEntry" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3DD6A0" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#3DD6A0" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--dash-border)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#9EB7B1", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#9EB7B1", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={32}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#132A24",
                        border: "1px solid #1E3A34",
                        borderRadius: 8,
                        color: "#E6F4F1",
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#1FA97A"
                      strokeWidth={2}
                      fill="url(#fillScore)"
                      name="Score (/10)"
                    />
                    <Area
                      type="monotone"
                      dataKey="entry"
                      stroke="#3DD6A0"
                      strokeWidth={1.5}
                      fill="url(#fillEntry)"
                      name="Entry %ile"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div
              className="flex flex-col items-center justify-center rounded-2xl p-5"
              style={{
                backgroundColor: "var(--dash-card)",
                border: "1px solid var(--dash-border)",
              }}
            >
              <p className="mb-3 text-xs font-medium" style={{ color: "var(--dash-text-secondary)" }}>
                Points Earned
              </p>
              <div className="relative h-[140px] w-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={60}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      strokeWidth={0}
                    >
                      <Cell fill="#1FA97A" />
                      <Cell fill="#1E3A34" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-lg font-bold" style={{ color: "var(--dash-text)" }}>
                    {data.overall_score.raw_score.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#1FA97A" }} />
                  <span className="text-[10px]" style={{ color: "var(--dash-text-secondary)" }}>Earned</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#1E3A34" }} />
                  <span className="text-[10px]" style={{ color: "var(--dash-text-secondary)" }}>Deducted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}