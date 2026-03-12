import ProfileImage from "./ProfileImage";
import { GithubIcon, LinkedinIcon, DownloadIcon } from "./Icons";
import TypingName from "./TypingName";
import TypingRoles from "./TypingRoles";
import resumeFile from "../assets/Arpit_Singh_Resume.pdf";

/* ── Home Section ── */
const HomeSection = () => (
  <section
    id="home"
    className="section-wrap"
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "100px 32px 60px",
    }}
  >
    <div className="home-inner">
      {/* Left */}
      <div style={{ flex: 1, minWidth: 280 }}>
        <div
          className="reveal"
          style={{
            display: "inline-block",
            background: "rgba(56,189,248,0.1)",
            border: "1px solid rgba(56,189,248,0.3)",
            borderRadius: 999,
            padding: "4px 14px",
            fontSize: 16,
            color: "var(--accent)",
            fontWeight: 600,
            marginBottom: 20,
            letterSpacing: "0.04em",
          }}
        >
          👋 Hi, I'm
        </div>

        <TypingName />
        <TypingRoles />

        <div
          className="reveal"
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: 520,
            marginBottom: 40,
          }}
        >
          I’m a 3rd Year Computer Science (Data Science) student passionate
          about building scalable and practical web applications.
          <br />
          Currently focused on Full-Stack Development (MERN) and strengthening
          my DevOps & Cloud fundamentals.
          <br />I enjoy turning ideas into real-world projects that solve
          meaningful problems.
        </div>

        {/* Icon Buttons */}
        <div className="reveal" style={{ display: "flex", gap: 16 }}>
          {[
            {
              icon: <GithubIcon size={24} />,
              href: "https://github.com/arpitsingh39",
              title: "GitHub",
              bg: "#24292f",
              external: true,
            },
            {
              icon: <LinkedinIcon size={24} />,
              href: "https://www.linkedin.com/in/arpit-singh-dev/",
              title: "LinkedIn",
              bg: "#0A66C2",
              external: true,
            },
          ].map((btn, i) => (
            <a
              key={i}
              href={btn.href}
              title={btn.title}
              target={btn.external ? "_blank" : undefined}
              rel={btn.external ? "noopener noreferrer" : undefined}
              download={btn.download ? "Arpit_Singh_Resume.pdf" : undefined}
              style={{
                width: 58,
                height: 58,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                background: btn.gradient
                  ? "linear-gradient(135deg, var(--accent), var(--accent2))"
                  : btn.bg,
                boxShadow: btn.gradient
                  ? "0 8px 32px var(--glow)"
                  : "0 4px 16px rgba(0,0,0,0.3)",
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = btn.gradient
                  ? "0 8px 32px var(--glow)"
                  : "0 4px 16px rgba(0,0,0,0.3)";
              }}
            >
              {btn.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Right */}
      <div
        className="reveal"
        style={{ display: "flex", justifyContent: "center", flex: 1 }}
      >
        <ProfileImage />
      </div>
    </div>
  </section>
);

export default HomeSection;
