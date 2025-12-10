export interface ChatMessage {
  text: string;
  time: string;
}

export interface Chat {
  id: number;
  name: string;
  messages: ChatMessage[];
  isPhishing: boolean;
}

export const chats: Chat[] = [
  {
    id: 1,
    name: "Bank Support",
    messages: [
      {
        text: "⚠️ Dear customer, your debit card has been temporarily blocked due to suspicious activity. We noticed an attempted withdrawal from a new location.",
        time: "11:40",
      },
      {
        text: "Please verify your account immediately using this secure link: https://bank-verify-secure.com. Failure to verify may result in permanent account suspension.",
        time: "11:43",
      },
    ],
    isPhishing: true,
  },
  {
    id: 2,
    name: "HR Dept",
    messages: [
      {
        text: "Hey everyone! Just a reminder about the 3PM meeting — we’ll discuss next quarter’s team goals and share updates from upper management.",
        time: "09:10",
      },
      {
        text: "Bring your updates and ideas for improving team communication 😊",
        time: "09:15",
      },
      {
        text: "Also, we’ll celebrate the Employee of the Month at the end of the meeting 🎉",
        time: "09:17",
      },
    ],
    isPhishing: false,
  },
  {
    id: 3,
    name: "Delivery Service",
    messages: [
      {
        text: "We couldn’t deliver your package today due to an address issue. Parcel ID: #4478923",
        time: "16:30",
      },
      {
        text: "Please confirm your address here: https://ups-update.delivery-info.co to schedule redelivery.",
        time: "16:32",
      },
      {
        text: "If you don’t confirm within 24 hours, the parcel will be returned to sender.",
        time: "16:34",
      },
    ],
    isPhishing: true,
  },
  {
    id: 4,
    name: "IT Department",
    messages: [
      {
        text: "Hi team, we’ve updated our password policy to comply with new security guidelines. Passwords must include at least one uppercase letter, number, and special character.",
        time: "10:00",
      },
      {
        text: "Please log in to the internal portal to reset your credentials before Friday. Reach out if you encounter any issues.",
        time: "10:05",
      },
    ],
    isPhishing: false,
  },
  {
    id: 5,
    name: "Netflix Billing",
    messages: [
      {
        text: "Your payment was declined due to an expired card.",
        time: "14:00",
      },
      {
        text: "To avoid service interruption, please update your billing information now: https://netf1ix-billing-update.com. This is your final reminder before your account is suspended.",
        time: "14:05",
      },
    ],
    isPhishing: true,
  },
  {
    id: 6,
    name: "Team Chat",
    messages: [
      {
        text: "Morning team! Let’s do a quick sync-up tomorrow morning — just 10 minutes to align on progress. 👍",
        time: "08:51",
      },
      {
        text: "I’ll share the meeting link later today. Have a productive day everyone!",
        time: "08:52",
      },
    ],
    isPhishing: false,
  },
  {
    id: 7,
    name: "Security Alert",
    messages: [
      {
        text: "We detected an unusual login attempt from an unknown device in Berlin, Germany (IP: 182.43.22.51).",
        time: "21:00",
      },
      {
        text: "If this wasn’t you, confirm your identity here: https://appleid-verify-login.net. Account will be locked in 30 minutes if not verified.",
        time: "21:02",
      },
    ],
    isPhishing: true,
  },
  {
    id: 8,
    name: "Event Organizer",
    messages: [
      {
        text: "🎉 Reminder: Company holiday party this Friday at 7PM! Don’t forget your badge for entry.",
        time: "11:00",
      },
      {
        text: "Dinner and drinks are on us! 🍸 Dress code: Smart casual. There will be a raffle at 9PM 🎁",
        time: "11:05",
      },
      {
        text: "See you all there — it’s going to be fun!",
        time: "11:07",
      },
    ],
    isPhishing: false,
  },
  {
    id: 9,
    name: "PayPal Support",
    messages: [
      {
        text: "Your account has been limited due to suspicious activity. A new login was detected from a device in another country.",
        time: "10:22",
      },
      {
        text: "Restore full access by confirming your details: https://paypaI-resolution-center.com",
        time: "10:24",
      },
    ],
    isPhishing: true,
  },
  {
    id: 10,
    name: "Analytics Bot",
    messages: [
      {
        text: "📊 Weekly KPI Summary: Conversion up 4.2%, bounce down 1.1%.",
        time: "08:02",
      },
      {
        text: "Full campaign performance report available now. Dashboard refresh scheduled at noon.",
        time: "08:04",
      },
    ],
    isPhishing: false,
  },
  {
    id: 11,
    name: "Tax Office",
    messages: [
      {
        text: "You are eligible for a tax refund of €438.77. Claim within 24 hours using the secure form: https://national-revenue-refunds.eu.",
        time: "12:10",
      },
      {
        text: "Failure to claim may result in delayed refund processing.",
        time: "12:13",
      },
    ],
    isPhishing: true,
  },
  {
    id: 12,
    name: "Dropbox Share",
    messages: [
      {
        text: "A colleague shared a document with you: Q3_Roadmap.pdf. Open securely via the company portal.",
        time: "13:20",
      },
      {
        text: "Reminder: Shared documents auto-expire after 48 hours.",
        time: "13:23",
      },
    ],
    isPhishing: false,
  },
  {
    id: 13,
    name: "CEO Office",
    messages: [
      {
        text: "Need an urgent wire to the new vendor before 11AM. Reply here when done — I’ll send banking details shortly.",
        time: "09:05",
      },
      {
        text: "Do not delay — this is time sensitive.",
        time: "09:07",
      },
    ],
    isPhishing: true,
  },
  {
    id: 14,
    name: "Payroll",
    messages: [
      {
        text: "Payroll completed. Payslips are now available in the HR portal. Contact HR if you notice any discrepancies.",
        time: "16:40",
      },
      {
        text: "Thank you all for another great month!",
        time: "16:42",
      },
    ],
    isPhishing: false,
  },
  {
    id: 15,
    name: "Instagram",
    messages: [
      {
        text: "We detected a login attempt from a new device. If this was not you, secure your account here: https://insta-secure-check.net.",
        time: "07:57",
      },
      {
        text: "You have 15 minutes to reset before temporary lockout.",
        time: "07:58",
      },
    ],
    isPhishing: true,
  },
  {
    id: 16,
    name: "Amazon Orders",
    messages: [
      {
        text: "Your order #114-9981 has shipped via DHL (Tracking ID: 99881239). Expected delivery: tomorrow.",
        time: "14:32",
      },
      {
        text: "Track your package in the app. 📦",
        time: "14:34",
      },
    ],
    isPhishing: false,
  },
  {
    id: 17,
    name: "Microsoft 365",
    messages: [
      {
        text: "Your subscription is expiring soon. Renew now to avoid losing access: https://m1crosoft-renewal.com.",
        time: "10:00",
      },
      {
        text: "Act quickly to prevent data loss.",
        time: "10:03",
      },
    ],
    isPhishing: true,
  },
  {
    id: 18,
    name: "Parking Service",
    messages: [
      {
        text: "Unpaid parking ticket registered on your plate. Fine amount: €62.50.",
        time: "18:21",
      },
      {
        text: "Pay within 48 hours to avoid penalties: https://city-payments-billing.co.",
        time: "18:22",
      },
      {
        text: "If payment was already made, please disregard this message.",
        time: "18:24",
      },
    ],
    isPhishing: true,
  },
  {
    id: 19,
    name: "Airline Support",
    messages: [
      {
        text: "Your itinerary has changed. New departure: 10:45 Gate B12.",
        time: "07:18",
      },
      {
        text: "Tap to view your updated boarding pass in the airline app.",
        time: "07:19",
      },
      {
        text: "We apologize for the schedule change and appreciate your understanding.",
        time: "07:20",
      },
    ],
    isPhishing: false,
  },
  {
    id: 20,
    name: "Utilities",
    messages: [
      {
        text: "Your electricity bill for this month is ready. View and pay in your online account before the due date (November 5, 2025).",
        time: "09:30",
      },
      {
        text: "If you’re on auto-pay, no further action is required.",
        time: "09:31",
      },
    ],
    isPhishing: false,
  },
  {
    id: 21,
    name: "Crypto Rewards",
    messages: [
      {
        text: "🎁 Congratulations! You’ve been selected for a 5 ETH giveaway.",
        time: "12:12",
      },
      {
        text: "Claim now before it expires: https://eth-reward-airdrop.io. Limited to the first 100 participants!",
        time: "12:15",
      },
      {
        text: "Don’t miss out — your wallet is eligible for instant transfer.",
        time: "12:16",
      },
    ],
    isPhishing: true,
  },
];
