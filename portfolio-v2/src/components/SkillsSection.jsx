import { useEffect, useRef, useState } from "react";

const SKILLS = [
  {
    category: "Frontend",
    icon: "\uD83C\uDFA8",
    color: "#818cf8",
    items: [
      { name: "React", level: 80 },
      { name: "JavaScript", level: 85 },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "Tailwind CSS", level: 80 },
      //   { name: "TypeScript",   level: 60 },
    ],
  },
  {
    category: "Backend",
    icon: "\u2699\uFE0F",
    color: "#a78bfa",
    items: [
      { name: "Node.js", level: 70 },
      { name: "Express.js", level: 65 },
      { name: "Python", level: 78 },
      { name: "Java", level: 85 },
      { name: "REST APIs", level: 70 },
    ],
  },
  {
    category: "Database",
    icon: "\uD83D\uDDC4\uFE0F",
    color: "#38bdf8",
    items: [
      { name: "MongoDB", level: 70 },
      { name: "MySQL", level: 75 },
      { name: "Postgre", level: 70 },
      { name: "Firebase", level: 60 },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: "\uD83D\uDEE0\uFE0F",
    color: "#34d399",
    items: [
      { name: "Git / GitHub", level: 90 },
      //   { name: "Docker",       level: 65 },
      { name: "Linux / Bash", level: 70 },
      { name: "AWS", level: 60 },
      { name: "Postman", level: 70 },
    ],
  },
];

/* ── Single skill bar ── */
const SkillBar = ({ name, level, color, animate }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          {name}
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, color: color }}>
          {level}%
        </span>
      </div>
      <div
        style={{
          height: 7,
          borderRadius: 999,
          background: "rgba(255,255,255,0.07)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 999,
            background:
              "linear-gradient(90deg, " + color + "99, " + color + ")",
            width: animate ? level + "%" : "0%",
            transition: animate
              ? "width 1s cubic-bezier(0.4,0,0.2,1) 0.15s"
              : "none",
          }}
        />
      </div>
    </div>
  );
};

/* ── Skill card ── */
const SkillCard = ({ skill }) => {
  const [animate, setAnimate] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return function () {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      onMouseEnter={function () {
        setHovered(true);
      }}
      onMouseLeave={function () {
        setHovered(false);
      }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border:
          "1px solid " +
          (hovered ? skill.color + "40" : "rgba(255,255,255,0.07)"),
        borderRadius: 20,
        padding: "28px 24px",
        backdropFilter: "blur(8px)",
        boxShadow: hovered ? "0 0 32px " + skill.color + "18" : "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: skill.color + "18",
            border: "1px solid " + skill.color + "30",
          }}
        >
          {skill.icon}
        </div>
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "Helvetica, Arial, sans-serif",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {skill.category}
          </h3>
          <p
            style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}
          >
            {skill.items.length} skills
          </p>
        </div>
      </div>

      {/* Bars */}
      {skill.items.map(function (item) {
        return (
          <SkillBar
            key={item.name}
            name={item.name}
            level={item.level}
            color={skill.color}
            animate={animate}
          />
        );
      })}
    </div>
  );
};

/* ── Skills Section ── */
const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="section-wrap"
      style={{ padding: "100px 32px" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <h2
            className="section-heading"
            style={{
              color: "#ffffff",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            Skills & Expertise
          </h2>
          <p
            className="section-sub"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            Technologies that I know & work with
          </p>
        </div>

        <div
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}
        >
          {SKILLS.map(function (skill, i) {
            return <SkillCard key={i} skill={skill} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
