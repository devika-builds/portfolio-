import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Heritage Silver
   ═══════════════════════════════════════════════════════════════ */
const COLORS = {
  bg: "#E4EAF0",
  card: "#FAFBFD",
  text: "#2A3547",
  textDim: "#566175",
  accent: "#6B7FAB",
  critical: "#8C5E7F",
  sage: "#B5C3DA",
  slateBlue: "#C4CDE3",
  border: "rgba(42, 53, 71, 0.14)",
  borderHover: "rgba(42, 53, 71, 0.25)",
};

const FONT =
  "'Inter', 'Geist', ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const MONO =
  "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', ui-monospace, monospace";

/* ═══════════════════════════════════════════════════════════════
   DEPLOY URLS — Update these once projects are on Vercel
   ═══════════════════════════════════════════════════════════════ */
const DEPLOY_URLS = {
  "ea-control-center": "https://ea-control-center.vercel.app",
  "zapier-visualizer": "https://zapier-visualizer.vercel.app",
  "schedule-conflict-resolver": "https://scheduleconflictresolver.vercel.app",
  "ops-analytics-dashboard": "https://ops-analytics-dashboard.vercel.app",
  "ea-template-library": "https://ea-template-library.vercel.app",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "ea-control-center",
    title: "EA Control Center",
    tagline: "The command hub for executive support",
    description:
      "A unified operations dashboard combining calendar management, inbox triage, task tracking, and stakeholder communication into one interface. Demonstrates how an EA turns scattered tools into a single nerve center.",
    tags: ["React", "Dashboard", "Real-time"],
    stats: ["4 modules", "Live data", "Keyboard nav"],
    color: COLORS.accent,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="10" height="10" rx="2.5" fill="#6B7FAB" />
        <rect x="15" y="3" width="10" height="10" rx="2.5" fill="#B5C3DA" />
        <rect x="3" y="15" width="10" height="10" rx="2.5" fill="#B5C3DA" />
        <rect x="15" y="15" width="10" height="10" rx="2.5" fill="#8C5E7F" />
      </svg>
    ),
  },
  {
    id: "zapier-visualizer",
    title: "Zapier Workflow Visualizer",
    tagline: "Automation logic, made visible",
    description:
      "Four production Zapier workflows rendered as interactive SVG diagrams. Each node reveals trigger conditions, app connections, data mapping, and time saved. Built to show that automation isn't a black box — it's a system I designed.",
    tags: ["React", "SVG", "Zapier"],
    stats: ["13+ hrs saved/wk", "4 workflows", "24 steps"],
    color: "#FF4F00",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L25 14L14 25L3 14Z" stroke="#FF4F00" strokeWidth="2" fill="none" />
        <circle cx="14" cy="14" r="3" fill="#FF4F00" />
      </svg>
    ),
  },
  {
    id: "schedule-conflict-resolver",
    title: "Schedule Conflict Resolver",
    tagline: "Calendar chaos, sorted in seconds",
    description:
      "An intelligent scheduling tool that detects overlapping meetings, suggests resolutions based on priority and attendee availability, and shows the before/after calendar side by side. The kind of problem an EA solves ten times a day — now systematized.",
    tags: ["React", "Algorithm", "Calendar"],
    stats: ["Conflict detection", "Priority scoring", "Side-by-side view"],
    color: "#2D8B6F",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="18" rx="3" stroke="#2D8B6F" strokeWidth="2" fill="none" />
        <line x1="4" y1="12" x2="24" y2="12" stroke="#2D8B6F" strokeWidth="2" />
        <line x1="10" y1="6" x2="10" y2="4" stroke="#2D8B6F" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="6" x2="18" y2="4" stroke="#2D8B6F" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 17L13 20L19 15" stroke="#2D8B6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "ops-analytics-dashboard",
    title: "Operations Analytics Dashboard",
    tagline: "Operational performance, quantified",
    description:
      "A four-tab analytics dashboard tracking email throughput, task completion, calendar utilization, and time allocation. Includes a pattern-detection engine that surfaces anomalies and trends — turning raw admin data into executive-ready insights.",
    tags: ["React", "Recharts", "Analytics"],
    stats: ["4 metric tabs", "Insight engine", "Week-over-week"],
    color: "#4A6FA5",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="16" width="4" height="8" rx="1" fill="#4A6FA5" />
        <rect x="10" y="11" width="4" height="13" rx="1" fill="#6B7FAB" />
        <rect x="16" y="7" width="4" height="17" rx="1" fill="#4A6FA5" />
        <rect x="22" y="4" width="4" height="20" rx="1" fill="#6B7FAB" />
      </svg>
    ),
  },
  {
    id: "ea-template-library",
    title: "EA Template Library",
    tagline: "An EA's operating system, templated",
    description:
      "A browsable, searchable library of 25 ready-to-use templates across travel, meetings, expenses, onboarding, and communications. Each template includes context metadata — when to use, send timing, audience — and copies to clipboard in one click.",
    tags: ["React", "Clipboard API", "Search"],
    stats: ["25 templates", "5 categories", "1-click copy"],
    color: COLORS.critical,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="3" width="14" height="18" rx="2" stroke="#8C5E7F" strokeWidth="2" fill="none" />
        <rect x="9" y="7" width="14" height="18" rx="2" fill="#8C5E7F" opacity="0.15" stroke="#8C5E7F" strokeWidth="2" />
        <line x1="13" y1="13" x2="19" y2="13" stroke="#8C5E7F" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="17" x2="17" y2="17" stroke="#8C5E7F" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const TOOLS = [
  { name: "Google Workspace", color: "#4285F4", letter: "G", shape: "google" },
  { name: "Microsoft 365", color: "#D83B01", letter: "M", shape: "microsoft" },
  { name: "Slack", color: "#4A154B", letter: "S", shape: "slack" },
  { name: "Zoom", color: "#2D8CFF", letter: "Z", shape: "zoom" },
  { name: "Microsoft Teams", color: "#6264A7", letter: "T", shape: "teams" },
  { name: "Asana", color: "#F06A6A", letter: "A", shape: "asana" },
  { name: "Trello", color: "#0079BF", letter: "T", shape: "trello" },
  { name: "HubSpot", color: "#FF7A59", letter: "H", shape: "hubspot" },
  { name: "Zapier", color: "#FF4F00", letter: "Z", shape: "zapier" },
  { name: "Google Sheets", color: "#0F9D58", letter: "S", shape: "sheets" },
  { name: "Excel", color: "#217346", letter: "X", shape: "excel" },
  { name: "Google Drive", color: "#F4B400", letter: "D", shape: "drive" },
  { name: "Dropbox", color: "#0061FF", letter: "D", shape: "dropbox" },
  { name: "OneDrive", color: "#0078D4", letter: "O", shape: "onedrive" },
  { name: "Hubstaff", color: "#3CB371", letter: "H", shape: "hubstaff" },
];

const CERTS = [
  { name: "EFSET English — C2 Proficiency", issuer: "EF Standard English Test", color: "#1A73E8" },
  { name: "Google Workspace Essentials", issuer: "Google", color: "#4285F4" },
  { name: "Google Prompting Essentials", issuer: "Google", color: "#34A853" },
  { name: "Business Analysis & Process Mgmt", issuer: "Professional Development", color: "#6B7FAB" },
  { name: "Trello Essential Training", issuer: "LinkedIn Learning", color: "#0079BF" },
  { name: "Project Mgmt Foundations: Schedules", issuer: "LinkedIn Learning", color: "#0A66C2" },
];

const ACHIEVEMENTS = [
  { value: 99.8, suffix: "%", label: "Accuracy Rate", sub: "400+ monthly loan audits" },
  { value: 15, suffix: "%", label: "Efficiency Gain", sub: "CRM optimization" },
  { value: 100, suffix: "%", label: "Deadline Completion", sub: "Team operations" },
  { value: 5, suffix: "+", label: "Years Experience", sub: "Banking & remote ops" },
];

const PILLARS = [
  {
    title: "Executive Support",
    desc: "Calendar orchestration, inbox management, stakeholder communication, travel logistics, and the judgment calls that keep executives focused on strategy.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Operations Engineering",
    desc: "Process optimization, CRM systems, compliance workflows, document management, and building the infrastructure that makes teams run at peak throughput.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    title: "AI & Automation",
    desc: "Zapier workflows, AI-powered tooling, custom integrations, and the mindset that every repetitive task is a candidate for elimination.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ═══════════════════════════════════════════════════════════════
   SMALL REUSABLE COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix = "", duration = 1800, inView }) {
  const [count, setCount] = useState(0);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setCount(target);
      return;
    }
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.round(start * 10) / 10);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration, reducedMotion]);
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function SectionKicker({ children }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 2.5,
        textTransform: "uppercase",
        color: COLORS.accent,
        fontFamily: MONO,
      }}
    >
      {children}
    </span>
  );
}

