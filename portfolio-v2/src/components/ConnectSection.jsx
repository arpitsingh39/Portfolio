import { useState } from "react";
import { GithubIcon, LinkedinIcon } from "./Icons";

const ConnectSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          ...form,
        }).toString(),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="section-wrap"
      style={{ padding: "100px 32px" }}
    >
      {/*
        ── IMPORTANT ──
        Netlify needs a hidden HTML form in your index.html (public/index.html)
        so it can detect the form at build time. Add this inside <body>:

        <form name="contact" netlify netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <textarea name="message"></textarea>
        </form>
      */}

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
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
            Connect With Me
          </h2>
          <p
            className="section-sub"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            Have a project in mind? Let's build something great together.
          </p>
        </div>

        <div
          className="reveal glow-border connect-card-inner"
          style={{
            background: "var(--surface)",
            borderRadius: 24,
            padding: "48px 48px",
          }}
        >
          {/* Social links */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              {
                icon: <GithubIcon size={22} />,
                href: "https://github.com/arpitsingh39",
                label: "GitHub",
              },
              {
                icon: <LinkedinIcon size={22} />,
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
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#3b82f6";
                  e.currentTarget.style.color = "#3b82f6";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.transform = "";
                }}
              >
                {s.icon}
              </a>
            ))}
            <a
              href="mailto:singharpit9872@gmail.com"
              title="Email"
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                textDecoration: "none",
                fontSize: 20,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.transform = "";
              }}
            >
              📧
            </a>
          </div>

          {/* ── Netlify Form ── */}
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            {/* Required hidden inputs for Netlify */}
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />

            <div className="connect-form-row">
              <input
                className="connect-input"
                placeholder="Your Name"
                name="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="connect-input"
                placeholder="Your Email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <textarea
              className="connect-input"
              placeholder="Your message..."
              name="message"
              rows={5}
              required
              style={{ resize: "vertical", marginBottom: 20 }}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            {/* Status messages */}
            {status === "success" && (
              <p
                style={{
                  color: "#4ade80",
                  fontSize: 14,
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                ✅ Message sent! I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p
                style={{
                  color: "#f87171",
                  fontSize: 14,
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                ❌ Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                width: "100%",
                padding: 16,
                fontSize: 16,
                background: status === "sending" ? "#1d4ed8" : "#3b82f6",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                cursor: status === "sending" ? "not-allowed" : "pointer",
                transition: "opacity 0.2s, transform 0.2s",
                letterSpacing: "0.02em",
                opacity: status === "sending" ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (status !== "sending") {
                  e.currentTarget.style.opacity = "0.88";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "";
              }}
            >
              {status === "sending" ? "Sending..." : "Send Message ✉️"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
