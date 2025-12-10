import React from "react";

type ProgressBarProps = {
  current: number; // 1-based index: current pair number
  total: number;   // total number of pairs
};

const VerticalProgress: React.FC<ProgressBarProps> = ({
  current,
  total,
}) => {
  const safeTotal = total || 1;
  const clampedCurrent = Math.min(Math.max(current, 1), safeTotal);
  const percent = (clampedCurrent / safeTotal) * 100;

  return (
    <aside className="hidden md:flex flex-col items-center pt-4 pr-4 mr-8">
      <div className="relative w-2 h-[70vh] justify-center items-center rounded-full bg-slate-800/70 overflow-hidden shadow-[0_0_20px_rgba(15,23,42,0.8)]">
        <div
          className="absolute bottom-0 left-0 w-full rounded-full bg-red-500 shadow-[0_0_20px_rgba(248,113,113,0.8)] transition-all duration-300"
          style={{ height: `${percent}%` }}
        />
      </div>
    </aside>
  );
};

export default VerticalProgress;
