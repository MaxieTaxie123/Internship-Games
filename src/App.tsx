import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

// Truth_Finder
import TruthFinderTutorial from "./components/fake-news/Tutorial";
import TruthFinderSummary from "./components/fake-news/Summary";
import TruthFinderCards from "./components/fake-news/Cards";
import ActionButtons from "./components/fake-news/ActionButtons";

// Deepfake_Detector
import DeepfakeTutorial from "./components/deepfake/Tutorial";
import DeepfakeSummary from "./components/deepfake/Summary";
import DeepfakeContainer from "./components/deepfake/container";
import { useImagePreload as useDeepfakePreload } from "./imagePreload";

// Phishing_Detective
import PhishingTutorial from "./components/phishing/Tutorial";
import OutlookGame from "./components/phishing/Outlook/Game";
import WhatsAppGame from "./components/phishing/WhatsApp/Game";
import GmailGame from "./components/phishing/Gmail/Game";
import { useImagePreload as usePhishingPreload } from "./imagePreload";

function TruthFinderWrapper() {
  const [view, setView] = React.useState<"tutorial" | "game" | "summary">("tutorial");
  const cardsRef = React.useRef<{ swipeLeft: () => void; swipeRight: () => void } | null>(null);

  if (view === "tutorial") return <TruthFinderTutorial onStart={() => setView("game")} />;
  if (view === "summary") return <TruthFinderSummary onBack={() => setView("tutorial")} />;
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6 overflow-hidden">
      <TruthFinderCards
        ref={cardsRef}
        className=""
        onFinished={() => setView("summary")}
      />
      <ActionButtons
        onNope={() => cardsRef.current?.swipeLeft()}
        onTruth={() => cardsRef.current?.swipeRight()}
      />
    </div>
  );
}

function DeepfakeWrapper() {
  const [view, setView] = React.useState<"tutorial" | "game" | "summary">("tutorial");

  const urls = [
    "./deepfake/deepfakes/Jonge-vrouw.jpg", "./deepfake/reals/Jonge-vrouw-1.jpg",
    "./deepfake/deepfakes/Oudere-man.jpg", "./deepfake/reals/Oudere-man-1.jpg",
    "./deepfake/deepfakes/Pasfoto.jpg", "./deepfake/reals/Pasfoto-1.jpg",
    "./deepfake/deepfakes/Zijkant.jpg", "./deepfake/reals/Zijkant-1.jpg",
    "./deepfake/deepfakes/Zittende-vrouw.jpg", "./deepfake/reals/Zittende-vrouw-1.jpg",
    "./deepfake/deepfakes/Stef.jpg", "./deepfake/reals/Stef-1.jpg",
  ];
  const { loaded, failed } = useDeepfakePreload(urls, {
    saveToLocalStorage: true,
    storage: "indexedDB",
    namespace: "deepfake",
    maxSizeKB: 1024 * 10,
    maxEntries: 500,
  });
  useEffect(() => {
    console.log("Deepfake preload:", loaded, failed);
  }, [loaded, failed]);

  if (view === "tutorial") return <DeepfakeTutorial onStart={() => setView("game")} />;
  if (view === "summary") return <DeepfakeSummary onBack={() => setView("tutorial")} />;
  return <DeepfakeContainer onFinished={() => setView("summary")} />;
}

function PhishingWrapper() {
  const navigate = useNavigate();
  const { loaded, failed } = usePhishingPreload([
    "./phishing/images/gmail-bg.jpg",
    "./phishing/images/whatsapp-bg.png",
    "./phishing/images/envelope_icon.png",
  ]);
  useEffect(() => {
    console.log("Phishing preload:", loaded, failed);
  }, [loaded, failed]);

  return <PhishingTutorial onStart={() => navigate("/phishing/gmail")} />;
}

export default function CombinedApp() {
  return (
    <Router>
      <Routes>
        {/* Launcher routes */}
        <Route path="/" element={<Navigate to="/truth" replace />} />
        <Route path="/truth" element={<TruthFinderWrapper />} />
        <Route path="/deepfake" element={<DeepfakeWrapper />} />
        <Route path="/phishing" element={<PhishingWrapper />} />

        {/* Phishing subroutes */}
        <Route path="/phishing/outlook" element={<OutlookGame />} />
        <Route path="/phishing/whatsapp" element={<WhatsAppGame />} />
        <Route path="/phishing/gmail" element={<GmailGame />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
