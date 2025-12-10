import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { NewsHotspot } from "../../data/newsMeta";

export default function Hotspot({ hotspot }: { hotspot: NewsHotspot }) {
  const size = typeof hotspot.size === "string" ? hotspot.size : `${hotspot.size ?? 56}px`;
  const label = (hotspot.label ?? "").trim();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);
  const clampedX = Math.max(0, Math.min(100, hotspot.x));
  const clampedY = Math.max(0, Math.min(100, hotspot.y));

  const updatePosition = () => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({ left: rect.left + rect.width / 2, top: rect.top - 8 });
  };

  useEffect(() => {
    if (!visible) return;
    updatePosition();
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll as EventListener);
      window.removeEventListener("resize", onResize);
    };
  }, [visible]);

  return (
    <div
      className="absolute pointer-events-auto"
      style={{ left: `${clampedX}%`, top: `${clampedY}%`, transform: "translate(-50%, -50%)" }}
    >
      <div
        ref={ref}
        className="relative"
        style={{ width: size, height: size }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <div
          className="absolute inset-0 rounded-full border-2 border-red-500/80 bg-red-500/10 shadow"
          aria-hidden
        />
      </div>
      {label && visible && coords && createPortal(
        <div
          className="pointer-events-none fixed z-1001 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow"
          style={{ left: `${coords.left}px`, top: `${coords.top}px`, transform: "translate(-50%, -100%)" }}
        >
          {label}
          <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{ borderTopColor: "rgba(0,0,0,0.8)" }} />
        </div>,
        document.body
      )}
    </div>
  );
}
