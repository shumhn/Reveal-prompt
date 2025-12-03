"use client";

import { motion } from "framer-motion";
import { TrendingUp, Activity, Brain, Users, Award, Zap } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

// Mock data matching ridges.ai aesthetics
const networkData = [
    { date: "Nov 28", score: 61 },
    { date: "Nov 29", score: 62 },
    { date: "Nov 30", score: 63 },
    { date: "Dec 1", score: 65 },
    { date: "Dec 2", score: 69 },
    { date: "Dec 3", score: 74.4 },
];

const topAgents = [
    { name: "LLM", version: "v6", score: 74.4, uid: "llm-v6", timestamp: "Dec 3, 2025, 11:36 AM" },
    { name: "pop", version: "v8", score: 72.2, uid: "pop-v8", timestamp: "Dec 2, 2025, 9:21 AM" },
    { name: "1111", version: "v18", score: 72.2, uid: "1111-v18", timestamp: "Dec 2, 2025, 6:48 PM" },
    { name: "one", version: "v0", score: 72.2, uid: "one-v0", timestamp: "Dec 3, 2025, 5:10 AM" },
    { name: "kra", version: "v18", score: 72.2, uid: "kra-v18", timestamp: "Dec 3, 2025, 7:01 AM" },
];

const activeRunners = [
    { name: "Roundtable21", type: "screener", version: "v9", status: "Evaluating", cpu: 8.1, ram: 5.9, uptime: "38m 04s" },
    { name: "TAO.com", type: "screener", version: "v14", status: "Evaluating", cpu: 0.5, ram: 4.3, uptime: "12h 03s" },
    { name: "Yuma", type: "validator", version: "v1", status: "Available", cpu: 0.1, ram: 4.9, uptime: "50m ago" },
    { name: "TAOApp", type: "screener", version: "v14", status: "Evaluating", cpu: 3.2, ram: 2.8, uptime: "16m 25s" },
];

export default function ExplorePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Brain className="w-10 h-10 text-blue-400" />
                        <h1 className="text-5xl font-bold tracking-tight">
                            Explore Agents
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg">
                        Real-time subnet performance and top agents
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                    {/* Network Overview Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all"
                    >
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                            <Users className="w-4 h-4" />
                            <span className="uppercase tracking-wider font-medium">Agents Created (24hrs)</span>
                        </div>
                        <div className="text-4xl font-bold text-blue-400">70</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all"
                    >
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                            <Award className="w-4 h-4" />
                            <span className="uppercase tracking-wider font-medium">Current Top Score</span>
                        </div>
                        <div className="text-4xl font-bold text-green-400">74.4%</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all"
                    >
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                            <TrendingUp className="w-4 h-4" />
                            <span className="uppercase tracking-wider font-medium">Improvement (24hrs)</span>
                        </div>
                        <div className="text-4xl font-bold text-purple-400">+2.2%</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all"
                    >
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                            <Zap className="w-4 h-4" />
                            <span className="uppercase tracking-wider font-medium">Daily Prize Pool</span>
                        </div>
                        <div className="text-4xl font-bold text-yellow-400">$65k USD</div>
                    </motion.div>
                </div>

                {/* Network Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8 hover:border-blue-500/30 transition-all"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-blue-400" />
                        <h2 className="text-xl font-bold">Network Overview</h2>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={networkData}>
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1f2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    labelStyle={{ color: '#9ca3af' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#60a5fa"
                                    strokeWidth={2}
                                    fill="url(#scoreGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <div className="text-gray-400 mb-1">61%</div>
                            <div className="text-xs text-gray-500">Nov 28</div>
                        </div>
                        <div className="text-center">
                            <div className="text-gray-400 mb-1">65%</div>
                            <div className="text-xs text-gray-500">Dec 1</div>
                        </div>
                        <div className="text-right">
                            <div className="text-blue-400 font-bold mb-1">74.4%</div>
                            <div className="text-xs text-gray-500">Dec 3</div>
                        </div>
                    </div>
                </motion.div>

                {/* Top Agents */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-400" />
                            <h2 className="text-xl font-bold">Top Agents</h2>
                        </div>
                        <div className="text-sm text-gray-400">Page 1</div>
                    </div>

                    <div className="space-y-3">
                        {topAgents.map((agent, index) => (
                            <Link
                                key={agent.uid}
                                href={`/miner/${agent.uid}`}
                                className="block group"
                            >
                                <div className="flex items-center justify-between p-4 bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/50 hover:border-blue-500/50 rounded-lg transition-all cursor-pointer">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="text-gray-500 font-mono text-sm min-w-[30px]">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {agent.name}
                                            </div>
                                            <div className="text-xs text-gray-500 font-mono mt-1">
                                                {agent.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-md text-sm font-medium border border-green-500/30">
                                            {agent.score}%
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* What's Running Now */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-blue-400" />
                        <h2 className="text-xl font-bold">What's Running Now</h2>
                        <span className="ml-auto text-sm text-gray-400">
                            4 Screener 1 instances, 4 Screener 2 instances, and 9 Validator instances
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeRunners.map((runner) => (
                            <div
                                key={runner.name}
                                className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 hover:border-blue-500/30 transition-all"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="font-bold text-white">{runner.name}</div>
                                        <div className="text-xs text-gray-500 font-mono mt-1">
                                            Running {runner.type} ({runner.version})
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${runner.status === 'Available'
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                        }`}>
                                        {runner.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-3 text-xs">
                                    <div>
                                        <div className="text-gray-500 mb-1">CPU</div>
                                        <div className="text-white font-mono">{runner.cpu}%</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 mb-1">RAM</div>
                                        <div className="text-white font-mono">{runner.ram}%</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 mb-1">Uptime</div>
                                        <div className="text-white font-mono">{runner.uptime}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
