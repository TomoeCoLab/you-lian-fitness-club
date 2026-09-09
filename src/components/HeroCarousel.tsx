import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const slides = [
  { src: "/hero-squat.webp", alt: "運動者在深蹲架進行槓鈴深蹲" },
  { src: "/hero-deadlift.webp", alt: "運動者在工業風健身房進行羅馬尼亞硬舉" },
  { src: "/hero-cable.webp", alt: "運動者在滑輪機進行站姿划船" },
  { src: "/hero-lunge.webp", alt: "運動者手持壺鈴進行弓箭步" },
] as const;

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedByInteraction = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduceMotion) return;
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") setActiveIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(interval);
  }, [paused]);

  const move = (amount: number) => setActiveIndex((current) => (current + amount + slides.length) % slides.length);
  const pauseTemporarily = () => {
    if (!pausedByInteraction.current) setPaused(true);
  };

  return (
    <section
      className="hero"
      aria-roledescription="輪播"
      aria-label="YOU LIAN 訓練影像"
      onMouseEnter={pauseTemporarily}
      onMouseLeave={() => { if (!pausedByInteraction.current) setPaused(false); }}
      onFocusCapture={pauseTemporarily}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget) && !pausedByInteraction.current) setPaused(false);
      }}
    >
      <div className="hero__slides">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            className={index === activeIndex ? "hero__slide hero__slide--active" : "hero__slide"}
            src={slide.src}
            alt={index === activeIndex ? slide.alt : ""}
            aria-hidden={index !== activeIndex}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
          />
        ))}
      </div>
      <h1>今天，有練。</h1>
      <div className="hero__controls">
        <button onClick={() => move(-1)} aria-label="上一張訓練照片"><ChevronLeft size={21} /></button>
        <div className="hero__dots" aria-label="選擇訓練照片">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              className={index === activeIndex ? "hero__dot hero__dot--active" : "hero__dot"}
              onClick={() => setActiveIndex(index)}
              aria-label={`第 ${index + 1} 張照片`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <button onClick={() => move(1)} aria-label="下一張訓練照片"><ChevronRight size={21} /></button>
        <button
          onClick={() => {
            pausedByInteraction.current = !paused;
            setPaused((current) => !current);
          }}
          aria-label={paused ? "繼續自動輪播" : "暫停自動輪播"}
        >
          {paused ? <Play size={17} /> : <Pause size={17} />}
        </button>
      </div>
    </section>
  );
}
