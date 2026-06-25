"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Check,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen
} from "lucide-react";
import {
  fetchPricingPageData,
  convertMarkdownToHtml,
  getStrapiMediaUrl,
  type StrapiPricingPageData,
  type StrapiPricingPlan,
  type StrapiFAQCategory
} from "@/lib/api";
import Pricing from "@/components/Pricing";

// Custom Strapi Rich Text Blocks Renderer
function renderStrapiBlocks(blocks: any[] | null | undefined): React.ReactNode {
  if (!blocks || !Array.isArray(blocks)) return null;

  return blocks.map((block, idx) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={idx} className="mb-4 text-neutral-500 leading-relaxed font-sans text-xs sm:text-sm last:mb-0">
            {block.children?.map((child: any, cIdx: number) => {
              let textNode: React.ReactNode = child.text;
              if (child.bold) {
                textNode = <strong key={cIdx} className="text-black font-semibold">{textNode}</strong>;
              }
              if (child.italic) {
                textNode = <em key={cIdx}>{textNode}</em>;
              }
              if (child.underline) {
                textNode = <u key={cIdx}>{textNode}</u>;
              }
              if (child.strikethrough) {
                textNode = <s key={cIdx}>{textNode}</s>;
              }
              if (child.code) {
                textNode = <code key={cIdx} className="bg-neutral-200/50 px-1 py-0.5 rounded font-mono text-xs">{child.text}</code>;
              }
              return <React.Fragment key={cIdx}>{textNode}</React.Fragment>;
            })}
          </p>
        );
      case "heading": {
        const HeadingTag = `h${block.level || 2}` as keyof React.JSX.IntrinsicElements;
        const headingClasses: Record<number, string> = {
          1: "text-2xl sm:text-3xl font-bold font-sans tracking-tight text-black mb-4",
          2: "text-xl sm:text-2xl font-sans font-bold text-black mb-3",
          3: "text-lg sm:text-xl font-sans font-bold text-black mb-2",
          4: "text-base sm:text-lg font-sans font-bold text-black mb-2",
          5: "text-sm sm:text-base font-sans font-bold text-black mb-1",
          6: "text-xs sm:text-sm font-sans font-bold text-black mb-1",
        };
        return (
          <HeadingTag key={idx} className={headingClasses[block.level || 2] || headingClasses[2]}>
            {block.children?.map((child: any) => child.text).join("")}
          </HeadingTag>
        );
      }
      case "list": {
        const ListTag = block.format === "ordered" ? "ol" : "ul";
        const listClass = block.format === "ordered"
          ? "list-decimal pl-5 mb-4 font-sans text-xs sm:text-sm text-neutral-500 space-y-1"
          : "list-disc pl-5 mb-4 font-sans text-xs sm:text-sm text-neutral-500 space-y-1";
        return (
          <ListTag key={idx} className={listClass}>
            {block.children?.map((item: any, itemIdx: number) => (
              <li key={itemIdx}>
                {item.children?.map((child: any, cIdx: number) => {
                  let t: React.ReactNode = child.text;
                  if (child.bold) t = <strong key={cIdx} className="text-black font-semibold">{t}</strong>;
                  if (child.italic) t = <em key={cIdx}>{t}</em>;
                  return <React.Fragment key={cIdx}>{t}</React.Fragment>;
                })}
              </li>
            ))}
          </ListTag>
        );
      }
      case "quote":
        return (
          <blockquote key={idx} className="border-l-4 border-[#00b259] pl-4 my-4 italic text-neutral-700 font-sans text-xs sm:text-sm">
            {block.children?.map((child: any) => child.text).join("")}
          </blockquote>
        );
      default:
        return (
          <div key={idx} className="text-xs sm:text-sm text-neutral-500">
            {block.children?.map((child: any) => child.text).join("")}
          </div>
        );
    }
  });
}

