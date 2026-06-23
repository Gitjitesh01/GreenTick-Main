import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="flex flex-col flex-1 min-h-[70vh] items-center justify-center bg-zinc-50 dark:bg-black px-4 py-16">
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden transition-all duration-300">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col items-center text-center space-y-6">
          <div className="size-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CreditCard className="size-8" />
          </div>
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              <Sparkles className="size-3.5" />
              Dynamic Page
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Pricing
            </h1>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 max-w-md text-base leading-relaxed">
            Welcome to the Pricing section. This page has been dynamically linked via your Strapi Navigation menu and generated in the frontend.
          </p>

          <div className="pt-4">
            <Button asChild variant="outline" className="rounded-full gap-2">
              <Link href="/">
                <ArrowLeft className="size-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
