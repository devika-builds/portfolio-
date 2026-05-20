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
  {
    name: "Google Workspace",
    color: "#4285F4",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09A6.68 6.68 0 015.5 12c0-.72.13-1.43.34-2.09V7.07H2.18A11 11 0 001 12c0 1.78.43 3.46 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: "Microsoft 365",
    color: "#D83B01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="1" width="10" height="10" rx="1.5" fill="#F25022"/>
        <rect x="13" y="1" width="10" height="10" rx="1.5" fill="#7FBA00"/>
        <rect x="1" y="13" width="10" height="10" rx="1.5" fill="#00A4EF"/>
        <rect x="13" y="13" width="10" height="10" rx="1.5" fill="#FFB900"/>
      </svg>
    ),
  },
  {
    name: "Slack",
    color: "#4A154B",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313z" fill="#E01E5A"/>
        <path d="M8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312z" fill="#36C5F0"/>
        <path d="M18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.163 0a2.528 2.528 0 012.523 2.522v6.312z" fill="#2EB67D"/>
        <path d="M15.163 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.163 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 01-2.52-2.523 2.527 2.527 0 012.52-2.52h6.315A2.528 2.528 0 0124 15.163a2.528 2.528 0 01-2.522 2.523h-6.315z" fill="#ECB22E"/>
      </svg>
    ),
  },
  {
    name: "Zoom",
    color: "#2D8CFF",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z" fill="#2D8CFF"/>
        <path d="M5.5 8.5a1.5 1.5 0 011.5-1.5h6a1.5 1.5 0 011.5 1.5v5.5a1.5 1.5 0 01-1.5 1.5H7a1.5 1.5 0 01-1.5-1.5V8.5z" fill="#fff"/>
        <path d="M15 10.2l3.5-2.1v7.8L15 13.8V10.2z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: "Microsoft Teams",
    color: "#6264A7",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20.625 6.75h-5.25a.375.375 0 00-.375.375v8.25c0 .207.168.375.375.375h5.25A.375.375 0 0021 15.375v-8.25a.375.375 0 00-.375-.375z" fill="#7B83EB"/>
        <circle cx="18" cy="4.5" r="2.25" fill="#7B83EB"/>
        <path d="M14.25 6H3.75a.75.75 0 00-.75.75V17.25c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75z" fill="#6264A7"/>
        <path d="M11.25 9.75H6.75v1.5h1.5v4.5h1.5v-4.5h1.5v-1.5z" fill="#fff"/>
        <circle cx="22" cy="6" r="2" fill="#5059C9"/>
        <path d="M22 8.5h-3a.5.5 0 00-.5.5v5.5a.5.5 0 00.5.5h3a.5.5 0 00.5-.5V9a.5.5 0 00-.5-.5z" fill="#5059C9"/>
      </svg>
    ),
  },
  {
    name: "Asana",
    color: "#F06A6A",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="6.5" r="4.5" fill="#F06A6A"/>
        <circle cx="5" cy="16.5" r="4.5" fill="#F06A6A"/>
        <circle cx="19" cy="16.5" r="4.5" fill="#F06A6A"/>
      </svg>
    ),
  },
  {
    name: "Trello",
    color: "#0079BF",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="1" width="22" height="22" rx="3" fill="#0079BF"/>
        <rect x="4" y="4" width="6.5" height="14" rx="1.2" fill="#fff"/>
        <rect x="13.5" y="4" width="6.5" height="9" rx="1.2" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: "HubSpot",
    color: "#FF7A59",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17.07 10.29V7.69a2.07 2.07 0 001.18-1.87 2.1 2.1 0 00-4.2 0c0 .82.48 1.53 1.17 1.87v2.6a5.1 5.1 0 00-2.42 1.16L6.13 6.56a2.36 2.36 0 00.12-.73 2.25 2.25 0 10-2.25 2.25c.38 0 .73-.1 1.04-.27l5.58 4.84a5.1 5.1 0 00-.72 2.62 5.15 5.15 0 005.15 5.15 5.15 5.15 0 005.15-5.15 5.13 5.13 0 00-3.13-4.98zm-2.02 7.37a2.4 2.4 0 110-4.8 2.4 2.4 0 010 4.8z" fill="#FF7A59"/>
      </svg>
    ),
  },
  {
    name: "Zapier",
    color: "#FF4F00",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15.357 13.118l4.009-.005.005-2.236-4.01.005 2.836-2.835-1.58-1.579-2.836 2.835.005-4.009h-2.237l.006 4.01-2.836-2.836-1.58 1.58 2.836 2.835-4.01-.005-.005 2.236 4.01-.005-2.836 2.836 1.58 1.58 2.835-2.836-.005 4.01h2.237l-.006-4.01 2.836 2.835 1.58-1.58-2.836-2.835z" fill="#FF4F00"/>
        <circle cx="12" cy="12" r="3" fill="#FF4F00"/>
      </svg>
    ),
  },
  {
    name: "Google Sheets",
    color: "#0F9D58",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14.5 1H5.5A1.5 1.5 0 004 2.5v19A1.5 1.5 0 005.5 23h13a1.5 1.5 0 001.5-1.5V7L14.5 1z" fill="#0F9D58"/>
        <path d="M14.5 1v6H20" fill="#87CEAC"/>
        <path d="M14.5 1L20 7h-5.5V1z" fill="#87CEAC"/>
        <rect x="7" y="11" width="10" height="8" rx="0.5" fill="#fff"/>
        <line x1="7" y1="14" x2="17" y2="14" stroke="#0F9D58" strokeWidth="0.8"/>
        <line x1="7" y1="17" x2="17" y2="17" stroke="#0F9D58" strokeWidth="0.8"/>
        <line x1="11.5" y1="11" x2="11.5" y2="19" stroke="#0F9D58" strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    name: "Excel",
    color: "#217346",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M23 3h-9v18h9a1 1 0 001-1V4a1 1 0 00-1-1z" fill="#217346"/>
        <path d="M14 3H2a1 1 0 00-1 1v16a1 1 0 001 1h12V3z" fill="#33C481" opacity="0.9"/>
        <path d="M4.5 8l3 4-3 4h2.2l1.9-2.9L10.5 16h2.2l-3-4 3-4h-2.2l-1.9 2.9L6.7 8H4.5z" fill="#fff"/>
        <line x1="17" y1="6" x2="22" y2="6" stroke="#fff" strokeWidth="0.8"/>
        <line x1="17" y1="9" x2="22" y2="9" stroke="#fff" strokeWidth="0.8"/>
        <line x1="17" y1="12" x2="22" y2="12" stroke="#fff" strokeWidth="0.8"/>
        <line x1="17" y1="15" x2="22" y2="15" stroke="#fff" strokeWidth="0.8"/>
        <line x1="17" y1="18" x2="22" y2="18" stroke="#fff" strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    name: "Google Drive",
    color: "#F4B400",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8.267 1.5L1.5 13.5h6.767L15 1.5H8.267z" fill="#0F9D58"/>
        <path d="M22.5 13.5H8.267L15 1.5h7.233L22.5 13.5z" fill="#FBBC05" opacity="0.9"/>
        <path d="M1.5 13.5l3.383 6h14.234l3.383-6H1.5z" fill="#4285F4"/>
      </svg>
    ),
  },
  {
    name: "Dropbox",
    color: "#0061FF",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7.124 1.5L1 5.833l5.124 4.334L12 5.833 7.124 1.5z" fill="#0061FF"/>
        <path d="M1 14.5l6.124 4.333L12 14.5 6.124 10.167 1 14.5z" fill="#0061FF"/>
        <path d="M12 14.5l5.124 4.333L23 14.5l-5.876-4.333L12 14.5z" fill="#0061FF"/>
        <path d="M23 5.833L16.876 1.5 12 5.833l5.124 4.334L23 5.833z" fill="#0061FF"/>
        <path d="M12.012 15.565l-4.888 3.268-1.236-.76v.852L12.012 23l6.124-4.075v-.852l-1.236.76-4.888-3.268z" fill="#0061FF"/>
      </svg>
    ),
  },
  {
    name: "OneDrive",
    color: "#0078D4",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9.5 15.5h10a4 4 0 001.5-7.7 5.5 5.5 0 00-10.2-1.3A4.5 4.5 0 005 11a4.5 4.5 0 004.5 4.5z" fill="#0078D4"/>
        <path d="M9.5 15.5h10a4 4 0 001.5-7.7 5.5 5.5 0 00-10.2-1.3" fill="#0364B8"/>
        <path d="M5.5 18h12a3.5 3.5 0 001.3-6.74 4.8 4.8 0 00-8.9-1.14A3.93 3.93 0 005.5 18z" fill="#0078D4"/>
      </svg>
    ),
  },
  {
    name: "Hubstaff",
    color: "#3CB371",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#3CB371" strokeWidth="2.5" fill="none"/>
        <path d="M12 6v6.5l4.5 2.5" stroke="#3CB371" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Claude",
    color: "#D4A27F",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4A27F">
        <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/>
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    color: "#10A37F",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#10A37F">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4091-.6765zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0974-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997z"/>
      </svg>
    ),
  },
  {
    name: "Gemini",
    color: "#8E75B2",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#8E75B2">
        <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68q.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68q-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96q2.19.93 3.81 2.55t2.55 3.81"/>
      </svg>
    ),
  },
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
          background: tool.color + "0A",
          border: `1px solid ${tool.color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = tool.color + "18";
          e.currentTarget.style.borderColor = tool.color + "40";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = tool.color + "0A";
          e.currentTarget.style.borderColor = tool.color + "20";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {tool.icon}
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
  const [openIdx, setOpenIdx] = useState(null);
  const [ref, inView] = useInView(0.1);

  /* lock body scroll when overlay is open */
  useEffect(() => {
    if (openIdx !== null) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [openIdx]);

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

      {/* Project cards grid */}
      <div
        className="pf-project-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {PROJECTS.map((p, i) => {
          const url = DEPLOY_URLS[p.id];
          return (
            <button
              key={p.id}
              onClick={() => url && setOpenIdx(i)}
              style={{
                textAlign: "left",
                padding: 24,
                borderRadius: 16,
                border: `1.5px solid ${COLORS.border}`,
                background: COLORS.card,
                cursor: url ? "pointer" : "default",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 2px 12px rgba(42, 53, 71, 0.04)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
              className="pf-project-card"
              onMouseEnter={(e) => {
                if (url) {
                  e.currentTarget.style.borderColor = p.color + "50";
                  e.currentTarget.style.boxShadow = `0 8px 32px ${p.color}15`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(42, 53, 71, 0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: p.color + "12",
                    border: `1px solid ${p.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.text,
                      fontFamily: FONT,
                      margin: 0,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      color: p.color,
                      fontFamily: FONT,
                      fontWeight: 600,
                      margin: "2px 0 0",
                    }}
                  >
                    {p.tagline}
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: COLORS.textDim,
                  fontFamily: FONT,
                  margin: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {p.description}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      fontFamily: MONO,
                      padding: "3px 8px",
                      borderRadius: 5,
                      background: p.color + "10",
                      color: p.color,
                      letterSpacing: 0.5,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              {url && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: "auto",
                    paddingTop: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: FONT,
                    color: p.color,
                  }}
                >
                  <span>View Live Demo</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Full-screen overlay */}
      {openIdx !== null && (() => {
        const p = PROJECTS[openIdx];
        const url = DEPLOY_URLS[p.id];
        return (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: COLORS.bg,
              display: "flex",
              flexDirection: "column",
              animation: "pf-overlay-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Top bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 20px",
                background: COLORS.card,
                borderBottom: `1px solid ${COLORS.border}`,
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => setOpenIdx(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: 10,
                  border: `1.5px solid ${COLORS.border}`,
                  background: COLORS.bg,
                  color: COLORS.text,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: FONT,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = COLORS.card;
                  e.currentTarget.style.borderColor = COLORS.borderHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = COLORS.bg;
                  e.currentTarget.style.borderColor = COLORS.border;
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Portfolio
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: p.color + "12",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 650,
                    color: COLORS.text,
                    fontFamily: FONT,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.title}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: COLORS.textDim,
                    fontFamily: MONO,
                    marginLeft: 4,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {url}
                </span>
              </div>
              {/* prev / next */}
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                <button
                  onClick={() => setOpenIdx((openIdx - 1 + PROJECTS.length) % PROJECTS.length)}
                  aria-label="Previous project"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.bg,
                    color: COLORS.textDim,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button
                  onClick={() => setOpenIdx((openIdx + 1) % PROJECTS.length)}
                  aria-label="Next project"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.bg,
                    color: COLORS.textDim,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>
            {/* Iframe fills remaining space */}
            <iframe
              src={url}
              title={p.title}
              allow="clipboard-write"
              style={{
                flex: 1,
                width: "100%",
                border: "none",
                display: "block",
              }}
            />
          </div>
        );
      })()}
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 6L2 7" />
            </svg>
            devikaramkaran.ops@gmail.com
          </a>

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
            <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.accent}>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            +1 (868) 780-9465
          </div>
        </div>

        <p
          style={{
            fontSize: 13,
            color: COLORS.textDim,
            fontFamily: MONO,
            marginTop: 48,
            letterSpacing: 0.5,
          }}
        >
          Designed & built with React — Devika Ramkaran © {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
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
        .pf-project-grid { grid-template-columns: 1fr !important; }
        .pf-contact-grid { flex-direction: column !important; align-items: center !important; }
        .pf-certs-grid { grid-template-columns: 1fr !important; }
      }

      @media (max-width: 640px) {
        .pf-stats-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        .pf-tools-grid { grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)) !important; gap: 16px !important; }
        .pf-nav-name { display: none; }
      }

      @keyframes pf-overlay-in {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        * { animation-duration: 0.01ms !important; }
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
