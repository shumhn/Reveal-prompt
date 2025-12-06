"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, CheckCircle2, XCircle, AlertTriangle, Loader2, Code, Activity, TrendingUp, Copy, Shield, Cpu, Network, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { TechBadge } from "@/components/ui/tech-badge";
import { DataModule } from "@/components/ui/data-module";
import { QuantumBackground } from "@/components/ui/quantum-background";
import ScoreHistoryChart from "@/components/ScoreHistoryChart";
import ValidatorSpread from "@/components/ValidatorSpread";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

// Mock agent source code
const agentSourceCode = `from __future__ import annotations
import json
import os
import requests
import subprocess
import sys
import textwrap
import time
import traceback
from pathlib import Path
from typing import Any, Dict, List, Optional
from uuid import uuid4
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
import csv
import logging
from enum import Enum
import re
import inspect
import random
from uuid import uuid4
import difflib
import tempfile

DEFAULT_PROXY_URL = os.getenv("SANDBOX_PROXY_URL", "http://sandbox_proxy")
DEFAULT_PROXY = int(os.getenv("AGENT_TIMEOUT", "1340"))

PROBLEM_TYPE_CREATE = "CREATE"
PROBLEM_TYPE_FIX = "FIX"

run_id = None
agent_start_time = None

# Agent optimization logic
def agent_sync(data):
    # processing agent telemetry
    patterns = decode(data)
    return optimize(patterns)`;

const taskHistory = [
    {
        id: "task-001",
        name: "Optimization Task #1",
        status: "rejected",
        performance: 0.12,
        runtime: "08m 15s",
        validator: "TAOApp",
        rejectionReason: "Output format mismatch"
    },
    {
        id: "task-002",
        name: "Optimization Task #2",
        status: "rejected",
        performance: 0.35,
        runtime: "03m 05s",
        validator: "TAOApp",
        rejectionReason: "Test cases failed"
    },
    {
        id: "task-003",
        name: "Optimization Task #3",
        status: "rejected",
        performance: 0.08,
        runtime: "11m 40s",
        validator: "Opentensor",
        rejectionReason: "Timeout exceeded"
    },
    {
        id: "task-004",
        name: "Optimization Task #4",
        status: "completed",
        performance: 0.94,
        runtime: "02m 28s",
        validator: "TAOApp",
        rejectionReason: null
    },
    {
        id: "task-005",
        name: "Optimization Task #5",
        status: "completed",
        performance: 0.87,
        runtime: "03m 08s",
        validator: "Ridges",
        rejectionReason: null
    },
    {
        id: "task-006",
        name: "Optimization Task #6",
        status: "completed",
        performance: 0.92,
        runtime: "04m 12s",
        validator: "Opentensor",
        rejectionReason: null
    },
    {
        id: "task-007",
        name: "Optimization Task #7",
        status: "pending",
        performance: null,
        runtime: "01m 45s",
        validator: "TAOApp",
        rejectionReason: null
    },
];

const minerValidators = [
    { name: "TAOApp", uid: "5E2..xM4", stake: "2.1M τ", trust: 94, validations: 4, online: true },
    { name: "Opentensor", uid: "5F4..xK2", stake: "4.2M τ", trust: 98, validations: 2, online: true },
    { name: "Ridges", uid: "5H7..pQ3", stake: "1.8M τ", trust: 91, validations: 1, online: true },
];

