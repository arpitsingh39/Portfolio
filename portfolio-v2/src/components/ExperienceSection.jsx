import { useState } from "react";
import { EXPERIENCE } from "../data/constants";

/* ── Experience Section ── */
const ExpCard = ({ exp }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="glow-border"
      style={{
        background: "var(--surface)",
        borderRadius: 18,
        padding: "24px 28px",
        position: "relative",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered
          ? "0 0 40px var(--glow), 0 24px 48px rgba(0,0,0,0.4)"
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          fontSize: 12,
          color: "var(--accent)",
          fontWeight: 600,
          letterSpacing: "0.06em",
          marginBottom: 8,
          textTransform: "uppercase",
        }}
      >
        {exp.period}
      </div>
      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>
        {exp.company}
      </div>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 12,
          color: "var(--text)",
        }}
      >
        {exp.role}
      </h3>
      <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>
        {exp.desc}
      </p>
    </div>
  );
};

const ExperienceSection = () => (
  <section
    id="experience"
    className="section-wrap"
  >
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 70 }}>
        <h2
          className="section-heading"
          style={{
            color: "#ffffff",
            fontFamily: "Helvetica, sans-serif, Arial",
          }}
        >
          Experience
        </h2>
        <p
          className="section-sub"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontFamily: "Helvetica, sans-serif, Arial",
          }}
        >
          My professional journey so far
        </p>
      </div>
      <div style={{ position: "relative" }}>
        <div className="timeline-line" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 60,
            paddingBottom: 20,
          }}
        >
          {EXPERIENCE.map((exp, i) => (
            <div
              key={i}
              className="reveal exp-item"
              style={{
                display: "flex",
                justifyContent:
                  exp.side === "right" ? "flex-start" : "flex-end",
                position: "relative",
              }}
            >
              {/* Dot */}
              <div
                className="timeline-dot"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 24,
                  transform: "translate(-50%,-50%)",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--accent), var(--accent2))",
                  boxShadow: "0 0 16px var(--glow)",
                  zIndex: 2,
                }}
              />

              <div className="exp-card-wrapper">
                <ExpCard exp={exp} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
