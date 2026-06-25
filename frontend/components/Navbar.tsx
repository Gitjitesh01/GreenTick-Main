"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getStrapiMediaUrl, type HeaderComponent, type NavigationPluginItem } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SolutionsMegaMenu } from './solutions-mega-menu';
import { FeaturesMegaMenu } from './features-mega-menu';
import { AiGreenTickLogo } from './logo';

interface NavbarProps {
  headerData: HeaderComponent | null;
  siteName: string;
  navItems: NavigationPluginItem[];
}

export default function Navbar({ headerData, siteName, navItems }: NavbarProps) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const getHref = (hash: string) => {
    if (hash === "#blog") return "/blog";
    if (hash === "#pricing") return "/pricing";
    if (hash === "#solutions") return "/solution";
    if (isHomepage) return hash;
    return hash.startsWith("#") ? `/${hash}` : hash;
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleCompanyEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setCompanyOpen(true);
  };

  const handleCompanyLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setCompanyOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);


  // IntersectionObserver to highlight current active section as we scroll
  useEffect(() => {
    const sections = ["features", "solutions", "pricing", "blog", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Find specific wrapper items or links dynamically from Strapi navItems
  const featuresItem = navItems?.find(item => item.title.toLowerCase() === 'features');
  const solutionsItem = navItems?.find(item => item.title.toLowerCase() === 'solutions');
  const pricingItem = navItems?.find(item => item.title.toLowerCase() === 'pricing');
  const blogItem = navItems?.find(item => item.title.toLowerCase() === 'blog');
  const companyItem = navItems?.find(item => item.title.toLowerCase() === 'company');

  // Hrefs mapping
  const featuresHref = featuresItem?.path || getHref('#features');
  const solutionsHref = solutionsItem?.path || getHref('#solutions');
  const pricingHref = pricingItem?.path || getHref('#pricing');
  const blogHref = blogItem?.path || getHref('#blog');
  const companyHref = companyItem?.path || getHref('#about');

  // Parse Logo
  const logo = headerData?.logo;
  const logoImageSrc = logo?.image?.url ? getStrapiMediaUrl(logo.image.url) : null;
  const logoAlt = logo?.image?.alternativeText || siteName || "AI GreenTick";
  const logoHref = logo?.href || "/";

  // Parse CTAs
  const ctas = headerData?.cta?.filter(item => item.label && item.href) || [];
  
  // Dynamic Text Link CTA (like Ecosystem)
  const textLinkCta = ctas.find(item => !item.isButtonLink && item.type !== "PRIMARY");
  const textLinkCtaLabel = textLinkCta?.label || "Ecosystem";
  const textLinkCtaHref = textLinkCta?.href ? getHref(textLinkCta.href) : getHref('#faq');

  // Dynamic Button CTA (like BOOK A DEMO)
  const buttonCta = ctas.find(item => item.isButtonLink || item.type === "PRIMARY");
  const buttonCtaLabel = buttonCta?.label || "BOOK A DEMO";
  const buttonCtaHref = buttonCta?.href ? getHref(buttonCta.href) : getHref('#demo');

  // Descriptions helper for company items
  const getCompanyDescription = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('about')) return "Learn about our mission and story.";
    if (t.includes('contact')) return "Get in touch with our team.";
    if (t.includes('career')) return "Join us and build the future of AI.";
    if (t.includes('trust') || t.includes('security') || t.includes('center')) return "Security, compliance, and systems.";
    return "Read more details about this section.";
  };

  // Company sub-items fallback
  const fallbackCompanyItems = [
    { title: "About Us", path: getHref('#about') },
    { title: "Contact Us", path: getHref('#contact') },
    { title: "Careers", path: getHref('#careers') },
    { title: "Trust Center", path: getHref('#faq') }
  ];

  const finalCompanyItems = companyItem?.items?.length
    ? companyItem.items.map(item => ({ title: item.title, path: item.path }))
    : fallbackCompanyItems;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#ECEBE9]/95 backdrop-blur-sm py-2 px-4 sm:px-6 lg:px-8 border-b border-[#C5C4C2]/30">
      <div className="mx-auto max-w-7xl relative">
        {/* Background layer with clip-path and border */}
        <div 
          className="absolute inset-0 border border-[#C5C4C2] bg-[#ECEBE9] pointer-events-none z-0"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))' }}
        />

        {/* Desktop 9-Column Grid Navigation */}
        <div className="hidden lg:grid grid-cols-9 h-16 w-full items-center select-none text-black font-sans relative z-10">
          
          {/* Col 1-2: Logo */}
          <div className="col-span-2 h-full border-r border-[#C5C4C2] flex items-center pl-6">
            <Link href={logoHref} className="hover:opacity-90 transition-opacity">
              {logoImageSrc ? (
                <img src={logoImageSrc} alt={logoAlt} className="h-9 w-auto select-none" />
              ) : (
                <AiGreenTickLogo />
              )}
            </Link>
          </div>
 
          {/* Col 3-7: Navigation Links */}
          <div className="col-span-5 h-full border-r border-[#C5C4C2] flex items-center justify-center gap-8 text-xs">
            
            {/* Features Option */}
            <div
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
              className="h-full flex items-center"
            >
              <Link
                href={featuresHref}
                className={cn(
                  "relative py-1 transition-colors font-bold flex items-center gap-1 cursor-pointer select-none",
                  pathname.startsWith('/feature') ? "text-black font-extrabold" : (activeSection === 'features' ? "text-black" : "text-neutral-500 hover:text-black")
                )}
              >
                {(pathname.startsWith('/feature') || activeSection === 'features') && (
                  <>
                    <span className="absolute -left-2 top-0 text-[#00b259] font-bold">┌</span>
                    <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold">┘</span>
                  </>
                )}
                {featuresItem?.title || "Features"}
                <ChevronDown className={cn("size-3.5 transition-transform duration-200", featuresOpen && "rotate-180")} />
              </Link>
              {featuresOpen && (
                <div
                  className="absolute top-full left-[22.222%] z-50 bg-[#ECEBE9] border border-[#C5C4C2] border-t-0 shadow-lg p-0 font-sans text-black overflow-hidden animate-in fade-in-0 duration-100"
                  style={{ width: '55.556%' }}
                >
                  <FeaturesMegaMenu />
                </div>
              )}
            </div>

            {/* Solutions Option */}
            <div
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
              className="h-full flex items-center"
            >
              <Link
                href={solutionsHref}
                className={cn(
                  "relative py-1 transition-colors font-bold flex items-center gap-1 cursor-pointer select-none",
                  pathname.startsWith('/solution') ? "text-black font-extrabold" : (activeSection === 'solutions' ? "text-black" : "text-neutral-500 hover:text-black")
                )}
              >
                {(pathname.startsWith('/solution') || activeSection === 'solutions') && (
                  <>
                    <span className="absolute -left-2 top-0 text-[#00b259] font-bold">┌</span>
                    <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold">┘</span>
                  </>
                )}
                {solutionsItem?.title || "Solutions"}
                <ChevronDown className={cn("size-3.5 transition-transform duration-200", solutionsOpen && "rotate-180")} />
              </Link>
              {solutionsOpen && (
                <div
                  className="absolute top-full left-[22.222%] z-50 bg-[#ECEBE9] border border-[#C5C4C2] border-t-0 shadow-lg p-0 font-sans text-black overflow-hidden animate-in fade-in-0 duration-100"
                  style={{ width: '55.556%' }}
                >
                  <SolutionsMegaMenu />
                </div>
              )}
            </div>

            {/* Pricing Link */}
            <Link
              href={pricingHref}
              className={cn(
                "relative py-1 transition-colors font-bold flex items-center gap-1.5",
                pathname.startsWith('/pricing') ? "text-black font-extrabold" : (activeSection === 'pricing' ? "text-black" : "text-neutral-500 hover:text-black")
              )}
            >
              {(pathname.startsWith('/pricing') || activeSection === 'pricing') && (
                <>
                  <span className="absolute -left-2 top-0 text-[#00b259] font-bold">┌</span>
                  <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold">┘</span>
                </>
              )}
              {pricingItem?.title || "Pricing"}
            </Link>

            {/* Blog Link */}
            <Link
              href={blogHref}
              className={cn(
                "relative py-1 transition-colors font-bold flex items-center gap-1.5",
                pathname.startsWith('/blog') ? "text-black font-extrabold" : (activeSection === 'blog' ? "text-black" : "text-neutral-500 hover:text-black")
              )}
            >
              {(pathname.startsWith('/blog') || activeSection === 'blog') && (
                <>
                  <span className="absolute -left-2 top-0 text-[#00b259] font-bold">┌</span>
                  <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold">┘</span>
                </>
              )}
              {blogItem?.title || "Blog"}
            </Link>

            {/* Company Dropdown Option */}
            <DropdownMenu modal={false} open={companyOpen} onOpenChange={setCompanyOpen}>
              <div
                onMouseEnter={handleCompanyEnter}
                onMouseLeave={handleCompanyLeave}
                className="h-full flex items-center"
              >
                <DropdownMenuTrigger asChild>
                  <Link
                    href={companyHref}
                    className={cn(
                      "relative py-1 transition-colors font-bold flex items-center gap-1 cursor-pointer select-none",
                      (activeSection === 'about' || activeSection === 'contact') ? "text-black" : "text-neutral-500 hover:text-black"
                    )}
                  >
                    {(activeSection === 'about' || activeSection === 'contact') && (
                      <>
                        <span className="absolute -left-2 top-0 text-[#00b259] font-bold">┌</span>
                        <span className="absolute -right-2 bottom-0 text-[#00b259] font-bold">┘</span>
                      </>
                    )}
                    {companyItem?.title || "Company"}
                    <ChevronDown className={cn("size-3.5 transition-transform duration-200", companyOpen && "rotate-180")} />
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={14}
                  className="bg-[#ECEBE9] border border-[#C5C4C2] rounded-none shadow-lg p-1 w-64 font-sans text-black"
                  onMouseEnter={handleCompanyEnter}
                  onMouseLeave={handleCompanyLeave}
                >
                  {finalCompanyItems.map((item, index) => (
                    <DropdownMenuItem asChild key={index}>
                      <Link
                        href={item.path}
                        className="px-4 py-2 hover:bg-[#00b259]/10 text-xs text-neutral-600 transition-colors flex flex-col gap-0.5 border-b border-[#C5C4C2]/30 last:border-b-0 cursor-pointer"
                      >
                        <span className="font-bold flex items-center gap-1 text-black">
                          <span className="text-[#00b259]">::</span> {item.title}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-normal leading-normal">
                          {getCompanyDescription(item.title)}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </div>
            </DropdownMenu>

          </div>

          {/* Col 8-9: Ecosystem & Book a Demo Button */}
          <div className="col-span-2 h-full flex items-center justify-between px-6 gap-4">
            <Link
              href={textLinkCtaHref}
              className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-black transition-colors"
            >
              <span className="text-[#00b259] font-bold tracking-tight">::</span> {textLinkCtaLabel}
            </Link>
            <Link
              href={buttonCtaHref}
              className="px-6 py-2 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity shadow-xs shrink-0 text-center"
              style={{
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
              }}
            >
              {buttonCtaLabel.toUpperCase()}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className="lg:hidden flex h-16 items-center justify-between px-4 text-black font-sans relative z-10">
          <Link href={logoHref} className="hover:opacity-90 transition-opacity">
            {logoImageSrc ? (
              <img src={logoImageSrc} alt={logoAlt} className="h-8 w-auto select-none" />
            ) : (
              <AiGreenTickLogo />
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-black hover:bg-black/5 rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-[#ECEBE9] border-b border-[#C5C4C2] z-50 flex flex-col divide-y divide-[#C5C4C2] border-t border-[#C5C4C2] font-mono">
            
            {/* Features Mobile Option */}
            <div className="flex flex-col">
              <button
                onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                className="w-full text-center px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  {pathname.startsWith('/feature') && <span className="text-[#00b259] font-bold">&gt;</span>}
                  {featuresItem?.title || "Features"}
                </span>
                <ChevronDown className={cn("size-4 transition-transform duration-200", mobileFeaturesOpen && "rotate-180")} />
              </button>
              {mobileFeaturesOpen && (
                <div className="bg-[#E4E3E0] flex flex-col divide-y divide-[#C5C4C2]/50 border-t border-[#C5C4C2]">
                  {featuresItem?.items?.length ? (
                    featuresItem.items.map((sub, i) => (
                      <Link
                        key={i}
                        href={sub.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> {sub.title}
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link
                        href="/feature-overview"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> Unified Inbox
                      </Link>
                      <Link
                        href="/whatApp-Broadcasts"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> Ads Manager
                      </Link>
                      <Link
                        href="/whatApp-Broadcasts"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> WhatsApp Broadcasting
                      </Link>
                      <Link
                        href="/whatApp-Broadcasts"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> Campaign Drips
                      </Link>
                      <Link
                        href="/ai-chatBot-builder"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> Chatbot Builder
                      </Link>
                      <Link
                        href="/feature-overview"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> AI Analytics
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Solutions Mobile Option */}
            <div className="flex flex-col">
              <button
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="w-full text-center px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  {pathname.startsWith('/solution') && <span className="text-[#00b259] font-bold">&gt;</span>}
                  {solutionsItem?.title || "Solutions"}
                </span>
                <ChevronDown className={cn("size-4 transition-transform duration-200", mobileSolutionsOpen && "rotate-180")} />
              </button>
              {mobileSolutionsOpen && (
                <div className="bg-[#E4E3E0] flex flex-col divide-y divide-[#C5C4C2]/50 border-t border-[#C5C4C2]">
                  {solutionsItem?.items?.length ? (
                    solutionsItem.items.map((sub, i) => (
                      <Link
                        key={i}
                        href={sub.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> {sub.title}
                      </Link>
                    ))
                  ) : (
                    <>
                      {/* Consumer Verticals */}
                      <div className="px-8 py-2 text-[9px] font-black text-neutral-400 bg-[#ECEBE9] tracking-wider text-center">
                        :: CONSUMER VERTICALS
                      </div>
                      <Link
                        href="/solution?industry=ecommerce"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> eCommerce & Retail
                      </Link>
                      <Link
                        href="/solution?industry=realestate"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> Real Estate
                      </Link>
                      <Link
                        href="/solution?industry=travel"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> Travel & Hospitality
                      </Link>
                      
                      {/* Professional Services */}
                      <div className="px-8 py-2 text-[9px] font-black text-neutral-400 bg-[#ECEBE9] tracking-wider border-t border-[#C5C4C2]/50 text-center">
                        :: PROFESSIONAL SERVICES
                      </div>
                      <Link
                        href="/solution?industry=healthcare"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> Healthcare & Wellness
                      </Link>
                      <Link
                        href="/solution?industry=education"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> Education & EdTech
                      </Link>
                      <Link
                        href="/solution?industry=finance"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-10 py-3 text-xs text-neutral-700 hover:bg-black/5 flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[#00b259]">::</span> Banking & Finance
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Pricing Mobile Option */}
            <Link
              href={pricingHref}
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-center gap-1.5"
            >
              {pathname.startsWith('/pricing') && <span className="text-[#00b259] font-bold">&gt;</span>}
              {pricingItem?.title || "Pricing"}
            </Link>

            {/* Blog Mobile Option */}
            <Link
              href={blogHref}
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-center gap-1.5"
            >
              {pathname.startsWith('/blog') && <span className="text-[#00b259] font-bold">&gt;</span>}
              {blogItem?.title || "Blog"}
            </Link>

            {/* Company Mobile Option */}
            <div className="flex flex-col">
              <button
                onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                className="w-full text-center px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  {(pathname.startsWith('/about') || pathname.startsWith('/contact')) && <span className="text-[#00b259] font-bold">&gt;</span>}
                  {companyItem?.title || "Company"}
                </span>
                <ChevronDown className={cn("size-4 transition-transform duration-200", mobileCompanyOpen && "rotate-180")} />
              </button>
              {mobileCompanyOpen && (
                <div className="bg-[#E4E3E0] flex flex-col divide-y divide-[#C5C4C2]/50 border-t border-[#C5C4C2]">
                  {finalCompanyItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-10 py-3 text-xs text-neutral-600 hover:bg-black/5 flex items-center justify-center gap-1.5"
                    >
                      <span className="text-[#00b259]">::</span> {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Ecosystem Option */}
            <Link
              href={textLinkCtaHref}
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-bold text-neutral-800 hover:bg-black/5 transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="text-[#00b259] font-bold">::</span> {textLinkCtaLabel}
            </Link>

            {/* Book a Demo Option */}
            <div className="px-6 py-4 flex justify-center">
              <Link
                href={buttonCtaHref}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-xs font-black text-white bg-gradient-to-r from-[#00b259] to-[#005c2b] hover:opacity-90 transition-opacity shadow-xs"
                style={{
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                }}
              >
                {buttonCtaLabel.toUpperCase()}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