function ToolIcon({ tool }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: tool.color + "12",
          border: `1px solid ${tool.color}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 700,
          color: tool.color,
          fontFamily: FONT,
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = tool.color + "20";
          e.currentTarget.style.borderColor = tool.color + "45";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = tool.color + "12";
          e.currentTarget.style.borderColor = tool.color + "25";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {tool.letter}
      </div>
      <span
        style={{
          fontSize: 11,
          color: COLORS.textDim,
          fontFamily: FONT,
          fontWeight: 500,
          textAlign: "center",
          lineHeight: 1.3,
          maxWidth: 72,
        }}
      >
        {tool.name}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const linkStyle = {
    background: "none",
    border: "none",
    color: COLORS.textDim,
    fontSize: 13,
    fontWeight: 500,
    fontFamily: FONT,
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: 8,
    transition: "color 0.2s",
  };

  return (
    <nav
      className="pf-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "10px 24px" : "16px 24px",
        background: scrolled
          ? "rgba(228, 234, 240, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "1px solid transparent",
        transition: "all 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 0,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.critical})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: FONT,
            }}
          >
            DR
          </div>
          <span
            className="pf-nav-name"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.text,
              fontFamily: FONT,
              letterSpacing: "-0.01em",
            }}
          >
            Devika Ramkaran
          </span>
        </button>

        <div className="pf-nav-links" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <button style={linkStyle} onClick={() => scrollTo("about")}>About</button>
          <button style={linkStyle} onClick={() => scrollTo("work")}>Work</button>
          <button style={linkStyle} onClick={() => scrollTo("tools")}>Tools</button>
          <button style={linkStyle} onClick={() => scrollTo("certs")}>Certs</button>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              ...linkStyle,
              background: COLORS.accent,
              color: "#fff",
              padding: "8px 18px",
              borderRadius: 10,
              fontWeight: 600,
              marginLeft: 8,
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          backgroundImage: `radial-gradient(circle, ${COLORS.sage} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 720 }}>
        <div
          className="pf-hero-badge"
          style={{
            display: "inline-block",
            padding: "6px 18px",
            borderRadius: 50,
            border: `1px solid ${COLORS.border}`,
            background: COLORS.card,
            fontSize: 12,
            fontWeight: 600,
            fontFamily: MONO,
            color: COLORS.accent,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Executive Assistant & Operations Specialist
        </div>

        <h1
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: "clamp(36px, 5.5vw, 60px)",
            lineHeight: 1.12,
            color: COLORS.text,
            margin: "0 0 12px",
            letterSpacing: "-0.025em",
          }}
        >
          I don't just manage operations.
        </h1>
        <h1
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: "clamp(36px, 5.5vw, 60px)",
            lineHeight: 1.12,
            margin: "0 0 28px",
            letterSpacing: "-0.025em",
            color: COLORS.accent,
          }}
        >
          I engineer them.
        </h1>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.75,
            color: COLORS.textDim,
            fontFamily: FONT,
            maxWidth: 560,
            margin: "0 auto 40px",
          }}
        >
          5+ years turning high-stakes banking operations into streamlined digital
          systems. I build the tools, workflows, and automations that let
          executives focus on strategy — not logistics.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() =>
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "14px 32px",
              borderRadius: 12,
              border: "none",
              background: COLORS.text,
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONT,
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: "0 2px 12px rgba(42,53,71,0.18)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(42,53,71,0.25)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 12px rgba(42,53,71,0.18)";
            }}
          >
            View my work
          </button>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "14px 32px",
              borderRadius: 12,
              border: `1.5px solid ${COLORS.border}`,
              background: COLORS.card,
              color: COLORS.text,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONT,
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = COLORS.accent;
              e.target.style.color = COLORS.accent;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = COLORS.border;
              e.target.style.color = COLORS.text;
            }}
          >
            Get in touch
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STATS BAND
   ═══════════════════════════════════════════════════════════════ */
