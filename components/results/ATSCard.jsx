"use client";

import { motion } from "framer-motion";

export default function ATSCard({ score }) {
  const getTextColor = () => {
    if (score >= 80) return "text-emerald-300";
    if (score >= 60) return "text-amber-300";
    return "text-red-300";
  };

  const getBarColor = () => {
    if (score >= 80) return "from-emerald-400 via-green-400 to-teal-400";
    if (score >= 60) return "from-amber-400 via-yellow-400 to-orange-400";
    return "from-red-400 via-rose-400 to-orange-400";
  };

  const getBadgeStyles = () => {
    if (score >= 80) {
      return "border-emerald-400/15 bg-emerald-400/10 text-emerald-300";
    }
    if (score >= 60) {
      return "border-amber-400/15 bg-amber-400/10 text-amber-300";
    }
    return "border-red-400/15 bg-red-400/10 text-red-300";
  };

  const getStatus = () => {
    if (score >= 80) return "Strong match";
    if (score >= 60) return "Moderate match";
    return "Needs improvement";
  };

  return (
    <div
      className="overflow-hidden rounded-[28px] border border-white/10 bg-[#10131a]/95 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="p-6 sm:p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="text-left">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
              ATS Compatibility
            </p>

            <div className="mt-4 flex items-end gap-3">
              <h1
                className={`text-6xl font-semibold tracking-tight sm:text-7xl md:text-8xl ${getTextColor()}`}
              >
                {score}%
              </h1>

              <span
                className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getBadgeStyles()}`}
              >
                {getStatus()}
              </span>
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              This score reflects how well your resume aligns with ATS-friendly
              formatting, skill relevance, and keyword coverage.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:w-fit">
            <div className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                Score
              </p>
              <p className="mt-1 text-lg font-semibold text-white">{score}/100</p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                Status
              </p>
              <p className={`mt-1 text-lg font-semibold ${getTextColor()}`}>
                {getStatus()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-300">Resume strength</span>
            <span className="text-slate-400">{score}% complete</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/6">
            <motion.div
              className={`relative h-full rounded-full bg-gradient-to-r ${getBarColor()}`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}