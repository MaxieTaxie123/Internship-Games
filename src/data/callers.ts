export interface Caller {
  id: number;
  caller: string;
  number: string;
  isScam: boolean;
}

export const callers: Caller[] = [
  // Legitimate Calls
  { id: 1,  caller: "IT Support", number: "(415) 555-0123", isScam: false },
  { id: 2,  caller: "HR Department", number: "(212) 555-0184", isScam: false },
  { id: 3,  caller: "Security Desk", number: "(650) 555-0149", isScam: false },
  { id: 4,  caller: "Delivery Service (External)", number: "+1 (800) 555-0198", isScam: false },
  { id: 5,  caller: "Finance Department", number: "(310) 555-0176", isScam: false },
  { id: 6,  caller: "Office Admin", number: "(503) 555-0112", isScam: false },
  { id: 7,  caller: "Facility Maintenance", number: "(617) 555-0166", isScam: false },
  { id: 8,  caller: "Team Lead", number: "(408) 555-0137", isScam: false },
  { id: 9,  caller: "Corporate Communications", number: "(646) 555-0159", isScam: false },
  { id:10,  caller: "Helpdesk", number: "+1 (877) 555-0100", isScam: false },

  // Scam / Phishing Calls
  { id:11,  caller: "Bank Verification (External)", number: "+1 (888) 555-0201", isScam: true },
  { id:12,  caller: "Crypto Recovery Service (External)", number: "+44 20 7946 0955", isScam: true },
  { id:13,  caller: "Prize Hotline (External)", number: "(702) 555-0191", isScam: true },
  { id:14,  caller: "Utility Company Billing", number: "+1 (833) 555-0274", isScam: true },
  { id:15,  caller: "Tech Support Refunds (External)", number: "(206) 555-0188", isScam: true },
  { id:16,  caller: "Law Enforcement Alert (External)", number: "(202) 555-0173", isScam: true },
  { id:17,  caller: "Tax Office Collections (External)", number: "+1 (800) 555-0242", isScam: true },
  { id:18,  caller: "Customer Rewards Team (External)", number: "(305) 555-0168", isScam: true },
  { id:19,  caller: "Software License Renewal (External)", number: "+1 (855) 555-0288", isScam: true },
  { id:20,  caller: "Network Security Response", number: "(917) 555-0129", isScam: true },
];
