"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
  ArrowUpTray,
} from "lucide-react";
import { useState } from "react";

export default function UploadCard({
  file,
  setFile,
  isUploading = false,
  onUpload,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    validateAndSetFile(selected);
  }

  function validateAndSetFile(selected) {
    setUploadError(null);

    if (selected.type !== "application/pdf") {
      setUploadError("Please upload a PDF file");
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      setUploadError("File size must be less than 10MB");
      return;
    }

    setFile(selected);
    if (onUpload) onUpload(selected);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }

  function handleRemoveFile(e) {
    e.stopPropagation();
    setFile(null);
    setUploadError(null);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative"
    >
      <div className="absolute inset-0 -z-10 rounded-[28px] bg-white/[0.03] blur-2xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0f1117]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent" />

        <label
          className="block cursor-pointer"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <motion.div
            whileHover={{ scale: 1.008 }}
            whileTap={{ scale: 0.992 }}
            className={`
              rounded-[24px] border border-dashed p-10 text-center transition-all duration-300 sm:p-12
              ${
                isDragging
                  ? "border-indigo-400/70 bg-indigo-400/10 shadow-[0_0_0_6px_rgba(99,102,241,0.08)]"
                  : "border-white/14 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
              }
              ${uploadError ? "border-red-400/50 bg-red-500/[0.05]" : ""}
            `}
          >
            <motion.div
              animate={{
                y: isDragging ? -6 : [0, -6, 0],
                scale: isDragging ? 1.05 : 1,
              }}
              transition={{
                y: isDragging
                  ? { duration: 0.2 }
                  : { repeat: Infinity, duration: 3, ease: "easeInOut" },
                scale: { duration: 0.2 },
              }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-300/15 bg-indigo-400/10"
            >
              {isDragging ? (
                <ArrowUpTray size={34} className="text-indigo-300" />
              ) : (
                <Upload size={34} className="text-indigo-300" />
              )}
            </motion.div>

            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Upload your resume
            </h2>

            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              {isDragging ? "Drop your file here" : "Drag and drop or click to upload"}
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 sm:text-sm">
              <Sparkles size={14} className="text-indigo-300" />
              <span>PDF only • up to 10MB</span>
              <Sparkles size={14} className="text-indigo-300/80" />
            </div>

            {uploadError && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm font-medium text-red-300"
              >
                {uploadError}
              </motion.p>
            )}
          </motion.div>

          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>

        <AnimatePresence mode="wait">
          {file && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.28 }}
              className="mt-6"
            >
              <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/[0.03] via-transparent to-cyan-400/[0.03]" />

                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-300/15 bg-indigo-400/10">
                      <FileText size={28} className="text-indigo-300" />
                      {isUploading && (
                        <motion.div
                          className="absolute -right-1 -top-1"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 size={13} className="text-indigo-300" />
                        </motion.div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white sm:text-base">
                        {file.name}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:text-sm">
                        <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        <span className="h-1 w-1 rounded-full bg-slate-600" />
                        <span>PDF document</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <AnimatePresence mode="wait">
                      {isUploading ? (
                        <motion.div
                          key="uploading"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="inline-flex items-center gap-2 rounded-full border border-indigo-300/15 bg-indigo-400/10 px-3 py-1.5 text-sm text-indigo-200"
                        >
                          <Loader2 size={16} className="animate-spin" />
                          <span>Uploading</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5 text-sm text-emerald-200"
                        >
                          <CheckCircle2 size={16} />
                          <span>Ready</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={handleRemoveFile}
                      className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-red-300"
                    >
                      <XCircle size={18} />
                    </motion.button>
                  </div>
                </div>

                {isUploading && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                    className="absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400"
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!file && !isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-5 text-center"
          >
            <p className="text-xs text-slate-500 sm:text-sm">
              Pro tip: use a clean, single-column PDF for better parsing accuracy.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}