import { useState, useEffect, useRef, useCallback } from "react";

/* ── Embedded CSS (ported from original, Tailwind removed) ── */
const CAROUSEL_CSS = `
.cascade-slider_container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  z-index: 20;
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y;
}
.cascade-slider_slides {
  position: relative;
  height: 100%;
}
.cascade-slider_item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%) scale(0.3);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  z-index: 1;
  cursor: grab;
  filter: grayscale(1) brightness(0.6);
}
.cascade-slider_item.now { cursor: default; filter: none; }
.cascade-slider_item:active { cursor: grabbing; }

.cascade-slider_item.next {
  left: 50%;
  transform: translateY(-50%) translateX(-120%) scale(0.5);
  opacity: 0.75;
  z-index: 4;
  filter: grayscale(1) brightness(0.55);
}
.cascade-slider_item.prev {
  left: 50%;
  transform: translateY(-50%) translateX(20%) scale(0.5);
  opacity: 0.75;
  z-index: 4;
  filter: grayscale(1) brightness(0.55);
}
.cascade-slider_item.now {
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%) scale(1);
  opacity: 1;
  z-index: 5;
  filter: none;
}

.cascade-slider_arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  cursor: pointer;
  z-index: 6;
  transform: translate(0, -50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0,0,0,0.35);
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.15);
  transition: background 0.25s ease, transform 0.25s ease;
}
.cascade-slider_arrow:hover {
  background: rgba(59, 130, 246, 0.7);
  transform: translate(0, -50%) scale(1.08);
}
.cascade-slider_arrow-left { left: -6%; }
.cascade-slider_arrow-right { right: -6%; }

@media screen and (max-width: 575px) {
  .cascade-slider_arrow-left { left: 4px; }
  .cascade-slider_arrow-right { right: 4px; }
}

@media screen and (min-width: 414px) {
  .cascade-slider_container { height: 52vh; }
}
@media screen and (min-width: 576px) {
  .cascade-slider_container { height: 64vh; }
}
@media screen and (min-width: 768px) {
  .cascade-slider_item.next { transform: translateY(-50%) translateX(-130%) scale(0.5); filter: grayscale(1) brightness(0.55); }
  .cascade-slider_item.prev { transform: translateY(-50%) translateX(30%) scale(0.5); filter: grayscale(1) brightness(0.55); }
}
@media screen and (min-width: 991px) {
  .cascade-slider_item.next  { transform: translateY(-50%) translateX(-118%) scale(0.48); z-index: 4; filter: grayscale(1) brightness(0.55); }
  .cascade-slider_item.prev  { transform: translateY(-50%) translateX(18%)  scale(0.48); z-index: 4; filter: grayscale(1) brightness(0.55); }
  .cascade-slider_item.next2 { transform: translateY(-50%) translateX(-162%) scale(0.3);  z-index: 3; opacity: 0.4; filter: grayscale(1) brightness(0.45); }
  .cascade-slider_item.prev2 { transform: translateY(-50%) translateX(62%)  scale(0.3);  z-index: 3; opacity: 0.4; filter: grayscale(1) brightness(0.45); }
  .cascade-slider_container { height: 52vh; }
}
@media screen and (min-width: 1100px) {
  .cascade-slider_item.next  { transform: translateY(-50%) translateX(-132%) scale(0.48); filter: grayscale(1) brightness(0.55); }
  .cascade-slider_item.prev  { transform: translateY(-50%) translateX(32%)  scale(0.48); filter: grayscale(1) brightness(0.55); }
  .cascade-slider_item.next2 { transform: translateY(-50%) translateX(-188%) scale(0.3);  filter: grayscale(1) brightness(0.45); }
  .cascade-slider_item.prev2 { transform: translateY(-50%) translateX(88%)  scale(0.3);  filter: grayscale(1) brightness(0.45); }
  .cascade-slider_container { height: 50vh; }
}
`;

/* Compute which CSS class an item gets based on its distance from active */
const getSlideClass = (index, activeIndex, total, itemCount) => {
  let diff = index - activeIndex;
  // Normalize to handle wrap-around
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;

  if (diff === 0) return "now";
  if (diff === 1) return "next";
  if (diff === -1) return "prev";
  if (itemCount === 5 && diff === 2) return "next2";
  if (itemCount === 5 && diff === -2) return "prev2";
  return "";
};

/* ── Left Arrow SVG ── */
const ArrowLeft = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 8 8 12 12 16" />
    <line x1="16" y1="12" x2="8" y2="12" />
  </svg>
);

/* ── Right Arrow SVG ── */
const ArrowRight = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 8 16 12 12 16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

/* ── ThreeDCarousel ── */
const ThreeDCarousel = ({
  slides = [],
  itemCount = 5,
  autoplay = false,
  delay = 3,
  pauseOnHover = true,
  renderSlide,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const total = slides.length;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const swipeThreshold = 50;

  const navigate = useCallback(
    (dir) => {
      setActiveIndex((cur) =>
        dir === "next" ? (cur + 1) % total : (cur - 1 + total) % total,
      );
    },
    [total],
  );

  const startAutoplay = useCallback(() => {
    if (!autoplay || total <= 1) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(
      () => navigate("next"),
      delay * 1000,
    );
  }, [autoplay, delay, navigate, total]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) stopAutoplay();
  };
  const handleMouseLeave = (e) => {
    if (autoplay && pauseOnHover) startAutoplay();
    if (isDragging) handleDragEnd(e.clientX);
  };

  const handleDragStart = (x) => {
    setIsDragging(true);
    setStartX(x);
    stopAutoplay();
  };
  const handleDragEnd = (x) => {
    if (!isDragging) return;
    const dist = x - startX;
    if (Math.abs(dist) > swipeThreshold) navigate(dist < 0 ? "next" : "prev");
    setIsDragging(false);
    setStartX(0);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CAROUSEL_CSS }} />
      <div
        className="cascade-slider_container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={(e) => {
          handleDragEnd(e.clientX);
          startAutoplay();
        }}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          handleDragEnd(e.changedTouches[0].clientX);
          startAutoplay();
        }}
      >
        <div className="cascade-slider_slides">
          {slides.map((slide, i) => {
            const cls = getSlideClass(i, activeIndex, total, itemCount);
            return (
              <div
                key={slide.id}
                className={`cascade-slider_item ${cls}`}
                data-slide={i}
              >
                {renderSlide ? (
                  renderSlide(slide, cls === "now")
                ) : (
                  <img
                    src={slide.src}
                    alt={`Slide ${i + 1}`}
                    style={{
                      maxWidth: 300,
                      height: "auto",
                      borderRadius: 20,
                      display: "block",
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/300x200/4F46E5/ffffff?text=Slide+${i + 1}`;
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {total > 1 && (
          <>
            <span
              className="cascade-slider_arrow cascade-slider_arrow-left"
              onClick={(e) => {
                e.stopPropagation();
                navigate("prev");
              }}
            >
              <ArrowLeft />
            </span>
            <span
              className="cascade-slider_arrow cascade-slider_arrow-right"
              onClick={(e) => {
                e.stopPropagation();
                navigate("next");
              }}
            >
              <ArrowRight />
            </span>
          </>
        )}
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginTop: 24,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background:
                i === activeIndex ? "#3b82f6" : "rgba(255,255,255,0.2)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ThreeDCarousel;
