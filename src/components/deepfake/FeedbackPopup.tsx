import React from "react";

type FeedbackPopupProps = {
  show: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onNext: () => void;
};

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({
  show,
  title,
  message,
  onNext,
}) => {
  if (!message) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 max-w-xl w-[calc(100%-2rem)] sm:w-lg
                  rounded-xl border border-red-500 bg-slate-900/95 text-slate-50
                  shadow-[0_0_25px_rgba(239,68,68,0.6)] px-4 py-3 text-sm
                  transition-all duration-300
                  ${
                    show
                      ? "opacity-100 translate-y-0"
                      : "pointer-events-none opacity-0 translate-y-4"
                  }`}
    >
      <div className="flex flex-col gap-3">
        {/* Top row: text + close button */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.25em] text-red-400 mb-1">
              Deepfake feedback
            </p>
            {title && (
              <p className="font-semibold text-xs sm:text-sm mb-1">
                {title}
              </p>
            )}
            <p className="text-xs sm:text-sm text-slate-200">
              {message}
            </p>
          </div>
        </div>

        {/* Bottom row: Next button aligned to the right */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onNext}
            className="px-4 py-1 rounded-full border border-red-500 text-[0.7rem] uppercase tracking-[0.18em]
                       text-slate-200 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;
