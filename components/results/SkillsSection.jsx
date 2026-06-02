"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function SkillsSection({
  skillsFound,
  missingSkills,
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.section
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden rounded-[26px] border border-white/10 bg-[#10131a]/95 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />

        <div className="p-6 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-400/10">
              <CheckCircle2 size={18} className="text-emerald-300" />
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Skills Found
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Skills already detected in your resume.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {skillsFound.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3.5 py-2 text-sm font-medium text-emerald-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden rounded-[26px] border border-white/10 bg-[#10131a]/95 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-red-300/30 to-transparent" />

        <div className="p-6 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-red-300/15 bg-red-400/10">
              <AlertCircle size={18} className="text-red-300" />
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Missing Skills
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Skills you may want to add or highlight more clearly.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {missingSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-red-400/15 bg-red-400/10 px-3.5 py-2 text-sm font-medium text-red-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}