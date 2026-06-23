"use client";

import React from "react";
import Link from "next/link";
import { type FooterComponent, type NavigationPluginItem } from "@/lib/api";

interface FooterProps {
  footerData: FooterComponent | null;
  siteName: string;
  siteDescription?: string;
  navItems: NavigationPluginItem[];
}

export default function Footer({ footerData, siteName, siteDescription, navItems }: FooterProps) {
  // Find Compare and Legal sections in dynamic navigation
  const compareWrapper = navItems?.find(
    (item) => item.type === "WRAPPER" && item.title.toLowerCase().includes("compare")
  );

  const legalWrapper = navItems?.find(
    (item) => item.type === "WRAPPER" && item.title.toLowerCase().includes("legal")
  );

  // Extract comparison heading dynamically if design uses heading
  const compareHeading = compareWrapper?.title || "Compare AI Greentick:";

  // Extract comparison items (dynamic sub-items under Compare wrapper, or flat list, or fallbacks)
  const rawComparisonItems = compareWrapper?.items && compareWrapper.items.length > 0
    ? compareWrapper.items
    : navItems?.length && !compareWrapper && !legalWrapper
      ? navItems
      : [
          { id: 1, title: "vs Wati", path: "#", type: "INTERNAL" as const, externalPath: null, uiRouterKey: null, menuAttached: false, order: 1, collapsed: false },
          { id: 2, title: "vs AiSensy", path: "#", type: "INTERNAL" as const, externalPath: null, uiRouterKey: null, menuAttached: false, order: 2, collapsed: false },
          { id: 3, title: "vs DoubleTick", path: "#", type: "INTERNAL" as const, externalPath: null, uiRouterKey: null, menuAttached: false, order: 3, collapsed: false },
          { id: 4, title: "vs Interakt", path: "#", type: "INTERNAL" as const, externalPath: null, uiRouterKey: null, menuAttached: false, order: 4, collapsed: false },
          { id: 5, title: "vs Gallabox", path: "#", type: "INTERNAL" as const, externalPath: null, uiRouterKey: null, menuAttached: false, order: 5, collapsed: false },
        ];

  const normalizedComparisonItems = rawComparisonItems.map((item: any) => {
    const label = item.title || item.label || "";
    const href = item.path || item.href || item.externalPath || "#";
    const isExternal = item.type === "EXTERNAL" || item.isExternal || href.startsWith("http");
    return { id: item.id, label, href, isExternal };
  });

  // Extract legal items (dynamic sub-items under Legal wrapper, or footerData.navItems, or fallbacks)
  const rawLegalItems = legalWrapper?.items && legalWrapper.items.length > 0
    ? legalWrapper.items
    : footerData?.navItems?.length
      ? footerData.navItems
      : [
          { id: 11, label: "Privacy Policy", href: "#", isExternal: false },
          { id: 12, label: "Terms of Service", href: "#", isExternal: false },
          { id: 13, label: "Refund Policy", href: "#", isExternal: false },
          { id: 14, label: "Cookie Policy", href: "#", isExternal: false },
          { id: 15, label: "Trust Center", href: "#", isExternal: false },
        ];

  const normalizedLegalItems = rawLegalItems.map((item: any) => {
    const label = item.label || item.title || "";
    const href = item.href || item.path || item.externalPath || "#";
    const isExternal = item.isExternal || item.type === "EXTERNAL" || href.startsWith("http");
    return { id: item.id, label, href, isExternal };
  });

  const defaultCopyright = (
    <>
      © 2026 AI Greentick.All rights reserved.| Made with{" "}
      <span className="text-destructive">❤️</span> in India
    </>
  );

  const copyrightContent = footerData?.text ? footerData.text : defaultCopyright;

  return (
    <footer className="px-4 sm:px-6 lg:px-8 bg-background border-b border-border/40">
      <div className="mx-auto max-w-7xl border-x border-[#C5C4C2] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Comparison Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs sm:text-sm text-muted-foreground mb-8 text-center">
          {compareHeading && (
            <span className="font-medium text-foreground">{compareHeading}</span>
          )}
          {normalizedComparisonItems.map((item, index) => {
            return (
              <React.Fragment key={item.id}>
                <Link
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="hover:text-[#00b050] transition-colors"
                >
                  {item.label}
                </Link>
                {index < normalizedComparisonItems.length - 1 && (
                  <span className="text-muted-foreground/30 font-sans">|</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Separator Line */}
        <div className="h-px bg-border/60 w-full" />

        {/* Copyright and Legal Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground mt-8 text-center md:text-left">
          <div>
            {copyrightContent}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {normalizedLegalItems.map((item, index) => {
              return (
                <React.Fragment key={item.id}>
                  <Link
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="hover:text-[#00b050] transition-colors"
                  >
                    {item.label}
                  </Link>
                  {index < normalizedLegalItems.length - 1 && (
                    <span className="text-muted-foreground/30 font-sans">|</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
