'use client'

import React, { useState } from 'react'
import { 
  ArrowUpRight, 
  ShoppingBag, 
  Activity, 
  GraduationCap, 
  Home, 
  Shield, 
  Plane
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type TeamItem = {
  id: string
  title: string
  tagline: string
  description: string
  previewType: string
  link: string
}

export type SolutionItem = {
  id: string
  title: string
  shortDesc: string
  description: string
  icon: React.ReactNode
  link: string
  previewType: string
}

const teamsData: TeamItem[] = [
  {
    id: 'marketing',
    title: 'Marketing',
    tagline: 'Broadcast and grow your audience',
    description: 'Launch personalized broadcasts, automate customer alerts, and convert Facebook & Instagram Click-to-WhatsApp ads with native, instant workflows.',
    previewType: 'marketing-preview',
    link: '/#features'
  },
  {
    id: 'sales',
    title: 'Sales',
    tagline: 'Convert leads and book meetings',
    description: 'Deploy 24/7 AI agents to qualify incoming leads, share interactive catalogs, collect payments in chat, and sync deals to HubSpot or Salesforce.',
    previewType: 'sales-preview',
    link: '/#features'
  },
  {
    id: 'support',
    title: 'Support',
    tagline: 'Offer instant, 24/7 customer care',
    description: 'Collaborate with a shared team inbox on a single WhatsApp number. Auto-route chats, assign agents, and measure CSAT automatically.',
    previewType: 'support-preview',
    link: '/#features'
  }
]

const solutionsData: SolutionItem[] = [
  {
    id: 'ecommerce',
    title: 'eCommerce & Retail',
    shortDesc: 'Recover lost carts and sell inside chats',
    description: 'Sync your catalog and re-engage dropouts via WhatsApp checkout links. Integrates with Shopify and WooCommerce.',
    icon: <ShoppingBag className="size-5" />,
    link: '/solution?industry=ecommerce',
    previewType: 'ecommerce'
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    shortDesc: 'Capture leads and schedule site viewings',
    description: 'Qualify home buyers, share property brochures, and schedule in-person tours dynamically through visual chatbot builders.',
    icon: <Home className="size-5" />,
    link: '/solution?industry=realestate',
    previewType: 'realestate'
  },
  {
    id: 'travel',
    title: 'Travel & Hospitality',
    shortDesc: 'Send ticket alerts and boarding passes',
    description: 'Send tickets, boarding passes, travel brochures, and reservation updates to international travelers with no SMS fees.',
    icon: <Plane className="size-5" />,
    link: '/solution?industry=travel',
    previewType: 'travel'
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Wellness',
    shortDesc: 'Book consultation slots & share reports',
    description: 'Automate medical appointment booking, send diagnostic lab results as secure PDFs, and follow up on prescriptions.',
    icon: <Activity className="size-5" />,
    link: '/solution?industry=healthcare',
    previewType: 'healthcare'
  },
  {
    id: 'education',
    title: 'Education & EdTech',
    shortDesc: 'Enroll students and automate alerts',
    description: 'Qualify prospective student inquiries, share syllabus booklets, collect fees, and push exam results alerts.',
    icon: <GraduationCap className="size-5" />,
    link: '/solution?industry=education',
    previewType: 'education'
  },
  {
    id: 'finance',
    title: 'Banking & Finance',
    shortDesc: 'Dispatch secure transaction OTP alerts',
    description: 'Broadcast high-priority transaction alerts, loan tracking statuses, and let clients lookup account balances safely.',
    icon: <Shield className="size-5" />,
    link: '/solution?industry=finance',
    previewType: 'finance'
  }
]

export const SolutionsMegaMenu = () => {
  const [activeType, setActiveType] = useState<'team' | 'solution'>('team')
  const [activeId, setActiveId] = useState<string>('marketing')

  const currentItem = activeType === 'team' 
    ? (teamsData.find(t => t.id === activeId) || teamsData[0])
    : (solutionsData.find(s => s.id === activeId) || solutionsData[0])

  // Helper to render interactive visual graphics based on the hovered feature
  const renderPreviewVisual = (type: string) => {
    switch (type) {
      case 'marketing-preview':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="flex justify-between items-center border-b border-[#C5C4C2] pb-1">
              <span className="font-bold text-[#00b259]">:: MARKETING BROADCASTS</span>
              <span className="text-neutral-400">ACTIVE</span>
            </div>
            <div className="space-y-1.5 flex-grow py-1 flex flex-col justify-center">
              <div className="border border-neutral-300 bg-white p-1 px-2 flex justify-between items-center">
                <span>Campaign: Festive Promo</span>
                <span className="text-[7.5px] bg-[#00b259]/10 text-[#00b259] px-1 font-bold">98% Sent</span>
              </div>
              <div className="text-[7.5px] text-neutral-500 text-center">
                📢 Bulk broadcasts with high deliverability & click rates.
              </div>
            </div>
          </div>
        )
      case 'sales-preview':
        return (
          <div className="w-full h-36 bg-[#ECEBE9] border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="font-bold border-b border-[#C5C4C2] pb-1">AI SALES AGENT</div>
            <div className="flex-grow py-2 flex flex-col justify-center gap-1">
              <div className="bg-white border p-1 px-2 flex justify-between items-center">
                <span className="font-bold">Lead Status</span>
                <span className="text-[7.5px] bg-purple-100 text-purple-700 px-1 font-bold">SQL (Qualified)</span>
              </div>
              <div className="text-[7.5px] text-neutral-500 text-center">
                Auto-syncs qualified leads directly to your CRM.
              </div>
            </div>
          </div>
        )
      case 'support-preview':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="flex justify-between items-center border-b border-[#C5C4C2] pb-1">
              <span className="font-bold text-[#00b259]">:: SHARED TEAM INBOX</span>
              <span className="text-neutral-400">ONLINE</span>
            </div>
            <div className="space-y-1.5 flex-grow py-1 flex flex-col justify-center">
              <div className="border border-neutral-300 bg-white p-1 px-2 flex justify-between items-center">
                <span>Active Reps: 3</span>
                <span className="text-[7.5px] bg-green-100 text-green-700 px-1 font-bold">Avg Reply &lt; 2m</span>
              </div>
              <div className="text-[7.5px] text-neutral-500 text-center">
                Multiple agents replying from a single WhatsApp number.
              </div>
            </div>
          </div>
        )
      case 'ecommerce':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="flex justify-between items-center border-b border-[#C5C4C2] pb-1">
              <span className="font-bold text-[#00b259]">:: E-COMMERCE CART RECOVERY</span>
              <span className="text-neutral-400">AUTOMATED</span>
            </div>
            <div className="space-y-1.5 flex-grow py-1.5 justify-center flex flex-col">
              <div className="border border-[#00b259] bg-[#00b259]/5 px-2 py-1">
                <span className="font-bold text-neutral-800">Shopify Cart Abandoned</span>
                <div className="text-[7px] text-neutral-500 mt-0.5">Triggering recovery message with discount code...</div>
              </div>
              <div className="text-center text-[7px] text-neutral-500 font-bold mt-1">
                📈 Conversion Growth: +18% average recovery rate
              </div>
            </div>
          </div>
        )
      case 'realestate':
        return (
          <div className="w-full h-36 bg-[#ECEBE9] border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="font-bold border-b border-[#C5C4C2] pb-1">REAL ESTATE SITE SCHEDULER</div>
            <div className="flex-grow py-1.5 flex flex-col justify-between">
              <div className="bg-white border p-1.5">
                <span className="font-bold block text-[#00b259]">Site Visit Confirmed</span>
                <span className="text-[7px] text-neutral-500">Date: Sunday, 11:00 AM | Assignee: Rohan</span>
              </div>
              <div className="text-[7px] text-neutral-400 text-center">Auto-reminders sent 24h & 2h before visit</div>
            </div>
          </div>
        )
      case 'travel':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="flex justify-between items-center border-b border-[#C5C4C2] pb-1">
              <span className="font-bold text-[#00b259]">:: TRAVEL ALERTS & BOARDING PASS</span>
              <span className="text-neutral-400">DELIVERED</span>
            </div>
            <div className="space-y-1 flex-grow py-1.5 justify-center flex flex-col">
              <div className="border border-neutral-300 bg-white p-1.5 flex justify-between items-center">
                <div>
                  <span className="font-bold block">Flight IX-302 Boarding Pass</span>
                  <span className="text-[7px] text-neutral-500">Seat 12C | Gate 4B</span>
                </div>
                <span className="text-[7px] text-white bg-[#005c2b] px-1 font-bold">PDF SENT</span>
              </div>
            </div>
          </div>
        )
      case 'healthcare':
        return (
          <div className="w-full h-36 bg-[#ECEBE9] border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="font-bold border-b border-[#C5C4C2] pb-1">HEALTHCARE BOOKING CONFIRMED</div>
            <div className="flex-grow py-2 flex flex-col justify-center items-center gap-1">
              <div className="border border-[#00b259] bg-green-50 px-2 py-0.5 text-[#005c2b] font-bold">Appointment Booked</div>
              <span className="text-[7px] text-neutral-500">Dr. Verma - Cardiology | Monday 4 PM</span>
            </div>
          </div>
        )
      case 'education':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="font-bold border-b border-[#C5C4C2] pb-1.5">EDTECH LEAD QUALIFICATION</div>
            <div className="space-y-1.5 flex-grow py-1.5 justify-center flex flex-col">
              <div className="bg-white border p-1.5 flex justify-between items-center">
                <span>Inbound Lead Qualified</span>
                <span className="text-[7px] text-white bg-[#00b259] px-1.5 font-bold">94% SCORE</span>
              </div>
              <div className="text-[7px] text-neutral-500 mt-1">Criteria matched: Budget, Tech stream, July batch</div>
            </div>
          </div>
        )
      case 'finance':
        return (
          <div className="w-full h-36 bg-black/5 border border-[#C5C4C2] p-3 flex flex-col justify-between font-mono text-[9px] select-none text-black">
            <div className="flex justify-between items-center border-b border-[#C5C4C2] pb-1">
              <span className="font-bold text-[#00b259]">:: SECURE FINANCE TRANS-LOG</span>
              <span className="text-neutral-400">LATENCY &lt;2S</span>
            </div>
            <div className="space-y-1 flex-grow py-1.5 justify-center flex flex-col">
              <div className="bg-white border border-[#C5C4C2] p-1.5 flex justify-between items-center">
                <span>OTP Dispatch: #940382</span>
                <span className="text-[7px] text-[#005c2b] font-bold">DELIVERED</span>
              </div>
              <span className="text-[7px] text-neutral-400 block text-center mt-1">Bank-grade end-to-end encrypted alerts</span>
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
        <div className="col-span-3 border-r border-[#C5C4C2] p-3 text-[10px] font-bold text-neutral-400 tracking-widest relative">
          :: TEAMS ::
          {/* Intersection Diamond 1 */}
          <div className="absolute -translate-x-1/2 translate-y-1/2 left-full bottom-0 w-2 h-2 rotate-45 border border-[#C5C4C2] bg-[#ECEBE9] z-20" />
        </div>
        
        {/* Col 2 Header */}
        <div className="col-span-5 border-r border-[#C5C4C2] p-3 text-[10px] font-bold text-neutral-400 tracking-widest relative">
          :: SOLUTIONS AVAILABLE ::
          {/* Intersection Diamond 2 */}
          <div className="absolute -translate-x-1/2 translate-y-1/2 left-full bottom-0 w-2 h-2 rotate-45 border border-[#C5C4C2] bg-[#ECEBE9] z-20" />
        </div>
        
        {/* Col 3 Header */}
        <div className="col-span-4 p-3 text-[9px] font-bold text-neutral-400 tracking-widest flex justify-between items-center">
          <span>:: FEATURE HIGHLIGHT ::</span>
          <span className="text-[#00b259] font-bold font-mono">100% ONLINE</span>
        </div>
      </div>

      {/* Row 2: Content Row */}
      <div className="grid grid-cols-12 min-h-[300px]">
        {/* Column 1: Teams List (Col-span 3) */}
        <div className="col-span-3 border-r border-[#C5C4C2] flex flex-col p-3 gap-3 bg-[#ECEBE9]">
          {teamsData.map((team) => {
            const isActive = activeType === 'team' && activeId === team.id
            return (
              <div
                key={team.id}
                onMouseEnter={() => {
                  setActiveType('team')
                  setActiveId(team.id)
                }}
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
                    {team.title}
                  </span>
                  <span className="text-[9px] text-neutral-500 leading-normal font-normal">
                    {team.tagline}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Column 2: Solutions List (Col-span 5) - Rendered as a 2-column grid */}
        <div className="col-span-5 border-r border-[#C5C4C2] flex flex-col p-3 gap-2 bg-[#ECEBE9]/30">
          <div className="grid grid-cols-2 gap-1.5 overflow-hidden">
            {solutionsData.map((solution) => {
              const isSolutionActive = activeType === 'solution' && activeId === solution.id
              return (
                <div
                  key={solution.id}
                  onMouseEnter={() => {
                    setActiveType('solution')
                    setActiveId(solution.id)
                  }}
                  className={cn(
                    "p-2 flex gap-2 items-start border transition-all duration-200 cursor-pointer select-none group/feat",
                    isSolutionActive
                      ? "bg-white border-[#C5C4C2] text-black border-l-4 border-l-[#00b259] translate-x-0.5 shadow-xs"
                      : "border-transparent hover:bg-black/5 text-neutral-600 hover:text-black border-l-4 border-l-transparent"
                  )}
                >
                  <div className={cn(
                    "p-1 rounded-sm border shrink-0 transition-colors [&>svg]:size-4",
                    isSolutionActive 
                      ? "bg-[#00b259]/10 border-[#00b259]/30 text-[#00b259]" 
                      : "bg-white border-neutral-300 text-neutral-500 group-hover/feat:text-black group-hover/feat:border-neutral-400"
                  )}>
                    {solution.icon}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[9px] font-bold leading-tight truncate">
                      {solution.title}
                    </span>
                    <span className="text-[7.5px] text-neutral-500 leading-normal font-normal line-clamp-2">
                      {solution.shortDesc}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Column 3: Preview Card (Col-span 4) */}
        <div className="col-span-4 flex flex-col p-4 justify-between bg-white text-black">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs font-black text-black tracking-tight leading-tight">
              {currentItem.title}
            </h3>
            
            <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">
              {currentItem.description}
            </p>
            
            {/* Dynamic Interactive Preview Graphics Container */}
            <div className="mt-2 w-full rounded-sm overflow-hidden">
              {renderPreviewVisual(currentItem.previewType)}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#C5C4C2]/30 flex justify-end">
            <a
              href={currentItem.link}
              className="flex items-center gap-1.5 text-[9px] font-extrabold text-[#00b259] hover:underline group/btn"
            >
              {activeType === 'team' ? 'EXPLORE TEAM FEATURES' : 'EXPLORE INDUSTRY BLUEPRINT'}
              <ArrowUpRight className="size-3 text-[#00b259] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
