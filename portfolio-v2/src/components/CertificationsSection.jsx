import ThreeDCarousel from "./ThreeDCarousel";
import { CERTS } from "../data/constants";

/* ── Import all certificate images ── */
import imgScalerJava from "../assets/SCALER JAVA.png";
import imgScalerNode from "../assets/SCALER NODE.png";
import imgScalerReact from "../assets/SCALER REACT.png";
import imgScalerJs from "../assets/SCALER JAVASCRIPT.png";
import imgMongoDb from "../assets/Mongo - MongoDB.png";
import imgEducativeNode from "../assets/Educative - Node.js.png";
import imgGfgFullstack from "../assets/GFG FULLSTACK.png";
import imgGfgAiTools from "../assets/GFG AI TOOLS.png";
import imgGfgC from "../assets/GFG C.png";
import imgCodedexPython from "../assets/Codedex - Python.png";
import imgSololearn from "../assets/C_SOLOLEARN.png";
import imgCGreatLearning from "../assets/C Great Learning.png";

const CERT_IMAGES = {
  "SCALER JAVA": imgScalerJava,
  "SCALER NODE": imgScalerNode,
  "SCALER REACT": imgScalerReact,
  "SCALER JAVASCRIPT": imgScalerJs,
  "Mongo - MongoDB": imgMongoDb,
  "Educative - Node.js": imgEducativeNode,
  "GFG FULLSTACK": imgGfgFullstack,
  "GFG AI TOOLS": imgGfgAiTools,
  "GFG C": imgGfgC,
  "Codedex - Python": imgCodedexPython,
  C_SOLOLEARN: imgSololearn,
  "C Great Learning": imgCGreatLearning,
};

const COLOR = "#38bdf8";

/* ── Cert Card ── */
const CertCard = ({ cert, isActive }) => {
  const img = cert.img ? CERT_IMAGES[cert.img] : null;

  return (
    <div
      className={`cert-card ${isActive ? "active" : "inactive"}`}
      style={{
        /* Width/height managed by CSS classes for responsiveness */
        width: isActive ? 600 : 280,
        height: isActive ? 420 : 300,
        /* Use small margin so it doesn't overflow container */
        margin: "20px auto",
        borderRadius: 20,
        border: "2px solid " + (isActive ? COLOR : COLOR + "44"),
        boxShadow: isActive
          ? "0 0 60px " + COLOR + "50, 0 24px 80px rgba(0,0,0,0.6)"
          : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
        cursor: isActive ? "default" : "pointer",
        userSelect: "none",
        background: "#0a1628",
      }}
    >
      {img ? (
        /* Full-bleed certificate image */
        <img
          src={img}
          alt={cert.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        /* Fallback for certs with no image */
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            background: "linear-gradient(145deg, #0f1f3d, #0a1628)",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: COLOR + "18",
              border: "2px solid " + COLOR + "55",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
            }}
          >
            {cert.icon}
          </div>
          <h3
            style={{
              fontSize: isActive ? 17 : 13,
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              padding: "0 20px",
              fontFamily: "Helvetica, Arial, sans-serif",
              lineHeight: 1.4,
            }}
          >
            {cert.title}
          </h3>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
            {cert.issuer}
          </p>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: COLOR,
              background: COLOR + "18",
              border: "1px solid " + COLOR + "40",
              borderRadius: 999,
              padding: "4px 14px",
            }}
          >
            {cert.year}
          </span>
        </div>
      )}
    </div>
  );
};

/* ── CertificationsSection ── */
const CertificationsSection = () => {
  const slides = CERTS.map(function (cert, i) {
    return { id: i, cert: cert };
  });

  return (
    <section
      id="certifications"
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
            Certifications
          </h2>
          <p
            className="section-sub"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            Continuous learning &amp; professional growth
          </p>
        </div>

        <ThreeDCarousel
          slides={slides}
          itemCount={3}
          autoplay={true}
          delay={3.5}
          pauseOnHover={true}
          renderSlide={function (slide, isActive) {
            return <CertCard cert={slide.cert} isActive={isActive} />;
          }}
        />
      </div>
    </section>
  );
};

export default CertificationsSection;
