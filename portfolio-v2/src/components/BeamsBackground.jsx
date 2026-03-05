import { useEffect, useRef } from "react";

/* ── Beams Background Canvas ── */
const BeamsBackground = ({ isDark }) => {
    const canvasRef = useRef(null);
    const beamsRef = useRef([]);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let W, H;

        const resize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = document.body.scrollHeight || window.innerHeight;
        };
        resize();

        const accentR = isDark ? 56 : 2;
        const accentG = isDark ? 189 : 132;
        const accentB = isDark ? 248 : 199;
        const accent2R = 129, accent2G = 140, accent2B = 248;

        // Init beams
        beamsRef.current = Array.from({ length: 22 }, (_, i) => ({
            x: Math.random() * W,
            y: Math.random() * H,
            angle: Math.random() * Math.PI * 2,
            speed: 0.15 + Math.random() * 0.25,
            length: 180 + Math.random() * 320,
            width: 0.8 + Math.random() * 2.4,
            alpha: 0.04 + Math.random() * 0.12,
            color: i % 2 === 0
                ? `${accentR},${accentG},${accentB}`
                : `${accent2R},${accent2G},${accent2B}`,
            drift: (Math.random() - 0.5) * 0.008,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            beamsRef.current.forEach(b => {
                b.angle += b.drift;
                b.x += Math.cos(b.angle) * b.speed;
                b.y += Math.sin(b.angle) * b.speed;
                if (b.x < -b.length) b.x = W + b.length;
                if (b.x > W + b.length) b.x = -b.length;
                if (b.y < -b.length) b.y = H + b.length;
                if (b.y > H + b.length) b.y = -b.length;

                const x2 = b.x + Math.cos(b.angle) * b.length;
                const y2 = b.y + Math.sin(b.angle) * b.length;
                const grad = ctx.createLinearGradient(b.x, b.y, x2, y2);
                grad.addColorStop(0, `rgba(${b.color},0)`);
                grad.addColorStop(0.5, `rgba(${b.color},${b.alpha})`);
                grad.addColorStop(1, `rgba(${b.color},0)`);
                ctx.strokeStyle = grad;
                ctx.lineWidth = b.width;
                ctx.beginPath();
                ctx.moveTo(b.x, b.y);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            });
            rafRef.current = requestAnimationFrame(draw);
        };
        draw();

        const ro = new ResizeObserver(resize);
        ro.observe(document.body);

        return () => {
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
        };
    }, [isDark]);

    return <canvas ref={canvasRef} id="beams-canvas" />;
};

export default BeamsBackground;
