"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ShoppingBag, 
  Activity, 
  GraduationCap, 
  Home, 
  Shield, 
  Plane, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Star, 
  Users, 
  MessageSquare, 
  BookOpen,
  CheckCircle,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { industriesData, type IndustryData } from "@/lib/industries-data";

const iconMap: Record<string, any> = {
  ecommerce: ShoppingBag,
  healthcare: Activity,
  education: GraduationCap,
  realestate: Home,
  finance: Shield,
  travel: Plane,
};

function SolutionContent() {
  const searchParams = useSearchParams();
  const industryParam = searchParams.get("industry") || "ecommerce";

  const [selectedIndustry, setSelectedIndustry] = useState<string>(industryParam);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Sync state if search parameter changes (e.g. from navbar clicks)
  useEffect(() => {
    if (industryParam && iconMap[industryParam]) {
      setSelectedIndustry(industryParam);
    }
  }, [industryParam]);

  const activeIndustry = industriesData.find(ind => ind.id === selectedIndustry) || industriesData[0];
  const Icon = iconMap[activeIndustry.id] || ShoppingBag;

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE9] text-black">
      
      {/* Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#00b259] border border-[#00b259] bg-[#00b259]/10 font-share-tech tracking-wider">
            :: TAILORED WORKFLOWS ::
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-orbitron tracking-tight leading-none text-black">
            WhatsApp Automation for Every Industry
          </h1>
          <p className="text-neutral-500 max-w-3xl mx-auto text-sm sm:text-base font-sans leading-relaxed">
            AIGreenTick powers WhatsApp automation for eCommerce, healthcare, education, real estate, finance, and travel businesses. Industry-specific chatbots, campaigns, and integrations.
          </p>
        </div>
      </section>

      {/* Tabs Selector List */}
      <section className="px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#020e06] via-[#011a0c] to-[#020e06] text-white relative border-b border-[#022c16]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00b259]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl border-x border-[#022c16] px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 relative z-10">
          
          <div className="border border-[#022c16] bg-[#011207]/90 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 rounded-none overflow-hidden select-none font-sans text-xs backdrop-blur-xs">
            {industriesData.map(ind => {
              const TabIcon = iconMap[ind.id] || ShoppingBag;
              const isActive = selectedIndustry === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={cn(
                    "px-4 py-4 sm:py-5 text-center font-bold tracking-wide transition-all border-r border-[#022c16] border-b border-[#022c16] lg:border-b-0 last:border-r-0 cursor-pointer select-none text-[10px] sm:text-xs outline-none flex items-center justify-center gap-2 relative overflow-hidden",
                    isActive
                      ? "bg-[#022c16] text-white border-t-2 border-t-[#00b259] -mt-[1px]"
                      : "text-neutral-400 hover:text-white hover:bg-[#022c16]/30"
                  )}
                >
                  <TabIcon className={cn("size-4 shrink-0 transition-colors", isActive ? "text-[#00b259]" : "text-neutral-500")} />
                  <span>{ind.title.toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          {/* Active Industry Panel */}
          {activeIndustry && (
            <div className="border border-[#022c16] bg-gradient-to-br from-[#011a0c]/95 to-[#010e06]/95 grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-none shadow-2xl">
              
              {/* Left Info Column */}
              <div className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#022c16] flex flex-col justify-between gap-8 font-sans text-left">
                <div className="space-y-4">
                  <span className="px-2 py-0.5 text-[9px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/10 uppercase">
                    Vertical Insight
                  </span>
                  <h3 className="text-2xl font-sans font-bold text-white leading-snug tracking-tight">
                    {activeIndustry.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                    {activeIndustry.desc}
                  </p>
                </div>

                <div className="p-4 border border-[#00b259]/20 bg-[#00b259]/5 rounded-none flex items-center gap-3">
                  <div className="size-2 bg-[#00b259] rounded-full animate-ping" />
                  <div>
                    <div className="text-[10px] text-neutral-400 font-bold">KEY RESULT</div>
                    <div className="text-sm font-black text-white">{activeIndustry.metric}</div>
                  </div>
                </div>
              </div>

              {/* Right Use Cases Column */}
              <div className="lg:col-span-7 p-8 sm:p-12 bg-[#011207]/40 flex flex-col justify-between gap-8 font-sans text-left">
                <div className="space-y-6">
                  <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest">[ AUTOMATED WORKFLOWS ]</h4>
                  <ul className="space-y-4">
                    {activeIndustry.useCases.map((uc, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center size-5 border border-[#00b259]/30 bg-[#00b259]/10 rounded-full text-[10px] text-[#00b259] font-bold shrink-0 mt-0.5 font-mono">
                          {i + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed font-normal">
                          {uc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#022c16] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link 
                      href="#demo"
                      className="px-5 py-2.5 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:from-[#00c864] hover:to-[#006633] transition-all"
                      style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                    >
                      SCHEDULE DEMO
                    </Link>
                  </div>
                  <span className="text-[9px] text-neutral-400 font-mono">SETUP IN 10 MINUTES</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Detailed Blueprint & Graphic */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Details */}
            <div className="lg:col-span-6 space-y-6 font-sans text-left">
              <div className="flex items-center gap-2">
                <div className="p-2 border border-[#C5C4C2] bg-white text-black size-9 flex items-center justify-center shrink-0">
                  <Icon className="size-5 text-[#00b259]" />
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 uppercase tracking-widest font-share-tech">
                  {activeIndustry.title} BLUEPRINT
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-orbitron leading-tight text-black tracking-tight">
                WhatsApp Solutions for {activeIndustry.title}
              </h2>

              <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
                {activeIndustry.detailedDesc}
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {activeIndustry.keyBenefits.map((benefit, i) => (
                  <div 
                    key={i} 
                    className="border border-[#C5C4C2] bg-[#ECEBE9] p-4 space-y-2 relative"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))' }}
                  >
                    <span className="text-[8px] font-bold text-[#00b259] block">[ 0{i + 1} ]</span>
                    <h4 className="text-[10px] font-black text-black uppercase">{benefit.title}</h4>
                    <p className="text-[9px] text-neutral-500 leading-normal font-sans">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image/Dashboard Card */}
            <div className="lg:col-span-6">
              <div 
                className="border border-[#C5C4C2] bg-white overflow-hidden aspect-video relative shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
              >
                <img 
                  src={activeIndustry.image} 
                  alt={`${activeIndustry.title} WhatsApp flows illustration`} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-[#00b259]/5 mix-blend-multiply pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic FAQs Section */}
      <section className="px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2] bg-[#ECEBE9]/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto font-sans">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-[#00b259] border border-[#00b259]/30 bg-[#00b259]/5 font-share-tech">
              :: FREQUENTLY ASKED QUESTIONS ::
            </span>
            <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-black">
              Questions & Answers
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 font-sans text-left">
            {activeIndustry.faqs.map((faq, i) => (
              <div 
                key={i} 
                className="border border-[#C5C4C2] bg-white rounded-none p-5 transition-all duration-200"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center font-bold text-xs sm:text-sm text-left focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={cn("size-4 text-[#00b259] transition-transform", activeFaq === i && "rotate-180")} />
                </button>
                
                {activeFaq === i && (
                  <p className="mt-3 text-xs text-neutral-500 leading-relaxed font-normal animate-in fade-in-0 duration-200">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default function SolutionPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col flex-1 min-h-[70vh] items-center justify-center bg-[#ECEBE9] text-black">
        <div className="animate-pulse flex space-x-2">
          <div className="size-2.5 bg-[#00b259] rounded-full"></div>
          <div className="size-2.5 bg-[#00b259] rounded-full"></div>
          <div className="size-2.5 bg-[#00b259] rounded-full"></div>
        </div>
      </div>
    }>
      <SolutionContent />
    </Suspense>
  );
}
