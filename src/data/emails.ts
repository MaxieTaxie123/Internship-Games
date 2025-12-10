export interface Email {
  id: number;
  icon?: string;
  subject: string;
  date: Date;
  sender: string;
  body: string;
  isPhishing: boolean;
}

export const emails: Email[] = [
  {
    id: 1,
    icon: "",
    subject: "Your account has been suspended!",
    date: new Date("2024-10-01T10:00:00Z"),
    sender: "support@paypa1.com",
    body: `Dear Customer,

We’ve detected unusual activity on your PayPal account and have temporarily limited access for your protection.  
Please verify your account immediately to restore full access.

👉 Click the link below to confirm your details and reactivate your account:  
https://paypa1.com/secure/verify

Failure to verify your account within 24 hours may result in permanent suspension.

Thank you for your prompt attention,  
PayPal Security Team`,
    isPhishing: true,
  },
  {
    id: 2,
    icon: "",
    subject: "Team Lunch Tomorrow 🍕",
    date: new Date("2024-10-02T12:00:00Z"),
    sender: "hr@yourcompany.com",
    body: `Hi everyone,

Just a reminder that we’re having our monthly team lunch tomorrow at noon in the cafeteria.  
Pizza and drinks will be provided — feel free to bring dessert or snacks to share.

See you all there!  
– HR Department`,
    isPhishing: false,
  },
  {
    id: 3,
    icon: "",
    subject: "Security Update Required",
    date: new Date("2024-10-03T09:30:00Z"),
    sender: "it-department@company.com",
    body: `Dear Employee,

A new mandatory security update has been released for all company devices.  
Please install the latest patch from the official IT portal by the end of the day to stay compliant.

Visit: https://intranet.company.com/security-updates  
If you encounter issues, contact IT Support via Teams.

Best,  
IT Department`,
    isPhishing: false,
  },
  {
    id: 4,
    icon: "",
    subject: "Claim your $500 Amazon Gift Card!",
    date: new Date("2024-10-04T15:45:00Z"),
    sender: "rewards@amaz0n.com",
    body: `Congratulations!

You’ve been selected to receive a $500 Amazon Gift Card as part of our loyalty rewards program.  
To claim your reward, please click the link below and fill out the short confirmation form.

👉 Claim your gift card here:  
https://amaz0n-rewards.com/claim

Act fast — this offer expires in 24 hours!`,
    isPhishing: true,
  },
  {
    id: 5,
    icon: "",
    subject: "Invoice INV-2025-007 — Due Today",
    date: new Date("2024-10-05T08:20:00Z"),
    sender: "billing@invoices-pay.com",
    body: `Dear Customer,

Please find attached your invoice INV-2025-007 for the recent services rendered.  
Payment is due today to avoid additional late fees.

Open the attached PDF and follow the instructions to complete your payment securely.

Kind regards,  
Accounts Billing`,
    isPhishing: true,
  },
  {
    id: 6,
    icon: "",
    subject: "Monthly Payroll Notice",
    date: new Date("2024-10-06T14:10:00Z"),
    sender: "payroll@yourcompany.com",
    body: `Hi Team,

Payroll for this month has been processed successfully.  
You can view or download your payslip via the company HR portal.

If you notice any discrepancies, please reach out to payroll support before Friday.

Thanks,  
Finance Department`,
    isPhishing: false,
  },
  {
    id: 7,
    icon: "",
    subject: "Reset your password",
    date: new Date("2024-10-07T11:05:00Z"),
    sender: "no-reply@github.com",
    body: `Hello,

We heard that you lost your GitHub password. Sorry about that!

But don’t worry! You can use the following button to reset your password:

👉 Reset Password: https://github-gitsecure.com/reset

If you don’t use this link within 3 hours, it will expire. 

If you didn’t request this, please ignore this message. Your account remains safe.

Thanks,
The GitHub Team`,
    isPhishing: true,
  },
  {
    id: 8,
    icon: "",
    subject: "Updated Benefits Enrollment Deadline",
    date: new Date("2024-10-08T16:30:00Z"),
    sender: "benefits@hr.yourcompany.com",
    body: `Hi all,

We’ve extended the employee benefits enrollment deadline to next Friday.  
Please review your current selections and make any updates before the new cutoff date.

You can access the secure HR portal here:  
https://intranet.hrportal.com/benefits

– HR Team`,
    isPhishing: false,
  },
  {
    id: 9,
    icon: "",
    subject: "Unusual sign-in attempt",
    date: new Date("2024-10-09T13:15:00Z"),
    sender: "security@goog1e.com",
    body: `Hello,

We detected a sign-in attempt from a new device in your account.  
If this was you, no further action is required. If not, please secure your account immediately.

👉 Verify identity: https://goog1e-security.com/login

Thanks,  
Google Security Team`,
    isPhishing: true,
  },
  {
    id: 10,
    icon: "",
    subject: "Package Delivery Attempted — Action Required",
    date: new Date("2024-10-10T10:50:00Z"),
    sender: "delivery@ups-notify.com",
    body: `Dear Customer,

We attempted to deliver your package today 11:00 AM, but nobody was available to sign for it.  
Please click below to reschedule the delivery or confirm your address.

👉 Reschedule delivery: https://ups-track-center.com

Thank you for choosing UPS.`,
    isPhishing: true,
  },
  {
    id: 11,
    icon: "",
    subject: "Calendar Invite: Project Kickoff",
    date: new Date("2024-10-11T09:00:00Z"),
    sender: "product.manager@yourcompany.com",
    body: `Hi Team,

Please accept the calendar invite for our Project Kickoff meeting on Wednesday at 10:00 AM.  
Agenda:
- Introductions
- Project goals & milestones
- Next steps

Looking forward to seeing everyone there!  
– Product Management`,
    isPhishing: false,
  },
  {
    id: 12,
    icon: "",
    subject: "You were tagged in a photo",
    date: new Date("2024-10-12T14:25:00Z"),
    sender: "notifications@facebook.com",
    body: `Hi,

Your friend tagged you in a new photo.  
Click the link below to view it on your profile.

👉 View photo: https://facebook-securitylogin.com

Thanks,  
Facebook Team`,
    isPhishing: true,
  },
  {
    id: 13,
    icon: "",
    subject: "Action required: Tax refund available",
    date: new Date("2024-10-13T12:40:00Z"),
    sender: "taxes@national-revenue.gov",
    body: `Dear Taxpayer,

Our records show that you are eligible for a tax refund of €489.72.  
To receive your refund, please fill out the secure form linked below.

👉 Claim refund: https://gov-refund-service.com

Failure to complete the form within 3 days will result in refund cancellation.

Sincerely,  
National Revenue Service`,
    isPhishing: true,
  },
  {
    id: 14,
    icon: "",
    subject: "Weekly Sales Report",
    date: new Date("2024-10-14T11:55:00Z"),
    sender: "analytics@yourcompany.com",
    body: `Hi all,

Attached is the weekly sales report (Week 41).  
Highlights:
- Total sales increased by 4.2%
- Conversion rate up by 1.1%
- Top performer: Product Line C

Let me know if you spot any anomalies or data mismatches.  
Best,  
Analytics Department`,
    isPhishing: false,
  },
  {
    id: 15,
    icon: "",
    subject: "Refund processed: $89.99",
    date: new Date("2024-10-17T15:10:00Z"),
    sender: "support@streaming-service.com",
    body: `Hi,

We’ve successfully processed your refund of $89.99.  
If you did not request this refund, please click below to dispute the transaction immediately.

👉 Dispute Refund: https://streaming-refunds.com

Thanks,  
Streaming Service Support`,
    isPhishing: true,
  },
  {
    id: 16,
    icon: "",
    subject: "Shared document: Q3 Roadmap (View)",
    date: new Date("2024-10-18T13:00:00Z"),
    sender: "storage@dropbox-mail.com",
    body: `Hello,

Your colleague shared a document with you titled "Q3 Roadmap".  
Click the link below to view the file securely.

👉 View Document: https://dropbox-fileshare.com

Thank you,  
Dropbox Team`,
    isPhishing: true,
  },
  {
    id: 17,
    icon: "",
    subject: "Welcome to the company!",
    date: new Date("2024-10-19T09:45:00Z"),
    sender: "onboarding@yourcompany.com",
    body: `Welcome aboard!

We’re excited to have you on the team. Attached you’ll find your onboarding checklist and your first-week schedule.  
Please complete the initial setup steps before your first day.

Let’s make this a great start!  
– HR Onboarding`,
    isPhishing: false,
  },
  {
    id: 18,
    icon: "",
    subject: "Final Warning: Remove unauthorized device",
    date: new Date("2024-10-20T16:35:00Z"),
    sender: "security@apple.com",
    body: `Dear Customer,

An unauthorized device has been linked to your Apple ID.  
If you did not perform this action, remove the device immediately to protect your account.

👉 Manage Devices: https://apple-securityid.com

Thank you,  
Apple Security Team`,
    isPhishing: true,
  },
  {
    id: 19,
    icon: "",
    subject: "Package is awaiting for pickup",
    date: new Date("2024-10-21T10:15:00Z"),
    sender: "no-reply@arnazon.com",
    body: `Dear Customer,

Your package is being held at the local facility.  
Please arrange pickup by confirming your address via the link below.

👉 Schedule Pickup: https://arnazon-tracking.com

Sincerely,  
Amazon Delivery Services`,
    isPhishing: true,
  },
  {
    id: 20,
    icon: "",
    subject: "Quick update on your account",
    date: new Date("2024-10-22T10:15:00Z"),
    sender: "asmI@customer-service.com",
    body: `Dear Employee,

We have made a quick update to your account settings.  
Please log in to your account to review the changes.`,
    isPhishing: true,
  },
];
