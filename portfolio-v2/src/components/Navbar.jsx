import { useState, useEffect, useRef } from "react";
import { DownloadIcon } from "./Icons";
import resumeFile from "../assets/Arpit_Singh_Resume.pdf";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [sliderStyle, setSliderStyle] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);

  const links = [
    "Home",
    "Projects",
    "Skills",
    "Experience",
    "Certifications",
    "Contact",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        "home",
        "projects",
        "skills",
        "experience",
        "certifications",
        "contact",
      ];

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Update slider position when active changes */
  useEffect(() => {
    const activeLink = navRef.current?.querySelector(`[data-id="${active}"]`);

    if (activeLink) {
      setSliderStyle({
        width: activeLink.offsetWidth,
        left: activeLink.offsetLeft,
      });
    }
  }, [active]);

  const handleLinkClick = (sectionId) => {
    setActive(sectionId);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`mobile-nav-overlay${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile slide-down menu */}
      <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
        {links.map((l) => {
          const sectionId = l.toLowerCase();
          return (
            <a
              key={l}
              href={`#${sectionId}`}
              className={active === sectionId ? "active" : ""}
              onClick={() => handleLinkClick(sectionId)}
            >
              {l}
            </a>
          );
        })}
        <a
          href={resumeFile}
          download="Arpit_Singh_Resume.pdf"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#3b82f6",
            borderBottom: "none",
          }}
        >
          <DownloadIcon size={14} /> Resume
        </a>
      </div>

      <nav
        className="navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 32px",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
          transition: "box-shadow 0.3s",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 32,
            height: 68,
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              fontWeight: 800,
              fontSize: 22,
              color: "white",
              letterSpacing: "0.1em",
              textDecoration: "none",
            }}
          >
            Arpit
          </a>

          {/* Desktop Links */}
          <div ref={navRef} className="nav-links-desktop">
            {links.map((l) => {
              const sectionId = l.toLowerCase();
              return (
                <a
                  key={l}
                  href={`#${sectionId}`}
                  data-id={sectionId}
                  onClick={() => setActive(sectionId)}
                  style={{
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    color: active === sectionId ? "#3b82f6" : "white",
                    transition: "color 0.3s",
                    paddingBottom: 6,
                  }}
                >
                  {l}
                </a>
              );
            })}

            {/* Sliding Indicator */}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                height: 3,
                background: "#3b82f6",
                borderRadius: 4,
                transition: "all 0.3s ease",
                ...sliderStyle,
              }}
            />
          </div>

          {/* Resume Button (desktop) */}
          <div style={{ marginLeft: 16 }} className="nav-links-desktop">
            <a
              href={resumeFile}
              download="Arpit_Singh_Resume.pdf"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                padding: "8px 14px",
                borderRadius: 6,
                background: "#3b82f6",
                color: "white",
                fontWeight: 500,
              }}
            >
              <DownloadIcon size={14} /> Resume
            </a>
          </div>

          {/* Hamburger Button (mobile only) */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ marginLeft: "auto" }}
          >
            {menuOpen ? (
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
