/** Core Phishing Type Identifiers */
export type PhishTypeKey =
  | "credential"
  | "lookalike"
  | "invoice"
  | "delivery"
  | "refund"
  | "prize"
  | "tax"
  | "fileshare"
  | "bec"
  | "device"
  | "service"
  | "crypto"
  | "tech_support";

/** Category definitions for UI display */
export const PHISH_TYPES: { key: PhishTypeKey; label: string; hint: string }[] =
  [
    {
      key: "credential",
      label: "Credential Harvesting",
      hint: "Fake login or brand portal asking for credentials",
    },
    {
      key: "lookalike",
      label: "Look-alike Domain",
      hint: "m1crosoft / arnazon / paypaI brand spoofs",
    },
    {
      key: "invoice",
      label: "Fake Invoice / Billing",
      hint: "Unfamiliar invoices or payment requests",
    },
    {
      key: "delivery",
      label: "Delivery Scam",
      hint: "Fake courier reschedule or delivery link",
    },
    {
      key: "refund",
      label: "Refund / Dispute Scam",
      hint: "‘Refund processed’ or ‘verify your payment’ traps",
    },
    {
      key: "prize",
      label: "Prize / Lottery Scam",
      hint: "Gift cards, giveaways, or unexpected rewards",
    },
    {
      key: "tax",
      label: "Tax / Government Scam",
      hint: "Refund or penalty messages impersonating authorities",
    },
    {
      key: "fileshare",
      label: "File-share Spoof",
      hint: "Dropbox / OneDrive document share lures",
    },
    {
      key: "bec",
      label: "Business Email Compromise",
      hint: "CEO or executive impersonation requests",
    },
    {
      key: "device",
      label: "Unauthorized Device Alert",
      hint: "Security login or device-added warnings",
    },
    {
      key: "service",
      label: "Subscription / Renewal Scam",
      hint: "Netflix, Microsoft 365, account renewal requests",
    },
    {
      key: "crypto",
      label: "Crypto Giveaway / Recovery",
      hint: "Fake airdrops or recovery offers",
    },
    {
      key: "tech_support",
      label: "Tech Support Scam",
      hint: "Fake tech support or refund hotlines",
    },
  ];

/** EMAIL → PhishType mapping (based on email subjects & senders) */
export const emailPhishKeyById: Record<number, readonly PhishTypeKey[]> = {
  // 1) PayPal suspension — fake domain + credential harvest
  1: ["credential", "lookalike"],

  // 4) Amazon gift card — prize lure + look-alike domain
  4: ["prize", "lookalike"],

  // 5) Fake invoice — billing scam + suspicious/bogus domain
  5: ["invoice", "lookalike"],

  // 7) GitHub password reset — credential harvest + look-alike
  7: ["credential", "lookalike"],

  // 9) Google security alert — device warning + credential harvest + look-alike
  9: ["device", "credential", "lookalike"],

  // 10) UPS delivery reschedule — delivery scam + look-alike
  10: ["delivery", "lookalike"],

  // 12) Facebook tag — credential harvest + look-alike
  12: ["credential", "lookalike"],

  // 13) Tax refund — gov refund lure + credential harvest
  13: ["tax", "credential"],

  // 15) CEO wire request — business email compromise
  15: ["bec"],

  // 17) “Refund processed” — refund/dispute lure + credential harvest
  17: ["refund", "credential"],

  // 18) Dropbox share — file-share spoof + credential harvest
  18: ["fileshare", "credential"],

  // 20) Apple device alert — device warning + credential harvest + look-alike
  20: ["device", "credential", "lookalike"],

  // 21) Amazon pickup — delivery scam + look-alike
  21: ["delivery", "lookalike"],

  // 22) Vague account update — credential harvest (generic “log in”) + service/account theme
  22: ["credential", "service"],
};

/** CHAT → PhishType mapping */
export const chatPhishKeyById: Record<number, readonly PhishTypeKey[]> = {
  // 1) Bank Support — suspension + fake “secure” link
  1: ["credential", "lookalike"],

  // 3) Delivery Service — fake courier redelivery
  3: ["delivery", "credential", "lookalike"],

  // 5) Netflix Billing — renewal/billing + spoofed domain
  5: ["service", "credential", "lookalike"],

  // 7) Security Alert (Apple) — device warning + spoofed domain
  7: ["device", "credential", "lookalike"],

  // 9) PayPal Support — limited account + foreign login mention
  9: ["device", "credential", "lookalike"],

  // 11) Tax Office — refund lure
  11: ["tax", "credential"],

  // 13) CEO Office — urgent wire request
  13: ["bec"],

  // 15) Instagram — security reset + odd domain
  15: ["device", "credential", "lookalike"],

  // 17) Microsoft 365 — subscription renewal + spoofed brand
  17: ["service", "credential", "lookalike"],

  // 18) Parking Service — fine/payment demand
  18: ["invoice"],

  // 21) Crypto Rewards — giveaway/airdrop
  21: ["crypto", "prize", "credential"],
};
