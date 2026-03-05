import { PROJECTS } from "../data/constants";
import { GithubIcon } from "./Icons";

const ProjectsSection = () => (
  <section id="projects" className="section-wrap" style={{ padding: "100px 32px"}}>
    <div style={{ maxWidth: 1200, margin: "0 auto"}}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
        <h2 className="section-heading" style={{color:"#ffffff", fontFamily: "Helvetica, sans-serif, Arial" }}>Featured Projects</h2>
        <p className="section-sub" style={{color: "rgba(255,255,255,0.5)", fontFamily: "Helvetica, sans-serif, Arial" }}>Things that I've built so far</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28 }}>
        {PROJECTS.map((p, i) => (
          <div key={i} className="proj-card glow-border reveal" style={{
            background: "var(--surface)", borderRadius: 20, padding: "28px 28px 24px",
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `hsl(${p.color}, 70%, 55%)`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
              }}>
                {p.icon}
              </div>
              {p.status && (
                <span style={{
                  fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 999,
                  background: "rgba(56,189,248,0.12)", color: "var(--accent)",
                  border: "1px solid rgba(56,189,248,0.3)",
                }}>
                  {p.status}
                </span>
              )}
            </div>

            <h3 style={{ fontSize: 19, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>
              {p.title}
            </h3>

            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.75, flex: 1 }}>
              {p.desc}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6,
                  background: "rgba(129,140,248,0.12)", color: "rgba(129,140,248,0.9)",
                  border: "1px solid rgba(129,140,248,0.25)",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <a href={p.gh} target="_blank" rel="noopener noreferrer"
                className="btn-ghost" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "center" }}>
                <GithubIcon size={16} /> GitHub
              </a>
              <a href={p.demo}
                className="btn-accent" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "center",
                  opacity: p.demo === "#" ? 0.45 : 1, pointerEvents: p.demo === "#" ? "none" : "auto" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;