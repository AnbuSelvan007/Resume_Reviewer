import ATSCard from "./results/ATSCard";
import SkillsSection from "./results/SkillsSection";
import StrengthsSection from "./results/StrengthsSection";
import SuggestionsSection from "./results/SuggestionsSection";
import ProjectsSection from "./results/ProjectsSection";

export default function ReviewResult({ analysis }) {
 
  console.log({
  ATSCard,
  SkillsSection,
  StrengthsSection,
  SuggestionsSection,
  ProjectsSection,
});
 if (!analysis) return null;

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      <ATSCard score={analysis.atsScore} />

      <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#10131a]/95 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="p-6 sm:p-8 md:p-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-indigo-300" />
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Resume Summary
            </h2>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 sm:p-6">
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              {analysis.summary}
            </p>
          </div>
        </div>
      </section>

      <SkillsSection
        skillsFound={analysis.skillsFound}
        missingSkills={analysis.missingSkills}
      />

      <StrengthsSection
        strengths={analysis.strengths}
        weaknesses={analysis.weaknesses}
      />

      <SuggestionsSection suggestions={analysis.suggestions} />

      <ProjectsSection projects={analysis.recommendedProjects} />
    </div>
  );
}