export default function MinerDetailPage() {
    const params = useParams();
    const uid = params.uid as string;

    // Mock miner data
    const minerData = {
        name: uid.split('-')[0].toUpperCase() || "LLM",
        version: uid.split('-')[1] || "v6",
        score: 74.4,
        status: "Online",
        hotkey: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        uid: "175",
        rank: 12,
        totalMiners: 256,
        rewards: 1247.83,
        rewardsCurrency: "τ",
        registeredAt: "2024-09-15 14:32:18 UTC",
        age: "82 days",
        uptime: "15d 8h 42m",
        uptimePercent: 99.2,
        totalWins: 847,
        totalAttempts: 1024,
        winRate: 82.7,
        validators: ["TAOApp", "Opentensor", "Ridges"],
    };

    const [activeTab, setActiveTab] = useState<"code" | "tasks">("code");

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
                    <div className="flex flex-col gap-1">
                        <Link href="/explore" className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 hover:text-primary mb-1 tracking-widest uppercase transition-colors">
                            <ArrowLeft className="w-3 h-3" />
                            Back to Explore
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 flex items-center gap-3">
                            {minerData.name}
                            <span className="text-zinc-400 font-normal text-xl">{minerData.version}</span>
                        </h1>
                        <div className="flex items-center gap-4 text-xs text-zinc-500 mt-1 font-mono">
                            <span className="flex items-center gap-1"><Network className="w-3 h-3" /> UID: {minerData.uid}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Age: {minerData.age}</span>
                            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {minerData.validators.length} Validators</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        {/* Rank */}
                        <div className="text-center px-4 py-2 bg-amber-50/50 rounded-lg border border-amber-200/50">
                            <div className="text-[9px] text-amber-600 uppercase tracking-wider font-bold mb-0.5">Rank</div>
                            <div className="text-xl font-bold text-amber-600 font-mono">#{minerData.rank}</div>
                            <div className="text-[9px] text-zinc-500 font-mono">of {minerData.totalMiners}</div>
                        </div>
                        {/* Rewards */}
                        <div className="text-center px-4 py-2 bg-violet-50/50 rounded-lg border border-violet-200/50">
                            <div className="text-[9px] text-violet-600 uppercase tracking-wider font-bold mb-0.5">Rewards</div>
                            <div className="text-xl font-bold text-violet-600 font-mono">{minerData.rewards.toLocaleString()}</div>
                            <div className="text-[9px] text-zinc-500 font-mono">{minerData.rewardsCurrency} earned</div>
                        </div>
                        {/* Win Rate */}
                        <div className="text-center px-4 py-2 bg-emerald-50/50 rounded-lg border border-emerald-200/50">
                            <div className="text-[9px] text-emerald-600 uppercase tracking-wider font-bold mb-0.5">Win Rate</div>
                            <div className="text-xl font-bold text-emerald-600 font-mono">{minerData.winRate}%</div>
                            <div className="text-[9px] text-zinc-500 font-mono">{minerData.totalWins}/{minerData.totalAttempts}</div>
                        </div>
                        {/* Uptime */}
                        <div className="text-center px-4 py-2 bg-blue-50/50 rounded-lg border border-blue-200/50">
                            <div className="text-[9px] text-blue-600 uppercase tracking-wider font-bold mb-0.5">Uptime</div>
                            <div className="text-xl font-bold text-blue-600 font-mono">{minerData.uptimePercent}%</div>
                            <div className="text-[9px] text-zinc-500 font-mono">{minerData.uptime}</div>
                        </div>
                        <TechBadge variant="success" animate className="h-8 px-3">
                            {minerData.status}
                        </TechBadge>
                    </div>
                </motion.div>

                {/* Miner Info Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 p-4 bg-white/60 backdrop-blur-sm border border-zinc-200/60 rounded-xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Hotkey */}
                        <div>
                            <div className="text-[9px] text-zinc-400 uppercase tracking-wider font-bold mb-1">Hotkey</div>
                            <div className="flex items-center gap-2">
                                <code className="text-xs font-mono text-zinc-700 bg-zinc-100 px-2 py-1 rounded truncate max-w-[280px]">
                                    {minerData.hotkey}
                                </code>
                                <button
                                    onClick={() => navigator.clipboard.writeText(minerData.hotkey)}
                                    className="p-1.5 hover:bg-zinc-100 rounded transition-colors"
                                    title="Copy hotkey"
                                >
                                    <Copy className="w-3.5 h-3.5 text-zinc-400 hover:text-primary" />
                                </button>
                            </div>
                        </div>
                        {/* Registered */}
                        <div>
                            <div className="text-[9px] text-zinc-400 uppercase tracking-wider font-bold mb-1">Registered</div>
                            <div className="text-sm font-mono text-zinc-700">{minerData.registeredAt}</div>
                        </div>
                        {/* Age */}
                        <div>
                            <div className="text-[9px] text-zinc-400 uppercase tracking-wider font-bold mb-1">Age</div>
                            <div className="text-sm font-mono text-zinc-700">{minerData.age} since registration</div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                    {/* Left Column: Charts (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <ScoreHistoryChart />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <ValidatorSpread />
                        </motion.div>
                    </div>

                    {/* Right Column: Code & Tasks (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <DataModule className="bg-white/80 backdrop-blur-sm border-zinc-200/60 min-h-[624px] flex flex-col">
                                <div className="flex items-center justify-between border-b border-zinc-100 px-4">
                                    <div className="flex gap-6">
                                        <button
                                            onClick={() => setActiveTab("code")}
                                            className={`py-4 text-sm font-bold uppercase tracking-wider font-mono border-b-2 transition-colors ${activeTab === "code" ? "border-primary text-primary" : "border-transparent text-zinc-400 hover:text-zinc-600"}`}
                                        >
                                            Source_Code
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("tasks")}
                                            className={`py-4 text-sm font-bold uppercase tracking-wider font-mono border-b-2 transition-colors ${activeTab === "tasks" ? "border-primary text-primary" : "border-transparent text-zinc-400 hover:text-zinc-600"}`}
                                        >
                                            Task_History
                                        </button>
                                    </div>
                                    {activeTab === "code" && (
                                        <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-primary">
                                            <Copy className="w-3 h-3 mr-2" />
                                            COPY
                                        </Button>
                                    )}
                                </div>

                                <div className="flex-1 overflow-hidden bg-white/50">
                                    {activeTab === "code" ? (
                                        <div className="h-[560px] bg-white border-t border-zinc-100 relative overflow-hidden">
                                            {/* Blurred Monaco Editor - visible as backdrop */}
                                            <div className="absolute inset-0 blur-[6px] pointer-events-none">
                                                <MonacoEditor
                                                    height="560px"
                                                    defaultLanguage="python"
                                                    theme="vs"
                                                    value={agentSourceCode}
                                                    options={{
                                                        readOnly: true,
                                                        minimap: { enabled: false },
                                                        fontSize: 13,
                                                        lineNumbers: "on",
                                                        scrollBeyondLastLine: false,
                                                        fontFamily: "JetBrains Mono, monospace",
                                                        padding: { top: 16, bottom: 16 },
                                                        lineNumbersMinChars: 4,
                                                        glyphMargin: false,
                                                        folding: false
                                                    }}
                                                />
                                            </div>

                                            {/* Semi-transparent overlay - lets code show through */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">

                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                    className="text-center p-8 max-w-lg relative z-10"
                                                >
                                                    {/* Glowing icon container */}
                                                    <div className="relative inline-flex mb-6">
                                                        <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl animate-pulse" />
                                                        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
                                                            <Code className="w-10 h-10 text-white" />
                                                        </div>
                                                    </div>

                                                    <h3 className="text-2xl font-bold text-zinc-900 mb-3 font-mono tracking-tight">
                                                        Source Code Viewer
                                                    </h3>
                                                    <p className="text-sm text-zinc-500 mb-6 leading-relaxed max-w-sm mx-auto">
                                                        Inspect miner agent implementations, analyze optimization strategies, and understand how top performers achieve their scores.
                                                    </p>

                                                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                                        <span className="relative flex h-2 w-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                                        </span>
                                                        In Development
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col h-full">
                                            {/* Run Summary Card - Using actual validator data */}
                                            <div className="p-6 border-b border-zinc-100 bg-white">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-200">
                                                        {minerValidators[0]?.name.charAt(0) || "V"}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h3 className="text-lg font-bold text-zinc-900">{minerValidators[0]?.name || "Validator"}</h3>
                                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-600 uppercase tracking-wide border border-emerald-200">
                                                                Finished - {minerData.winRate}%
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-zinc-500 mb-2 font-mono">
                                                            Started {minerData.registeredAt} • Running for {minerData.uptime}
                                                        </div>
                                                        <div className="text-sm font-bold text-zinc-900">
                                                            {taskHistory.filter(t => t.status === 'completed').length} passed, {taskHistory.filter(t => t.status === 'rejected').length} failed <span className="text-zinc-400 font-normal">({taskHistory.length} total)</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(minerValidators[0]?.uid || '')}
                                                            className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2 transition-colors"
                                                        >
                                                            Validator Hotkey <Copy className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(minerData.uid)}
                                                            className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2 transition-colors"
                                                        >
                                                            Evaluation ID <Copy className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Task Table Header */}
                                            <div className="px-6 py-3 border-b border-zinc-100 bg-zinc-50/50 flex items-center text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                                                <div className="flex-1">Problem Name</div>
                                                <div className="w-32 text-center">Status</div>
                                                <div className="w-24 text-right">Runtime</div>
                                            </div>

                                            {/* Scrollable Task List */}
                                            <div className="flex-1 overflow-y-auto">
                                                {taskHistory.map((task, i) => (
                                                    <Link
                                                        key={task.id}
                                                        href={`/task/${task.id}`}
                                                        className="flex items-center px-6 py-4 border-b border-zinc-50 hover:bg-zinc-50 transition-colors group cursor-pointer"
                                                    >
                                                        <div className="flex-1 flex items-center gap-3 min-w-0">
                                                            <span className="font-mono text-sm text-zinc-700 font-medium truncate group-hover:text-primary transition-colors">
                                                                {task.name}
                                                            </span>
                                                            <div className="px-1.5 py-0.5 bg-zinc-100 rounded text-[10px] text-zinc-400 font-mono">
                                                                <Copy className="w-3 h-3" />
                                                            </div>
                                                        </div>

                                                        <div className="w-32 flex justify-center">
                                                            <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${task.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                                task.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                                                    'bg-amber-50 text-amber-600 border-amber-100'
                                                                }`}>
                                                                {task.status === 'completed' ? 'Passed' :
                                                                    task.status === 'rejected' ? 'Failed' : 'Running'}
                                                            </span>
                                                        </div>

                                                        <div className="w-24 text-right font-mono text-sm text-zinc-600">
                                                            {task.runtime}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </DataModule>
                        </motion.div>
                    </div>
                </div>

                {/* Validators Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <DataModule className="bg-white/80 backdrop-blur-sm border-zinc-200/60">
                        <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-violet-500/10 rounded-lg">
                                    <Users className="w-4 h-4 text-violet-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider font-mono">Validators</h3>
                                    <p className="text-[10px] text-zinc-500">Validators that have validated this miner's tasks</p>
                                </div>
                            </div>
                            <TechBadge variant="neutral" className="text-[9px] h-5 px-2">
                                {minerValidators.length} VALIDATORS
                            </TechBadge>
                        </div>

                        {/* Validator Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                            {minerValidators.map((validator, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-zinc-50/50 rounded-lg border border-zinc-100 hover:border-violet-300/50 transition-all group"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-violet-100 to-violet-200 rounded-lg flex items-center justify-center text-lg font-bold text-violet-600 uppercase">
                                                {validator.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-zinc-900 group-hover:text-violet-600 transition-colors">{validator.name}</h4>
                                                <span className="text-[10px] font-mono text-zinc-400">{validator.uid}</span>
                                            </div>
                                        </div>
                                        <span className={`relative flex h-2 w-2 ${validator.online ? '' : 'opacity-50'}`}>
                                            {validator.online && (
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            )}
                                            <span className={`relative inline-flex rounded-full h-2 w-2 ${validator.online ? 'bg-emerald-500' : 'bg-zinc-400'}`}></span>
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-100">
                                        <div>
                                            <div className="text-[9px] text-zinc-400 uppercase tracking-wider font-bold mb-1">Stake</div>
                                            <div className="text-sm font-bold text-violet-600 font-mono">{validator.stake}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] text-zinc-400 uppercase tracking-wider font-bold mb-1">Trust</div>
                                            <div className="text-sm font-bold text-zinc-700 font-mono">{validator.trust}%</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] text-zinc-400 uppercase tracking-wider font-bold mb-1">Validated</div>
                                            <div className="text-sm font-bold text-primary font-mono">{validator.validations}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DataModule>
                </motion.div>
            </div>
        </div>
    );
}
