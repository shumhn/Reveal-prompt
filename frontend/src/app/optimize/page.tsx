"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Sparkles, Send, Clock, CheckCircle2, XCircle, Zap, Activity, Plus, X, Lightbulb, Target, Battery, Gauge, BarChart3 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const seedTasks = [
    {
        id: "task-1",
        name: "E-commerce Product Parser",
        status: "validated",
        score: 94.2,
        progress: 100,
        createdAt: "2025-12-02T10:30:00",
    },
    {
        id: "task-2",
        name: "Customer Support Classifier",
        status: "optimizing",
        score: null,
        progress: 67,
        createdAt: "2025-12-02T14:15:00",
    },
    {
        id: "task-3",
        name: "Invoice Data Extractor",
        status: "queued",
        score: null,
        progress: 0,
        createdAt: "2025-12-02T16:45:00",
    },
];

const statusConfig = {
    queued: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", label: "Queued" },
    optimizing: { icon: Sparkles, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", label: "Optimizing" },
    validated: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", label: "Validated" },
    failed: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", label: "Failed" },
};

// Example template
const exampleTemplate = {
    taskName: "E-commerce Product Extractor",
    systemPrompt: "You are a helpful assistant that extracts structured product data from descriptions.\n\nExtract the following fields:\n- product_name\n- price\n- category\n- features (array)\n\nReturn the data as valid JSON.",
    jsonSchema: `{
  "type": "object",
  "properties": {
    "product_name": { "type": "string" },
    "price": { "type": "number" },
    "category": { "type": "string" },
    "features": { 
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "required": ["product_name", "price", "category", "features"]
}`,
    sampleQueries: [
        "Wireless Bluetooth Headphones - Premium sound quality with active noise cancellation. 30-hour battery life. Comfortable over-ear design. Price: $89.99",
        "Smart LED Light Bulb - WiFi enabled, works with Alexa and Google Home. 16 million colors. Energy efficient. $24.99"
    ],
    groundTruth: `{
  "product_name": "Wireless Bluetooth Headphones",
  "price": 89.99,
  "category": "Electronics",
  "features": ["Active Noise Cancellation", "30h Battery", "Over-ear Design"]
}`,
};

export default function OptimizePage() {
    const router = useRouter();
    const [taskName, setTaskName] = useState("");
    const [systemPrompt, setSystemPrompt] = useState("");
    const [jsonSchema, setJsonSchema] = useState("{\n  \n}");
    const [sampleQueries, setSampleQueries] = useState<string[]>([""]);
    const [groundTruth, setGroundTruth] = useState("{\n  \n}");
    const [model, setModel] = useState("gpt-4");
    const [objective, setObjective] = useState("balanced");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tasks, setTasks] = useState(seedTasks);
    const [schemaError, setSchemaError] = useState<string | null>(null);
    const [groundTruthError, setGroundTruthError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const cleanedQueries = sampleQueries.filter(q => q.trim());

        const fakeSampleResults = cleanedQueries.map((q, index) => {
            const baseTokens = Math.max(60, Math.min(200, q.length / 4));
            const optimizedTokens = Math.round(baseTokens * 0.65);
            const baseLatency = 800 + index * 150;
            const optimizedLatency = Math.round(baseLatency * 0.7);

            return {
                query: q,
                originalResponse: {
                    text: `Original extracted JSON for: ${q.slice(0, 80)}...`,
                    tokens: Math.round(baseTokens),
                    latency: baseLatency,
                },
                optimizedResponse: {
                    text: `Optimized compact JSON for: ${q.slice(0, 80)}...`,
                    tokens: optimizedTokens,
                    latency: optimizedLatency,
                },
            };
        });

        // Generate a fake optimized prompt
        const fakeOptimizedPrompt = systemPrompt
            .replace(/You are a helpful assistant that extracts/, "Extract")
            .replace(/Return the data as valid JSON./, "Return only valid JSON. No markdown.")
            + "\n\nFocus on brevity and strict schema adherence.";

        const newTask = {
            id: `task-${Date.now()}`,
            name: taskName || "Untitled Task",
            status: "queued",
            score: null as number | null,
            progress: 0,
            createdAt: new Date().toISOString(),
            completedAt: null as string | null,
            model,
            objective,
            systemPrompt,
            originalPrompt: systemPrompt,
            optimizedPrompt: fakeOptimizedPrompt,
            jsonSchema,
            sampleQueries: cleanedQueries,
            groundTruth,
            sampleResults: fakeSampleResults,
            metrics: {
                successRate: 98.5,
                costPerToken: 0.00003,
            }
        };

        try {
            const existing = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('tasks') || '[]') : [];
            const next = [newTask, ...existing.filter((t: any) => t.id !== newTask.id)];
            if (typeof window !== 'undefined') localStorage.setItem('tasks', JSON.stringify(next));
            setTasks(prev => [newTask, ...prev]);
        } catch {}

        await new Promise(resolve => setTimeout(resolve, 600));

        setIsSubmitting(false);
        router.push(`/task/${newTask.id}`);
    };

    useEffect(() => {
        try {
            const stored = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('tasks') || '[]') : [];
            if (Array.isArray(stored) && stored.length) {
                const merged = [...stored, ...seedTasks.filter(t => !stored.find((s: any) => s.id === t.id))];
                setTasks(merged);
            }
        } catch {}
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

                    return { ...task, progress, status };
                });

                try {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('tasks', JSON.stringify(updated));
                    }
                } catch {}

                return updated;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const loadExample = () => {
        setTaskName(exampleTemplate.taskName);
        setSystemPrompt(exampleTemplate.systemPrompt);
        setJsonSchema(exampleTemplate.jsonSchema);
        setSampleQueries(exampleTemplate.sampleQueries);
        setGroundTruth(exampleTemplate.groundTruth);
    };

    const addSampleQuery = () => {
        setSampleQueries([...sampleQueries, ""]);
    };

    const removeSampleQuery = (index: number) => {
        if (sampleQueries.length > 1) {
            setSampleQueries(sampleQueries.filter((_, i) => i !== index));
        }
    };

    const updateSampleQuery = (index: number, value: string) => {
        const newQueries = [...sampleQueries];
        newQueries[index] = value;
        setSampleQueries(newQueries);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-10 h-10 text-blue-400" />
                            <h1 className="text-5xl font-bold tracking-tight">
                                Optimize
                            </h1>
                        </div>
                        <Button
                            onClick={loadExample}
                            variant="outline"
                            className="border-blue-500 text-blue-400 hover:bg-blue-500/10 flex items-center gap-2"
                        >
                            <Lightbulb className="w-4 h-4" />
                            Try Example
                        </Button>
                    </div>
                    <p className="text-gray-400 text-lg">
                        Submit optimization tasks and track your submissions
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Submit Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Send className="w-5 h-5 text-blue-400" />
                                <h2 className="text-xl font-bold">New Optimization Task</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Task Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="taskName" className="text-gray-300 font-medium">Task Name</Label>
                                    <Input
                                        id="taskName"
                                        placeholder="e.g., E-commerce Product Parser"
                                        value={taskName}
                                        onChange={(e) => setTaskName(e.target.value)}
                                        className="bg-gray-800/50 border-gray-700 focus:border-blue-500 text-white placeholder:text-gray-500"
                                        required
                                    />
                                </div>

                                {/* Objective Function */}
                                <div className="space-y-2">
                                    <Label className="text-gray-300 font-medium">Optimization Objective</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: "token_efficiency", label: "Token Efficiency", icon: Battery, desc: "Minimize tokens" },
                                            { value: "latency", label: "Speed", icon: Gauge, desc: "Reduce latency" },
                                            { value: "accuracy", label: "Accuracy", icon: Target, desc: "Better results" },
                                            { value: "balanced", label: "Balanced", icon: BarChart3, desc: "All three" },
                                        ].map((opt) => {
                                            const Icon = opt.icon;
                                            return (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => setObjective(opt.value)}
                                                    className={`p-3 rounded-lg border-2 transition-all text-left ${objective === opt.value
                                                        ? "border-blue-500 bg-blue-500/10"
                                                        : "border-gray-700 hover:border-gray-600 bg-gray-800/30"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Icon className={`w-4 h-4 ${objective === opt.value ? "text-blue-400" : "text-gray-400"}`} />
                                                        <span className={`font-semibold text-sm ${objective === opt.value ? "text-blue-400" : "text-gray-300"}`}>
                                                            {opt.label}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">{opt.desc}</p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* System Prompt */}
                                <div className="space-y-2">
                                    <Label htmlFor="systemPrompt" className="text-gray-300 font-medium">System Prompt</Label>
                                    <Textarea
                                        id="systemPrompt"
                                        placeholder="Enter your current system prompt here..."
                                        className="min-h-[150px] font-mono text-sm bg-gray-800/50 border-gray-700 focus:border-blue-500 text-white placeholder:text-gray-500"
                                        value={systemPrompt}
                                        onChange={(e) => setSystemPrompt(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* JSON Schema */}
                                <div className="space-y-2">
                                    <Label htmlFor="jsonSchema" className="text-gray-300 font-medium">Expected JSON Schema</Label>
                                    <div className="border border-gray-700 rounded-lg overflow-hidden">
                                        <MonacoEditor
                                            height="200px"
                                            defaultLanguage="json"
                                            theme="vs-dark"
                                            value={jsonSchema}
                                            onChange={(value) => {
                                                const next = value || "{}";
                                                setJsonSchema(next);
                                                try {
                                                    JSON.parse(next);
                                                    setSchemaError(null);
                                                } catch (err: any) {
                                                    setSchemaError("Invalid JSON schema");
                                                }
                                            }}
                                            options={{
                                                minimap: { enabled: false },
                                                fontSize: 13,
                                                lineNumbers: "on",
                                                scrollBeyondLastLine: false,
                                                fontFamily: "monospace",
                                            }}
                                        />
                                    </div>
                                    {schemaError && (
                                        <p className="text-xs text-red-400 mt-1">{schemaError}</p>
                                    )}
                                </div>

                                {/* Sample Queries */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-gray-300 font-medium">Sample Queries</Label>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            onClick={addSampleQuery}
                                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Query
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        <AnimatePresence>
                                            {sampleQueries.map((query, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="flex gap-2"
                                                >
                                                    <Textarea
                                                        placeholder={`Sample query ${index + 1}...`}
                                                        className="min-h-[80px] font-mono text-sm bg-gray-800/50 border-gray-700 focus:border-blue-500 text-white placeholder:text-gray-500 flex-1"
                                                        value={query}
                                                        onChange={(e) => updateSampleQuery(index, e.target.value)}
                                                        required
                                                    />
                                                    {sampleQueries.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => removeSampleQuery(index)}
                                                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-10 px-2"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Ground Truth */}
                                <div className="space-y-2">
                                    <Label htmlFor="groundTruth" className="text-gray-300 font-medium">
                                        Ground Truth (Optional)
                                        <span className="text-xs text-gray-500 ml-2">For validation scoring</span>
                                    </Label>
                                    <div className="border border-gray-700 rounded-lg overflow-hidden">
                                        <MonacoEditor
                                            height="150px"
                                            defaultLanguage="json"
                                            theme="vs-dark"
                                            value={groundTruth}
                                            onChange={(value) => {
                                                const next = value || "{}";
                                                setGroundTruth(next);

                                                const trimmed = next.trim();
                                                if (!trimmed) {
                                                    setGroundTruthError(null);
                                                    return;
                                                }

                                                try {
                                                    JSON.parse(next);
                                                    setGroundTruthError(null);
                                                } catch (err: any) {
                                                    setGroundTruthError("Invalid ground truth JSON");
                                                }
                                            }}
                                            options={{
                                                minimap: { enabled: false },
                                                fontSize: 13,
                                                lineNumbers: "on",
                                                scrollBeyondLastLine: false,
                                                fontFamily: "monospace",
                                            }}
                                        />
                                    </div>
                                    {groundTruthError && (
                                        <p className="text-xs text-red-400 mt-1">{groundTruthError}</p>
                                    )}
                                </div>

                                {/* Target Model */}
                                <div className="space-y-2">
                                    <Label htmlFor="model" className="text-gray-300 font-medium">Target Model</Label>
                                    <Select value={model} onValueChange={setModel}>
                                        <SelectTrigger id="model" className="bg-gray-800/50 border-gray-700 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-gray-700">
                                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                                            <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                                            <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                                            <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                                            <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !!schemaError || !!groundTruthError}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Sparkles className="w-4 h-4 animate-spin" />
                                            Submitting Task...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Submit Task
                                        </>
                                    )}
                                </Button>
                            </form>
                        </motion.div>
                    </div>

                    {/* My Tasks Sidebar */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Activity className="w-5 h-5 text-purple-400" />
                                <h2 className="text-xl font-bold">My Tasks</h2>
                            </div>

                            <div className="space-y-3">
                                {tasks.length === 0 && (
                                    <div className="p-6 text-center text-gray-400 bg-gray-800/30 border border-gray-700/50 rounded-lg">
                                        No tasks yet. <Link href="/optimize" className="text-blue-400 hover:underline">Create your first task</Link>.
                                    </div>
                                )}
                                {tasks.map((task) => {
                                    const statusStyle = statusConfig[task.status as keyof typeof statusConfig];
                                    const StatusIcon = statusStyle.icon;

                                    return (
                                        <Link
                                            key={task.id}
                                            href={`/task/${task.id}`}
                                            className="block group"
                                        >
                                            <div className="p-4 bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/50 hover:border-blue-500/50 rounded-lg transition-all cursor-pointer">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                                                        {task.name}
                                                    </h3>
                                                    {task.score && (
                                                        <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs font-medium border border-green-500/30">
                                                            {task.score}%
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                {/* Progress Bar */}
                                                {(task.status === "optimizing" || task.status === "queued") && (
                                                    <div className="mb-3">
                                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                            <span>{task.status === "queued" ? "Waiting..." : "Optimizing..."}</span>
                                                            <span>{task.progress}%</span>
                                                        </div>
                                                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                            <motion.div
                                                                className={`h-full rounded-full ${task.status === "queued" ? "bg-yellow-500" : "bg-blue-500"}`}
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${task.progress}%` }}
                                                                transition={{ duration: 0.5 }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${statusStyle.bg} ${statusStyle.color} border ${statusStyle.border}`}>
                                                        <StatusIcon className="h-3 w-3" />
                                                        {statusStyle.label}
                                                    </div>
                                                    <span className="text-xs font-mono text-gray-500">
                                                        {new Date(task.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
