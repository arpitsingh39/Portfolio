import { GithubIcon, LinkedinIcon } from "./Icons";

/* ── Footer ── */
const Footer = () => (
  <footer
    className="section-wrap"
    style={{
      borderTop: "1px solid var(--border)",
      padding: "48px 32px 32px",
      background: "rgba(0,0,0,0.3)",
    }}
  >
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
          marginBottom: 40,
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: "#ffffff",
              letterSpacing: "0.1em",
              marginBottom: 12,
            }}
          >
            Arpit Singh
          </div>
          <p
            style={{
              color: "#ffffff",
              fontSize: 14,
              lineHeight: 1.8,
              maxWidth: 220,
            }}
          >
            A Full Stack Developer creating solutions for real-world problems.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "var(--text)",
              marginBottom: 16,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Quick Links
          </h4>
          {[
            "Home",
            "Projects",
            "Skills",
            "Experience",
            "Certifications",
            "Contact",
          ].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                display: "block",
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: 14,
                marginBottom: 8,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "var(--text)",
              marginBottom: 16,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Contact
          </h4>
          {[
            { label: "📧", text: "singharpit9872@gmail.com" },
            { label: "📍", text: "Mumbai, Maharashtra, India" },
            { label: "💼", text: "Available for hire" },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                color: "var(--muted)",
                fontSize: 14,
                marginBottom: 10,
              }}
            >
              <span>{c.label}</span>
              <span>{c.text}</span>
            </div>
          ))}
        </div>

        {/* Social */}
        <div>
          <h4
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "var(--text)",
              marginBottom: 16,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Follow Me
          </h4>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              {
                icon: <GithubIcon size={18} />,
                href: "https://github.com/arpitsingh39",
                label: "GitHub",
              },
              {
                icon: <LinkedinIcon size={18} />,
                href: "https://www.linkedin.com/in/arpit-singh-dev/",
                label: "LinkedIn",
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                title={s.label}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  color: "#ffffff",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#3b82f6";
                  e.currentTarget.style.borderColor = "#3b82f6";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.transform = "";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "var(--muted)", fontSize: 13 }}>
          © 2026 Arpit Singh. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
