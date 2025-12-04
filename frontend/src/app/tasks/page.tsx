"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Clock,
    CheckCircle2,
    Sparkles,
    XCircle,
    TrendingUp,
    Zap,
    Filter,
    Search,
    ArrowRight,
    Terminal,
    Cpu,
    Activity,
    Database
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuantumBackground } from "@/components/ui/quantum-background";
import { TechBadge } from "@/components/ui/tech-badge";
import { DataModule } from "@/components/ui/data-module";
import { QuantumText } from "@/components/ui/quantum-text";

const userTasks: any[] = [];

export default function TasksPage() {
    const [tasks, setTasks] = useState(userTasks);
    const [statusFilter, setStatusFilter] = useState<"all" | "queued" | "optimizing" | "validated" | "failed">("all");
    const [sortBy, setSortBy] = useState<"created_desc" | "created_asc" | "score_desc">("created_desc");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        try {
            // Load tasks from localStorage
            if (typeof window !== 'undefined') {
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                setTasks(storedTasks);
            }
        } catch { }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTasks(prev => {
                const updated = prev.map(task => {
                    if (task.status === "failed" || task.status === "validated") return task;

                    let progress = typeof task.progress === "number" ? task.progress : 0;
                    let status = task.status;

                    if (status === "queued") {
                        progress = Math.min(progress + 5, 40);
                        if (progress >= 20) status = "optimizing";
                    } else if (status === "optimizing") {
                        progress = Math.min(progress + 10, 100);
                        if (progress >= 100) {
                            progress = 100;
                            status = "validated";
                        }
                    }

                    const next: any = { ...task, progress, status };
                    if (task.status !== "validated" && status === "validated") {
                        next.completedAt = new Date().toISOString();
                        if (next.score == null) next.score = Math.round(90 + Math.random() * 9);
                    }
                    return next;
                });

                try {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('tasks', JSON.stringify(updated));
                    }
                } catch { }

                return updated;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const visibleTasks = [...tasks]
        .filter(t => (statusFilter === "all" ? true : t.status === statusFilter))
        .sort((a: any, b: any) => {
            if (sortBy === "created_desc") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (sortBy === "created_asc") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            if (sortBy === "score_desc") return (b.score || 0) - (a.score || 0);
            return 0;
        });

    return (
        <div className="min-h-screen relative font-mono text-zinc-800 bg-zinc-50 selection:bg-primary selection:text-white overflow-x-hidden">
            <QuantumBackground />

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-zinc-200 pb-6 w-full bg-zinc-50/90 backdrop-blur-sm rounded-lg"
                >
                    <div className="flex flex-col gap-1 flex-shrink-0">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-primary mb-1 tracking-widest uppercase">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            Workspace / Tasks
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 flex items-center gap-3">
                            <QuantumText text="OPTIMIZATION_TASKS" />
                        </h1>
                        <p className="text-zinc-500 text-xs max-w-xl font-mono mt-1">
                            Manage and monitor your prompt optimization pipelines.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 md:mt-0 flex-shrink-0">
                        <Link href="/optimize">
                            <Button className="h-9 px-4 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:-translate-y-0.5 font-mono text-[10px] uppercase tracking-wider">
                                <Sparkles className="w-3 h-3 mr-2" />
                                New_Optimization
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                >
                    {[
                        { label: "TOTAL_TASKS", value: tasks.length, icon: Database, color: "text-zinc-900" },
                        { label: "COMPLETED", value: tasks.filter(t => t.status === "validated").length, icon: CheckCircle2, color: "text-emerald-600" },
                        { label: "IN_PROGRESS", value: tasks.filter(t => t.status === "optimizing" || t.status === "queued").length, icon: Activity, color: "text-primary" },
                        { label: "AVG_IMPROVEMENT", value: "+42%", icon: TrendingUp, color: "text-purple-600" },
                    ].map((stat, i) => (
                        <DataModule key={i} className="p-4 flex flex-col justify-between h-full bg-white/80 backdrop-blur-sm border-zinc-200/60">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</span>
                                <stat.icon className={`w-3.5 h-3.5 ${stat.color} opacity-80`} />
                            </div>
                            <div className={`text-2xl font-bold tracking-tight ${stat.color} font-mono`}>
                                {stat.value}
                            </div>
                        </DataModule>
                    ))}
                </motion.div>

                {/* Controls */}
                <div className="sticky top-4 z-30 mb-6">
                    <DataModule className="p-1.5 bg-white/90 backdrop-blur-md border-zinc-200/80 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center p-1 bg-zinc-100/50 rounded-md">
                                {(["all", "queued", "optimizing", "validated", "failed"] as const).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setStatusFilter(key)}
                                        className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${statusFilter === key
                                            ? "bg-white text-zinc-900 shadow-sm border border-zinc-200"
                                            : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50"
                                            }`}
                                    >
                                        {key}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="relative group flex-1 md:w-56">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="SEARCH..."
                                        className="h-8 pl-8 pr-3 bg-zinc-50 border border-zinc-200 rounded text-[10px] font-mono focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all w-full uppercase"
                                    />
                                </div>
                                <div className="h-5 w-px bg-zinc-200 mx-1 hidden md:block" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="h-8 pl-2 pr-6 bg-zinc-50 border border-zinc-200 rounded text-[10px] font-mono focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer hover:bg-zinc-100 transition-colors uppercase"
                                >
                                    <option value="created_desc">NEWEST</option>
                                    <option value="created_asc">OLDEST</option>
                                    <option value="score_desc">SCORE</option>
                                </select>
                            </div>
                        </div>
                    </DataModule>
                </div>

                {/* Tasks List */}
                <motion.div layout className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {visibleTasks.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-12"
                            >
                                <DataModule className="p-8 flex flex-col items-center text-center bg-white/50">
                                    <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mb-3">
                                        <Search className="w-5 h-5 text-zinc-300" />
                                    </div>
                                    <h3 className="text-sm font-bold text-zinc-900 mb-1 font-mono">NO_TASKS_FOUND</h3>
                                    <p className="text-zinc-500 text-[10px] max-w-xs mb-4 font-mono">
                                        We couldn't find any tasks matching your current filters.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setStatusFilter("all")}
                                        className="bg-white font-mono text-[10px] h-8"
                                    >
                                        CLEAR_FILTERS
                                    </Button>
                                </DataModule>
                            </motion.div>
                        ) : (
                            visibleTasks.map((task, index) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    layoutId={task.id}
                                >
                                    <Link href={`/task/${task.id}`}>
                                        <DataModule className="p-0 group hover:border-primary/30 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                                            <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">

                                                {/* Left: Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <TechBadge
                                                            variant={
                                                                task.status === "validated" ? "success" :
                                                                    task.status === "failed" ? "danger" :
                                                                        task.status === "optimizing" ? "default" : "neutral"
                                                            }
                                                            animate={task.status === "optimizing"}
                                                        >
                                                            {task.status.toUpperCase()}
                                                        </TechBadge>
                                                        <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {task.createdAt}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-base font-bold text-zinc-900 mb-1 group-hover:text-primary transition-colors truncate font-mono">
                                                        {task.name}
                                                    </h3>
                                                    <p className="text-[11px] text-zinc-500 mb-3 line-clamp-1 font-sans max-w-2xl">
                                                        {task.description || "Optimizing prompt performance and cost efficiency..."}
                                                    </p>

                                                    <div className="flex items-center gap-3 text-[9px] font-bold text-zinc-500 font-mono uppercase tracking-wider">
                                                        <span className="flex items-center gap-1 px-1.5 py-0.5 bg-zinc-100 rounded border border-zinc-200">
                                                            <Cpu className="w-2.5 h-2.5" />
                                                            {task.model}
                                                        </span>
                                                        {(task.status === "optimizing" || task.status === "queued") && (
                                                            <span className="text-primary animate-pulse flex items-center gap-1">
                                                                <Terminal className="w-2.5 h-2.5" />
                                                                PROCESSING...
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right: Metrics */}
                                                <div className="flex items-center gap-6 md:border-l md:border-zinc-100 md:pl-6 md:min-h-[60px]">
                                                    {task.status === "validated" ? (
                                                        <>
                                                            <div className="text-center min-w-[60px]">
                                                                <div className="text-[9px] text-zinc-400 uppercase tracking-wider mb-0.5 font-mono">TOKENS</div>
                                                                <div className="text-xs font-bold text-emerald-600 font-mono">-{task.tokenSavings}%</div>
                                                            </div>
                                                            <div className="text-center min-w-[60px]">
                                                                <div className="text-[9px] text-zinc-400 uppercase tracking-wider mb-0.5 font-mono">LATENCY</div>
                                                                <div className="text-xs font-bold text-blue-600 font-mono">-{task.latencySavings}%</div>
                                                            </div>
                                                            <div className="text-right pl-4 border-l border-zinc-100">
                                                                <div className="text-2xl font-bold text-primary tracking-tight font-mono">{task.score}</div>
                                                                <div className="text-[8px] font-bold text-primary/60 uppercase tracking-wider font-mono">SCORE</div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="w-full md:w-40">
                                                            <div className="flex justify-between text-[9px] uppercase tracking-wider font-mono mb-1.5">
                                                                <span className="font-bold text-zinc-500">PROGRESS</span>
                                                                <span className="text-zinc-400">{task.progress}%</span>
                                                            </div>
                                                            <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    className={`h-full rounded-full ${task.status === "queued" ? "bg-amber-400" : "bg-primary"}`}
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${task.progress}%` }}
                                                                    transition={{ duration: 0.5 }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-zinc-50 text-zinc-400 group-hover:bg-primary group-hover:text-white transition-all ml-1">
                                                        <ArrowRight className="w-3 h-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </DataModule>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
