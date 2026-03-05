import { useEffect } from "react";

/* ── Scroll reveal hook ── */
const useReveal = () => {
    useEffect(() => {
        const els = document.querySelectorAll(".reveal");
        const io = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
            { threshold: 0.12 }
        );
        els.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, []);
};

export default useReveal;