function StatsBand() {
  const [ref, inView] = useInView(0.3);
  return (
    <section
      ref={ref}
      style={{
        padding: "48px 24px",
        background: COLORS.card,
        borderTop: `1px solid ${COLORS.border}`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        className="pf-stats-grid"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
          textAlign: "center",
        }}
      >
        {ACHIEVEMENTS.map((a) => (
          <div key={a.label}>
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                fontFamily: FONT,
                color: COLORS.text,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              <AnimatedCounter target={a.value} suffix={a.suffix} inView={inView} />
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.text,
                marginTop: 6,
                fontFamily: FONT,
              }}
            >
              {a.label}
            </div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.textDim,
                marginTop: 2,
                fontFamily: FONT,
              }}
            >
              {a.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════════ */
function About() {
  const [ref, inView] = useInView(0.15);
  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "96px 24px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <SectionKicker>About</SectionKicker>
        <h2
          style={{
            fontSize: "clamp(26px, 3.5vw, 38px)",
            fontWeight: 700,
            color: COLORS.text,
            fontFamily: FONT,
            margin: "12px 0 20px",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          From banking operations to building the future
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: COLORS.textDim,
            fontFamily: FONT,
            maxWidth: 660,
            marginBottom: 56,
          }}
        >
          I started in traditional banking — audits, compliance, loan processing at
          99.8% accuracy. But I realized the real opportunity wasn't in doing more; it was
          in building systems that do it smarter. Now I combine deep operations expertise
          with modern automation and AI to help teams operate at peak efficiency.
        </p>
      </div>

      <div
        className="pf-pillar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {PILLARS.map((p, i) => (
          <div
            key={p.title}
            style={{
              background: COLORS.card,
              borderRadius: 16,
              padding: "32px 28px",
              border: `1px solid ${COLORS.border}`,
              transition: "all 0.35s ease",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${0.15 + i * 0.12}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.borderHover;
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(42, 53, 71, 0.08)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.border;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${COLORS.accent}12`,
                border: `1px solid ${COLORS.accent}25`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLORS.accent,
                marginBottom: 20,
              }}
            >
              {p.icon}
            </div>
            <h3
              style={{
                fontSize: 17,
                fontWeight: 650,
                color: COLORS.text,
                fontFamily: FONT,
                margin: "0 0 10px",
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: COLORS.textDim,
                fontFamily: FONT,
                margin: 0,
              }}
            >
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT SHOWCASE — tabbed iframe viewer
   ═══════════════════════════════════════════════════════════════ */
function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView(0.1);
  const project = PROJECTS[active];
  const url = DEPLOY_URLS[project.id];

  return (
    <section
      id="work"
      ref={ref}
      style={{ padding: "96px 24px", maxWidth: 1100, margin: "0 auto" }}
    >
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <SectionKicker>Portfolio</SectionKicker>
        <h2
          style={{
            fontSize: "clamp(26px, 3.5vw, 38px)",
            fontWeight: 700,
            color: COLORS.text,
            fontFamily: FONT,
            margin: "12px 0 40px",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Built to show, not just tell
        </h2>
      </div>

      {/* Project tabs */}
      <div
        className="pf-project-tabs"
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 24,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 12,
              border: `1.5px solid ${active === i ? p.color + "50" : COLORS.border}`,
              background: active === i ? p.color + "0A" : COLORS.card,
              color: active === i ? p.color : COLORS.textDim,
              fontSize: 13,
              fontWeight: active === i ? 650 : 500,
              fontFamily: FONT,
              cursor: "pointer",
              transition: "all 0.25s ease",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {p.icon}
            <span className="pf-tab-label">{p.title}</span>
          </button>
        ))}
      </div>

      {/* Info bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div style={{ flex: 1, minWidth: 260 }}>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.text,
              fontFamily: FONT,
              margin: "0 0 4px",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: 13,
              color: project.color,
              fontFamily: FONT,
              fontWeight: 600,
              margin: "0 0 10px",
            }}
          >
            {project.tagline}
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: COLORS.textDim,
              fontFamily: FONT,
              margin: 0,
              maxWidth: 520,
            }}
          >
            {project.description}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {project.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: MONO,
                  padding: "4px 10px",
                  borderRadius: 6,
                  background: project.color + "10",
                  color: project.color,
                  letterSpacing: 0.5,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {project.stats.map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 11,
                  fontFamily: FONT,
                  fontWeight: 500,
                  padding: "4px 10px",
                  borderRadius: 6,
                  background: COLORS.bg,
                  color: COLORS.textDim,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Iframe viewer */}
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${COLORS.border}`,
          background: COLORS.card,
          boxShadow: "0 8px 40px rgba(42, 53, 71, 0.08)",
        }}
      >
        {/* Faux browser chrome */}
        <div
          style={{
            padding: "10px 16px",
            background: COLORS.bg,
            borderBottom: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF605C" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD44" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00CA4E" }} />
          </div>
          <div
            style={{
              flex: 1,
              background: COLORS.card,
              borderRadius: 8,
              padding: "6px 14px",
              fontSize: 12,
              fontFamily: MONO,
              color: COLORS.textDim,
              border: `1px solid ${COLORS.border}`,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {url || `${project.id}.vercel.app`}
          </div>
        </div>

        {/* Content area */}
        {url ? (
          <iframe
            src={url}
            title={project.title}
            style={{
              width: "100%",
              height: 600,
              border: "none",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              height: 500,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              padding: 40,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: project.color + "12",
                border: `1px solid ${project.color}25`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {project.icon}
            </div>
            <h4
              style={{
                fontSize: 18,
                fontWeight: 650,
                color: COLORS.text,
                fontFamily: FONT,
                margin: 0,
              }}
            >
              {project.title}
            </h4>
            <p
              style={{
                fontSize: 14,
                color: COLORS.textDim,
                fontFamily: FONT,
                textAlign: "center",
                maxWidth: 380,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Deploy this project to Vercel and add the URL to the{" "}
              <code
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  background: COLORS.bg,
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                DEPLOY_URLS
              </code>{" "}
              config at the top of App.jsx to see the live demo here.
            </p>
            <div
              style={{
                display: "flex",
                gap: 6,
                marginTop: 8,
              }}
            >
              {project.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 11,
                    fontFamily: MONO,
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: project.color + "10",
                    color: project.color,
                    fontWeight: 600,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TOOLS GRID
   ═══════════════════════════════════════════════════════════════ */
function ToolsSection() {
  const [ref, inView] = useInView(0.15);
  return (
    <section
      id="tools"
      ref={ref}
      style={{
        padding: "96px 24px",
        background: COLORS.card,
        borderTop: `1px solid ${COLORS.border}`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <SectionKicker>Tools & Software</SectionKicker>
          <h2
            style={{
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: 700,
              color: COLORS.text,
              fontFamily: FONT,
              margin: "12px 0 16px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            The stack I work with daily
          </h2>
          <p
            style={{
              fontSize: 15,
              color: COLORS.textDim,
              fontFamily: FONT,
              marginBottom: 48,
              maxWidth: 520,
              lineHeight: 1.7,
            }}
          >
            Proficient across productivity suites, project management, CRM platforms,
            automation tools, and communication software.
          </p>
        </div>

        <div
          className="pf-tools-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
            gap: 24,
            justifyItems: "center",
          }}
        >
          {TOOLS.map((t, i) => (
            <div
              key={t.name}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.5s ease",
                transitionDelay: `${0.05 * i}s`,
              }}
            >
              <ToolIcon tool={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATIONS
   ═══════════════════════════════════════════════════════════════ */
function CertsSection() {
  const [ref, inView] = useInView(0.15);
  return (
    <section
      id="certs"
      ref={ref}
      style={{ padding: "96px 24px", maxWidth: 1100, margin: "0 auto" }}
    >
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <SectionKicker>Certifications</SectionKicker>
        <h2
          style={{
            fontSize: "clamp(26px, 3.5vw, 38px)",
            fontWeight: 700,
            color: COLORS.text,
            fontFamily: FONT,
            margin: "12px 0 40px",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Validated skills
        </h2>
      </div>

      <div
        className="pf-certs-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}
      >
        {CERTS.map((c, i) => (
          <div
            key={c.name}
            style={{
              background: COLORS.card,
              borderRadius: 14,
              padding: "22px 24px",
              border: `1px solid ${COLORS.border}`,
              display: "flex",
              alignItems: "center",
              gap: 16,
              transition: "all 0.3s ease",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transitionDelay: `${0.08 * i}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = c.color + "40";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(42, 53, 71, 0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.border;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 11,
                background: c.color + "12",
                border: `1px solid ${c.color}25`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 2L12.09 7.26L18 8.27L13.8 12.14L14.94 18L10 15.27L5.06 18L6.2 12.14L2 8.27L7.91 7.26L10 2Z"
                  fill={c.color}
                  opacity="0.85"
                />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 620,
                  color: COLORS.text,
                  fontFamily: FONT,
                  lineHeight: 1.3,
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.textDim,
                  fontFamily: FONT,
                  marginTop: 2,
                }}
              >
                {c.issuer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE TIMELINE
   ═══════════════════════════════════════════════════════════════ */
function ExperienceSection() {
  const [ref, inView] = useInView(0.1);

  const roles = [
    {
      title: "AI Data Trainer",
      company: "Invisible Technologies",
      period: "2024",
      type: "Remote",
      highlights: [
        "Reviewed and organized large datasets following strict client guidelines",
        "Collaborated with distributed teams using Slack, Microsoft Teams, and Zoom",
        "Managed multiple assignments while meeting strict deadlines",
      ],
    },
    {
      title: "Loans Supervisor (Acting)",
      company: "First Citizens Bank",
      period: "2023",
      type: "On-site",
      highlights: [
        "Coordinated workloads for 8-10 staff members with 100% deadline completion",
        "Prepared weekly performance metrics for senior management",
        "Implemented workflow improvements to increase administrative efficiency",
      ],
    },
    {
      title: "Loans Administration Officer",
      company: "First Citizens Bank",
      period: "2021 – 2024",
      type: "On-site",
      highlights: [
        "Audited 400+ loan packets monthly with 99.8% accuracy",
        "Streamlined CRM record-keeping, reducing retrieval time by 15%",
        "Zero security or confidentiality breaches handling sensitive data",
      ],
    },
    {
      title: "Teller & Administrative Support",
      company: "First Citizens Bank",
      period: "2018 – 2021",
      type: "On-site",
      highlights: [
        "100% internal audit pass rate for account documentation",
        "Maintained accurate financial and transaction records",
      ],
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: "96px 24px",
        background: COLORS.card,
        borderTop: `1px solid ${COLORS.border}`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <SectionKicker>Experience</SectionKicker>
          <h2
            style={{
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: 700,
              color: COLORS.text,
              fontFamily: FONT,
              margin: "12px 0 48px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Where I've built these skills
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          {/* timeline line */}
          <div
            style={{
              position: "absolute",
              left: 15,
              top: 8,
              bottom: 8,
              width: 2,
              background: COLORS.slateBlue,
              borderRadius: 1,
            }}
          />

          {roles.map((r, i) => (
            <div
              key={r.title + r.period}
              style={{
                display: "flex",
                gap: 24,
                marginBottom: i < roles.length - 1 ? 36 : 0,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.6s ease",
                transitionDelay: `${0.1 * i}s`,
              }}
            >
              {/* dot */}
              <div
                style={{
                  width: 32,
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 4,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: i === 0 ? COLORS.accent : COLORS.sage,
                    border: `2px solid ${COLORS.card}`,
                    boxShadow: `0 0 0 2px ${i === 0 ? COLORS.accent : COLORS.sage}`,
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>

              {/* content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 4,
                  }}
                >
                  <h4
                    style={{
                      fontSize: 16,
                      fontWeight: 650,
                      color: COLORS.text,
                      fontFamily: FONT,
                      margin: 0,
                    }}
                  >
                    {r.title}
                  </h4>
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: MONO,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 5,
                      background:
                        r.type === "Remote"
                          ? COLORS.accent + "12"
                          : COLORS.sage + "50",
                      color:
                        r.type === "Remote" ? COLORS.accent : COLORS.textDim,
                    }}
                  >
                    {r.type}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: COLORS.textDim,
                    fontFamily: FONT,
                    marginBottom: 10,
                  }}
                >
                  {r.company} &middot; {r.period}
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 16,
                    listStyle: "none",
                  }}
                >
                  {r.highlights.map((h, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 13,
                        lineHeight: 1.65,
                        color: COLORS.textDim,
                        fontFamily: FONT,
                        marginBottom: 4,
                        position: "relative",
                        paddingLeft: 12,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 8,
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: COLORS.sage,
                        }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT / CTA
   ═══════════════════════════════════════════════════════════════ */
function Contact() {
  const [ref, inView] = useInView(0.2);
  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "96px 24px 120px",
        maxWidth: 1100,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <SectionKicker>Let's connect</SectionKicker>
        <h2
          style={{
            fontSize: "clamp(26px, 3.5vw, 38px)",
            fontWeight: 700,
            color: COLORS.text,
            fontFamily: FONT,
            margin: "12px 0 16px",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Ready when you are
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: COLORS.textDim,
            fontFamily: FONT,
            maxWidth: 480,
            margin: "0 auto 40px",
          }}
        >
          Based in Trinidad & Tobago, available during US business hours
          (EST/CST). High-speed internet, stable home office, and ready to
          start.
        </p>

        <div
          className="pf-contact-grid"
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          {/* Email */}
          <a
            href="mailto:devikaramkaran.ops@gmail.com"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 24px",
              borderRadius: 12,
              border: `1.5px solid ${COLORS.border}`,
              background: COLORS.card,
              color: COLORS.text,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONT,
              transition: "all 0.25s ease",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={COLORS.accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 6L2 7" />
            </svg>
            devikaramkaran.ops@gmail.com
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/devika-ramkaran-b0942b2a9"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 24px",
              borderRadius: 12,
              border: `1.5px solid ${COLORS.border}`,
              background: COLORS.card,
              color: COLORS.text,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONT,
              transition: "all 0.25s ease",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={COLORS.accent}
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>

          {/* Phone */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 24px",
              borderRadius: 12,
              border: `1.5px solid ${COLORS.border}`,
              background: COLORS.card,
              color: COLORS.text,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONT,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={COLORS.accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            (868) 366-6017
          </div>
        </div>

        <p
          style={{
            fontSize: 12,
            color: COLORS.sage,
            fontFamily: FONT,
          }}
        >
          Built with React + Vite &middot; Deployed on Vercel
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RESPONSIVE STYLES
   ═══════════════════════════════════════════════════════════════ */
function GlobalStyles() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }
      *, *::before, *::after { box-sizing: border-box; }

      a:focus-visible, button:focus-visible {
        outline: 2px solid ${COLORS.accent};
        outline-offset: 2px;
        border-radius: 6px;
      }

      @media (max-width: 960px) {
        .pf-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .pf-pillar-grid { grid-template-columns: 1fr !important; }
      }

      @media (max-width: 768px) {
        .pf-nav-links { display: none !important; }
        .pf-project-tabs { gap: 6px !important; }
        .pf-tab-label { display: none; }
        .pf-contact-grid { flex-direction: column !important; align-items: center !important; }
        .pf-certs-grid { grid-template-columns: 1fr !important; }
      }

      @media (max-width: 640px) {
        .pf-stats-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        .pf-tools-grid { grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)) !important; gap: 16px !important; }
        .pf-nav-name { display: none; }
      }

      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
      }
    `}</style>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: FONT,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <GlobalStyles />
      <Nav />
      <Hero />
      <StatsBand />
      <About />
      <ProjectShowcase />
      <ToolsSection />
      <CertsSection />
      <ExperienceSection />
      <Contact />
    </div>
  );
}
