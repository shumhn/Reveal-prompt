"use client";

import { useState } from "react";
import { WindowCard } from "@/components/ui/window-card";
import { PixelBackground } from "@/components/ui/pixel-background";
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
import { Sparkles, Send, Clock, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const userTasks = [
    {
        id: "task-1",
        name: "E-commerce Product Parser",
        status: "validated",
        score: 94.2,
        createdAt: "2025-12-02T10:30:00",
    },
    {
        id: "task-2",
        name: "Customer Support Classifier",
        status: "optimizing",
        score: null,
        createdAt: "2025-12-02T14:15:00",
    },
    {
        id: "task-3",
        name: "Invoice Data Extractor",
        status: "queued",
        score: null,
        createdAt: "2025-12-02T16:45:00",
    },
];

const statusConfig = {
    queued: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100", label: "QUEUED" },
    optimizing: { icon: Sparkles, color: "text-blue-600", bg: "bg-blue-100", label: "OPTIMIZING" },
    validated: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100", label: "VALIDATED" },
    failed: { icon: XCircle, color: "text-red-600", bg: "bg-red-100", label: "FAILED" },
};

export default function DashboardPage() {
    const [taskName, setTaskName] = useState("");
    const [systemPrompt, setSystemPrompt] = useState("");
    const [jsonSchema, setJsonSchema] = useState("{\n  \n}");
    const [sampleQueries, setSampleQueries] = useState("");
    const [groundTruth, setGroundTruth] = useState("{\n  \n}");
    const [model, setModel] = useState("gpt-4");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting task:", { taskName, systemPrompt, jsonSchema, sampleQueries, groundTruth, model });
    };

    return (
        <div className="min-h-screen relative font-sans text-foreground pt-20 pb-12">
            <PixelBackground />

            <div className="container relative z-10">
                <div className="mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
                        DASHBOARD
                    </h1>
                    <p className="text-xl font-medium max-w-2xl">
                        Manage your optimization tasks and submit new prompts.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Submit Form */}
                    <div className="lg:col-span-2">
                        <WindowCard title="NEW_OPTIMIZATION_TASK" className="bg-white text-black border-2 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,255,0.2)]">
                            <form onSubmit={handleSubmit} className="space-y-6 p-2">
                                <div className="space-y-2">
                                    <Label htmlFor="taskName" className="font-bold font-mono">TASK_NAME</Label>
                                    <Input
                                        id="taskName"
                                        placeholder="e.g., E-commerce Product Parser"
                                        value={taskName}
                                        onChange={(e) => setTaskName(e.target.value)}
                                        className="border-2 border-primary/20 focus-visible:ring-primary font-mono rounded-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="systemPrompt" className="font-bold font-mono">SYSTEM_PROMPT</Label>
                                    <Textarea
                                        id="systemPrompt"
                                        placeholder="Enter your current system prompt here..."
                                        className="min-h-[150px] font-mono text-sm border-2 border-primary/20 focus-visible:ring-primary rounded-none"
                                        value={systemPrompt}
                                        onChange={(e) => setSystemPrompt(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="jsonSchema" className="font-bold font-mono">JSON_SCHEMA</Label>
                                    <div className="border-2 border-primary/20 rounded-none overflow-hidden">
                                        <MonacoEditor
                                            height="200px"
                                            defaultLanguage="json"
                                            theme="light"
                                            value={jsonSchema}
                                            onChange={(value) => setJsonSchema(value || "{}")}
                                            options={{
                                                minimap: { enabled: false },
                                                fontSize: 13,
                                                lineNumbers: "on",
                                                scrollBeyondLastLine: false,
                                                fontFamily: "monospace",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sampleQueries" className="font-bold font-mono">SAMPLE_QUERIES</Label>
                                    <Textarea
                                        id="sampleQueries"
                                        placeholder="Enter sample queries, one per line..."
                                        className="min-h-[100px] font-mono text-sm border-2 border-primary/20 focus-visible:ring-primary rounded-none"
                                        value={sampleQueries}
                                        onChange={(e) => setSampleQueries(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="model" className="font-bold font-mono">TARGET_MODEL</Label>
                                    <Select value={model} onValueChange={setModel}>
                                        <SelectTrigger id="model" className="border-2 border-primary/20 rounded-none font-mono">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                                            <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                                            <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-primary text-white hover:bg-primary/90 rounded-none h-12 text-lg font-bold border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    INITIATE_OPTIMIZATION
                                </Button>
                            </form>
                        </WindowCard>
                    </div>

                    {/* My Tasks Sidebar */}
                    <div>
                        <WindowCard title="MY_TASKS" className="bg-white text-black border-2 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,255,0.2)]">
                            <div className="space-y-3 p-2">
                                {userTasks.map((task) => {
                                    const statusStyle = statusConfig[task.status as keyof typeof statusConfig];
                                    const StatusIcon = statusStyle.icon;

                                    return (
                                        <Link
                                            key={task.id}
                                            href={`/task/${task.id}`}
                                            className="block group"
                                        >
                                            <div className="p-3 border-2 border-primary/10 hover:border-primary transition-all cursor-pointer bg-white">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-bold font-mono text-sm truncate pr-2">
                                                        {task.name}
                                                    </h3>
                                                    {task.score && (
                                                        <span className="font-mono font-bold text-primary text-xs border border-primary px-1">
                                                            {task.score}%
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 border ${statusStyle.color} ${statusStyle.bg} border-current`}>
                                                        <StatusIcon className="h-3 w-3" />
                                                        {statusStyle.label}
                                                    </div>
                                                    <span className="text-[10px] font-mono text-muted-foreground">
                                                        {new Date(task.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </WindowCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
