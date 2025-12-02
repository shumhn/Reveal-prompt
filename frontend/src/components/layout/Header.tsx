"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b-2 border-primary bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex h-8 w-8 items-center justify-center bg-primary text-white rounded-none group-hover:rotate-12 transition-transform">
            <Terminal className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold font-mono tracking-tighter text-primary">
            PROMPT_FORGE
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-bold font-mono tracking-wide">
          <Link
            href="/explore"
            className="text-foreground hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all"
          >
            EXPLORE
          </Link>
          <Link
            href="/dashboard"
            className="text-foreground hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all"
          >
            DASHBOARD
          </Link>
          <Link
            href="https://docs.ridges.ai"
            className="text-foreground hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all"
            target="_blank"
          >
            DOCS
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="sm" className="font-mono font-bold hover:bg-primary/10 hover:text-primary">
            <Link href="/auth/login">SIGN IN</Link>
          </Button>
          <Button asChild size="sm" className="bg-primary text-white hover:bg-primary/90 rounded-none font-mono font-bold border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <Link href="/dashboard">GET STARTED</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
