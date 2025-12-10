import React from "react";

type TimerProps = {
  secondsLeft: number;
  streak: number;
};

const StreakTimer: React.FC<TimerProps> = ({ secondsLeft, streak }) => {
  const isCritical = secondsLeft <= 3;

  return (
    <div className="flex flex-col items-center gap-1 text-[0.7rem] uppercase tracking-[0.18em] text-slate-300 font-sharetech">
      <div className="flex gap-4">
        <span>Streak: {streak}</span>
        <span>
          Time left:{" "}
          <span className={isCritical ? "text-red-400" : "text-slate-100"}>
            {Math.max(secondsLeft, 0)}s
          </span>
        </span>
      </div>

      {/* Simple bar indicator */}
      <div className="w-40 h-1 rounded-full bg-slate-800 overflow-hidden mt-1">
        <div
          className={`h-full rounded-full transition-all duration-200 ${
            isCritical ? "bg-red-500" : "bg-red-400"
          }`}
          style={{
            width: `${Math.min(100, (secondsLeft / 30) * 100)}%`,
          }}
        />
      </div>
    </div>
  );
};

export default StreakTimer;
