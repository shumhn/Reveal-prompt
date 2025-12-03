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
    DollarSign,
    Filter,
    ArrowUpDown,
    Search,
    MoreHorizontal,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const userTasks = [
    {
        id: "task-1",
        name: "E-commerce Product Extractor",
        description: "Extract product details from Amazon and Shopify pages",
        status: "validated",
        score: 94.2,
        progress: 100,
        createdAt: "Dec 2, 2025, 5:35 AM",
        completedAt: "Dec 2, 2025, 5:37 AM",
        tokenSavings: 37.5,
        latencySavings: 28.1,
        costSavings: 1.71,
        model: "GPT-4",
    },
    {
        id: "task-2",
        name: "Customer Support Classifier",
        description: "Classify incoming support tickets by urgency and topic",
        status: "optimizing",
        score: null,
        progress: 67,
        createdAt: "Dec 2, 2025, 2:15 PM",
        completedAt: null,
        tokenSavings: null,
        latencySavings: null,
        costSavings: null,
        model: "GPT-4 Turbo",
    },
    {
        id: "task-3",
        name: "Invoice Data Extractor",
        description: "Parse PDF invoices and extract structured JSON data",
        status: "queued",
        score: null,
        progress: 0,
        createdAt: "Dec 2, 2025, 4:45 PM",
        completedAt: null,
        tokenSavings: null,
        latencySavings: null,
        costSavings: null,
        model: "Claude 3 Opus",
    },
    {
        id: "task-4",
        name: "SEO Meta Generator",
        description: "Generate optimized title tags and meta descriptions",
        status: "validated",
        score: 88.7,
        progress: 100,
        createdAt: "Dec 1, 2025, 10:20 AM",
        completedAt: "Dec 1, 2025, 10:22 AM",
        tokenSavings: 42.1,
        latencySavings: 31.5,
        costSavings: 2.15,
        model: "GPT-4",
    },
    {
        id: "task-5",
        name: "Meeting Notes Summarizer",
        description: "Summarize hour-long transcripts into key action items",
        status: "failed",
        score: null,
        progress: 0,
        createdAt: "Nov 30, 2025, 3:10 PM",
        completedAt: null,
        tokenSavings: null,
        latencySavings: null,
        costSavings: null,
        model: "GPT-4",
    },
];

