export interface IndustryData {
  id: string
  title: string
  desc: string
  metric: string
  image: string
  useCases: string[]
  detailedDesc: string
  keyBenefits: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

export const industriesData: IndustryData[] = [
  {
    id: 'ecommerce',
    title: 'eCommerce & Retail',
    desc: 'Recover lost carts, send order alerts, and sell directly inside chats.',
    metric: '35% Cart Recovery Rate',
    image: '/ecommerce_dashboard.png',
    useCases: [
      'Broadcast new seasonal collections and special coupons',
      'Automate abandoned cart notifications within 15 mins of dropout',
      'Send instantaneous order confirmation and live shipping updates',
      'Sync product inventory to Meta Catalogue and collect checkout payments'
    ],
    detailedDesc: 'For modern D2C brands, shopping cart abandonment and high customer acquisition costs are primary bottlenecks. AIGreenTick integrates directly with Shopify, WooCommerce, and custom checkout flows to engage dropouts where they are most active—WhatsApp. By syncing your Meta catalogue and setting automated payment links, customer conversion is completed entirely inside the chat window.',
    keyBenefits: [
      {
        title: 'Instant Recovery',
        description: 'Trigger automated cart recovery notifications with personalized discounts.'
      },
      {
        title: 'Catalog Syncing',
        description: 'Let users browse products, select variants, and build carts directly in WhatsApp.'
      },
      {
        title: 'Secure Checkout',
        description: 'Accept credit cards, UPI, and bank transfers safely using native payment gateways.'
      }
    ],
    faqs: [
      {
        question: 'Does this sync with my Shopify inventory?',
        answer: 'Yes. Our Shopify integration keeps stock levels, variant sizes, and pricing updated in real-time.'
      },
      {
        question: 'Are payments secure?',
        answer: 'Yes, checkout payments are processed through native Stripe, Razorpay, or Meta pay integrations.'
      }
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Wellness',
    desc: 'Simplify consultation bookings, share reports, and push alerts.',
    metric: '80% Fewer Missed Bookings',
    image: '/healthcare_dashboard.png',
    useCases: [
      'Automate appointment scheduling, rescheduling, and cancellation',
      'Send secure diagnostic lab report PDF files to patients',
      'Deploy automated reminders for medication intake and checkups',
      'Route emergency patient requests instantly to doctor desks'
    ],
    detailedDesc: 'Missed consultation slots and manual schedule follow-ups drain operational resources in medical clinics. AIGreenTick automates scheduling, pushes diagnostic reports securely as PDFs, and maintains treatment compliance through automated medication check-ins, all while guaranteeing complete privacy.',
    keyBenefits: [
      {
        title: 'Auto Reminders',
        description: 'Cut no-shows by sending secure booking details and 1-click confirmation links.'
      },
      {
        title: 'Secure PDF Delivery',
        description: 'Send lab results, prescriptions, and fitness plans directly to the patient\'s chat.'
      },
      {
        title: 'Triage Routing',
        description: 'Identify urgent medical queries and route them to live clinical staff immediately.'
      }
    ],
    faqs: [
      {
        question: 'Is patient data secure?',
        answer: 'Absolutely. We utilize WhatsApp end-to-end encryption and comply with privacy rules for data handling.'
      },
      {
        question: 'Can patients reschedule via chat?',
        answer: 'Yes. The booking bot allows patients to select a new slot or cancel in seconds.'
      }
    ]
  },
  {
    id: 'education',
    title: 'Education & EdTech',
    desc: 'Enroll students, answer course queries, and automate alerts.',
    metric: '3x Admissions Conversions',
    image: '/education_dashboard.png',
    useCases: [
      'Qualify student enrollment interest and resolve course fees FAQs',
      'Automate schedules, timetables, and exam result alerts',
      'Send secure course registration links and direct invoice reminders',
      'Enable 24/7 AI-guided student onboarding and support'
    ],
    detailedDesc: 'EdTech platforms and traditional universities struggle to qualify thousands of daily student inquiries. AIGreenTick deploys conversational AI bots to answer syllabus details, qualify enrollment intent, collect registration fees, and distribute exam notifications automatically.',
    keyBenefits: [
      {
        title: 'Lead Qualification',
        description: 'Instantly screen prospective students based on budget, background, and stream.'
      },
      {
        title: 'On-Demand Support',
        description: 'Resolve course timing, pricing, and FAQ queries 24/7 without human intervention.'
      },
      {
        title: 'Fee Collection',
        description: 'Send payment links for monthly tuitions or registration fees with auto-reminders.'
      }
    ],
    faqs: [
      {
        question: 'Can we integrate this with our CRM?',
        answer: 'Yes, we integrate with LeadSquared, HubSpot, Salesforce, and custom academic databases.'
      },
      {
        question: 'Can students submit assignments?',
        answer: 'Yes. Students can upload document attachments which our API routes directly to your database.'
      }
    ]
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    desc: 'Capture qualified buyer leads, schedule site viewings, and share brochures.',
    metric: '60% More Site Visits',
    image: '/realestate_dashboard.png',
    useCases: [
      'Qualify inbound property buyers based on budget and location preferences',
      'Share high-resolution site layout booklets and PDF catalog files',
      'Schedule in-person properties inspection and site visits dynamically',
      'Push automated alert updates to buyers when price changes happen'
    ],
    detailedDesc: 'Real estate sales teams waste hours on non-serious inquiries. AIGreenTick screens potential buyers, gathers criteria (budget, location, BHK), shares rich PDF brochures instantly, and schedules site viewings to boost conversion rates.',
    keyBenefits: [
      {
        title: 'Automatic Brochure Sharing',
        description: 'Send high-resolution architectural layout PDFs automatically on customer request.'
      },
      {
        title: 'Viewing Scheduler',
        description: 'Synchronize visits with agent calendars and send automated directions on visit day.'
      },
      {
        title: 'Active Retargeting',
        description: 'Re-engage cold database leads with real-time price reductions or new listings.'
      }
    ],
    faqs: [
      {
        question: 'Can we direct site viewings to specific agents?',
        answer: 'Yes, our shared inbox routes leads dynamically based on location or agent availability.'
      },
      {
        question: 'Are there limits on sending brochures?',
        answer: 'No, you can send unlimited PDF media files via the WhatsApp Business API.'
      }
    ]
  },
  {
    id: 'finance',
    title: 'Banking & Finance',
    desc: 'Send secure OTP verification alerts, statement updates, and loan tracking.',
    metric: 'Bank-Grade Data Security',
    image: '/finance_dashboard.png',
    useCases: [
      'Broadcast secure verification OTP numbers with instant delivery',
      'Trigger real-time transaction debit/credit alert logs',
      'Let clients query account balances and request Statements via chatbot',
      'Automate loan application tracking, status updates, and KYC followups'
    ],
    detailedDesc: 'Financial institutions must balance security with ease of access. AIGreenTick enables secure transaction alerts, instant OTP dispatch, account statement requests, and automated loan processing updates with bank-grade security.',
    keyBenefits: [
      {
        title: 'OTP Dispatch',
        description: 'Deliver verification codes with low latency and fallback options.'
      },
      {
        title: 'Self-Serve Portal',
        description: 'Provide instant balance lookups, interest rate FAQs, and branch directories on chat.'
      },
      {
        title: 'Application Tracking',
        description: 'Send auto-updates on loan and credit card processing, requesting missing document uploads.'
      }
    ],
    faqs: [
      {
        question: 'Does this comply with security standards?',
        answer: 'Yes, all communications are encrypted, and we support ISO/IEC compliance setups for enterprises.'
      },
      {
        question: 'How fast are OTPs delivered?',
        answer: 'OTPs are sent via Meta\'s priority transaction lines, typically arriving in under 3 seconds.'
      }
    ]
  },
  {
    id: 'travel',
    title: 'Travel & Hospitality',
    desc: 'Send flight alerts, boarding passes, itineraries, and 24/7 support.',
    metric: '92% Customer Satisfaction',
    image: '/travel_dashboard.png',
    useCases: [
      'Send instantaneous flight, hotel, and bus booking tickets',
      'Distribute live check-in instructions and hotel location details',
      'Share customized trip itineraries and travel guidance brochures',
      'Deploy 24/7 AI concierge bots to resolve reservation FAQs'
    ],
    detailedDesc: 'Travelers expect timely, context-aware information. AIGreenTick connects with GDS, airlines, and hotel management systems to send boarding passes, check-in instructions, and trip itineraries directly to customer phones.',
    keyBenefits: [
      {
        title: 'Instant Tickets',
        description: 'Deliver ticket confirmations and boarding passes as soon as booking is processed.'
      },
      {
        title: 'Live Alerts',
        description: 'Push real-time gate changes, flight delays, and check-in times automatically.'
      },
      {
        title: 'AI Concierge',
        description: 'Let travelers query breakfast timings, request extra towels, or book tours on chat.'
      }
    ],
    faqs: [
      {
        question: 'Can we send booking details to international numbers?',
        answer: 'Yes, WhatsApp is global, allowing you to reach international travelers without SMS roaming fees.'
      },
      {
        question: 'Can customers upload passport copies?',
        answer: 'Yes, images can be sent securely through chat to expedite mobile check-in.'
      }
    ]
  }
]
