"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ExternalLink, ChevronDown } from "lucide-react";
import { getStrapiMediaUrl, type HeaderComponent, type NavigationPluginItem } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  headerData: HeaderComponent | null;
  siteName: string;
  navItems: NavigationPluginItem[];
}

export default function Navbar({ headerData, siteName, navItems }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll state to apply glassmorphic styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Fallback values if backend data is not fully configured
  const finalSiteName = siteName || "AI GreenTick";
  const logo = headerData?.logo;

  // Custom navigation items that match the user's design screenshot if backend is empty
  const finalNavItems = navItems?.length
    ? navItems
    : [
      {
        id: 101,
        title: "Features",
        type: "WRAPPER" as const,
        path: "#",
        externalPath: null,
        uiRouterKey: "features",
        menuAttached: true,
        order: 1,
        collapsed: false,
        items: [
          { id: 201, title: "Feature Overview", type: "INTERNAL" as const, path: "/feature-overview", externalPath: null, uiRouterKey: "feature-overview", menuAttached: true, order: 1, collapsed: false },
          { id: 202, title: "WhatsApp Broadcasts", type: "INTERNAL" as const, path: "/whatApp-Broadcasts", externalPath: null, uiRouterKey: "whats-app-broadcasts", menuAttached: true, order: 2, collapsed: false },
          { id: 203, title: "AI Chatbot Builder", type: "INTERNAL" as const, path: "/ai-chatBot-builder", externalPath: null, uiRouterKey: "ai-chatbot-builder", menuAttached: true, order: 3, collapsed: false },
        ]
      },
      {
        id: 102,
        title: "Solutions",
        type: "INTERNAL" as const,
        path: "/solution",
        externalPath: null,
        uiRouterKey: "solutions",
        menuAttached: true,
        order: 2,
        collapsed: false,
      },
      {
        id: 103,
        title: "Pricing",
        type: "INTERNAL" as const,
        path: "/pricing",
        externalPath: null,
        uiRouterKey: "pricing",
        menuAttached: true,
        order: 3,
        collapsed: false,
      },
      {
        id: 104,
        title: "Blog",
        type: "INTERNAL" as const,
        path: "/blog",
        externalPath: null,
        uiRouterKey: "blog",
        menuAttached: true,
        order: 4,
        collapsed: false,
      },
      {
        id: 105,
        title: "Company",
        type: "WRAPPER" as const,
        path: "#",
        externalPath: null,
        uiRouterKey: "company",
        menuAttached: true,
        order: 5,
        collapsed: false,
        items: [
          { id: 301, title: "About Us", type: "INTERNAL" as const, path: "/about", externalPath: null, uiRouterKey: "about-us", menuAttached: true, order: 1, collapsed: false },
          { id: 302, title: "Contact", type: "INTERNAL" as const, path: "/contact", externalPath: null, uiRouterKey: "contact", menuAttached: true, order: 2, collapsed: false },
        ]
      }
    ];

  const ctas = headerData?.cta?.filter(item => item.label && item.href) || [];

  // Custom fallback CTAs that match the login / try-for-free buttons in screenshot
  const finalCtas = ctas.length
    ? ctas
    : [
      { id: 901, label: "Login", href: "/login", isExternal: false, isButtonLink: false, type: "SECONDARY" as const },
      { id: 902, label: "BOOK A DEMO", href: "/register", isExternal: false, isButtonLink: true, type: "PRIMARY" as const }
    ];

  const logoImageSrc = logo?.image?.url ? getStrapiMediaUrl(logo.image.url) : "/logo-full.png";
  const logoAlt = logo?.image?.alternativeText || finalSiteName;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl border-b border-[#C5C4C2] md:border-x">
        <div className="flex h-16 items-stretch justify-between">

          {/* Logo Area */}
          <div className="flex items-center px-4 md:px-6 md:border-r border-[#C5C4C2] shrink-0">
            <Link
              href={logo?.href || "/"}
              target={logo?.isExternal ? "_blank" : undefined}
              rel={logo?.isExternal ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 group"
            >
              {logoImageSrc ? (
                <img
                  src={logoImageSrc}
                  alt={logoAlt}
                  className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex items-center gap-2">
                  {/* Premium Scalloped Green Seal Icon */}
                  <svg className="w-7 h-7 text-[#00b050] filter drop-shadow-[0_1px_2px_rgba(0,176,80,0.15)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2C11.3 2 10.7 2.4 10.4 3L9.8 4.2C9.6 4.6 9.1 4.9 8.6 4.9L7.2 4.7C6.5 4.6 5.9 5 5.6 5.7L5 6.9C4.8 7.4 4.3 7.7 3.8 7.7L2.4 7.7C1.7 7.7 1.1 8.2 1 8.9L0.9 10.3C0.8 10.8 0.4 11.2 0 11.4V12.6C0.4 12.8 0.8 13.2 0.9 13.7L1 15.1C1.1 15.8 1.7 16.3 2.4 16.3L3.8 16.3C4.3 16.3 4.8 16.6 5 17.1L5.6 18.3C5.9 19 6.5 19.4 7.2 19.3L8.6 19.1C9.1 19.1 9.6 19.4 9.8 19.8L10.4 21C10.7 21.6 11.3 22 12 22C12.7 22 13.3 21.6 13.6 21L14.2 19.8C14.4 19.4 14.9 19.1 15.4 19.1L16.8 19.3C17.5 19.4 18.1 19 18.4 18.3L19 17.1C19.2 16.6 19.7 16.3 20.2 16.3L21.6 16.3C22.3 16.3 22.9 15.8 23 15.1L23.1 13.7C23.2 13.2 23.6 12.8 24 12.6V11.4C23.6 11.2 23.2 10.8 23.1 10.3L23 8.9C22.9 8.2 22.3 7.7 21.6 7.7L20.2 7.7C19.7 7.7 19.2 7.4 19 6.9L18.4 5.7C18.1 5 17.5 4.6 16.8 4.7L15.4 4.9C14.9 4.9 14.4 4.6 14.2 4.2L13.6 3C13.3 2.4 12.7 2 12 2Z"
                      fill="currentColor"
                    />
                    <path
                      d="M9.5 15.5L6.5 12.5L7.91 11.09L9.5 12.67L16.09 6.09L17.5 7.5L9.5 15.5Z"
                      fill="white"
                    />
                  </svg>
                  <span className="text-xl font-bold tracking-tight flex items-center">
                    <span className="text-[#00b050]">ai</span>
                    <span className="text-black">GreenTick</span>
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden md:flex items-center justify-center flex-1 px-8 gap-6">
            {finalNavItems.map((item) => {
              const href = item.path || item.externalPath || "#";
              const label = item.title;
              if (!href || !label) return null;
              const hasSubItems = item.items && item.items.length > 0;
              const isExternal = item.type === "EXTERNAL" || href.startsWith("http://") || href.startsWith("https://");
              const isActive = pathname === href;

              if (hasSubItems) {
                return (
                  <div key={item.id} className="relative group flex items-center h-full">
                    <button className="flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-[#00b050] transition-colors cursor-pointer py-2">
                      {label}
                      <ChevronDown className="size-3.5 opacity-70 transition-transform duration-250 group-hover:rotate-180" />
                    </button>
                    {/* Beautiful Dropdown Card */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-56 rounded-xl shadow-xl bg-white border border-[#C5C4C2] py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 transform scale-95 group-hover:scale-100">
                      {item.items?.map((subItem) => {
                        const subHref = subItem.path || subItem.externalPath || "#";
                        const subIsExternal = subItem.type === "EXTERNAL" || subHref.startsWith("http");
                        const subIsActive = pathname === subHref;

                        return (
                          <Link
                            key={subItem.id}
                            href={subHref}
                            target={subIsExternal ? "_blank" : undefined}
                            rel={subIsExternal ? "noopener noreferrer" : undefined}
                            className={`block px-4 py-2.5 text-sm rounded-lg mx-1 transition-all ${subIsActive
                                ? "text-[#00b050] bg-emerald-50 font-semibold"
                                : "text-neutral-700 hover:text-[#00b050] hover:bg-neutral-50"
                              }`}
                          >
                            {subItem.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-[#00b050] flex items-center gap-1 ${isActive
                      ? "text-[#00b050] font-semibold"
                      : "text-neutral-700"
                    }`}
                >
                  {label}
                  {isExternal && <ExternalLink className="size-3 opacity-70" />}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Action Buttons */}
          <div className="hidden md:flex items-center gap-6 px-6 border-l border-[#C5C4C2] shrink-0">
            {finalCtas.map((item) => {
              const isButton = item.type === "PRIMARY" || item.isButtonLink || item.label?.toLowerCase() === "book a demo";

              if (isButton) {
                return (
                  <Button
                    key={item.id}
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-[#00b050] to-[#005c2b] hover:from-[#00c853] hover:to-[#006e33] text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm px-5 py-2 font-bold text-xs uppercase tracking-wider border-none"
                    style={{
                      clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                      borderRadius: "0px"
                    }}
                  >
                    <Link
                      href={item.href!}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                    >
                      {item.label}
                    </Link>
                  </Button>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href!}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium text-neutral-700 hover:text-[#00b050] transition-colors flex items-center"
                >
                  <span className="text-[#00b050] font-bold mr-1.5 font-mono">::</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle button */}
          <div className="flex md:hidden items-center px-4 border-l border-[#C5C4C2] h-full">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 hover:text-black focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[450px] border-b border-[#C5C4C2] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          } bg-background`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-4 pb-6 pt-3">
          {finalNavItems.map((item) => {
            const href = item.path || item.externalPath || "#";
            const label = item.title;
            if (!href || !label) return null;
            const hasSubItems = item.items && item.items.length > 0;
            const isExternal = item.type === "EXTERNAL" || href.startsWith("http://") || href.startsWith("https://");
            const isActive = pathname === href;

            return (
              <div key={item.id} className="space-y-1">
                {hasSubItems ? (
                  <>
                    <div className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-wider text-neutral-500">
                      {label}
                    </div>
                    <div className="pl-3 border-l border-neutral-200 ml-3 space-y-1">
                      {item.items?.map((subItem) => {
                        const subHref = subItem.path || subItem.externalPath || "#";
                        const subIsExternal = subItem.type === "EXTERNAL" || subHref.startsWith("http");
                        const subIsActive = pathname === subHref;

                        return (
                          <Link
                            key={subItem.id}
                            href={subHref}
                            target={subIsExternal ? "_blank" : undefined}
                            rel={subIsExternal ? "noopener noreferrer" : undefined}
                            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${subIsActive
                                ? "text-[#00b050] bg-emerald-50 font-semibold"
                                : "text-neutral-700 hover:text-black hover:bg-neutral-50"
                              }`}
                          >
                            {subItem.title}
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <Link
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${isActive
                        ? "text-[#00b050] bg-emerald-50 font-semibold"
                        : "text-neutral-700 hover:text-black hover:bg-neutral-50"
                      }`}
                  >
                    <span className="flex items-center justify-between">
                      {label}
                      {isExternal && <ExternalLink className="size-4 opacity-70" />}
                    </span>
                  </Link>
                )}
              </div>
            );
          })}

          {finalCtas.length > 0 && (
            <div className="border-t border-neutral-200 mt-4 pt-4 flex flex-col gap-2">
              {finalCtas.map((item) => {
                const isButton = item.type === "PRIMARY" || item.isButtonLink || item.label?.toLowerCase() === "book a demo";

                if (isButton) {
                  return (
                    <Button
                      key={item.id}
                      asChild
                      className="w-full bg-gradient-to-r from-[#00b050] to-[#005c2b] hover:from-[#00c853] hover:to-[#006e33] text-white py-2.5 rounded-lg font-semibold border-none"
                    >
                      <Link
                        href={item.href!}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noopener noreferrer" : undefined}
                        className="justify-center"
                      >
                        {item.label}
                      </Link>
                    </Button>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href!}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="block text-center py-2 text-base font-medium text-neutral-700 hover:text-black"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
