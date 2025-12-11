import { useEffect, useRef, useState } from "react";
import { PHISH_TYPES, type PhishTypeKey } from "../../data/phishTypes";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (type: PhishTypeKey) => void;
  title?: string;
}

export default function PhishTypeModal({
  open,
  onClose,
  onSubmit,
  title = "Identify the phishing type",
}: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);

  // Drag state
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Helper to close and reset drag offset
  function handleClose() {
    setOffset({ x: 0, y: 0 });
    onClose();
  }

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOffset({ x: 0, y: 0 });
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // ----- Drag handlers bound ONLY to the handle -----
  function onPointerDown(e: React.PointerEvent) {
    // If pointer originated on a control, don't start drag
    if ((e.target as HTMLElement).closest("[data-no-drag]")) return;

    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    lastPoint.current = { x: e.clientX, y: e.clientY };
    document.body.style.userSelect = "none";
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging || !lastPoint.current) return;

    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;

    setOffset((prev) => {
      const el = modalRef.current;
      if (!el) return { x: prev.x + dx, y: prev.y + dy };

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();

      const nextLeft = rect.left + dx;
      const nextTop = rect.top + dy;
      const nextRight = nextLeft + rect.width;
      const nextBottom = nextTop + rect.height;

      const margin = 16;
      const clampDx =
        nextLeft < margin ? dx + (margin - nextLeft)
        : nextRight > vw - margin ? dx - (nextRight - (vw - margin))
        : dx;

      const clampDy =
        nextTop < margin ? dy + (margin - nextTop)
        : nextBottom > vh - margin ? dy - (nextBottom - (vh - margin))
        : dy;

      return { x: prev.x + clampDx, y: prev.y + clampDy };
    });

    lastPoint.current = { x: e.clientX, y: e.clientY };
  }

  function onPointerUp(e: React.PointerEvent) {
    setDragging(false);
    lastPoint.current = null;
    document.body.style.userSelect = "";
    const el = e.currentTarget as HTMLElement;
    if (el.hasPointerCapture?.(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
  }
  // ---------------------------------------------------

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <button
        type="button"
        aria-hidden
        className="absolute inset-0 bg-black/30 z-0"
        onClick={handleClose}
        tabIndex={-1}
      />

      {/* dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={modalRef}
        className="fixed z-10 max-w-lg w-[min(92vw,640px)] border border-[#2c2c2c] rounded-xl shadow-xl bg-[#11121a] p-4"
        style={{
          top: "50%",
          left: "50%",
          transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
        }}
      >
        {/* Header: left = draggable handle, right = controls (no-drag) */}
        <div className="flex items-center justify-between mb-3 select-none gap-0">
          <div
            className={`flex-1 cursor-${dragging ? "grabbing" : "grab"} pr-3`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <h3 className="text-white font-semibold">{title}</h3>
          </div>

          <button
            type="button"
            data-no-drag
            onClick={handleClose}
            className="p-1 rounded hover:bg-white/10"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 text-zinc-300" />
          </button>
        </div>

        {/* Options */}
        <form
          id="phishTypeForm"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const value = data.get("phishType");
            if (value) onSubmit(value as PhishTypeKey);
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[50vh] overflow-auto pr-1">
            {PHISH_TYPES.map((t, idx) => (
              <label key={t.key} data-no-drag className="block cursor-pointer">
                <input
                  data-no-drag
                  type="radio"
                  name="phishType"
                  value={t.key}
                  className="peer sr-only"
                  required={idx === 0}
                />
                <div className="text-left rounded-lg border px-3 py-2 transition border-[#2c2c2c] hover:bg-white/5 peer-checked:border-violet-500 peer-checked:bg-violet-500/10">
                  <div className="text-sm font-medium text-white">{t.label}</div>
                  <div className="text-xs text-zinc-400">{t.hint}</div>
                </div>
              </label>
            ))}
          </div>
        </form>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            data-no-drag
            onClick={handleClose}
            className="px-3 py-1.5 rounded border border-[#2c2c2c] text-zinc-300 hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="phishTypeForm"
            data-no-drag
            className="px-3 py-1.5 rounded text-white bg-violet-600 hover:bg-violet-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
