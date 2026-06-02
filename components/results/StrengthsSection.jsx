"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function StrengthsSection({
  strengths,
  weaknesses,
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="overflow-hidden rounded-[26px] border border-white/10 bg-[#10131a]/95 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />

        <div className="p-6 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-400/10">
              <CheckCircle2 size={18} className="text-emerald-300" />
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Strengths
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Elements that already support a stronger resume profile.
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {strengths.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-300"
                />
                <span className="text-sm leading-7 text-slate-300 sm:text-[15px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="overflow-hidden rounded-[26px] border border-white/10 bg-[#10131a]/95 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />

        <div className="p-6 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/15 bg-amber-400/10">
              <AlertTriangle size={18} className="text-amber-300" />
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Weaknesses
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Areas that may reduce impact or ATS compatibility.
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {weaknesses.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
              >
                <AlertTriangle
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-300"
                />
                <span className="text-sm leading-7 text-slate-300 sm:text-[15px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}