// Complete local fallback dataset matching the user mockup screenshots
const fallbackData = {
  Pricing_Hero: {
    badge: ":: FLAT RATE FEES ::",
    title: "Simple pricing. No surprises. No markups.",
    description: [
      {
        type: "paragraph",
        children: [
          { text: "One flat monthly fee based on your plan. WhatsApp conversation charges billed at Meta's official rates — we don't mark them up. What you see is what you pay." }
        ]
      }
    ]
  },
  pricingPlansSection: {
    sectionBadge: ":: DYNAMIC PLANS ::",
    sectionTitle: "Select your business tier",
    sectionDescription: "Start a 14-day free trial on Starter, Growth, or Business. No credit card required.",
    annualDiscount: 20,
    enableCurrencyToggle: true,
    enableYearlyToggle: true
  },
  pricing_plans: [
    {
      id: 1,
      documentId: "fallback-starter",
      title: "Starter",
      description: "Best for Small businesses and solo operators",
      monthlyPrice: 1999,
      yearlyPrice: 1599,
      buttonText: "START FREE TRIAL",
      buttonLink: "#demo",
      sortOrder: 1,
      borderHighlight: false,
      currency: "INR (₹)" as const,
      planType: "starter" as const,
      features: [
        { id: 1, text: "1 WhatsApp number" },
        { id: 2, text: "Up to 3 agents" },
        { id: 3, text: "Basic chatbot (5 flows)" },
        { id: 4, text: "Bulk campaigns" },
        { id: 5, text: "Shopify Integration" },
        { id: 6, text: "Standard support" }
      ],
      icon: null
    },
    {
      id: 2,
      documentId: "fallback-growth",
      title: "Growth",
      description: "Best for Growing SMBs and D2C brands",
      monthlyPrice: 4999,
      yearlyPrice: 3999,
      buttonText: "START FREE TRIAL",
      buttonLink: "#demo",
      sortOrder: 2,
      borderHighlight: true,
      currency: "INR (₹)" as const,
      planType: "growth" as const,
      features: [
        { id: 7, text: "1 WhatsApp number" },
        { id: 8, text: "Unlimited agents" },
        { id: 9, text: "Advanced chatbot (unlimited flows)" },
        { id: 10, text: "Bulk campaigns + segmentation" },
        { id: 11, text: "All integrations (100+)" },
        { id: 12, text: "WhatsApp Commerce" },
        { id: 13, text: "Campaign analytics" },
        { id: 14, text: "Priority support + onboarding" }
      ],
      icon: null
    },
    {
      id: 3,
      documentId: "fallback-business",
      title: "Business",
      description: "Best for Established businesses with high volume",
      monthlyPrice: 14999,
      yearlyPrice: 11999,
      buttonText: "START FREE TRIAL",
      buttonLink: "#demo",
      sortOrder: 3,
      borderHighlight: false,
      currency: "INR (₹)" as const,
      planType: "business" as const,
      features: [
        { id: 15, text: "3 WhatsApp numbers" },
        { id: 16, text: "Unlimited agents" },
        { id: 17, text: "AI chatbot with NLU" },
        { id: 18, text: "Advanced automation workflows" },
        { id: 19, text: "Full CRM Integrations" },
        { id: 20, text: "WhatsApp Commerce + analytics" },
        { id: 21, text: "Green Tick application support" },
        { id: 22, text: "Dedicated account manager" }
      ],
      icon: null
    },
    {
      id: 4,
      documentId: "fallback-enterprise",
      title: "Enterprise",
      description: "Best for Large teams, agencies, and multi-brand operations",
      monthlyPrice: null,
      yearlyPrice: null,
      buttonText: "TALK TO SALES",
      buttonLink: "#demo",
      sortOrder: 4,
      borderHighlight: false,
      currency: "INR (₹)" as const,
      planType: "enterprise" as const,
      features: [
        { id: 23, text: "Unlimited numbers" },
        { id: 24, text: "Unlimited agents" },
        { id: 25, text: "Custom AI chatbot" },
        { id: 26, text: "Advanced automation + custom API" },
        { id: 27, text: "White-label reporting (agencies)" },
        { id: 28, text: "SSO + role-based access + SLA" },
        { id: 29, text: "Custom onboarding program" }
      ],
      icon: null
    }
  ],
  metaConversationFees: {
    badge: ":: META CONVERSATION FEES ::",
    title: "How WhatsApp conversation charges work.",
    description: [
      {
        type: "paragraph",
        children: [
          { text: "Meta charges per 24-hour conversation window, not per message. Rates vary by conversation category. AIGreenTick charges Meta's official rates with " },
          { text: "zero markup.", bold: true }
        ]
      }
    ],
    ctaText: "VIEW OFFICIAL META RATE CARD ->",
    ctaLink: "https://developers.facebook.com/docs/whatsapp/pricing",
    rows: [
      { id: 1, category: "Marketing", description: "Promotional messages you initiate (offers, newsletters)", rate: "See Meta pricing", color: "red" as const },
      { id: 2, category: "Utility", description: "Transactional messages (orders, confirmations, shipping alerts)", rate: "See Meta pricing", color: "blue" as const },
      { id: 3, category: "Authentication", description: "Secure OTPs, verifications and login alerts", rate: "See Meta pricing", color: "yellow" as const },
      { id: 4, category: "Service", description: "Customer-initiated inquiries and direct support chats", rate: "Free (within 24hr window)", color: "green" as const }
    ]
  },
  comparison_Section: {
    badge: ":: COMPARE CAPABILITIES ::",
    title: "What you get vs what competitors charge.",
    description: "Before choosing a WhatsApp platform, check the fine print. See how AIGreenTick eliminates billing barriers.",
    rows: [
      { id: 1, feature: "Unlimited agents", aisensy: "Extra (Per User charges)", wati: "Extra (Per User charges)", interakt: "Extra (Per User charges)", aigreentick: "Included (All Plans)" },
      { id: 2, feature: "AI chatbot", aisensy: "Extra add-on pricing", wati: "Extra add-on pricing", interakt: "Basic Flows only", aigreentick: "All plans (No add-ons)" },
      { id: 3, feature: "WhatsApp Commerce", aisensy: "✕ Not available", wati: "✕ Not available", interakt: "✕ Not available", aigreentick: "✓ Included fully" },
      { id: 4, feature: "Green Tick managed", aisensy: "✕ Pay setup fees", wati: "✕ Pay setup fees", interakt: "✕ Pay setup fees", aigreentick: "✓ Managed free" },
      { id: 5, feature: "India-based support", aisensy: "✕ Ticket queues only", wati: "✕ Ticket queues only", interakt: "Limited support hours", aigreentick: "✓ 24/7 Phone + Chat" },
      { id: 6, feature: "Meta rate markup", aisensy: "Yes (up to 15%)", wati: "Yes (up to 20%)", interakt: "Yes (up to 10%)", aigreentick: "None (0% markup)" },
      { id: 7, feature: "Free onboarding", aisensy: "✕ Paid setup support", wati: "✕ Paid setup support", interakt: "✕ Paid setup support", aigreentick: "✓ Included free" }
    ]
  },
  FAQ: {
    badge: ":: FAQ ::",
    title: "Answers to questions you might have",
    description: [
      {
        type: "paragraph",
        children: [
          { text: "Find quick answers to common questions about setting up your official WhatsApp Business API account." }
        ]
      }
    ],
    faqCategories: [
      {
        id: 1,
        title: "Pricing & Plans",
        items: [
          { id: 1, question: "Is there a free trial?", answer: [{ type: "paragraph", children: [{ text: "Yes. We offer a 14-day free trial on all Starter, Growth, and Business plans with full platform access. No credit card details are required to sign up." }] }] },
          { id: 2, question: "Do you charge per agent?", answer: [{ type: "paragraph", children: [{ text: "No. AIGreenTick does not charge per agent. All plans include unlimited agent seats (except for the Starter tier, which is capped at 3 agents) so your entire support and sales teams can collaborate." }] }] },
          { id: 3, question: "What happens if I exceed my plan's conversation limits?", answer: [{ type: "paragraph", children: [{ text: "There are no surprise charges. If you exceed the direct thresholds, extra conversation windows are billed directly at Meta's official rates. We never charge overage fees or platform penalty rates." }] }] },
          { id: 4, question: "Can I change plans mid-month?", answer: [{ type: "paragraph", children: [{ text: "Yes. Upgrades take effect immediately and are pro-rated. Downgrades take effect at the start of your next billing cycle, ensuring you get full access to what you paid for." }] }] },
          { id: 5, question: "Is there a discount for annual billing?", answer: [{ type: "paragraph", children: [{ text: "Yes. If you choose annual billing, we offer a significant 20% discount across all Starter, Growth, and Business plans, which is billed annually." }] }] }
        ]
      },
      {
        id: 2,
        title: "API & Verification",
        items: [
          { id: 6, question: "What is the WhatsApp Business API and do I need it?", answer: [{ type: "paragraph", children: [{ text: "WhatsApp Business API is the official Meta product designed for businesses that need to message customers at scale (5+ agents or 1000+ messages/day). Unlike the free WhatsApp Business app, the API supports automation, integrations and multi-agent inboxes. AI Greentick is an Official BSP — we get you set up in 10 minutes." }] }] },
          { id: 7, question: "Can I get the Green Tick verification?", answer: [{ type: "paragraph", children: [{ text: "Yes. We help you apply for the WhatsApp Green Tick (verified business badge) for free on all paid plans. Approval depends on Meta's criteria — typically requires public press mentions and active business presence." }] }] },
          { id: 8, question: "Will my existing WhatsApp Business app data transfer?", answer: [{ type: "paragraph", children: [{ text: "When you move to the WhatsApp Business API, you migrate the number — but the chat history in the WhatsApp Business app doesn't carry over. We recommend backing up important conversations before migration." }] }] },
          { id: 9, question: "Can I use my existing number?", answer: [{ type: "paragraph", children: [{ text: "Yes, but the number must be removed from the WhatsApp Business app or personal WhatsApp first. Once it's on the API, you can't use it in the consumer apps simultaneously." }] }] }
        ]
      }
    ]
  }
};

