import { useEffect, useState } from "react";

const TypingName = () => {
  const fullText = "Arpit Singh";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Initial pause
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Typing logic
  useEffect(() => {
    if (!started) return;

    if (index < fullText.length) {
      let delay = 100 + Math.random() * 80;
      const currentChar = fullText[index];
      if (currentChar === currentChar.toUpperCase() && currentChar !== " ") delay += 120;
      if (fullText.slice(index, index + 5) === "Singh") delay += 250;

      const timer = setTimeout(() => {
        setText((prev) => prev + currentChar);
        setIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }

    if (index === fullText.length) setFinished(true);
  }, [index, started, fullText]);

  // Blink once typing is done
  useEffect(() => {
    if (!finished) return;
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, [finished]);

  return (
    <h1
      className="typing-title"
      style={{
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: "clamp(38px, 6vw, 72px)",
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: "0.1rem",
        marginBottom: 24,
        color: "var(--text)",
      }}
    >
      {text}
      <span
        style={{
          display: "inline-block",
          marginLeft: 6,
          color: "#ffffff",
          opacity: cursorVisible ? 1 : 0,
          transition: finished ? "none" : undefined,
        }}
      >
        _
      </span>
    </h1>
  );
};

export default TypingName;