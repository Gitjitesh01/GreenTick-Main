"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getStrapiMediaUrl, type FooterComponent, type NavigationPluginItem } from "@/lib/api";
import { AiGreenTickLogo } from "./logo";

interface FooterProps {
  footerData: FooterComponent | null;
  siteName: string;
  siteDescription?: string;
  navItems: NavigationPluginItem[];
}

// Icon mapper for social links based on domain name
const getSocialIcon = (href: string, label: string) => {
  const h = href.toLowerCase();
  const l = (label || "").toLowerCase();

  if (h.includes("github") || l.includes("github")) {
    return (
      <svg className="size-4.5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
      </svg>
    );
  }
  if (h.includes("instagram") || l.includes("instagram")) {
    return (
      <svg className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (h.includes("twitter") || h.includes("x.com") || l.includes("twitter") || l.includes("x")) {
    return (
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }
  if (h.includes("youtube") || l.includes("youtube")) {
    return (
      <svg className="size-4.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.528 3.545 12 3.545 12 3.545s-7.528 0-9.388.51a3.004 3.004 0 0 0-2.11 2.108C0 8.024 0 12 0 12s0 3.976.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.86.51 9.388.51 9.388.51s7.53 0 9.388-.51a3.004 3.004 0 0 0 2.11-2.108C24 15.976 24 12 24 12s0-3.976-.502-5.837z" />
        <polygon points="9.545 15.568 15.818 12 9.545 8.432" fill="white" />
      </svg>
    );
  }
  return (
    <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
};

// Social icon hover styling mapper
const getSocialHoverClass = (href: string) => {
  const h = href.toLowerCase();
  if (h.includes("instagram")) return "hover:text-[#E1306C]";
  if (h.includes("youtube")) return "hover:text-[#FF0000]";
  return "hover:text-[#00b259]";
};

// Dynamic product text styling classes
const getProductTextClass = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("themeselection")) return "text-xs font-extrabold text-neutral-800 tracking-tight";
  if (n.includes("pixinvent")) return "text-xs font-black text-neutral-800 tracking-wider";
  if (n.includes("jetship")) return "text-xs font-bold text-neutral-800";
  return "text-xs font-medium text-neutral-800";
};

export default function Footer({ footerData, siteName, siteDescription, navItems }: FooterProps) {
  // Find legal section in navigation if defined
  const legalWrapper = navItems?.find(
    (item) => item.type === "WRAPPER" && item.title.toLowerCase().includes("legal")
  );

  // Filter wrappers that are not legal to render the columns
  const columnWrappers = navItems?.filter(
    (item) => item.type === "WRAPPER" && !item.title.toLowerCase().includes("legal")
  ) || [];

  // Fallback links matching the design mockup if Strapi columns are not populated
  const fallbackColumns = [
    {
      id: "product",
      title: "Product",
      items: [
        { id: 1, title: "Features", path: "/#features" },
        { id: 2, title: "Broadcasts", path: "/whatApp-Broadcasts" },
        { id: 3, title: "AI Chatbot", path: "/ai-chatBot-builder" },
        { id: 4, title: "Shared Inbox", path: "/#features" },
        { id: 5, title: "Campaigns", path: "/whatApp-Broadcasts" },
        { id: 6, title: "Integrations", path: "/#features" },
        { id: 7, title: "Pricing", path: "/pricing" },
      ],
    },
    {
      id: "company",
      title: "Company",
      items: [
        { id: 11, title: "About Us", path: "/#about" },
        { id: 12, title: "Solutions", path: "/solution" },
        { id: 13, title: "Careers", path: "/#careers" },
        { id: 14, title: "Contact", path: "/#contact" },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      items: [
        { id: 21, title: "Blog", path: "/blog" },
        { id: 22, title: "Help Center", path: "/pricing#comparison-matrix" },
      ],
    },
  ];

  // Dynamic Column Merging: Merge fallback columns with Strapi column wrappers.
  // If a wrapper is in Strapi, it overrides/updates the corresponding default wrapper, otherwise we append it.
  const defaultColumnsMap = new Map<string, typeof fallbackColumns[0]>(
    fallbackColumns.map(col => [col.title.toLowerCase(), col])
  );

  columnWrappers.forEach((wrapper) => {
    const wTitleLower = wrapper.title.toLowerCase();
    
    // Find matching default column
    let matchedKey = "";
    for (const title of defaultColumnsMap.keys()) {
      if (wTitleLower.includes(title) || title.includes(wTitleLower)) {
        matchedKey = title;
        break;
      }
    }

    const mappedColumn = {
      id: wrapper.id.toString(),
      title: wrapper.title,
      items: wrapper.items?.map((item) => ({
        id: item.id,
        title: item.title,
        path: item.path || item.externalPath || "#",
      })) || [],
    };

    if (matchedKey) {
      defaultColumnsMap.set(matchedKey, mappedColumn);
    } else {
      defaultColumnsMap.set(wTitleLower, mappedColumn);
    }
  });

  const finalColumns = Array.from(defaultColumnsMap.values());

  // Responsive column spans depending on the total number of columns
  const getColSpanClass = (colIdx: number, totalCols: number) => {
    if (totalCols === 3) {
      if (colIdx === 2) return "col-span-6 sm:col-span-4 lg:col-span-2";
      return "col-span-6 sm:col-span-4 lg:col-span-3";
    }
    // For 4 or more columns, size them evenly
    return "col-span-6 sm:col-span-4 lg:col-span-2";
  };

  // Legal sub-items from Strapi
  const finalLegalItems = legalWrapper?.items?.length
    ? legalWrapper.items.map((item) => ({ label: item.title, href: item.path || item.externalPath || "#" }))
    : [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ];

  // Social links
  const defaultSocialLinks = [
    { label: "GitHub", href: "https://github.com", image: null },
    { label: "Instagram", href: "https://instagram.com", image: null },
    { label: "Twitter", href: "https://twitter.com", image: null },
    { label: "YouTube", href: "https://youtube.com", image: null },
  ];

  const finalSocialLinks = footerData?.socialLinks?.length
    ? footerData.socialLinks.map((item) => ({ 
        label: item.label || "", 
        href: item.href,
        image: item.image || null
      }))
    : defaultSocialLinks;

  // Logo parsing
  const logo = footerData?.logo;
  const logoImageSrc = logo?.image?.url ? getStrapiMediaUrl(logo.image.url) : null;
  const logoAlt = logo?.image?.alternativeText || siteName || "AI GreenTick";
  const logoHref = logo?.href || "/";

  // Product Row dynamic badges
  const defaultProducts = [
    { id: 1, name: "ThemeSelection", product_image: null },
    { id: 2, name: "PIXINVENT", product_image: null },
    { id: 3, name: "JetShip Boilerplates", product_image: null },
  ];

  const finalProducts = footerData?.Our_Product?.length
    ? footerData.Our_Product
    : defaultProducts;

  // Render function for product badge icon/image
  const renderProductBadgeIcon = (name: string, images?: any) => {
    const normalized = name.toLowerCase();
    
    // Parse single image or first image from array
    const imageObj = Array.isArray(images) ? images[0] : images;
    const imageSrc = imageObj?.url ? getStrapiMediaUrl(imageObj.url) : null;
    
    if (imageSrc) {
      return <img src={imageSrc} alt={name} className="h-4 w-auto object-contain select-none" />;
    }

    // Default SVG fallbacks based on name
    if (normalized.includes("themeselection")) {
      return (
        <svg className="h-4 w-auto" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 3L5.5 11.5L2 8" stroke="#5664F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    if (normalized.includes("pixinvent")) {
      return (
        <svg className="h-4 w-auto" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="5" fill="#F59E0B" />
        </svg>
      );
    }
    if (normalized.includes("jetship")) {
      return (
        <svg className="h-4 w-auto" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8 6 6 10 6 10L9 13L13 9C13 9 14 6 12 2Z" fill="#7C3AED" />
        </svg>
      );
    }
    // Default tiny bullet icon
    return (
      <svg className="h-2 w-2 text-neutral-400" fill="currentColor" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
    );
  };

  return (
    <footer className="w-full bg-white border-t border-[#C5C4C2] px-4 sm:px-6 lg:px-8 text-black font-sans">
      <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Column 1: Brand details */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <Link href={logoHref} className="hover:opacity-90 transition-opacity">
                {logoImageSrc ? (
                  <img src={logoImageSrc} alt={logoAlt} className="h-9 w-auto select-none" />
                ) : (
                  <AiGreenTickLogo />
                )}
              </Link>
            </div>
            
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              {siteDescription || "AI Greentick is an enterprise-grade WhatsApp Business API platform offering automated marketing campaigns, shared team inboxes, smart routing, and custom AI agents."}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 text-neutral-600">
              {finalSocialLinks.map((link, idx) => {
                const customImageSrc = link.image?.url ? getStrapiMediaUrl(link.image.url) : null;
                return (
                  <a 
                    key={idx}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={cn(getSocialHoverClass(link.href), "transition-colors")}
                  >
                    {customImageSrc ? (
                      <img src={customImageSrc} alt={link.label || "Social Icon"} className="size-4.5 object-contain select-none" />
                    ) : (
                      getSocialIcon(link.href, link.label)
                    )}
                  </a>
                );
              })}
            </div>

            {/* Roadmap & Changelog */}
            <div className="space-y-2 pt-2 text-xs font-bold text-black flex flex-col">
              <Link href="#roadmap" className="hover:text-[#00b259] transition-colors w-fit">Roadmap</Link>
              <Link href="#changelog" className="hover:text-[#00b259] transition-colors w-fit">Changelog</Link>
            </div>
          </div>

          {/* Columns 2+: Dynamic/Fallback Columns */}
          {finalColumns.map((col, colIdx) => {
            const colSpanClass = getColSpanClass(colIdx, finalColumns.length);
            return (
              <div key={col.id} className={cn(colSpanClass, "space-y-4")}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">{col.title}</h4>
                <ul className="space-y-2.5 text-xs text-neutral-500">
                  {col.items.map((item) => (
                    <li key={item.id}>
                      <Link href={item.path || "#"} className="hover:text-[#00b259] transition-colors">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

        </div>

        {/* Separator */}
        <div className="h-px bg-[#C5C4C2]/40 w-full" />

        {/* Bottom Brands Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
          <div className="text-xs font-semibold text-neutral-500">Our Products:</div>
          <div className="flex flex-wrap items-center gap-6">
            {finalProducts.map((prod: any) => (
              <div key={prod.id} className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                {renderProductBadgeIcon(prod.name, prod.product_image)}
                <span className={getProductTextClass(prod.name)}>{prod.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Separator 2 */}
        <div className="h-px bg-[#C5C4C2]/40 w-full" />

        {/* Bottom Credits & Payment Badges */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-neutral-500">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {footerData?.text ? (
              <span dangerouslySetInnerHTML={{ __html: footerData.text }} />
            ) : (
              <span>© 2026 AI Greentick, Made with <span className="text-red-500">❤️</span> for a better web.</span>
            )}
            <span className="hidden md:inline text-neutral-300">|</span>
            <div className="flex flex-wrap gap-4">
              {finalLegalItems.map((item, index) => (
                <Link key={index} href={item.href || "#"} className="hover:text-[#00b259] transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Secure Payment */}
            <div className="flex items-center gap-1 bg-[#F1F5F9] border border-[#E2E8F0] px-2 py-1 rounded-sm text-[10px] font-semibold text-neutral-700">
              <svg className="size-3.5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure Payment</span>
            </div>

            {/* lemon squeezy */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-700">
              <svg className="size-3 text-[#FFC72C]" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" />
                <path d="M14 6C14 6 15 4 17 4C17 4 17 6 15 7C14 7.5 14 6 14 6Z" fill="#10B981" />
              </svg>
              <span>lemon squeezy</span>
            </div>

            {/* VISA */}
            <span className="text-[11px] font-extrabold italic text-[#1A1F71] tracking-wider select-none">VISA</span>

            {/* PayPal */}
            <span className="text-[11px] font-extrabold italic text-[#003087] tracking-tighter select-none">Pay<span className="text-[#0079C1]">Pal</span></span>

            {/* MasterCard */}
            <div className="flex items-center -space-x-1.5 select-none">
              <div className="size-3.5 rounded-full bg-[#EB001B] opacity-90" />
              <div className="size-3.5 rounded-full bg-[#F79E1B] opacity-90" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
