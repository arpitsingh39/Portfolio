import { useState, useEffect, useRef } from "react";
import TechOrbit from "./TechOrbit";
import profilePic from "../assets/Profile.jpg";

/* ── Profile Image with orbit rings ── */
const ProfileImage = () => {

  
  const [ring1Deg, setRing1Deg] = useState(0);
  const [ring2Deg, setRing2Deg] = useState(0);
  const rafRef = useRef(null);
  const ring1Icons = ["C", "JAVA", "PYTHON", "CLOUD"];
  const ring2Icons = ["HTML", "CSS", "JS", "TAILWIND","MONGODB", "EXPRESS", "REACT", "NODE"];

  const [ringsMount, setRingsMount]   = useState(false);
  const [ringsExpand, setRingsExpand] = useState(false);
  const [logosShow, setLogosShow]     = useState(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  /* ── rAF rotation loop ── */
  useEffect(() => {
    let prev = performance.now();
    const loop = (now) => {
      const dt = now - prev;
      prev = now;
      setRing1Deg((d) => (d + dt * 0.025) % 360);
      setRing2Deg((d) => (d - dt * 0.018 + 360) % 360);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Hover IN ── */
  const handleMouseEnter = () => {
    clearTimers();
    setLogosShow(false);
    setRingsMount(true);
    const t1 = setTimeout(() => setRingsExpand(true), 30);
    const t2 = setTimeout(() => setLogosShow(true), 620);
    timers.current = [t1, t2];
  };

  /* ── Hover OUT — slowed down ── */
  const handleMouseLeave = () => {
    clearTimers();
    setLogosShow(false);                                       // logos fade (500ms)
    const t1 = setTimeout(() => setRingsExpand(false), 520);  // rings collapse after logos gone
    const t2 = setTimeout(() => setRingsMount(false), 1800);  // unmount after collapse finishes
    timers.current = [t1, t2];
  };

  const R1 = 185, R2 = 225;
  const cx = 240, cy = 240;

  const scaleWrap = (delay = 0) => ({
    position: "absolute",
    inset: 0,
    transform: ringsExpand ? "scale(1)" : "scale(0)",
    // expand fast (0.8s), collapse slow (1.1s)
    transition: `transform ${ringsExpand ? "0.8s" : "1.1s"} cubic-bezier(0.34, 1.45, 0.64, 1) ${delay}ms`,
    transformOrigin: "center center",
  });

  const logoFade = {
    opacity: logosShow ? 1 : 0,
    // fade in quick, fade out slow
    transition: `opacity ${logosShow ? "0.25s" : "0.45s"} ease`,
  };

  return (
    <>
      {/* Override vibrate with a slow, wide gliding float */}
      <style>{`
        @keyframes glide {
          0%   { transform: translate(0px,  0px) rotate(0deg);    }
          20%  { transform: translate(3px, -5px) rotate(0.4deg);  }
          40%  { transform: translate(-4px,-8px) rotate(-0.5deg); }
          60%  { transform: translate(5px, -4px) rotate(0.3deg);  }
          80%  { transform: translate(-3px,-7px) rotate(-0.4deg); }
          100% { transform: translate(0px,  0px) rotate(0deg);    }
        }
        .vibrate {
          animation: glide 5s ease-in-out infinite !important;
        }
      `}</style>

      <div
        style={{
          position: "relative",
          width: 480,
          height: 480,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {ringsMount && (
          <>
            {/* ── Ring 1 (inner) ── */}
            <div style={scaleWrap(0)}>
              <div className="spin-cw" style={{ position: "absolute", inset: 0 }}>
                <svg width="480" height="480" style={{ position: "absolute", inset: 0 }}>
                  <circle
                    cx={cx} cy={cy} r={R1}
                    fill="none"
                    stroke="rgba(56,189,248,0.28)"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                  />
                </svg>
              </div>

              {ring1Icons.map((label, i) => {
                const angle =
                  (i / ring1Icons.length) * 2 * Math.PI +
                  (ring1Deg * Math.PI) / 180;
                const x = cx + R1 * Math.cos(angle);
                const y = cy + R1 * Math.sin(angle);
                return (
                  <div key={label} style={{ position: "absolute", inset: 0, ...logoFade }}>
                    <TechOrbit label={label} x={x} y={y} />
                  </div>
                );
              })}
            </div>

            {/* ── Ring 2 (outer) ── */}
            <div style={scaleWrap(80)}>
              <svg width="480" height="480" style={{ position: "absolute", inset: 0 }}>
                <circle
                  cx={cx} cy={cy} r={R2}
                  fill="none"
                  stroke="rgba(129,140,248,0.22)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
              </svg>

              {ring2Icons.map((label, i) => {
                const angle =
                  (i / ring2Icons.length) * 2 * Math.PI -
                  (ring2Deg * Math.PI) / 180;
                const x = cx + R2 * Math.cos(angle);
                const y = cy + R2 * Math.sin(angle);
                return (
                  <div key={label + i} style={{ position: "absolute", inset: 0, ...logoFade }}>
                    <TechOrbit label={label} x={x} y={y} />
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── Profile circle ── */}
        <div
          className="vibrate"
          style={{
            width: 280,
            height: 280,
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid rgba(255,255,255,0.3)",
            boxShadow: ringsExpand
              ? "0 0 0 6px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.6), 0 0 120px rgba(255,255,255,0.4)"
              : "0 0 0 4px rgba(255,255,255,0.2), 0 0 30px rgba(255,255,255,0.2)",
            transition: "box-shadow 0.4s ease",
            background: "linear-gradient(135deg, #1a2744, #0f1a35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
            flexShrink: 0,
          }}
        >
          <img
            src={profilePic}
            alt="Arpit Singh"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileImage;
