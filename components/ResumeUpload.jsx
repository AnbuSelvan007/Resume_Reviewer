"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Sparkles,
  Upload,
  FileText,
  ArrowRight,
  RefreshCw,
  Zap,
  TrendingUp,
  Shield,
  Brain,
  AlertCircle,
  Award,
} from "lucide-react";
import ReviewResult from "./ReviewResult";

export default function ResumeUpload() {
  const [darkMode, setDarkMode] = useState(true);
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  async function handleAnalyze() {
    if (!file) return;
    setError(null);
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const response = await fetch("/api/review", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("API Response:", data);
      if (data.success) {
        console.log("Setting analysis state with:",data.analysis);
        setAnalysis(data.analysis);
       
      } else {
        setError(data.error || "Failed to analyze resume.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  function handleReset() {
    setFile(null);
    setAnalysis(null);
    setError(null);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0b0f] text-white">
      {/* Refined Dark Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(86,98,255,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(0,194,255,0.12),_transparent_28%),linear-gradient(180deg,_#0a0b0f_0%,_#0d1117_45%,_#090a0d_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />

        <motion.div
          animate={{
            x: [0, 120, 0],
            y: [0, -60, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-indigo-500/12 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 90, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-[-80px] right-[-60px] h-[360px] w-[360px] rounded-full bg-cyan-400/10 blur-3xl"
        />
      </div>


      <div className="min-h-screen px-4 py-12 sm:px-6">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl text-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-white/[0.04] px-4 py-2 backdrop-blur-xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={15} className="text-indigo-300" />
              </motion.div>
              <span className="text-sm font-medium tracking-wide text-slate-300">
                AI-powered resume review
              </span>
            </motion.div>

            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Resume Analyzer
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Upload your resume and get a polished analysis with ATS signals,
              skill insights, and actionable suggestions in a clean, focused
              interface.
            </p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-12 w-full max-w-4xl"
          >
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

              <div className="p-6 sm:p-8 md:p-10">
                {!analysis && !analyzing && !error && (
                  <>
                    {/* Upload Zone */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={`
                        group relative cursor-pointer rounded-[24px] border p-10 sm:p-12 text-center transition-all duration-300
                        ${
                          isDragging
                            ? "border-indigo-400/60 bg-indigo-500/10 shadow-[0_0_0_6px_rgba(99,102,241,0.08)]"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                        }
                        ${
                          file
                            ? "border-emerald-400/40 bg-emerald-500/[0.06]"
                            : ""
                        }
                      `}
                      onDragEnter={() => setIsDragging(true)}
                      onDragLeave={() => setIsDragging(false)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const droppedFile = e.dataTransfer.files[0];
                        if (
                          droppedFile &&
                          (droppedFile.type === "application/pdf" ||
                            droppedFile.type === "application/msword" ||
                            droppedFile.type ===
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
                        ) {
                          setFile(droppedFile);
                        }
                      }}
                      onClick={() =>
                        document.getElementById("file-input")?.click()
                      }
                    >
                      <input
                        id="file-input"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />

                      <motion.div
                        animate={isDragging ? { y: -8 } : { y: 0 }}
                        className="flex flex-col items-center gap-5"
                      >
                        <div
                          className={`
                            flex h-20 w-20 items-center justify-center rounded-2xl border
                            ${
                              file
                                ? "border-emerald-400/20 bg-emerald-400/10"
                                : "border-indigo-400/20 bg-indigo-400/10"
                            }
                          `}
                        >
                          {file ? (
                            <FileText
                              size={36}
                              className="text-emerald-300"
                            />
                          ) : (
                            <Upload size={36} className="text-indigo-300" />
                          )}
                        </div>

                        {file ? (
                          <>
                            <div className="space-y-1 text-center">
                              <p className="break-all text-lg font-semibold text-white">
                                {file.name}
                              </p>
                              <p className="text-sm text-slate-400">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                              }}
                              className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-400/15"
                            >
                              Remove file
                            </motion.button>
                          </>
                        ) : (
                          <>
                            <div className="space-y-2">
                              <p className="text-2xl font-semibold text-white">
                                Upload your resume
                              </p>
                              <p className="text-sm text-slate-400 sm:text-base">
                                Drag and drop your file here or click to browse
                              </p>
                            </div>

                            <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
                              {["PDF", "DOC", "DOCX"].map((type) => (
                                <span
                                  key={type}
                                  className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs font-medium tracking-wide text-slate-300"
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Analyze Button */}
                    <motion.button
                      whileHover={file ? { scale: 1.01 } : {}}
                      whileTap={file ? { scale: 0.985 } : {}}
                      disabled={!file || analyzing}
                      onClick={handleAnalyze}
                      className="
                        mt-8 flex w-full items-center justify-center gap-3 rounded-2xl
                        border border-indigo-400/20 bg-indigo-500 px-6 py-4 text-lg font-semibold text-white
                        shadow-[0_12px_30px_rgba(79,70,229,0.32)]
                        transition-all duration-300 hover:bg-indigo-400
                        disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none
                      "
                    >
                      <Zap size={19} className="fill-white" />
                      <span>Analyze Resume</span>
                      <ArrowRight size={19} />
                    </motion.button>
                  </>
                )}

                {/* Loading State */}
                <AnimatePresence mode="wait">
                  {analyzing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="py-20 text-center"
                    >
                      <div className="relative inline-flex">
                        <div className="h-20 w-20 rounded-full border-4 border-white/10 border-t-indigo-400 animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Brain size={30} className="text-indigo-300 animate-pulse" />
                        </div>
                      </div>

                      <h3 className="mt-6 text-2xl font-semibold text-white">
                        Analyzing your resume
                      </h3>
                      <p className="mt-2 text-slate-400">
                        Reviewing ATS compatibility, skills, and structure...
                      </p>

                      <div className="mt-5 flex justify-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce"
                          style={{ animationDelay: "0s" }}
                        />
                        <div
                          className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error State */}
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      className="py-12 text-center"
                    >
                      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10">
                        <AlertCircle size={44} className="text-red-300" />
                      </div>

                      <h3 className="mb-2 text-2xl font-semibold text-white">
                        Analysis failed
                      </h3>
                      <p className="mb-6 text-slate-400">{error}</p>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-3 font-medium text-white transition hover:bg-white/[0.1]"
                      >
                        <RefreshCw size={18} />
                        Try again
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Results State */}
                <AnimatePresence mode="wait">
                  {analysis && (
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                    >
                      {console.log("Rendering ReviewResult with analysis:", analysis)}
                      <ReviewResult analysis={analysis}/>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={handleReset}
                        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-3.5 font-medium text-slate-200 transition hover:bg-white/[0.08]"
                      >
                        <RefreshCw size={18} />
                        Analyze Another Resume
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          {!analysis && !analyzing && !error && (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-14 grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-3"
            >
              {[
                {
                  icon: <TrendingUp size={24} />,
                  title: "ATS Optimization",
                  description:
                    "Improve keyword relevance and increase compatibility with automated screening systems.",
                  tone: "text-cyan-300",
                  bg: "bg-cyan-400/10",
                  border: "border-cyan-400/15",
                },
                {
                  icon: <Award size={24} />,
                  title: "Skill Analysis",
                  description:
                    "Identify missing skills, role-specific keywords, and resume gaps at a glance.",
                  tone: "text-fuchsia-300",
                  bg: "bg-fuchsia-400/10",
                  border: "border-fuchsia-400/15",
                },
                {
                  icon: <Brain size={24} />,
                  title: "AI Recommendations",
                  description:
                    "Receive focused suggestions that improve clarity, impact, and overall presentation.",
                  tone: "text-amber-300",
                  bg: "bg-amber-400/10",
                  border: "border-amber-400/15",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]"
                >
                  <div
                    className={`mb-5 inline-flex rounded-2xl border p-3 ${feature.bg} ${feature.border}`}
                  >
                    <div className={feature.tone}>{feature.icon}</div>
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="leading-7 text-slate-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-xl">
              <Shield size={16} className="text-emerald-300" />
              <span className="text-xs font-medium tracking-wide text-slate-400">
                100% secure • No data stored • Instant analysis
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}