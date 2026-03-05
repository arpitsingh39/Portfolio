/* ── Google Fonts injected via style tag ── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

    :root {
      --bg: #020817;
      --surface: #0a1628;
      --surface2: #0f1f3d;
      --border: rgba(56,189,248,0.18);
      --text: #e2e8f0;
      --muted: #94a3b8;
      --accent: #38bdf8;
      --accent2: #818cf8;
      --glow: rgba(56,189,248,0.35);
    }
    .light {
      --bg: #f0f7ff;
      --surface: #ffffff;
      --surface2: #e8f4fd;
      --border: rgba(56,189,248,0.3);
      --text: #0f172a;
      --muted: #475569;
      --accent: #0284c7;
      --accent2: #6366f1;
      --glow: rgba(2,132,199,0.25);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      overflow-x: hidden;
      transition: background 0.4s, color 0.4s;
    }

    h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; }

    /* Beams canvas */
    #beams-canvas {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    .section-wrap {
      position: relative;
      z-index: 1;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }

    /* Fade-in on scroll */
    .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: none; }

    /* Profile vibrate */
    @keyframes vibrate {
      0%,100% { transform: translate(0,0) rotate(0deg); }
      20% { transform: translate(-1px, 1px) rotate(-0.3deg); }
      40% { transform: translate(1px, -1px) rotate(0.3deg); }
      60% { transform: translate(-1px, -1px) rotate(-0.2deg); }
      80% { transform: translate(1px, 1px) rotate(0.2deg); }
    }
    .vibrate { animation: vibrate 2.8s infinite; }

    @keyframes spinCW  { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
    @keyframes spinCCW { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }

    .spin-cw  { animation: spinCW  12s linear infinite; }
    .spin-ccw { animation: spinCCW 18s linear infinite; }

    /* Timeline line */
    .timeline-line {
      position: absolute;
      left: 50%;
      top: 0; bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, var(--accent), var(--accent2));
      transform: translateX(-50%);
    }

    /* Card hover */
    .proj-card {
      transition: transform 0.35s ease, box-shadow 0.35s ease;
    }
    .proj-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 0 40px var(--glow), 0 24px 48px rgba(0,0,0,0.4);
    }

    /* Glow border */
    .glow-border {
      border: 1px solid var(--border);
      box-shadow: 0 0 16px var(--glow);
    }

    .btn-accent {
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 10px 22px;
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.2s;
      letter-spacing: 0.02em;
    }
    .btn-accent:hover { opacity: 0.88; transform: translateY(-1px); }

    .btn-ghost {
      background: transparent;
      color: var(--accent);
      border: 1px solid var(--accent);
      border-radius: 8px;
      padding: 9px 20px;
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, transform 0.2s;
      letter-spacing: 0.02em;
    }
    .btn-ghost:hover { background: var(--accent); color: #fff; transform: translateY(-1px); }

    /* Cert swiper arrows */
    .cert-arrow {
      background: var(--surface2);
      border: 1px solid var(--border);
      color: var(--accent);
      border-radius: 50%;
      width: 44px; height: 44px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      font-size: 20px;
      transition: background 0.2s;
      flex-shrink: 0;
    }
    .cert-arrow:hover { background: var(--accent); color: #fff; }

    /* Skill tag */
    .skill-tag {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 500;
      color: var(--text);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    }
    .skill-tag:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
      box-shadow: 0 4px 16px var(--glow);
    }

    /* Navbar blur */
    .navbar {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: rgba(2,8,23,0.75);
      border-bottom: 1px solid var(--border);
      transition: background 0.4s;
    }
    .light .navbar {
      background: rgba(240,247,255,0.8);
    }

    /* Nav links */
    .nav-link {
      font-family: 'Syne', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: var(--muted);
      text-decoration: none;
      transition: color 0.2s;
      position: relative;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0; right: 0;
      height: 2px;
      background: var(--accent);
      transform: scaleX(0);
      transition: transform 0.2s;
    }
    .nav-link:hover { color: var(--accent); }
    .nav-link:hover::after { transform: scaleX(1); }

    .section-heading {
      font-size: clamp(28px, 5vw, 44px);
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #ffffff;
      margin-bottom: 8px;
    }
    .section-sub {
      color: var(--muted);
      font-size: 16px;
      margin-bottom: 56px;
    }

    /* Connect input */
    .connect-input {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 16px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      color: var(--text);
      width: 100%;
      outline: none;
      transition: border-color 0.2s;
    }
    .connect-input:focus { border-color: var(--accent); }
    .connect-input::placeholder { color: var(--muted); }
  `}</style>
);

export default GlobalStyles;
