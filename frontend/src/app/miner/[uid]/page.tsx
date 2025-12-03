"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, CheckCircle2, XCircle, Code, Activity, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

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
        id: "django_django-11400",
        name: "django__django-11400",
        status: "failed",
        runtime: "08m 15s",
        validator: "TAOApp"
    },
    {
        id: "protein-translation-js",
        name: "protein-translation-js",
        status: "failed",
        runtime: "03m 05s",
        validator: "TAOApp"
    },
    {
        id: "sphinx-doc__sphinx-11510",
        name: "sphinx-doc__sphinx-11510",
        status: "failed",
        runtime: "11m 40s",
        validator: "TAOApp"
    },
    {
        id: "house-py",
        name: "house-py",
        status: "passed",
        runtime: "02m 28s",
        validator: "TAOApp"
    },
    {
        id: "pig-latin-js",
        name: "pig-latin-js",
        status: "passed",
        runtime: "03m 08s",
        validator: "TAOApp"
    },
];

const statusConfig = {
    passed: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
    failed: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
};

export default function MinerDetailPage() {
    const params = useParams();
    const uid = params.uid as string;

    // Mock miner data
    const minerData = {
        name: uid.split('-')[0].toUpperCase() || "LLM",
        version: uid.split('-')[1] || "v6",
        score: 74.4,
        status: "Finished",
        hotkey: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        uid: "175",
        runtime: "15h 61m",
        validators: ["TAOApp", "Opentensor", "Ridges"],
    };

    const [activeTab, setActiveTab] = useState<"code" | "tasks">("code");

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Back Button */}
                <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Explore</span>
                </Link>

                {/* Miner Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-8"
                >
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-bold">{minerData.name}</h1>
                                <span className="text-gray-500 text-2xl">{minerData.version}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span>Agent ID: <span className="text-white font-mono">{minerData.uid}</span></span>
                                <span className="text-gray-600">•</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {minerData.runtime}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-5xl font-bold text-green-400 mb-2">{minerData.score}%</div>
                            <span className="inline-block px-3 py-1 rounded-md text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/30">
                                {minerData.status}
                            </span>
                        </div>
                    </div>

                    {/* Hotkeys */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-800">
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Miner Hotkey</div>
                            <div className="font-mono text-sm text-gray-300 break-all bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                {minerData.hotkey}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Validator Hotkey</div>
                            <div className="font-mono text-sm text-gray-300 break-all bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                {minerData.hotkey.split('').reverse().join('')}
                            </div>
                        </div>
                    </div>

                    {/* Validators */}
                    <div className="mt-6 pt-6 border-t border-gray-800">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Ran on {minerData.validators.length}/3 validators</div>
                        <div className="flex gap-2">
                            {minerData.validators.map((validator) => (
                                <div key={validator} className="flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-md border border-blue-500/30">
                                    <Activity className="w-3 h-3" />
                                    <span className="text-sm font-medium">{validator}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-gray-800">
                    <button
                        onClick={() => setActiveTab("code")}
                        className={`pb-3 px-4 font-medium transition-all relative ${activeTab === "code"
                                ? "text-blue-400"
                                : "text-gray-500 hover:text-gray-300"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Agent Source Code
                        </div>
                        {activeTab === "code" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("tasks")}
                        className={`pb-3 px-4 font-medium transition-all relative ${activeTab === "tasks"
                                ? "text-blue-400"
                                : "text-gray-500 hover:text-gray-300"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Task History
                        </div>
                        {activeTab === "tasks" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                            />
                        )}
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === "code" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden"
                    >
                        <div className="bg-gray-800/50 px-6 py-3 flex items-center justify-between border-b border-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-gray-400 text-sm font-mono ml-3">agent.py</span>
                            </div>
                            <button className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                                Copy ⌘C
                            </button>
                        </div>
                        <MonacoEditor
                            height="600px"
                            defaultLanguage="python"
                            theme="vs-dark"
                            value={agentSourceCode}
                            options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                fontSize: 13,
                                lineNumbers: "on",
                                scrollBeyondLastLine: false,
                                fontFamily: "JetBrains Mono, monospace",
                            }}
                        />
                    </motion.div>
                )}

                {activeTab === "tasks" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
                    >
                        <div className="mb-4">
                            <h2 className="text-lg font-bold">24 passed, 6 failed (30 total)</h2>
                        </div>
                        <div className="space-y-2">
                            {taskHistory.map((task) => {
                                const config = statusConfig[task.status as keyof typeof statusConfig];
                                const Icon = config.icon;

                                return (
                                    <div
                                        key={task.id}
                                        className="flex items-center justify-between p-4 bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/50 hover:border-gray-600 rounded-lg transition-all"
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
                                                <Icon className="w-3.5 h-3.5" />
                                                {task.status}
                                            </div>
                                            <div>
                                                <div className="font-mono text-sm text-white">{task.name}</div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Validator: {task.validator}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-mono text-sm text-gray-400">{task.runtime}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
