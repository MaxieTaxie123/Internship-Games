import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Phone, X } from "lucide-react";
import { callers } from "../../data/callers";

interface PhoneCallManagerProps {
  onDecision: (correct: boolean) => void;
  gameOver: boolean;
}

const BASE_DELAY_MIN_MS = 30000; // 30s
const BASE_DELAY_MAX_MS = 60000; // 60s
const VISIBLE_MS = 10000; // popup duration
const IGNORE_COOLDOWN_MS = 20000; // +20s cooldown if ignored
const PENALTY_STEP_MS = 10000; // +10s per penalty level
const MAX_PENALTY_LEVEL = 6;
const LOCKOUT_DURATION_MS = 120000; // 2 minutes

export default function PhoneCallManager({
  onDecision,
  gameOver,
}: PhoneCallManagerProps) {
  const [currentCall, setCurrentCall] = useState<
    (typeof callers)[number] | null
  >(null);
  const [showPopup, setShowPopup] = useState(false);
  const [penaltyLevel, setPenaltyLevel] = useState(0);
  const [consecutiveFails, setConsecutiveFails] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number>(0);

  // Ringtone
  const ringRef = useRef<HTMLAudioElement | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Curveballs
  function getRandomCaller() {
    const baseCaller = callers[Math.floor(Math.random() * callers.length)];
    const curveballChance = Math.random();
    if (curveballChance < 0.15) {
      return {
        ...baseCaller,
        isScam: !baseCaller.isScam,
        caller: baseCaller.caller + ` (Possibly spam)`,
      };
    }
    return baseCaller;
  }

  // Decision
  function handleDecision(accepted: boolean) {
    if (!currentCall) return;

    const { isScam } = currentCall;
    const correct = (isScam && !accepted) || (!isScam && accepted);

    if (correct) {
      setPenaltyLevel((p) => Math.max(0, p - 1));
      setConsecutiveFails(0);
    } else {
      setPenaltyLevel((p) => Math.min(p + 1, MAX_PENALTY_LEVEL));
      setConsecutiveFails((n) => n + 1);
    }
    if (consecutiveFails + 1 >= 3) {
      setIsLockedOut(true);
    }

    onDecision(correct);
    setShowPopup(false);
    setCurrentCall(null);
    stopRingtone();
  }

  function handleIgnore() {
    setPenaltyLevel((p) => Math.min(p + 1, MAX_PENALTY_LEVEL));
    setCooldownUntil(Date.now() + IGNORE_COOLDOWN_MS);
  }

  function startRingtone() {
    const el = ringRef.current;
    if (el) {
      const p = el.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          /* autoplay blocked: no fallback */
        });
      }
    }
  }
  function stopRingtone() {
    const el = ringRef.current;
    if (el) {
      try {
        el.pause();
        el.currentTime = 0;
      } catch {
        /* noop */
      }
    }
  }

  useEffect(() => {
    const a = new Audio("./audio/default-ringtone.mp3");
    a.loop = false;
    a.preload = "auto";
    a.volume = 1.0;
    ringRef.current = a;
    return () => {
      stopRingtone();
      ringRef.current = null;
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Scheduler
  useEffect(() => {
    if (isLockedOut || gameOver) return;

    const baseDelay =
      Math.floor(Math.random() * (BASE_DELAY_MAX_MS - BASE_DELAY_MIN_MS)) +
      BASE_DELAY_MIN_MS;
    const penaltyDelay = penaltyLevel * PENALTY_STEP_MS;
    const extra = Math.max(0, cooldownUntil - Date.now());
    const totalDelay = baseDelay + penaltyDelay + extra;

    const timer = setTimeout(() => {
      if (gameOver) return;
      const call = getRandomCaller();
      setCurrentCall(call);
      setShowPopup(true);
    }, totalDelay);

    return () => clearTimeout(timer);
  }, [penaltyLevel, isLockedOut, cooldownUntil, gameOver]);

  // Popup visibility + ringtone + auto-hide
  useEffect(() => {
    const shouldRing = showPopup && !!currentCall && !isLockedOut && !gameOver;
    if (shouldRing) {
      startRingtone();
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        setShowPopup(false);
        setCurrentCall(null);
        stopRingtone();
        handleIgnore();
      }, VISIBLE_MS);
    } else {
      stopRingtone();
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    }
  }, [showPopup, currentCall, isLockedOut, gameOver]);

  // Lockout
  useEffect(() => {
    if (!isLockedOut) return;
    const timer = setTimeout(() => {
      setIsLockedOut(false);
      setConsecutiveFails(0);
    }, LOCKOUT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isLockedOut]);

  if (gameOver) {
    return null;
  }

  // Narrative bubble when locked out
  if (isLockedOut) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 w-96 rounded-2xl border border-white/10 bg-[#0a0a18]/90 backdrop-blur-md p-4 shadow-2xl">
        <AlertTriangle className="w-6 h-6 text-[#e30613] animate-pulse" />
        <p className="text-sm text-gray-200">Security check: you missed several calls. Pausing calls briefly.</p>
      </div>
    );
  }

  if (!showPopup || !currentCall || isLockedOut) return null;

  // ── Teams-style toast ─────────────────────────────────────────────
  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-[380px] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      role="dialog"
      aria-label="Incoming call"
    >
      {/* Card container with Teams-like teal */}
      <div className="rounded-2xl border border-white/10 bg-[#1f3a45]">
        {/* Top bar (email • org • close) */}
        <div className="flex items-center justify-between px-4 py-2 text-[13px] text-zinc-100">
          <div className="truncate">
            <span className="font-medium">caller@company.com</span>
            <span className="mx-2 text-white/40">•</span>
            <span className="text-white/80">Your Org</span>
          </div>
          <button
            onClick={() => handleDecision(false)} // same as clicking decline / “X”
            className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pt-5 pb-4">
          {/* Avatar + caller name/number */}
          <div className="grid items-center justify-center gap-4">
            {/* Large avatar circle (Teams cyan) */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#28b3d1] text-white text-2xl font-semibold mx-auto">
              {currentCall.caller.trim()[0]?.toUpperCase() ?? "?"}
            </div>

            <div className="relative min-w-0">
              {/* Number (use anything you have; here we render the caller label bold) */}
              <div className="flex justify-center text-zinc-100 font-semibold text-lg leading-tight mx-auto">
                {currentCall.number ?? "(715) 252-••••"}
              </div>
              {/* Name + (External) */}
              <div className="flex justify-center truncate text-sm text-white/80 mx-auto">
                {currentCall.caller}
              </div>
            </div>
          </div>

          {/* Big pill buttons */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            {/* Answer (Teams blue) */}
            <button
              onClick={() => handleDecision(true)}
              className="flex items-center justify-center gap-3 rounded-xl bg-[#5c5fc8] px-4 py-3 text-white shadow hover:bg-[#4456f4] transition"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center">
                <Phone className="w-4 h-4 fill-white" />
              </span>
            </button>

            {/* Decline (Teams red) */}
            <button
              onClick={() => handleDecision(false)}
              className="flex items-center justify-center gap-3 rounded-xl bg-[#d03438] px-4 py-3 text-white shadow hover:bg-[#c54541] transition"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center">
                <Phone className="w-4 h-4 fill-white rotate-135" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
