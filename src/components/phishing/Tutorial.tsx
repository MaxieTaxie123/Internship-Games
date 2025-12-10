import {
  ShieldAlert,
  CheckCircle,
  Mail,
  MessageSquare,
  Inbox,
  PhoneIncoming,
} from "lucide-react";
import React from "react";

interface TutorialPageProps {
  onStart: () => void;
}

// Small, reusable card component to reduce repetition and keep visuals consistent
function FeatureCard({
  title,
  description,
  bullets,
  Icon,
}: {
  title: string;
  description: string;
  bullets: React.ReactNode[];
  Icon: React.ElementType;
}) {
  return (
    <div className="group relative h-full rounded-2xl border border-[#e30613]/50 bg-[#0a0a18]/80 p-4 sm:p-6 shadow-[0_0_12px_rgba(227,6,19,0.2)] backdrop-blur-sm transition-colors duration-300 hover:bg-[#141428]">
      {/* top accent */}
      <div className="absolute inset-x-6 -top-0.5 h-0.5 rounded-full bg-linear-to-r from-[#e30613] via-[#e30613]/50 to-transparent" />

      <div className="flex flex-col items-center text-center">
        <div className="mb-3 inline-flex items-center justify-center rounded-xl border border-[#e30613]/40 bg-[#120f14]/60 p-2 ring-1 ring-inset ring-[#e30613]/20 transition-transform duration-300 motion-safe:group-hover:scale-105">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#e30613]" />
        </div>
        <h3 className="font-eurostile text-base sm:text-lg uppercase tracking-wide text-white">
          {title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-300">
          {description}
        </p>
        <ul className="mt-4 w-full list-disc space-y-1 text-left text-[11px] sm:text-xs text-gray-400 pl-5 wrap-break-word">
          {bullets.map((b, i) => (
            <li key={i} className="marker:text-[#e30613] wrap-break-word">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TutorialPage({ onStart }: TutorialPageProps) {
  const handleKeyStart = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onStart();
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-sharetech select-none flex flex-col">
      {/* Ambient background effects */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 sm:opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[22px_22px]"
      />

      {/* Page content */}
      <div className="relative grid grid-cols-5 grid-rows-[1fr,2.5fr,1fr] gap-1 p-4 min-h-screen">
        {/* Header / Hero */}
        <header className="flex flex-col col-span-5 text-center items-center max-h-50 my-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e30613]/40 bg-[#0a0a18]/70 px-3 py-1 text-xs text-gray-300 shadow-[0_0_10px_rgba(227,6,19,0.25)]">
            <ShieldAlert className="size-4 text-[#e30613]" />
            <span className="uppercase tracking-wider">
              Cybersecurity Engagement Simulator
            </span>
          </div>

          <h1 className="mt-4 flex items-center justify-center gap-3 text-3xl sm:text-4xl lg:text-5xl font-eurostile uppercase tracking-wide text-[#e30613]">
            Phantom’s Lab
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base lg:text-lg leading-snug text-gray-300">
            The new generation of{" "}
            <span className="text-[#e30613] font-semibold">
              cybersecurity engagement
            </span>
            .
          </p>
          <button
            onClick={onStart}
            onKeyDown={handleKeyStart}
            className="inline-flex gap-2 rounded-xl bg-[#e30613] w-full sm:w-auto mt-5 mb-2 px-5 text-sm sm:px-6 sm:py-3 sm:text-base font-eurostile uppercase tracking-wide shadow-[0_0_18px_rgba(227,6,19,0.6)] transition-transform duration-200 motion-safe:hover:scale-[1.02] hover:bg-[#ff2a2a] focus:outline-none focus:ring-2 focus:ring-[#e30613]/60"
          >
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            Start
          </button>
        </header>

        {/* Main Content (fills remaining space) */}
        <section className="col-span-5 row-span-2 flex flex-col flex-1 min-h-0">
          <h2 id="simulations" className="sr-only">
            Core Simulations
          </h2>
          <div className="grid grid-cols-5 gap-4 flex-1 min-h-0 items-stretch">
            <div className="col-start-2 h-full">
              <FeatureCard
                title="WhatsApp Simulation"
                description="Learn to identify deceptive chats disguised as banks, coworkers, or delivery agents."
                bullets={[
                  <>
                    Fake URLs like <code>paypa1.com</code>
                  </>,
                  <>Emotional or urgent tone</>,
                  <>Requests for personal info</>,
                ]}
                Icon={MessageSquare}
              />
            </div>
            <div className="col-start-3 h-full">
              {" "}
              <FeatureCard
                title="Outlook Inbox"
                description="Review simulated emails and decide if they’re legitimate or phishing attempts."
                bullets={[
                  <>
                    Domains like <code>m1crosoft.com</code>
                  </>,
                  <>Unexpected attachments</>,
                  <>Odd formatting or tone</>,
                ]}
                Icon={Mail}
              />
            </div>
            <div className="col-start-4 h-full">
              {" "}
              <FeatureCard
                title="Gmail Interface"
                description="Navigate a Gmail-style inbox and spot subtle red flags in everyday messages."
                bullets={[
                  <>Fake “CEO” or finance requests</>,
                  <>Urgency or fear language</>,
                  <>Mismatched sender names</>,
                ]}
                Icon={Inbox}
              />
            </div>
          </div>
        </section>

        {/* Footer / Alert */}
        <footer className="col-span-3 col-start-2 mt-auto">
          <div className="relative overflow-hidden rounded-2xl border border-[#e30613]/50 bg-[#0a0a18]/80 p-4 sm:p-6 text-center shadow-[0_0_12px_rgba(227,6,19,0.25)]">
            <div className="absolute inset-0 bg-[#e30613]/10" />
            <div className="relative z-10 flex items-center justify-center gap-2 text-[#e30613]">
              <PhoneIncoming className="h-5 w-5 sm:h-6 sm:w-6" />
              <h3 className="font-eurostile text-base sm:text-lg uppercase tracking-wide">
                Unexpected Events
              </h3>
            </div>
            <p className="z-10 mt-2 text-xs sm:text-sm text-gray-300">
              Stay alert — not all threats arrive as emails or messages.
            </p>
            <p className="z-10 mt-2 text-[11px] sm:text-xs italic text-gray-500">
              Some opportunities are traps in disguise.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