export default function PricingPage() {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<StrapiPricingPageData | null>(null);

  // Client States
  const [activeFaqTab, setActiveFaqTab] = useState<string>("Pricing & Plans");
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

  // Fetch Strapi Content on Mount
  useEffect(() => {
    async function loadPricing() {
      try {
        const data = await fetchPricingPageData();
        // Only use Strapi if it contains a Pricing_Hero record and pricing plans. 
        // Otherwise, fall back to our premium mockup data to avoid template layout mismatches.
        if (data && data.Pricing_Hero && data.pricing_plans && data.pricing_plans.length > 0 && !data.pricing_plans.some(p => p.title === "Free" || p.title === "Premium")) {
          setPageData(data);
        }
      } catch (err) {
        console.error("Failed to load dynamic Strapi pricing data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPricing();
  }, []);

  // Resolve Active Content (Strapi or local Mockup Fallback)
  const content = useMemo(() => {
    return pageData || fallbackData;
  }, [pageData]);

  // Sync state for tab selections when categories load
  const faqCategories: StrapiFAQCategory[] = useMemo(() => {
    return content.FAQ?.faqCategories || [];
  }, [content]);

  useEffect(() => {
    if (faqCategories.length > 0) {
      setActiveFaqTab(faqCategories[0].title);
    }
  }, [faqCategories]);

  // Accordion Toggler
  const toggleFaq = (id: string) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Loading skeleton block
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 text-center bg-[#ECEBE9] text-black font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 rounded-full border-2 border-[#00b259] border-t-transparent animate-spin" />
          <span className="text-xs font-bold tracking-widest text-[#00b259]">SYNCING PRICING METRICS...</span>
        </div>
      </div>
    );
  }

  // Active Category Items for current Tab
  const activeFaqItems = faqCategories.find(cat => cat.title === activeFaqTab)?.items || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black pb-12">
      {/* Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
            {content.Pricing_Hero?.badge || ":: FLAT RATE FEES ::"}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight leading-none text-black">
            {content.Pricing_Hero?.title || "Simple pricing. No surprises. No markups."}
          </h1>
          <div className="max-w-3xl mx-auto">
            {renderStrapiBlocks(content.Pricing_Hero?.description)}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Principle 1 */}
            <div className="border border-[#C5C4C2] bg-[#ECEBE9] p-6 font-sans space-y-3 relative"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))" }}
            >
              <span className="absolute top-2 right-2 text-xs font-bold text-[#00b259]">[ 01 ]</span>
              <h3 className="text-sm font-black text-black">NO HIDDEN FEES</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                No per-agent charges. No setup fees. No overage surprises. Access features fully within your plan.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="border border-[#C5C4C2] bg-[#ECEBE9] p-6 font-sans space-y-3 relative"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))" }}
            >
              <span className="absolute top-2 right-2 text-xs font-bold text-[#00b259]">[ 02 ]</span>
              <h3 className="text-sm font-black text-black">META RATES, NO MARKUP</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                Meta conversation charges are billed directly at official Rates. We have absolute zero markup on conversation charges.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="border border-[#C5C4C2] bg-[#ECEBE9] p-6 font-sans space-y-3 relative"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))" }}
            >
              <span className="absolute top-2 right-2 text-xs font-bold text-[#00b259]">[ 03 ]</span>
              <h3 className="text-sm font-black text-black">MONTH-TO-MONTH</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                No annual contract required to get started. Cancel or change plans anytime directly from your billing tab.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Plans Section */}
      <Pricing pageData={pageData} />

      {/* Meta Conversation Charges */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">

          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-mono">
              {content.metaConversationFees?.badge || ":: META CONVERSATION FEES ::"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-black">
              {content.metaConversationFees?.title || "How WhatsApp conversation charges work."}
            </h2>
            <div className="text-neutral-500 font-sans text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              {renderStrapiBlocks(content.metaConversationFees?.description)}
            </div>
          </div>

          {/* Grid Layout of table and info cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
            {/* Left table column */}
            <div
              className="lg:col-span-8 border border-[#C5C4C2] bg-[#ECEBE9] overflow-hidden"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead>
                    <tr className="bg-black text-[#ECEBE9] border-b border-[#C5C4C2] text-[10px] tracking-wider uppercase font-bold">
                      <th className="p-4 sm:p-5">Category</th>
                      <th className="p-4 sm:p-5">Description</th>
                      <th className="p-4 sm:p-5 text-right">Typical Rate (India)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C5C4C2]/50 text-neutral-800">
                    {content.metaConversationFees?.rows?.map((row) => {
                      const colorMap = {
                        red: "bg-red-500",
                        blue: "bg-blue-500",
                        yellow: "bg-yellow-500",
                        green: "bg-[#00b259]"
                      };
                      const colorClass = colorMap[row.color || "blue"] || "bg-blue-500";
                      const isFree = row.rate.toLowerCase().includes("free");

                      return (
                        <tr key={row.id} className="hover:bg-white/30 transition-colors">
                          <td className="p-4 font-bold text-black flex items-center gap-1.5">
                            <span className={`size-2 rounded-full ${colorClass}`} /> {row.category}
                          </td>
                          <td className="p-4 font-sans text-neutral-500">{row.description}</td>
                          <td className={`p-4 text-right font-bold ${isFree ? "text-[#00b259]" : "text-black"}`}>
                            {row.rate}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right card column */}
            <div
              className="lg:col-span-4 border border-[#C5C4C2] bg-[#ECEBE9] p-6 space-y-6 flex flex-col justify-between"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))" }}
            >
              <div className="space-y-4">
                <h4 className="text-xs font-black text-black">ZERO CONVERSATION MARKUP</h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                  Unlike competitors who charge extra commissions or bundle messages at markup rates, AIGreenTick offers transparent pass-through pricing. We bill exactly what Meta bills us.
                </p>
              </div>

              <div className="pt-4 border-t border-[#C5C4C2]/40">
                <a
                  href={content.metaConversationFees?.ctaLink || "https://developers.facebook.com/docs/whatsapp/pricing"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00b259] hover:underline"
                >
                  {content.metaConversationFees?.ctaText || "VIEW OFFICIAL META RATE CARD ->"}
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Competitor Matrix Section */}
      <section id="comparison-matrix" className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/50">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-24 space-y-12">

          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-mono">
              {content.comparison_Section?.badge || ":: COMPARE CAPABILITIES ::"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-black">
              {content.comparison_Section?.title || "What you get vs what competitors charge."}
            </h2>
            <p className="text-neutral-500 font-sans text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              {content.comparison_Section?.description}
            </p>
          </div>

          {/* Matrix Table */}
          <div
            className="border border-[#C5C4C2] bg-[#ECEBE9] overflow-hidden font-sans"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-black text-[#ECEBE9] border-b border-[#C5C4C2] text-[10px] tracking-wider uppercase font-bold">
                    <th className="p-4 sm:p-5">Feature</th>
                    <th className="p-4 sm:p-5 text-neutral-400">AiSensy</th>
                    <th className="p-4 sm:p-5 text-neutral-400">WATI</th>
                    <th className="p-4 sm:p-5 text-neutral-400">Interakt</th>
                    <th className="p-4 sm:p-5 bg-[#ECEBE9] border-l border-r border-[#C5C4C2]">
                      <div className="flex items-center justify-center font-bold text-black text-center tracking-tight text-[11px] font-sans">
                        :: AIGREENTICK ::
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C5C4C2]/50 text-neutral-800">
                  {content.comparison_Section?.rows?.map((row) => (
                    <tr key={row.id} className="hover:bg-white/30 transition-colors">
                      <td className="p-4 font-bold text-black">{row.feature}</td>
                      <td className="p-4 font-sans text-neutral-500">{row.aisensy}</td>
                      <td className="p-4 font-sans text-neutral-500">{row.wati}</td>
                      <td className="p-4 font-sans text-neutral-500">{row.interakt}</td>
                      <td className="p-4 font-bold text-[#00b259] bg-[#00b259]/5 border-l border-r border-[#C5C4C2]/30">
                        {row.aigreentick}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-24 space-y-12">

          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-mono">
              {content.FAQ?.badge || ":: FAQ ::"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-black">
              {content.FAQ?.title || "Answers to questions you might have"}
            </h2>
            <div className="text-neutral-500 font-sans text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              {renderStrapiBlocks(content.FAQ?.description)}
            </div>
          </div>

          {/* FAQ categories and accordion container */}
          <div className="max-w-4xl mx-auto space-y-8 font-sans">

            {/* Tabs selector */}
            {faqCategories.length > 1 && (
              <div className="flex items-center justify-center gap-2 border-b border-[#C5C4C2]/40 pb-4">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFaqTab(category.title)}
                    className={`px-4 py-2 text-xs font-bold font-mono transition-all cursor-pointer ${activeFaqTab === category.title
                      ? "bg-black text-[#ECEBE9] border border-black"
                      : "border border-[#C5C4C2] text-neutral-500 hover:text-black hover:border-black"
                      }`}
                  >
                    {category.title.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            {/* Accordion Questions */}
            <div className="space-y-4 font-sans">
              {activeFaqItems.map((item) => {
                const isExpanded = !!expandedFaqs[item.id];
                return (
                  <div
                    key={item.id}
                    className="border border-[#C5C4C2] bg-[#ECEBE9] overflow-hidden transition-all duration-300"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px))" }}
                  >
                    {/* Header bar */}
                    <button
                      onClick={() => toggleFaq(item.id.toString())}
                      className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-black hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <span className="font-sans font-bold text-black">{item.question}</span>
                      {isExpanded ? (
                        <ChevronUp className="size-4 text-[#00b259] shrink-0" />
                      ) : (
                        <ChevronDown className="size-4 text-neutral-500 shrink-0" />
                      )}
                    </button>

                    {/* Answer content (collapsible) */}
                    {isExpanded && (
                      <div className="px-6 pb-5 pt-1 border-t border-[#C5C4C2]/20 bg-white/20 animate-in fade-in duration-200">
                        {renderStrapiBlocks(item.answer)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="px-4 sm:px-6 lg:px-8 bg-[#ECEBE9]">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-black">
            Start free. Scale as you grow.
          </h2>
          <p className="text-neutral-500 font-sans text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Ready to unleash official WhatsApp API power? Sign up for your 14-day free trial now or schedule a consultation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-mono">
            <Link
              href="#demo"
              className="px-6 py-3 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity"
              style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
            >
              START 14-DAY FREE TRIAL
            </Link>
            <Link
              href="#demo"
              className="px-6 py-3 text-xs font-black text-black border border-[#C5C4C2] hover:bg-neutral-200/50 transition-colors"
              style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
            >
              TALK TO SALES
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
