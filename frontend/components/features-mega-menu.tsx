'use client'

import React, { useState } from 'react'
import { 
  ArrowRight, 
  ArrowUpRight, 
  Inbox, 
  Megaphone, 
  Sparkles, 
  CalendarClock, 
  Bot, 
  BarChart2
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type FeatureItem = {
  id: string
  title: string
  shortDesc: string
  description: string
  icon: React.ReactNode
  link: string
  previewType: string
}

export type Category = {
  id: string
  title: string
  tagline: string
  features: FeatureItem[]
}

const featuresMenuData: Category[] = [
  {
    id: 'inbox-bot',
    title: 'Inbox & Bot Operations',
    tagline: 'Shared inbox & chatbot builder',
    features: [
      {
        id: 'unified-inbox',
        title: 'Unified Inbox',
        shortDesc: 'Single numbers for multi-agent support',
        description: 'Empower hundreds of support reps to log in and reply from a single business number. Collaborate seamlessly on customer chats.',
        icon: <Inbox className="size-5" />,
        link: '/feature-overview',
        previewType: 'shared-inbox-feat'
      },
      {
        id: 'chatbot',
        title: 'Chatbot Builder',
        shortDesc: 'Build drag-and-drop conversational paths',
        description: 'Design interactive, menu-driven chat flows using an intuitive visual flowchart builder. Set up and automate in minutes.',
        icon: <Bot className="size-5" />,
        link: '/ai-chatBot-builder',
        previewType: 'codeless-bot'
      },
      {
        id: 'ai-analytics',
        title: 'AI Analytics',
        shortDesc: 'Track response times and CSAT',
        description: 'Access real-time analytics dashboards detailing individual agent response speeds, resolution counts, and customer feedback.',
        icon: <BarChart2 className="size-5" />,
        link: '/feature-overview',
        previewType: 'perf-reports'
      }
    ]
  },
  {
    id: 'marketing-campaigns',
    title: 'Marketing & Campaigns',
    tagline: 'Broadcasts & Meta campaigns',
    features: [
      {
        id: 'broadcasting',
        title: 'WhatsApp Broadcasting',
        shortDesc: 'Send bulk updates to thousands of users',
        description: 'Import contacts and broadcast offers, newsletters, and reminders in bulk with fully approved Meta templates.',
        icon: <Megaphone className="size-5" />,
        link: '/whatApp-Broadcasts',
        previewType: 'broadcast-feat'
      },
      {
        id: 'campaigns',
        title: 'Campaign Drips',
        shortDesc: 'Drip nurture sequences & announcements',
        description: 'Nurture leads automatically over time by triggering scheduled sequences, tutorials, and promotional follow-ups.',
        icon: <CalendarClock className="size-5" />,
        link: '/whatApp-Broadcasts',
        previewType: 'drip-sequences'
      },
      {
        id: 'ads-manager',
        title: 'Ads Manager',
        shortDesc: 'Convert ads directly to conversations',
        description: 'Send traffic from Facebook and Instagram straight into a personal chat, bypassing traditional high-friction landing pages.',
        icon: <Sparkles className="size-5" />,
        link: '/whatApp-Broadcasts',
        previewType: 'ads-feat'
      }
    ]
  }
]

export const FeaturesMegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string>('inbox-bot')
  const [activeFeatureId, setActiveFeatureId] = useState<string>('unified-inbox')

  const currentCategory = featuresMenuData.find(c => c.id === activeCategory) || featuresMenuData[0]
  const currentFeature = currentCategory.features.find(f => f.id === activeFeatureId) || currentCategory.features[0]

  const handleCategoryHover = (catId: string) => {
    setActiveCategory(catId)
    const newCat = featuresMenuData.find(c => c.id === catId)
    if (newCat && newCat.features.length > 0) {
      setActiveFeatureId(newCat.features[0].id)
    }
  }

  // Render feature interactive diagrams
  const renderPreviewVisual = (type: string) => {
    switch (type) {
      case 'shared-inbox-feat':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="flex justify-between items-center border-b border-[#C5C4C2] pb-1">
              <span className="font-bold text-[#00b259]">:: TEAM INBOX FEED</span>
              <span className="text-neutral-400">ONLINE</span>
            </div>
            <div className="space-y-1 flex-grow py-1 flex flex-col justify-center">
              <div className="border border-[#00b259] bg-[#00b259]/5 px-2 py-1 flex justify-between items-center">
                <span>Rohan Patel (Query: Upgrade)</span>
                <span className="text-[7px] text-[#00b259] border border-[#00b259] px-1 font-bold shrink-0">ASSIGNED TO AMIT</span>
              </div>
              <div className="border border-[#C5C4C2] bg-white px-2 py-1 flex justify-between items-center opacity-70">
                <span>Simran Kaur (Query: API Key)</span>
                <span className="text-neutral-400 text-[7px] shrink-0">ASSIGNED TO PRIYA</span>
              </div>
            </div>
          </div>
        )
      case 'perf-reports':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="font-bold border-b border-[#C5C4C2] pb-1.5">WEEKLY SERVICE METRICS</div>
            <div className="grid grid-cols-2 gap-2 py-1.5 flex-1">
              <div className="border border-[#C5C4C2] bg-white p-1.5 flex flex-col justify-between">
                <span className="text-[7px] text-neutral-500">AVG RESPONSE TIME</span>
                <span className="text-sm font-black text-[#005c2b]">1.2 Minutes</span>
              </div>
              <div className="border border-[#C5C4C2] bg-white p-1.5 flex flex-col justify-between">
                <span className="text-[7px] text-neutral-500">SATISFACTION RATE</span>
                <span className="text-sm font-black text-[#00b259]">4.85 / 5.00</span>
              </div>
            </div>
          </div>
        )
      case 'broadcast-feat':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="flex justify-between items-center border-b border-[#C5C4C2] pb-1">
              <span className="font-bold text-[#00b259]">:: BROADCAST: OFFER_FESTIVE</span>
              <span className="text-neutral-500">98% SENT</span>
            </div>
            <div className="space-y-1.5 flex-1 py-1.5">
              <div className="w-full bg-[#C5C4C2]/30 h-2 border border-[#C5C4C2]">
                <div className="bg-[#00b259] h-full" style={{ width: '98%' }}></div>
              </div>
              <div className="grid grid-cols-3 gap-1 text-center text-[7px] text-neutral-500">
                <div className="bg-white border p-1"><b className="text-[9px] text-black block">18,500</b> Sent</div>
                <div className="bg-white border p-1"><b className="text-[9px] text-[#00b259] block">16,210</b> Read</div>
                <div className="bg-white border p-1"><b className="text-[9px] text-blue-600 block">5,120</b> Clicked</div>
              </div>
            </div>
          </div>
        )
      case 'ads-feat':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="border border-[#C5C4C2] bg-white p-1.5 flex flex-col gap-1">
              <div className="flex items-center gap-1 border-b pb-1">
                <div className="size-3.5 bg-[#005c2b] text-white flex items-center justify-center font-bold text-[6px] rounded-full">GT</div>
                <span className="font-bold text-[7px]">AI Green Tick</span>
              </div>
              <div className="bg-emerald-50 border border-[#C5C4C2]/30 p-2 text-center text-[#005c2b] font-bold text-[8px]">
                GET META GREEN TICK FREE
              </div>
              <div className="flex justify-between items-center bg-[#ECEBE9] px-1.5 py-1 border border-[#C5C4C2]/50 text-[7px]">
                <span className="font-bold">Connect on WhatsApp</span>
                <span className="bg-[#00b259] text-white px-1.5 py-0.5 rounded-sm font-bold flex items-center gap-0.5">
                  SEND MESSAGE <ArrowRight className="size-1.5" />
                </span>
              </div>
            </div>
          </div>
        )
      case 'drip-sequences':
        return (
          <div className="w-full h-36 bg-[#ECEBE9] border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="font-bold border-b border-[#C5C4C2] pb-1">MARKETING DRIP QUEUE</div>
            <div className="flex justify-around items-center py-2 relative">
              <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-[#C5C4C2] -translate-y-1/2 z-0"></div>
              <div className="flex flex-col items-center z-10 bg-[#ECEBE9] px-1">
                <span className="size-5 rounded-full border border-[#00b259] bg-white flex items-center justify-center text-[#00b259]">1</span>
                <span className="text-[6px] mt-0.5">Welcome</span>
              </div>
              <div className="flex flex-col items-center z-10 bg-[#ECEBE9] px-1">
                <span className="size-5 rounded-full border border-neutral-400 bg-white flex items-center justify-center text-neutral-500">2</span>
                <span className="text-[6px] mt-0.5">Day 3: Offer</span>
              </div>
              <div className="flex flex-col items-center z-10 bg-[#ECEBE9] px-1 opacity-50">
                <span className="size-5 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-300">3</span>
                <span className="text-[6px] mt-0.5">Day 7: Feedback</span>
              </div>
            </div>
          </div>
        )
      case 'codeless-bot':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="font-bold border-b border-[#C5C4C2] pb-1">BOT ENGINE FLOWCHART</div>
            <div className="flex-1 py-1 flex items-center justify-center gap-1.5">
              <div className="border bg-white px-1.5 py-0.5 rounded text-[7px]">Start Chat</div>
              <div className="text-[#00b259] font-bold">➡</div>
              <div className="flex flex-col gap-1">
                <div className="border border-[#00b259] bg-[#00b259]/5 px-1 py-0.5 rounded text-[7px]">Option 1: Sales</div>
                <div className="border border-neutral-300 bg-white px-1 py-0.5 rounded text-[7px] opacity-70">Option 2: Support</div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full bg-[#ECEBE9] font-sans text-black relative">
      
      {/* Row 1: Header Row */}
      <div className="grid grid-cols-12 border-b border-[#C5C4C2] bg-[#ECEBE9] relative select-none">
        {/* Col 1 Header */}
        <div className="col-span-4 border-r border-[#C5C4C2] p-3 text-[10px] font-bold text-neutral-400 tracking-widest relative">
          :: FEATURE CATEGORIES ::
          {/* Intersection Diamond 1 */}
          <div className="absolute -translate-x-1/2 translate-y-1/2 left-full bottom-0 w-2 h-2 rotate-45 border border-[#C5C4C2] bg-[#ECEBE9] z-20" />
        </div>
        
        {/* Col 2 Header */}
        <div className="col-span-4 border-r border-[#C5C4C2] p-3 text-[10px] font-bold text-neutral-400 tracking-widest relative">
          :: TOOLS & CAPABILITIES ::
          {/* Intersection Diamond 2 */}
          <div className="absolute -translate-x-1/2 translate-y-1/2 left-full bottom-0 w-2 h-2 rotate-45 border border-[#C5C4C2] bg-[#ECEBE9] z-20" />
        </div>
        
        {/* Col 3 Header */}
        <div className="col-span-4 p-3 text-[9px] font-bold text-neutral-400 tracking-widest flex justify-between items-center">
          <span>:: COMPONENT SPEC ::</span>
          <span className="text-[#00b259] font-bold font-mono">STABLE API</span>
        </div>
      </div>

      {/* Row 2: Content Row */}
      <div className="grid grid-cols-12 min-h-[300px]">
        {/* Column 1: Categories (Col-span 4) */}
        <div className="col-span-4 border-r border-[#C5C4C2] flex flex-col p-4 gap-3 bg-[#ECEBE9]">
          {featuresMenuData.map((category) => {
            const isActive = activeCategory === category.id
            return (
              <div
                key={category.id}
                onMouseEnter={() => handleCategoryHover(category.id)}
                className={cn(
                  "p-3 flex items-center justify-between border cursor-pointer transition-all duration-200 select-none group/role",
                  isActive
                    ? "bg-[#00b259]/10 border-[#00b259] text-black shadow-xs translate-x-1"
                    : "bg-white/40 border-[#C5C4C2] hover:bg-white/70 text-neutral-600 hover:text-black hover:translate-x-0.5"
                )}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px))'
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span className={cn(
                    "text-[11px] font-extrabold transition-colors duration-200", 
                    isActive ? "text-[#00b259]" : "text-black"
                  )}>
                    {category.title}
                  </span>
                  <span className="text-[9px] text-neutral-500 leading-normal font-normal">
                    {category.tagline}
                  </span>
                </div>
                <div className={cn(
                  "size-5 rounded-full border flex items-center justify-center transition-all duration-300",
                  isActive 
                    ? "border-[#00b259] bg-[#00b259]/10 text-[#00b259] rotate-45" 
                    : "border-neutral-300 bg-white text-neutral-400 group-hover/role:text-black group-hover/role:border-black"
                )}>
                  <ArrowRight className="size-3" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Column 2: Specific Tools (Col-span 4) */}
        <div className="col-span-4 border-r border-[#C5C4C2] flex flex-col p-4 gap-2 bg-[#ECEBE9]/30">
          <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[300px] pr-1">
            {currentCategory.features.map((feature) => {
              const isFeatureActive = activeFeatureId === feature.id
              return (
                <div
                  key={feature.id}
                  onMouseEnter={() => setActiveFeatureId(feature.id)}
                  className={cn(
                    "p-2.5 flex gap-3 items-start border transition-all duration-200 cursor-pointer select-none group/feat",
                    isFeatureActive
                      ? "bg-white border-[#C5C4C2] text-black border-l-4 border-l-[#00b259] translate-x-0.5 shadow-xs"
                      : "border-transparent hover:bg-black/5 text-neutral-600 hover:text-black border-l-4 border-l-transparent"
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-sm border shrink-0 transition-colors",
                    isFeatureActive 
                      ? "bg-[#00b259]/10 border-[#00b259]/30 text-[#00b259]" 
                      : "bg-white border-neutral-300 text-neutral-500 group-hover/feat:text-black group-hover/feat:border-neutral-400"
                  )}>
                    {feature.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold leading-normal">
                      {feature.title}
                    </span>
                    <span className="text-[8px] text-neutral-500 leading-normal font-normal">
                      {feature.shortDesc}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Column 3: Feature Details (Col-span 4) */}
        <div className="col-span-4 flex flex-col p-4 justify-between bg-white text-black">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs font-black text-black tracking-tight leading-tight">
              {currentFeature.title}
            </h3>
            
            <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">
              {currentFeature.description}
            </p>
            
            {/* SVG Preview Container */}
            <div className="mt-2 w-full rounded-sm overflow-hidden">
              {renderPreviewVisual(currentFeature.previewType)}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#C5C4C2]/30 flex justify-end">
            <a
              href={currentFeature.link}
              className="flex items-center gap-1.5 text-[9px] font-extrabold text-[#00b259] hover:underline group/btn"
            >
              EXPLORE COMPONENT SPEC 
              <ArrowUpRight className="size-3 text-[#00b259] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
