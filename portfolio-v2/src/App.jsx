import { useState } from "react";
import useReveal from "./hooks/useReveal";
import GlobalStyles from "./components/GlobalStyles";
import BeamsBackground from "./components/BeamsBackground";
import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import CertificationsSection from "./components/CertificationsSection";
import ConnectSection from "./components/ConnectSection";
import Footer from "./components/Footer";

/* ── App ── */
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(d => !d);

  useReveal();

  return (
    <div className={isDark ? "" : "light"} style={{ minHeight: "100vh" }}>
      <GlobalStyles />
      <BeamsBackground isDark={isDark} />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <HomeSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <CertificationsSection />
      <ConnectSection />
      <Footer />
    </div>
  );
}
