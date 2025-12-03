"use client";

import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { Zap, Clock, Coins, TrendingDown, Activity, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PerformanceAnalyticsProps {
    data: {
        originalTokens: number;
        optimizedTokens: number;
        originalLatency: number;
        optimizedLatency: number;
        sampleCount: number;
    };
    samples: any[];
}

export default function PerformanceAnalytics({ data, samples }: PerformanceAnalyticsProps) {
    const tokenSavings = ((data.originalTokens - data.optimizedTokens) / data.originalTokens * 100).toFixed(1);
    const latencyImprovement = ((data.originalLatency - data.optimizedLatency) / data.originalLatency * 100).toFixed(1);

    // Cost calculation (estimated $30/1M tokens for input/output blend)
    const costPerToken = 0.00003;
    const costSavingsPer1k = (data.originalTokens - data.optimizedTokens) * costPerToken * 1000;

    const chartData = [
        {
            name: "Tokens",
            Original: Math.round(data.originalTokens),
            Optimized: Math.round(data.optimizedTokens),
        },
        {
            name: "Latency (ms)",
            Original: Math.round(data.originalLatency),
            Optimized: Math.round(data.optimizedLatency),
        }
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-xl">
                    <p className="text-zinc-400 text-xs mb-2 font-mono">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm font-mono mb-1">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-zinc-300">{entry.name}:</span>
                            <span className="text-white font-bold">{entry.value}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-emerald-500" />
                <h2 className="text-lg font-bold text-zinc-900 tracking-tight font-mono">
                    PERFORMANCE_METRICS
                </h2>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                <Zap className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                                -{tokenSavings}%
                            </span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-zinc-900 font-mono">
                                {Math.round(data.originalTokens - data.optimizedTokens)}
                            </h3>
                            <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
                                Tokens Saved / Query
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <Clock className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
                                -{latencyImprovement}%
                            </span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-zinc-900 font-mono">
                                {Math.round(data.originalLatency - data.optimizedLatency)}ms
                            </h3>
                            <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
                                Latency Reduction
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                <Coins className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-mono text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                                EST. SAVINGS
                            </span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-zinc-900 font-mono">
                                ${costSavingsPer1k.toFixed(2)}
                            </h3>
                            <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
                                Per 1,000 Queries
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Token Comparison Chart */}
                <Card className="bg-white border-zinc-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                            <Database className="w-4 h-4" />
                            Token Usage Comparison
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[180px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[chartData[0]]} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e4e4e7" />
                                    <XAxis type="number" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis type="category" dataKey="name" hide />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="Original" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={24} />
                                    <Bar dataKey="Optimized" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="text-[10px] font-mono text-zinc-600">Original ({Math.round(data.originalTokens)})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-mono text-zinc-600">Optimized ({Math.round(data.optimizedTokens)})</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Latency Comparison Chart */}
                <Card className="bg-white border-zinc-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                            <TrendingDown className="w-4 h-4" />
                            Latency Comparison
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[180px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[chartData[1]]} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e4e4e7" />
                                    <XAxis type="number" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis type="category" dataKey="name" hide />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="Original" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={24} />
                                    <Bar dataKey="Optimized" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="text-[10px] font-mono text-zinc-600">Original ({Math.round(data.originalLatency)}ms)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span className="text-[10px] font-mono text-zinc-600">Optimized ({Math.round(data.optimizedLatency)}ms)</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
