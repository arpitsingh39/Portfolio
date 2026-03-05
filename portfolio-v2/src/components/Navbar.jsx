import { useState, useEffect, useRef } from "react";
import { DownloadIcon } from "./Icons";
import resumeFile from "../assets/Arpit_Singh_Resume.pdf"; // ✅ ADDED: Import resume file

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [sliderStyle, setSliderStyle] = useState({});

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

  /* Update slider position when active changes */
  useEffect(() => {
    const activeLink = navRef.current?.querySelector(
      `[data-id="${active}"]`
    );

    if (activeLink) {
      setSliderStyle({
        width: activeLink.offsetWidth,
        left: activeLink.offsetLeft,
      });
    }
  }, [active]);

  return (
    <nav
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

        {/* Links */}
        <div
          ref={navRef}
          style={{
            display: "flex",
            gap: 28,
            marginLeft: "auto",
            position: "relative",
          }}
        >
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

        {/* Resume Button */}
        <div style={{ marginLeft: 16 }}>
          <a
            href={resumeFile} // ✅ CHANGED: Link to resume file
            download="Arpit_Singh_Resume.pdf" // ✅ ADDED: Forces download
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
      </div>
    </nav>
  );
};

export default Navbar;