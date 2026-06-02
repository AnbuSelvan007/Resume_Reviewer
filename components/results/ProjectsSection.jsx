"use client";

import { motion } from "framer-motion";
import { FolderKanban, ArrowUpRight } from "lucide-react";

export default function ProjectsSection({ projects }) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#10131a]/95 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="p-6 sm:p-8 md:p-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-300/15 bg-indigo-400/10">
            <FolderKanban size={20} className="text-indigo-300" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Recommended Projects
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Project ideas to strengthen your resume and improve role alignment.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group rounded-[22px] border border-white/10 bg-white/[0.035] p-5 transition-all duration-300 hover:border-indigo-300/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Project idea {index + 1}
                  </div>

                  <p className="text-sm leading-7 text-slate-300 sm:text-[15px]">
                    {project}
                  </p>
                </div>

                <div className="mt-1 shrink-0 rounded-full border border-white/10 bg-white/[0.04] p-2 text-slate-500 transition-colors duration-300 group-hover:text-indigo-300">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}