const statusConfig = {
    queued: {
        icon: Clock,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        label: "Queued",
        badge: "bg-amber-100 text-amber-700 border-amber-200"
    },
    optimizing: {
        icon: Sparkles,
        color: "text-primary",
        bg: "bg-primary/5",
        border: "border-primary/20",
        label: "Optimizing",
        badge: "bg-primary/10 text-primary border-primary/20"
    },
    validated: {
        icon: CheckCircle2,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        label: "Validated",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200"
    },
    failed: {
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        label: "Failed",
        badge: "bg-red-100 text-red-700 border-red-200"
    },
};

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
            const stored = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('tasks') || '[]') : [];
            if (Array.isArray(stored) && stored.length) {
                const merged = [...stored, ...userTasks.filter(t => !stored.find((s: any) => s.id === t.id))];
                setTasks(merged);
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
        <div className="min-h-screen bg-zinc-50/50 selection:bg-primary/10 selection:text-primary font-sans">
            {/* Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="container mx-auto px-6 max-w-6xl pt-24 pb-20">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
                >
                    <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                            WORKSPACE / TASKS
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-2">
                            Optimization Tasks
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            Manage and monitor your prompt optimization pipelines.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-11 bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 text-zinc-700 shadow-sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter View
                        </Button>
                        <Link href="/optimize">
                            <Button className="h-11 px-6 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:-translate-y-0.5">
                                <Sparkles className="w-4 h-4 mr-2" />
                                New Optimization
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
                >
                    {[
                        { label: "Total Tasks", value: tasks.length, icon: Sparkles, color: "text-zinc-900" },
                        { label: "Completed", value: tasks.filter(t => t.status === "validated").length, icon: CheckCircle2, color: "text-emerald-600" },
                        { label: "In Progress", value: tasks.filter(t => t.status === "optimizing" || t.status === "queued").length, icon: Clock, color: "text-primary" },
                        { label: "Avg. Improvement", value: "+42%", icon: TrendingUp, color: "text-purple-600" },
                    ].map((stat, i) => (
                        <div key={i} className="group bg-white border border-zinc-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-zinc-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                                <stat.icon className={`w-4 h-4 ${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                            </div>
                            <div className={`text-3xl font-bold tracking-tight ${stat.color}`}>
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Controls */}
                <div className="sticky top-20 z-30 bg-zinc-50/80 backdrop-blur-xl border-y border-zinc-200/50 py-4 mb-8 -mx-6 px-6 md:mx-0 md:px-0 md:bg-transparent md:border-0 md:backdrop-filter-none md:static md:mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center p-1 bg-white border border-zinc-200 rounded-lg shadow-sm">
                            {(["all", "queued", "optimizing", "validated", "failed"] as const).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setStatusFilter(key)}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${statusFilter === key
                                            ? "bg-zinc-100 text-zinc-900 shadow-sm"
                                            : "text-muted-foreground hover:text-zinc-700 hover:bg-zinc-50"
                                        }`}
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    className="h-10 pl-9 pr-4 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full md:w-64"
                                />
                            </div>
                            <div className="h-8 w-px bg-zinc-200 mx-1 hidden md:block" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="h-10 pl-3 pr-8 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer hover:bg-zinc-50 transition-colors"
                            >
                                <option value="created_desc">Newest First</option>
                                <option value="created_asc">Oldest First</option>
                                <option value="score_desc">Highest Score</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tasks List */}
                <motion.div
                    layout
                    className="space-y-4"
                >
                    <AnimatePresence mode="popLayout">
                        {visibleTasks.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-zinc-200 rounded-2xl"
                            >
                                <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                                    <Search className="w-8 h-8 text-zinc-300" />
                                </div>
                                <h3 className="text-lg font-medium text-zinc-900 mb-1">No tasks found</h3>
                                <p className="text-muted-foreground text-sm max-w-xs text-center mb-6">
                                    We couldn't find any tasks matching your current filters.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => setStatusFilter("all")}
                                    className="bg-white"
                                >
                                    Clear Filters
                                </Button>
                            </motion.div>
                        ) : (
                            visibleTasks.map((task, index) => {
                                const statusStyle = statusConfig[task.status as keyof typeof statusConfig];
                                const StatusIcon = statusStyle.icon;

                                return (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                        layoutId={task.id}
                                    >
                                        <Link href={`/task/${task.id}`}>
                                            <div className="group relative bg-white border border-zinc-100 rounded-xl p-6 shadow-sm hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

                                                    {/* Left Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle.badge}`}>
                                                                <StatusIcon className="w-3.5 h-3.5" />
                                                                {statusStyle.label}
                                                            </span>
                                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {task.createdAt}
                                                            </span>
                                                        </div>

                                                        <h3 className="text-lg font-semibold text-zinc-900 mb-1 group-hover:text-primary transition-colors truncate">
                                                            {task.name}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                                                            {task.description || "Optimizing prompt performance and cost efficiency..."}
                                                        </p>

                                                        <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                                                            <span className="flex items-center gap-1.5 px-2 py-1 bg-zinc-50 rounded-md border border-zinc-100">
                                                                <Zap className="w-3 h-3 text-amber-500" />
                                                                {task.model}
                                                            </span>
                                                            {(task.status === "optimizing" || task.status === "queued") && (
                                                                <span className="text-primary animate-pulse">
                                                                    Processing...
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Right Content / Metrics */}
                                                    <div className="flex items-center gap-6 md:border-l md:border-zinc-100 md:pl-6 md:min-h-[80px]">
                                                        {task.status === "validated" ? (
                                                            <>
                                                                <div className="text-center">
                                                                    <div className="text-xs text-muted-foreground mb-1">Tokens</div>
                                                                    <div className="text-sm font-bold text-zinc-900">-{task.tokenSavings}%</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-xs text-muted-foreground mb-1">Latency</div>
                                                                    <div className="text-sm font-bold text-zinc-900">-{task.latencySavings}%</div>
                                                                </div>
                                                                <div className="text-right pl-4 border-l border-zinc-100">
                                                                    <div className="text-3xl font-bold text-primary tracking-tight">{task.score}</div>
                                                                    <div className="text-[10px] font-bold text-primary/60 uppercase tracking-wider">Score</div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="w-full md:w-48">
                                                                <div className="flex justify-between text-xs mb-2">
                                                                    <span className="font-medium text-zinc-700">Progress</span>
                                                                    <span className="text-muted-foreground">{task.progress}%</span>
                                                                </div>
                                                                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        className={`h-full rounded-full ${task.status === "queued" ? "bg-amber-400" : "bg-primary"}`}
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${task.progress}%` }}
                                                                        transition={{ duration: 0.5 }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-zinc-50 text-zinc-400 group-hover:bg-primary group-hover:text-white transition-all ml-2">
                                                            <ArrowRight className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
