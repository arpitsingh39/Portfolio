import { useState, useCallback, memo } from "react";
import htmlLogo from "../assets/html_logo.png";
import cssLogo from "../assets/css_logo.png";
import NodeLogo from "../assets/node_logo.png";
import mysqlLogo from "../assets/mySQL_logo.png";
import postgresqlLogo from "../assets/postgre_logo.png";
import postmanLogo from "../assets/postman_logo.png";

/* ─── Brand Icons ─── */
// Keys must exactly match skill `name` fields in SKILLS_DATA
const ICONS = {
  HTML5: ({ size = 30 }) => (
    <img src={htmlLogo} width={size * 1.5} height={size * 1.5} alt="HTML5" style={STYLES.iconImg} />
  ),

  CSS3: ({ size = 30 }) => (
    <img src={cssLogo} width={size * 1.2} height={size * 1.2} alt="CSS3" style={STYLES.iconImg} />
  ),

  "Tailwind CSS": ({ size = 30 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
      <path d="M9 13.2C9.9 9.6 12.1 7.8 15.6 7.8c5.3 0 5.9 4 8.5 4.6 1.7.4 3.3-.2 4.5-1.8C27.7 14.2 25.5 16 22 16c-5.3 0-5.9-4-8.5-4.6C11.8 11 10.2 11.6 9 13.2z" fill="#38BDF8" />
      <path d="M3 20.4C3.9 16.8 6.1 15 9.6 15c5.3 0 5.9 4 8.5 4.6 1.7.4 3.3-.2 4.5-1.8C21.7 21.4 19.5 23.2 16 23.2c-5.3 0-5.9-4-8.5-4.6C5.8 18.2 4.2 18.8 3 20.4z" fill="#38BDF8" />
    </svg>
  ),

  JavaScript: ({ size = 30 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <rect width="32" height="32" rx="3" fill="#F7DF1E" />
      <text x="3.5" y="26" fontSize="18" fontWeight="900" fill="#000"
        fontFamily="'Arial Black', Arial, Helvetica, sans-serif">JS</text>
    </svg>
  ),

  React: ({ size = 36 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
      <circle cx="16" cy="16" r="3" fill="#61DAFB" />
      <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" />
      <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 16 16)" />
    </svg>
  ),

  "Node.js": () => (
    <img src={NodeLogo} alt="Node.js" style={STYLES.iconFull} />
  ),

  // Fixed: was "express" (lowercase) — must match SKILLS_DATA key "Express"
  //Express: ({ size = 30 }) => (
  // <img src={ExpressLogo} width={size * 1.2} height={size * 1.2} alt="Express" style={STYLES.iconImg} />
 // ),

  "REST APIs": ({ size = 30 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <rect width="32" height="32" rx="6" fill="#0D6EFD" />
      <text x="4" y="14" fontSize="8" fontWeight="800" fill="#fff" fontFamily="monospace">API</text>
      <path d="M4 18h24" stroke="#fff" strokeWidth="1.2" strokeOpacity=".4" />
      <path d="M4 22h14M21 22h7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 26h8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  MongoDB: ({ size = 30 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <path d="M16 2C11.6 2 8.2 7.8 8.2 14.4c0 5.4 2.4 9.6 6.8 11l.8.28V29s.5 1.8 1.2 1.8 1.2-1.8 1.2-1.8v-3.32l.8-.28C23.4 24 25.8 19.8 25.8 14.4 25.8 7.8 20.4 2 16 2z" fill="#4DB33D" />
      <path d="M16 5C14.5 7 13 10.5 13 14.4c0 3.6 1 6.8 3 9" stroke="#3A7B2A" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.55" />
    </svg>
  ),

  MySQL: () => (
    <img src={mysqlLogo} alt="MySQL" style={STYLES.iconFull} />
  ),

  PostgreSQL: ({ size = 30 }) => (
    <img src={postgresqlLogo} alt="PostgreSQL" style={STYLES.iconFull} />
  ),

  Firebase: ({ size = 30 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <path d="M6.2 25.8L11.2 7c.13-.5.82-.54.98-.05l3.7 9.25z" fill="#FFA000" />
      <path d="M6.2 25.8L14 12.8l2.4 3.4z" fill="#F57C00" />
      <path d="M20.4 8.6c.18-.7 1.14-.74 1.36-.06L27 25.8 16 30 6.2 25.8 20.4 8.6z" fill="#FFCA28" />
      <path d="M16 30l11-5.2-3.9-13.8L16 30z" fill="#FFA000" opacity="0.5" />
    </svg>
  ),

  "Git / GitHub": ({ size = 30 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <rect width="32" height="32" rx="16" fill="#24292e" />
      <path fillRule="evenodd" clipRule="evenodd"
        d="M16 4C9.37 4 4 9.37 4 16c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.86.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.57C24.57 25.79 28 21.3 28 16c0-6.63-5.37-12-12-12z"
        fill="#fff" />
    </svg>
  ),

  "Linux / Bash": ({ size = 30 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <rect width="32" height="32" rx="5" fill="#1a1a1a" />
      <path d="M7 10l4 6-4 6" stroke="#4AF626" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 22h11" stroke="#4AF626" strokeWidth="2" strokeLinecap="round" />
      <rect x="24" y="20" width="1.5" height="3" rx=".5" fill="#4AF626">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </rect>
    </svg>
  ),

  AWS: ({ size = 30 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <rect width="32" height="32" rx="5" fill="#232F3E" />
      <text x="16" y="18" fontSize="11" fontWeight="900" fill="#FF9900" textAnchor="middle"
        fontFamily="'Arial Black', Arial, Helvetica, sans-serif">AWS</text>
      <path d="M7 23.5Q16 29 25 23.5" stroke="#FF9900" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M23 22.2L25 23.5L22.5 25.2" stroke="#FF9900" strokeWidth="1.5" fill="none"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  Postman: ({ size = 30 }) => (
    <img src={postmanLogo} alt="Postman" style={STYLES.iconPostman} />
  ),
};

/* ─── Static style constants (defined once, reused across renders) ─── */
const STYLES = {
  iconImg:    { objectFit: "contain" },
  iconFull:   { width: "70%", height: "70%", objectFit: "contain" },
  iconPostman:{ width: "80%", height: "80%", objectFit: "contain" },
};

/* ─── Skill data ─── */
// Single source of truth — no duplicate ALL_SKILLS_ORDERED array needed
const SKILLS_DATA = {
  Frontend: [
    { name: "HTML5",        bg: "#2d1005", accent: "#E44D26" },
    { name: "CSS3",         bg: "#051828", accent: "#1572B6" },
    { name: "Tailwind CSS", bg: "#061e2e", accent: "#38BDF8" },
    { name: "JavaScript",   bg: "#2a2500", accent: "#F7DF1E" },
    { name: "React",        bg: "#061e2e", accent: "#61DAFB" },
  ],
  Backend: [
    { name: "Node.js",   bg: "#091a09", accent: "#3C873A" },
    { name: "Express",   bg: "#111111", accent: "#cccccc" }, // Fixed: was "Express.js" / "express"
    { name: "REST APIs", bg: "#061230", accent: "#4A9EFF" },
  ],
  Database: [
    { name: "MongoDB",    bg: "#071a0c", accent: "#4DB33D" },
    { name: "MySQL",      bg: "#041620", accent: "#00758F" },
    { name: "PostgreSQL", bg: "#081426", accent: "#336791" }, // Fixed: was "Postgre"
    { name: "Firebase",   bg: "#221600", accent: "#FFCA28" },
  ],
  "Tools & Platforms": [
    { name: "Git / GitHub",  bg: "#111111", accent: "#ffffff" },
    { name: "Linux / Bash",  bg: "#080808", accent: "#4AF626" },
    { name: "AWS",           bg: "#1a1000", accent: "#FF9900" },
    { name: "Postman",       bg: "#2a1008", accent: "#FF6C37" },
  ],
};

// Derived from SKILLS_DATA — no need to maintain a separate list
const ALL_SKILLS = Object.values(SKILLS_DATA).flat();

const TABS = ["All Skills", ...Object.keys(SKILLS_DATA)];

const TAB_ICONS = {
  "All Skills": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2"  y="2"  width="9" height="9" rx="1" />
      <rect x="13" y="2"  width="9" height="9" rx="1" />
      <rect x="2"  y="13" width="9" height="9" rx="1" />
      <rect x="13" y="13" width="9" height="9" rx="1" />
    </svg>
  ),
  Frontend: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Backend: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3"  width="20" height="4" rx="1" />
      <rect x="2" y="10" width="20" height="4" rx="1" />
      <rect x="2" y="17" width="20" height="4" rx="1" />
    </svg>
  ),
  Database: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  "Tools & Platforms": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ─── Skill Bubble ─── */
// memo prevents re-renders when parent tab state changes for unchanged bubbles
const SkillBubble = memo(({ skill, index }) => {
  const [hovered, setHovered] = useState(false);
  const IconComp = ICONS[skill.name];

  const bubbleStyle = {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: hovered
      ? `radial-gradient(circle at 38% 32%, ${skill.accent}22, ${skill.bg})`
      : skill.bg,
    border: `1.5px solid ${hovered ? skill.accent + "70" : skill.accent + "28"}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease",
    boxShadow: hovered ? `0 0 28px ${skill.accent}28, 0 0 10px ${skill.accent}14` : "none",
    transform: hovered ? "translateY(-5px) scale(1.07)" : "none",
  };

  const labelStyle = {
    fontSize: 12,
    fontWeight: 500,
    color: hovered ? "#ffffff" : "rgba(255,255,255,0.55)",
    textAlign: "center",
    maxWidth: 86,
    lineHeight: 1.3,
    transition: "color 0.2s ease",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        cursor: "default",
        animation: "fadeUp 0.35s ease both",
        animationDelay: `${index * 0.045}s`,
      }}
    >
      <div style={bubbleStyle}>
        {IconComp
          ? <IconComp size={32} />
          : <span style={{ fontSize: 10, fontWeight: 700, color: skill.accent, textAlign: "center", padding: "0 6px" }}>
              {skill.name}
            </span>
        }
      </div>
      <span style={labelStyle}>{skill.name}</span>
    </div>
  );
});

SkillBubble.displayName = "SkillBubble";

/* ─── Main Section ─── */
const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState("All Skills");

  // Stable reference — won't cause Tab button children to re-render
  const handleTabClick = useCallback((tab) => setActiveTab(tab), []);

  const displayed = activeTab === "All Skills" ? ALL_SKILLS : (SKILLS_DATA[activeTab] ?? []);

  return (
    <section id="skills" className="section-wrap" style={{ background: "transparent" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 className="section-heading" style={{
            fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
            letterSpacing: "-0.5px",
            margin: "0 0 12px",
          }}>
            Skills &amp; Expertise
          </h2>
          <p className="section-sub" style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
            Technologies that I know &amp; work with
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
          {TABS.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "9px 18px", borderRadius: 10,
                  border: `1px solid ${active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"}`,
                  background: active ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.02)",
                  color: active ? "#ffffff" : "rgba(255,255,255,0.42)",
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  cursor: "pointer", transition: "all 0.2s ease",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                <span style={{ opacity: active ? 1 : 0.55 }}>{TAB_ICONS[tab]}</span>
                {tab}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          key={activeTab}
          className="skills-box"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 20,
            padding: "40px 36px",
          }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "30px 12px",
            justifyItems: "center",
          }}>
            {displayed.map((skill, i) => (
              <SkillBubble key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;