import { useState, useEffect } from "react";

const roles = [
  "MERN Stack Developer",
  "DevOps & Cloud Enthusiast",
  "Always Learning , Always Building",
];

const TypingRoles = () => {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let speed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));

        if (text === current) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setText(current.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <h2
      style={{
        fontSize: "clamp(16px, 4vw, 22px)",
        fontWeight: 600,
        marginTop: 12,
        marginBottom: 24,
        color: "var(--accent)",
        minHeight: 32,
      }}
    >
      {text}
      <span style={{ borderRight: "2px solid var(--accent)", marginLeft: 4 }} />
    </h2>
  );
};

export default TypingRoles;
