/*
 * BeforeAfterSlider.tsx — Drag-to-reveal image comparison slider
 * Used on the Seller page to show staged vs. unstaged photography.
 * Works with mouse drag, touch (sideways drag or tap), and keyboard arrows; exposed as a slider to screen readers.
 */
import { useState, useRef, useCallback } from "react";
import { ChevronsLeftRight } from "lucide-react";

const TOUCH_SLOP = 8; // px a finger can move before we decide whether it's a scroll or a drag
const KEY_STEPS: Record<string, number> = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 };

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
  const start = useRef({ x: 0, y: 0, sideways: false });

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const rounded = Math.round(position);

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={`Compare ${afterLabel.toLowerCase()} and ${beforeLabel.toLowerCase()} photos of the same room`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={rounded}
      aria-valuetext={`${rounded}% ${afterLabel.toLowerCase()} photo showing`}
      className="relative w-full overflow-hidden rounded-xl select-none cursor-ew-resize focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C89B3C]"
      // pan-y: vertical swipes still scroll the page; sideways drags move the slider.
      style={{ aspectRatio: "3 / 2", touchAction: "pan-y" }}
      onPointerDown={(e) => {
        dragging.current = true;
        start.current = { x: e.clientX, y: e.clientY, sideways: e.pointerType === "mouse" };
        e.currentTarget.setPointerCapture(e.pointerId);
        if (e.pointerType === "mouse") updatePosition(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        // On touch, ignore the finger until it's clearly moving sideways, so starting to scroll the page
        // doesn't jump the slider.
        if (!start.current.sideways) {
          const dx = Math.abs(e.clientX - start.current.x);
          const dy = Math.abs(e.clientY - start.current.y);
          if (dx < TOUCH_SLOP || dx < dy) return;
          start.current.sideways = true;
        }
        updatePosition(e.clientX);
      }}
      onPointerUp={(e) => {
        // A tap (touch that barely moved) moves the divider to where the finger lifted.
        const moved = Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y);
        if (dragging.current && e.pointerType !== "mouse" && moved < TOUCH_SLOP) updatePosition(e.clientX);
        dragging.current = false;
      }}
      onPointerCancel={() => { dragging.current = false; }}
      onKeyDown={(e) => {
        const step = KEY_STEPS[e.key];
        if (step) setPosition((p) => Math.max(2, Math.min(98, p + step)));
        else if (e.key === "Home") setPosition(2);
        else if (e.key === "End") setPosition(98);
        else return;
        e.preventDefault();
      }}
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
