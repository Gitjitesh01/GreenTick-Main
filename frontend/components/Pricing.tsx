'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { convertMarkdownToHtml, getStrapiMediaUrl, type StrapiPricingPageData, type StrapiPricingPlan } from '@/lib/api'

type PricingProps = {
  showHeaders?: boolean
  pageData?: StrapiPricingPageData | null
}

const fallbackPlans = [
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
]

const Pricing = ({ showHeaders = true, pageData = null }: PricingProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')

  // Resolve active plans from API pageData or local fallback list
  const activePlans = useMemo(() => {
    if (
      pageData &&
      pageData.pricing_plans &&
      pageData.pricing_plans.length > 0 &&
      !pageData.pricing_plans.some(p => p.title === "Free" || p.title === "Premium")
    ) {
      return [...pageData.pricing_plans].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    }
    return fallbackPlans
  }, [pageData])

  const formatPrice = (plan: any) => {
    if (plan.title.toLowerCase() === 'enterprise' || (plan.monthlyPrice === null && plan.yearlyPrice === null)) {
      return 'CUSTOM'
    }

    const isMock = plan.documentId?.startsWith('fallback-') || !plan.documentId
    if (isMock) {
      if (currency === 'INR') {
        const value = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
        return `₹${value?.toLocaleString('en-IN')}`
      } else {
        // Use user hint prices for USD
        const titleLower = plan.title.toLowerCase()
        if (titleLower === 'starter') {
          return billingCycle === 'monthly' ? '$25' : '$20'
        } else if (titleLower === 'growth') {
          return billingCycle === 'monthly' ? '$65' : '$52'
        } else if (titleLower === 'business') {
          return billingCycle === 'monthly' ? '$199' : '$159'
        }
        return 'CUSTOM'
      }
    } else {
      // Dynamic Strapi values from backend database
      const monthly = plan.monthlyPrice || 0
      const yearly = plan.yearlyPrice || Math.round(monthly * 0.8)
      const symbol = currency === 'INR' ? '₹' : '$'
      const price = billingCycle === 'monthly' ? monthly : yearly
      return `${symbol}${price.toLocaleString()}`
    }
  }

  // Helper to resolve button background classes
  const getPlanButtonStyles = (plan: any) => {
    const isGrowth = plan.borderHighlight || plan.title.toLowerCase() === 'growth'
    const isEnterprise = plan.title.toLowerCase() === 'enterprise'

    if (isGrowth) {
      return 'bg-gradient-to-r from-[#00b259] to-[#005c2b] text-white hover:opacity-90'
    } else if (isEnterprise) {
      return 'bg-black text-[#ECEBE9] hover:bg-black/90'
    } else {
      return 'border border-black text-black hover:bg-neutral-200/50'
    }
  }

  // Section Headers metadata
  const sectionBadge = pageData?.pricingPlansSection?.sectionBadge || ':: PRICING PLANS ::'
  const sectionTitle = pageData?.pricingPlansSection?.sectionTitle || 'Simple pricing. No surprises. No markups.'
  const sectionDescription = pageData?.pricingPlansSection?.sectionDescription || 'Choose the best plan for your business. One flat platform fee plus official Meta conversation charges with zero markups.'

  return (
    <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/50">
      <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-24 space-y-12">

        {/* {showHeaders && (
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-mono tracking-wider">
              {sectionBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-black">
              {sectionTitle}
            </h2>
            <p className="text-neutral-500 font-sans text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              {sectionDescription}
            </p>
          </div>
        )} */}

        {/* Interactive Controls Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2 font-sans">
          {/* Currency switch */}
          {pageData?.pricingPlansSection?.enableCurrencyToggle !== false && (
            <div className="flex items-center border border-[#C5C4C2] p-1 bg-[#ECEBE9] select-none">
              <button
                onClick={() => setCurrency('INR')}
                className={cn(
                  "px-4 py-1.5 text-xs font-bold cursor-pointer transition-colors",
                  currency === 'INR' ? "bg-black text-[#ECEBE9]" : "text-neutral-500 hover:text-black"
                )}
              >
                INR (₹)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={cn(
                  "px-4 py-1.5 text-xs font-bold cursor-pointer transition-colors",
                  currency === 'USD' ? "bg-black text-[#ECEBE9]" : "text-neutral-500 hover:text-black"
                )}
              >
                USD ($)
              </button>
            </div>
          )}

          {/* Billing Cycle Switch */}
          {pageData?.pricingPlansSection?.enableYearlyToggle !== false && (
            <div className="flex items-center gap-3">
              <span className={cn("text-xs font-bold", billingCycle === 'monthly' ? "text-black" : "text-neutral-500")}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-12 h-6 border border-[#C5C4C2] bg-white rounded-none relative transition-colors focus:outline-none cursor-pointer"
              >
                <div
                  className="w-4 h-4 bg-[#00b259] absolute top-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{ left: billingCycle === 'annual' ? '26px' : '4px' }}
                />
              </button>
              <span className={cn("text-xs font-bold flex items-center gap-1.5", billingCycle === 'annual' ? "text-black" : "text-neutral-500")}>
                Annually{" "}
                <span className="px-1.5 py-0.5 text-[9px] bg-[#00b259]/10 border border-[#00b259]/30 text-[#00b259] font-bold font-mono">
                  SAVE {pageData?.pricingPlansSection?.annualDiscount || 20}%
                </span>
              </span>
            </div>
          )}
        </div>

        {/* 4-Tier Grid */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-thin">
          {activePlans.map((plan) => {
            const isGrowth = plan.borderHighlight || plan.title.toLowerCase() === 'growth'
            const isCustomPrice = plan.title.toLowerCase() === 'enterprise' || (plan.monthlyPrice === null && plan.yearlyPrice === null)

            return (
              <div
                key={plan.documentId || plan.id}
                className={cn(
                  "bg-[#ECEBE9] flex flex-col group relative w-[82vw] sm:w-[360px] md:w-auto shrink-0 snap-start transition-all duration-300",
                  isGrowth ? "border-2 border-[#00b259] shadow-lg" : "border border-[#C5C4C2]"
                )}
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
              >
                {/* Popular Badge */}
                {isGrowth && (
                  <span className="absolute -top-3.5 left-6 px-3 py-0.5 text-[9px] font-bold text-white bg-[#00b259] font-mono tracking-widest uppercase z-10">
                    MOST POPULAR
                  </span>
                )}

                <div className="p-6 border-b border-[#C5C4C2] space-y-4 font-sans">
                  <h3 className="text-lg font-black text-black flex items-center gap-1.5">
                    {plan.title.toUpperCase()}
                    {isGrowth && <Sparkles className="size-4.5 text-[#00b259]" />}
                    {plan.icon?.url && (
                      <img
                        src={getStrapiMediaUrl(plan.icon.url)}
                        alt={plan.title}
                        className="size-5 object-contain"
                      />
                    )}
                  </h3>
                  <p className="text-[10px] text-neutral-400 leading-snug font-sans h-8">
                    {plan.description}
                  </p>
                  <div className="pt-2">
                    <span className="text-3xl font-black text-black">
                      {formatPrice(plan)}
                    </span>
                    {!isCustomPrice && (
                      <span className="text-xs text-neutral-400">/mo</span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between gap-6 font-sans">
                  <ul className="space-y-3 font-sans text-xs text-neutral-600">
                    {plan.features?.map((feat: any, idx: number) => {
                      const text = typeof feat === 'string' ? feat : feat.text
                      return (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="size-4 text-[#00b259] shrink-0 mt-0.5" />
                          {typeof feat === 'string' ? (
                            <span>{text}</span>
                          ) : (
                            <div
                              className="leading-normal text-xs text-neutral-600 [&_p]:m-0 [&_p]:text-neutral-600 [&_p]:text-xs [&_p]:leading-normal [&_ul]:m-0 [&_ol]:m-0 [&_li]:m-0"
                              dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(text) }}
                            />
                          )}
                        </li>
                      )
                    })}
                  </ul>
                  <Link
                    href={plan.buttonLink || "#demo"}
                    className={cn(
                      "w-full text-center py-2.5 text-xs font-black transition-all",
                      getPlanButtonStyles(plan)
                    )}
                    style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                  >
                    {plan.buttonText.toUpperCase()}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Pricing
