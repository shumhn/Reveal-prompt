"use client";

import { Button } from "@/components/ui/button";
import { WindowCard } from "@/components/ui/window-card";
import { QuantumBackground } from "@/components/ui/quantum-background";
import { Hypercube } from "@/components/ui/hypercube";
import { ArrowRight, Terminal, Activity, Lock, Globe, Cpu, Network, Sparkles, ChevronRight, Zap, Brain, Infinity, Triangle } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

function MagneticButton({ children, className, variant = "primary", ...props }: any) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 20);
        y.set(yPct * 20);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseXSpring, y: mouseYSpring }}
        >
            <Button className={className} {...props}>
                {children}
            </Button>
        </motion.div>
    );
}

function QuantumText({ text }: { text: string }) {
    const [displayText, setDisplayText] = useState(text);
    const [realityShift, setRealityShift] = useState(false);
    
    useEffect(() => {
        const quantumChars = "⚛∞⊗∇∂∂∫∑∏π√∆∇∀∃∈∉∪∩⊂⊃⊆⊇ℵℶℷℸ⍈⍉⍊⍋⍌⍍⍎⍏⍐⍑⍒⍓⍔⍕⍖⍗⍘⍙⍚⍛⍜⍝⍞⍟⍠⍡⍢⍣⍤⍥⍦⍧⍨⍩⍪⍫⍬⍭⍮⍯⍰⍱⍲⍳⍴⍵⍶⍷⍸⍹⍺⍻⍼⍽⍾⍿⎀⎁⎂⎃⎄⎅⎆⎇⎈⎉⎊⎋⎌⎍⎎⎏⎐⎑⎒⎓⎔⎕⎖⎗⎘⎙⎚⎛⎜⎝⎞⎟⎠⎡⎢⎣⎤⎥⎦⎧⎨⎩⎪⎫⎬⎭⎮⎯⎰⎱⎲⎳⎴⎵⎶⎷⎸⎹⎺⎻⎼⎽⎾⎿⏀⏁⏂⏃⏄⏅⏆⏇⏈⏉⏊⏋⏌⏍⏎⏏⏐⏑⏒⏓⏔⏕⏖⏗⏘⏙⏚⏛⏜⏝⏞⏟⏠⏡⏢⏣⏤⏥⏦⏧⏨⏩⏪⏫⏬⏭⏮⏯⏰⏱⏲⏳⏴⏵⏶⏷⏸⏹⏺⏻⏼⏽⏾⏿";
        
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.92) {
                setRealityShift(true);
                let glitched = text.split('').map(char => 
                    Math.random() > 0.7 ? quantumChars[Math.floor(Math.random() * quantumChars.length)] : char
                ).join('');
                setDisplayText(glitched);
                setTimeout(() => {
                    setDisplayText(text);
                    setRealityShift(false);
                }, 200);
            }
        }, 1500);
        
        return () => clearInterval(glitchInterval);
    }, [text]);

    return (
        <span className={`inline-block ${realityShift ? 'animate-pulse' : ''}`}>
            {displayText.split('').map((char, i) => (
                <motion.span
                    key={`${char}-${i}`}
                    animate={{ 
                        y: realityShift ? [0, -5, 5, 0] : 0,
                        rotateZ: realityShift ? [0, 2, -2, 0] : 0,
                        opacity: realityShift ? [1, 0.3, 1] : 1
                    }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
}

function PortalButton({ children, className, ...props }: any) {
    const [portalActive, setPortalActive] = useState(false);
    
    return (
        <motion.div
            className="relative"
            onMouseEnter={() => setPortalActive(true)}
            onMouseLeave={() => setPortalActive(false)}
            whileHover={{ scale: 1.05 }}
        >
            <AnimatePresence>
                {portalActive && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="absolute inset-0 rounded-xl"
                        style={{ zIndex: -1 }}
                    >
                        <div className="w-full h-full rounded-xl bg-linear-to-r from-primary via-purple-500 to-indigo-400 opacity-80 animate-spin" 
                             style={{ animationDuration: '3s' }} />
                        <div className="absolute inset-0 rounded-xl bg-black/20 backdrop-blur-sm" />
                    </motion.div>
                )}
            </AnimatePresence>
            
            <Button className={`${className} relative z-10`} {...props}>
                {children}
            </Button>
        </motion.div>
    );
}

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden font-mono text-foreground bg-gradient-to-br from-zinc-50 via-white to-zinc-100 selection:bg-primary selection:text-white">
      <QuantumBackground />
      
      <div className="container mx-auto px-6 relative z-10 min-h-screen flex flex-col justify-center">
        
        {/* Network HUD */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, staggerChildren: 0.1 }}
          className="absolute top-24 left-6 right-6 flex justify-between text-[9px] md:text-xs font-medium text-muted-foreground/60 uppercase tracking-[0.2em] hidden md:flex border-b border-primary/10 pb-4"
        >
          <div className="flex gap-8">
            <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                AGENT_SYNC
            </span>
            <span>THROUGHPUT: 1.2TB/s</span>
            <span>LATENCY: 3ms</span>
          </div>
          <div className="flex gap-8">
            <span>NODES: 1,248</span>
            <span>CONSENSUS: 99.8%</span>
            <span className="text-primary">ACTIVE</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-10">
          
          {/* Left: Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-white/50 backdrop-blur-sm text-primary text-xs font-medium tracking-widest mb-0 mt-4 shadow-sm"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
            >
              <Brain className="w-3 h-3" />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-600">
                  AGENT NETWORK ONLINE
              </span>
            </motion.div>

            <div className="mt-8">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-8">
              <div className="overflow-hidden h-[1.1em] flex items-center">
                <motion.span 
                    initial={{ y: "100%" }} 
                    animate={{ y: 0 }} 
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="block"
                >
                    <QuantumText text="REVEAL" />
                </motion.span>
              </div>
              <div className="overflow-hidden h-[1.1em] flex items-center text-transparent bg-clip-text bg-gradient-to-br from-primary via-indigo-500 to-purple-600">
                <motion.span 
                    initial={{ y: "100%" }} 
                    animate={{ y: 0 }} 
                    transition={{ duration: 0.5, delay: 0.1, ease: "circOut" }}
                    className="block"
                >
                    PROMPT
                </motion.span>
              </div>
              <div className="text-2xl md:text-4xl font-normal tracking-wide text-muted-foreground mt-2 flex items-center gap-4">
                <motion.div 
                    className="h-px flex-1 bg-primary/20" 
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <span className="relative">
                    OPTIMIZATION
                    <motion.div 
                        className="absolute inset-0 bg-linear-to-r from-transparent via-primary/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    />
                </span>
              </div>
            </h1>
            </div>

            <p className="text-base text-muted-foreground max-w-lg mb-12 leading-relaxed">
              The first <span className="text-primary font-medium">decentralized prompt optimization protocol</span>. 
              Deploy autonomous agents that relentlessly refine prompts for <span className="text-foreground font-normal border-b-2 border-primary/20">flawless execution</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <MagneticButton
                asChild
                size="lg"
                className="h-14 px-8 bg-primary text-white hover:bg-primary/90 rounded-xl text-sm font-medium tracking-normal shadow-[0_10px_40px_-10px_rgba(99,102,241,0.5)] transition-all hover:shadow-[0_20px_60px_-10px_rgba(99,102,241,0.6)]"
              >
                <Link href="/explore" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  ENTER_NETWORK
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>

              <MagneticButton
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 border-2 border-zinc-100 bg-white/50 backdrop-blur-sm hover:bg-zinc-50 hover:border-primary/20 rounded-xl text-sm font-medium text-zinc-800"
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  AGENT_DOCS
                </Link>
              </MagneticButton>
            </div>

            {/* Tech Stack Indicators */}
            <div className="mt-20 pt-8 border-t border-dashed border-zinc-200 flex gap-10 opacity-60">
               <div className="flex items-center gap-2 text-[10px] font-medium tracking-wide uppercase hover:text-primary transition-colors cursor-help">
                   <Cpu className="w-4 h-4" /> LLAMA-3
               </div>
               <div className="flex items-center gap-2 text-[10px] font-medium tracking-wide uppercase hover:text-primary transition-colors cursor-help">
                   <Network className="w-4 h-4" /> BITTENSOR
               </div>
               <div className="flex items-center gap-2 text-[10px] font-medium tracking-wide uppercase hover:text-primary transition-colors cursor-help">
                   <Lock className="w-4 h-4" /> ZK-ROLLUP
               </div>
            </div>
          </motion.div>

          {/* Right: 4D Hypercube */}
          <div className="relative h-[600px] hidden lg:block perspective-[2000px]">
             
             {/* 4D Hypercube */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
               whileHover={{ scale: 1.1 }}
             >
                <Hypercube />
             </motion.div>

             {/* Floating Data Stream */}
             <motion.div 
               initial={{ opacity: 0, y: 50, rotateX: 10 }}
               animate={{ opacity: 1, y: 0, rotateX: 0 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="absolute top-10 right-10 w-[320px] z-20"
               whileHover={{ scale: 1.02, y: -5, rotateY: 5 }}
             >
                <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden group">
                    {/* Iridescent Border Gradient on Hover */}
                    <div className="absolute inset-0 p-px rounded-2xl bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)' }} />
                    
                    <div className="p-4 bg-zinc-50 border-b border-zinc-100 flex items-center gap-2 px-4">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                        </div>
                        <div className="text-[10px] font-medium text-zinc-400 ml-4 tracking-widest">AGENT_STREAM.py</div>
                    </div>
                    <div className="p-6 font-mono text-xs space-y-3 text-zinc-600">
                        <div className="flex justify-between text-zinc-400">
                            <span>status: <span className="text-green-500 font-medium">syncing</span></span>
                            <span>pid: 8492</span>
                        </div>
                        <div className="p-3 bg-zinc-50 rounded border border-zinc-100">
                            <span className="text-purple-600">def</span> <span className="text-blue-600">agent_sync</span>(data):<br/>
                            &nbsp;&nbsp;<span className="text-zinc-400"># processing agent telemetry</span><br/>
                            &nbsp;&nbsp;patterns = decode(data)<br/>
                            &nbsp;&nbsp;<span className="text-indigo-500">return</span> optimize(patterns)
                        </div>
                        <div className="flex gap-2 mt-4">
                             <div className="h-1 flex-1 bg-zinc-100 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-linear-to-r from-primary to-purple-600" 
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                />
                             </div>
                        </div>
                        <div className="text-[10px] text-zinc-400 text-right">AGENT_SYNC: 98.4%</div>
                    </div>
                </div>
             </motion.div>

             {/* Metrics Orb */}
             <motion.div 
               initial={{ opacity: 0, x: -50, rotateZ: -5 }}
               animate={{ opacity: 1, x: 0, rotateZ: -5 }}
               transition={{ duration: 0.8, delay: 0.5 }}
               className="absolute bottom-20 left-0 w-[280px] z-30"
               whileHover={{ scale: 1.05, rotateZ: 0, zIndex: 50 }}
             >
                <div className="bg-zinc-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-zinc-800 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Brain className="w-16 h-16" />
                    </div>
                    <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">Network Metrics</div>
                    <div className="flex justify-between items-end mb-4">
                         <div>
                             <div className="text-2xl font-semibold text-white">98.4%</div>
                             <div className="text-[10px] text-zinc-400 mt-1">SYNC_ACCURACY</div>
                         </div>
                         <div className="text-green-400 text-xs font-medium flex items-center gap-1">
                             <Activity className="w-3 h-3" /> +2.4%
                         </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] text-zinc-500">
                            <span>ACTIVE_AGENTS</span>
                            <span>142/150</span>
                        </div>
                        <div className="flex gap-1">
                            {[1,2,3,4,5,6,7,8,9,10].map(i => (
                                <motion.div 
                                    key={i} 
                                    className="h-8 flex-1 bg-primary/20 rounded-sm"
                                    animate={{ height: [10, 32, 10] }}
                                    transition={{ duration: 1, delay: i * 0.1, repeat: Number.POSITIVE_INFINITY }}
                                    style={{ backgroundColor: i > 8 ? 'rgba(99,102,241,0.2)' : '#6366f1' }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
             </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}
