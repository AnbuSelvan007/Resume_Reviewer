"use client";

import { Sparkles, ArrowRight } from "lucide-react";

export default function SuggestionsSection({
  suggestions,
}) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#10131a]/95 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-300/30 to-transparent" />

      <div className="p-6 sm:p-8 md:p-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-400/10">
            <Sparkles size={20} className="text-violet-300" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              AI Recommendations
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Focused suggestions to improve clarity, relevance, and ATS performance.
            </p>
          </div>
        </div>

        <ol className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="group rounded-[22px] border border-white/10 bg-white/[0.035] p-4 transition-colors duration-300 hover:bg-white/[0.05] sm:p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-300/15 bg-violet-400/10 text-sm font-semibold text-violet-200">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <p className="text-sm leading-7 text-slate-300 sm:text-[15px]">
                    {suggestion}
                  </p>
                </div>

                <div className="mt-1 hidden shrink-0 text-slate-500 transition-colors duration-300 group-hover:text-violet-300 sm:block">
                  <ArrowRight size={16} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}