import React from "react";
import { CheckCircle } from "lucide-react";

type TutorialProps = {
  onStart?: () => void;
};

const Tutorial: React.FC<TutorialProps> = ({ onStart }) => {
  const handleStart = () => {
    if (onStart) onStart();
  };

  return (
    <section
      className="min-h-screen w-full flex items-center justify-center text-slate-50 px-4 py-10 select-none"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1.2fr_minmax(0,1fr)] gap-10 items-center">
        {/* LEFT: TEXT EXPLANATION */}
        <div className="flex flex-col gap-6">
          <div className="rounded-full border border-red-500/60 bg-black/40 px-5 py-1 inline-flex">
            <p className="text-[0.55rem] tracking-[0.35em] uppercase text-red-400 font-sharetech">
              Deepfake Detector
            </p>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-red-500 font-sharetech tracking-[0.25em] uppercase">
              {__`How to Play`}
            </h1>
            <p className="text-sm md:text-base text-slate-200 font-sharetech leading-relaxed">
              Each round you will see <span className="font-semibold">two face images</span>. 
              One of them is a <span className="text-red-400 font-semibold">deepfake </span> 
              (AI-generated), the other is likely real.
            </p>
            <ul className="text-sm text-slate-300 font-sharetech space-y-2 list-disc list-inside">
              <li>
                Study both images carefully and <span className="font-semibold">tap the one you think is the deepfake</span>.
              </li>
              <li>
                You only get <span className="font-semibold">one choice per round</span>. Once you pick, that decision is locked in.
              </li>
              <li>
                A <span className="font-semibold">timer</span> at the top counts down. If it hits zero, you lose that round automatically.
              </li>
              <li>
                Your <span className="font-semibold">streak</span> increases with each correct answer. You start at 30 seconds and with each streak increase, you lose 3 seconds.
              </li>
              <li>
                A vertical <span className="font-semibold">progress bar</span> on the left shows how far you are through the image set.
              </li>
            </ul>
          </div>

          {/* FEEDBACK EXPLANATION */}
          <div className="space-y-3">
            <h2 className="text-sm md:text-base font-bold text-red-400 font-sharetech tracking-[0.25em] uppercase">
              {__`Feedback & Explanations`}
            </h2>
            <ul className="text-sm text-slate-300 font-sharetech space-y-2 list-disc list-inside">
              <li>
                After you click — or when time runs out — a{" "}
                <span className="font-semibold">feedback panel</span> appears at the bottom.
              </li>
              <li>
                It tells you whether your choice was{" "}
                <span className="text-green-400 font-semibold">correct</span> or{" "}
                <span className="text-red-400 font-semibold">incorrect</span>, and explains{" "}
                <span className="font-semibold">what gives the deepfake away</span>.
              </li>
              <li>
                The system also highlights the deepfake with{" "}
                <span className="font-semibold">red circles</span> over suspicious areas
                (e.g. hairline, earrings, shoulders).
              </li>
              <li>
                The deepfake image for that round is then
                shown again in the <span className="font-semibold">center of the screen</span>,
                so you can inspect it more closely.
              </li>
              <li>
                Press <span className="font-semibold">“Next”</span> to flip the cards, load the
                next image pair, and continue your streak.
              </li>
            </ul>
          </div>

          {/* START BUTTON */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleStart}
              className="flex justify-center items-center px-8 py-2 rounded-full border border-red-500 text-[0.8rem] tracking-[0.25em] uppercase font-semibold font-sharetech
                       bg-black/40 text-red-400 hover:bg-red-500/10 hover:text-red-200 
                       hover:shadow-[0_0_25px_rgba(248,113,113,0.7)] transition"
            >
              <CheckCircle className="h-5 w-5 mr-2" /> Start
            </button>
          </div>
        </div>

        {/* RIGHT: VISUAL MOCKUP */}
        <div className="hidden md:flex justify-end border-l border-red-700 pl-10">
          <div className="relative w-full max-w-sm">
            {/* Mock progress bar */}
            <div className="absolute py-5 -left-5 top-6 hidden lg:flex flex-col items-center">
              <div className="relative w-2 h-40 rounded-full bg-slate-800/70 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-red-500 shadow-[0_0_20px_rgba(248,113,113,0.8)]" />
              </div>
            </div>

            {/* Mock cards */}
            <div className="space-y-4">
              <p className="text-[0.7rem] py-2 uppercase tracking-[0.2em] text-slate-300 font-sharetech text-center">
                Example round
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-44 rounded-2xl border border-red-900/60 bg-[#060712]/90 overflow-hidden relative">
                  <div className="w-full h-full bg-linear-to-br from-slate-600/50 to-slate-900" />
                  <span className="absolute left-3 top-3 text-[0.6rem] uppercase tracking-[0.16em] bg-black/70 border border-red-500/60 rounded-full px-3 py-0.5 font-sharetech text-red-200">
                    Image A
                  </span>
                </div>
                <div className="h-44 rounded-2xl border border-red-900/60 bg-[#060712]/90 overflow-hidden relative">
                  <div className="w-full h-full bg-linear-to-br from-slate-500/40 to-slate-900" />
                  <span className="absolute left-3 top-3 text-[0.6rem] uppercase tracking-[0.16em] bg-black/70 border border-red-500/60 rounded-full px-3 py-0.5 font-sharetech text-red-200">
                    Image B
                  </span>
                  {/* Example hotspot circle */}
                  <div className="absolute right-6 top-8 w-7 h-7 rounded-full border-2 border-red-400/90 shadow-[0_0_12px_rgba(248,113,113,0.7)]" />
                </div>
              </div>

              {/* Mock centered wrong-card overlay */}
            <div className="space-y-4 mt">
              <p className="text-[0.7rem] py-2 uppercase tracking-[0.2em] text-slate-300 font-sharetech text-center mt-8">
                Feedback View
              </p>
              <div className="relative">
                <div className="mx-auto w-52 h-32 rounded-2xl border border-red-900/80 bg-[#060712]/95 shadow-[0_0_25px_rgba(0,0,0,0.9)] overflow-hidden">
                  <div className="w-full h-full bg-linear-to-br from-slate-700/60 to-slate-950" />
                  <span className="absolute inset-x-0 top-2 text-center text-[0.6rem] uppercase tracking-[0.18em] text-slate-300 font-sharetech">
                    Highlighted wrong image
                  </span>
                </div>
              </div>
            </div>

              {/* Mock feedback popup */}
              <div className="mt-5 rounded-xl border border-red-500 bg-slate-900/95 text-slate-50 shadow-[0_0_25px_rgba(239,68,68,0.6)] px-4 py-3 text-xs font-sharetech">
                <p className="text-[0.6rem] uppercase tracking-[0.25em] text-red-400 mb-1">
                  Deepfake feedback
                </p>
                <p className="font-semibold text-xs mb-1">
                  Correct — this one is the deepfake.
                </p>
                <p className="text-xs text-slate-200 mb-2">
                  Notice the irregular hairline and inconsistent lighting around the neck and shoulders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
