"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Cloud,
  Sparkles,
  FileCheck,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function UploadProgress({
  file,
  progress = 100,
  status = "completed",
  estimatedTime = 0,
  onComplete,
}) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const duration = 800;
    const steps = 60;
    const increment = progress / steps;
    let current = animatedProgress;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step <= steps) {
        current += increment;
        setAnimatedProgress(Math.min(current, progress));
      } else {
        clearInterval(timer);
        if (progress === 100 && status === "completed") {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 2500);
          if (onComplete) onComplete();
        }
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [progress]);

  if (!file) return null;

  const getStatusIcon = () => {
    switch (status) {
      case "uploading":
        return <Cloud className="text-indigo-300" size={18} />;
      case "processing":
        return <Sparkles className="text-violet-300" size={18} />;
      case "completed":
        return <CheckCircle2 className="text-emerald-300" size={18} />;
      case "error":
        return <AlertCircle className="text-red-300" size={18} />;
      default:
        return <FileCheck className="text-indigo-300" size={18} />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "uploading":
        return "Uploading your resume";
      case "processing":
        return "Processing document";
      case "completed":
        return "Resume ready for analysis";
      case "error":
        return "Upload failed";
      default:
        return "Resume ready";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "uploading":
        return "from-indigo-400 via-blue-400 to-cyan-400";
      case "processing":
        return "from-violet-400 via-fuchsia-400 to-indigo-400";
      case "completed":
        return "from-emerald-400 via-green-400 to-teal-400";
      case "error":
        return "from-red-400 via-rose-400 to-orange-400";
      default:
        return "from-indigo-400 to-violet-400";
    }
  };

  const getTrackColor = () => {
    switch (status) {
      case "error":
        return "bg-red-500/10";
      default:
        return "bg-white/[0.07]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="mt-6"
    >
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#10131a]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {status === "processing" && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-violet-300/30"
                initial={{
                  x: `${20 + i * 18}%`,
                  y: `${25 + i * 10}%`,
                  scale: 0.6,
                  opacity: 0,
                }}
                animate={{
                  y: [`${25 + i * 10}%`, `${18 + i * 12}%`, `${25 + i * 10}%`],
                  opacity: [0, 1, 0],
                  scale: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.25,
                }}
              />
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-emerald-400/10 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10"
              >
                <CheckCircle2 size={34} className="text-emerald-300" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-0">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <motion.div
                animate={{ rotate: status === "processing" ? 360 : 0 }}
                transition={{
                  duration: 2.5,
                  repeat: status === "processing" ? Infinity : 0,
                  ease: "linear",
                }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                {getStatusIcon()}
              </motion.div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white sm:text-base">
                  {file.name.length > 40 ? file.name.slice(0, 37) + "..." : file.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • PDF
                </p>
              </div>
            </div>

            {estimatedTime > 0 && status !== "completed" && status !== "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400"
              >
                <Clock size={12} />
                <span>~{estimatedTime}s remaining</span>
              </motion.div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-300">
                  {getStatusText()}
                </span>

                {status === "processing" && (
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="h-1.5 w-1.5 rounded-full bg-violet-300"
                  />
                )}
              </div>

              <motion.span
                key={Math.round(animatedProgress)}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-sm font-semibold ${
                  status === "error"
                    ? "text-red-300"
                    : status === "completed"
                    ? "text-emerald-300"
                    : "text-slate-200"
                }`}
              >
                {status === "error" ? "Failed" : `${Math.round(animatedProgress)}%`}
              </motion.span>
            </div>

            <div className="relative">
              <div
                className={`h-2.5 overflow-hidden rounded-full ${getTrackColor()} ring-1 ring-inset ring-white/6`}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${animatedProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`relative h-full rounded-full bg-gradient-to-r ${getStatusColor()}`}
                >
                  {(status === "uploading" || status === "processing") &&
                    animatedProgress < 100 && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    )}
                </motion.div>
              </div>
            </div>
          </div>

          {status === "completed" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-4 flex flex-col gap-2 border-t border-white/8 pt-4 text-xs sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-wrap items-center gap-3 text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 size={13} />
                  Ready for analysis
                </span>
                <span className="hidden text-slate-600 sm:inline">•</span>
                <span>AI parsing complete</span>
              </div>

              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="text-amber-300"
              >
                <Sparkles size={14} />
              </motion.div>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-2xl border border-red-400/15 bg-red-500/[0.05] px-4 py-3"
            >
              <p className="text-xs text-red-300">
                Upload failed. Please check your connection and try again.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}