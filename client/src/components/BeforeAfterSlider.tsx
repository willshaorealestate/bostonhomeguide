/*
 * BeforeAfterSlider.tsx — Drag-to-reveal image comparison slider
 * Used on the Seller page to show staged vs. unstaged photography
 */
import { useState, useRef, useCallback } from "react";
import { ChevronsLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl select-none cursor-ew-resize"
      style={{ aspectRatio: "3 / 2" }}
      onMouseDown={(e) => {
        dragging.current = true;
        updatePosition(e.clientX);
      }}
      onMouseMove={(e) => {
        if (dragging.current) updatePosition(e.clientX);
      }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
      onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
    >
      {/* Before image — full background */}
      <img
        src={beforeSrc}
        alt="Before staging"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* After image — clipped to left portion */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={afterSrc}
          alt="After staging"
          draggable={false}
          className="absolute inset-0 h-full object-cover pointer-events-none"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw" }}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Drag handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-gray-100">
          <ChevronsLeftRight className="w-5 h-5 text-[#0D2137]" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-[#0D2137]/70 text-white text-xs font-semibold font-body px-3 py-1.5 rounded pointer-events-none">
        {afterLabel}
      </div>
      <div className="absolute top-4 right-4 bg-[#0D2137]/70 text-white text-xs font-semibold font-body px-3 py-1.5 rounded pointer-events-none">
        {beforeLabel}
      </div>

      {/* Hint text — fades after first interaction */}
      {position === 50 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-body px-3 py-1.5 rounded-full pointer-events-none whitespace-nowrap">
          ← Drag to compare →
        </div>
      )}
    </div>
  );
}
