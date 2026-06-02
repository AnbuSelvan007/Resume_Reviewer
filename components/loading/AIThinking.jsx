"use client";
import { useState, useEffect } from "react";

const STEPS = [
  { icon: "📄", label: "Reading your resume",        duration: 1200 },
  { icon: "🔍", label: "Parsing text and structure",  duration: 1400 },
  { icon: "⚡", label: "Analyzing ATS compatibility",  duration: 1600 },
  { icon: "🧠", label: "Running AI skill analysis",   duration: 2000 },
  { icon: "📊", label: "Calculating match scores",    duration: 1200 },
  { icon: "✨", label: "Generating recommendations",  duration: 1000 },
];

const FACTS = [
  "75% of resumes are rejected before a human sees them.",
  "ATS systems scan for keyword density and formatting.",
  "Tailoring your resume per job boosts callbacks by 3×.",
  "Most ATS reject PDFs with graphics or columns.",
  "Action verbs at the start of bullets increase ATS score.",
];

export default function AIThinking({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [progress, setProgress] = useState(0);
  const [factIdx, setFactIdx] = useState(0);

  useEffect(() => {
    let stepIdx = 0;
    const total = STEPS.reduce((s, x) => s + x.duration, 0);
    let elapsed = 0;

    const runStep = () => {
      if (stepIdx >= STEPS.length) {
        setProgress(100);
        setTimeout(() => onComplete?.({ _demo: true }), 600);
        return;
      }
      setCurrentStep(stepIdx);
      const dur = STEPS[stepIdx].duration;
      elapsed += dur;
      setProgress(Math.round((elapsed / total) * 100));

      setTimeout(() => {
        setCompletedSteps((p) => [...p, stepIdx]);
        stepIdx++;
        runStep();
      }, dur);
    };

    runStep();

    const factTimer = setInterval(() => {
      setFactIdx((i) => (i + 1) % FACTS.length);
    }, 3000);

    return () => clearInterval(factTimer);
  }, []);

  return (
    <div style={styles.root}>
      <div style={styles.gridBg} aria-hidden="true" />

      {/* Central orb */}
      <div style={styles.orbWrap} aria-hidden="true">
        <div style={styles.orbRing3} />
        <div style={styles.orbRing2} />
        <div style={styles.orbRing1} />
        <div style={styles.orb}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
      </div>

      <div style={styles.card}>
        {/* Header */}
        <div style={styles.cardHeader}>
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            AI Processing
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>
            {progress}%
          </span>
        </div>

        <h2 style={styles.title}>Analyzing your resume</h2>
        <p style={styles.sub}>Please wait while our AI processes your document</p>

        {/* Progress bar */}
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${progress}%`,
            }}
          />
          {/* Shimmer */}
          <div style={{ ...styles.progressShimmer, left: `${Math.max(0, progress - 8)}%` }} />
        </div>

        {/* Steps */}
        <div style={styles.steps}>
          {STEPS.map((step, i) => {
            const done    = completedSteps.includes(i);
            const active  = currentStep === i && !done;
            return (
              <div key={i} style={{
                ...styles.step,
                opacity: done || active ? 1 : 0.3,
              }}>
                <div style={{
                  ...styles.stepIcon,
                  ...(done   ? styles.stepIconDone   : {}),
                  ...(active ? styles.stepIconActive : {}),
                }}>
                  {done ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : active ? (
                    <div style={styles.stepSpinner} />
                  ) : (
                    <span style={{ fontSize: 11 }}>{i + 1}</span>
                  )}
                </div>
                <span style={{
                  ...styles.stepLabel,
                  color: done ? "var(--text-secondary)" : active ? "var(--text-primary)" : "var(--text-muted)",
                  fontWeight: active ? 600 : 400,
                }}>
                  {step.label}
                </span>
                {done && (
                  <span style={styles.stepCheck}>done</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Fact strip */}
        <div style={styles.factBox}>
          <span style={styles.factIcon}>💡</span>
          <span style={styles.factText} key={factIdx}>
            {FACTS[factIdx]}
          </span>
        </div>
      </div>
    </div>
  );
}

const RING_ANIM = "pulse-ring 2.5s ease-in-out infinite";

const styles = {
  root: {
    minHeight: "100vh",
    background: "var(--bg-base)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: 24,
    gap: 48,
  },
  gridBg: {
    position: "absolute", inset: 0,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
    backgroundSize: "48px 48px",
    maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
    pointerEvents: "none",
  },
  orbWrap: {
    position: "relative",
    width: 120, height: 120,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  orbRing3: {
    position: "absolute", inset: -28,
    borderRadius: "50%",
    border: "1px solid rgba(79,142,247,0.08)",
    animation: RING_ANIM,
    animationDelay: "0.6s",
  },
  orbRing2: {
    position: "absolute", inset: -14,
    borderRadius: "50%",
    border: "1px solid rgba(79,142,247,0.15)",
    animation: RING_ANIM,
    animationDelay: "0.3s",
  },
  orbRing1: {
    position: "absolute", inset: 0,
    borderRadius: "50%",
    border: "1px solid rgba(79,142,247,0.3)",
    animation: RING_ANIM,
  },
  orb: {
    width: 80, height: 80,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(79,142,247,0.15) 0%, rgba(79,142,247,0.05) 100%)",
    border: "1px solid rgba(79,142,247,0.25)",
    display: "flex", alignItems: "center", justifyContent: "center",
    animation: "spin 8s linear infinite",
  },
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-xl)",
    padding: "32px",
    width: "100%",
    maxWidth: 460,
    position: "relative",
    zIndex: 5,
  },
  cardHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 16,
  },
  badge: {
    display: "flex", alignItems: "center", gap: 7,
    padding: "5px 12px",
    background: "rgba(79,142,247,0.1)",
    border: "1px solid rgba(79,142,247,0.2)",
    borderRadius: 20,
    fontSize: 12, fontWeight: 500, color: "#7AAFF9",
  },
  badgeDot: {
    display: "inline-block",
    width: 6, height: 6, borderRadius: "50%",
    background: "#4F8EF7",
    animation: "blink 1.2s ease infinite",
  },
  title: {
    fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px",
    color: "var(--text-primary)", marginBottom: 6,
  },
  sub: {
    fontSize: 13, color: "var(--text-muted)", marginBottom: 24,
  },
  progressTrack: {
    height: 4, borderRadius: 2,
    background: "var(--bg-subtle)",
    overflow: "hidden",
    marginBottom: 28,
    position: "relative",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #4F8EF7, #A78BFA)",
    borderRadius: 2,
    transition: "width 0.6s ease",
    position: "relative",
  },
  progressShimmer: {
    position: "absolute", top: 0,
    width: "8%", height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
    animation: "shimmer 1.5s ease infinite",
    backgroundSize: "200% 100%",
  },
  steps: {
    display: "flex", flexDirection: "column", gap: 10,
    marginBottom: 24,
  },
  step: {
    display: "flex", alignItems: "center", gap: 12,
    transition: "opacity 0.4s ease",
  },
  stepIcon: {
    width: 24, height: 24,
    borderRadius: "50%",
    background: "var(--bg-subtle)",
    border: "1px solid var(--border)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    fontSize: 10,
    color: "var(--text-muted)",
  },
  stepIconDone: {
    background: "rgba(52,211,153,0.1)",
    border: "1px solid rgba(52,211,153,0.3)",
  },
  stepIconActive: {
    background: "rgba(79,142,247,0.1)",
    border: "1px solid rgba(79,142,247,0.3)",
  },
  stepSpinner: {
    width: 12, height: 12, borderRadius: "50%",
    border: "1.5px solid rgba(79,142,247,0.3)",
    borderTopColor: "#4F8EF7",
    animation: "spin 0.7s linear infinite",
  },
  stepLabel: {
    fontSize: 13,
    transition: "all 0.3s ease",
    flex: 1,
  },
  stepCheck: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    color: "#34D399",
    padding: "2px 7px",
    background: "rgba(52,211,153,0.1)",
    borderRadius: 10,
    border: "1px solid rgba(52,211,153,0.2)",
  },
  factBox: {
    display: "flex", alignItems: "flex-start", gap: 10,
    padding: "12px 14px",
    background: "var(--bg-subtle)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border)",
  },
  factIcon: { fontSize: 14, flexShrink: 0, marginTop: 1 },
  factText: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--text-secondary)",
    lineHeight: 1.6,
    letterSpacing: "0.2px",
  },
};