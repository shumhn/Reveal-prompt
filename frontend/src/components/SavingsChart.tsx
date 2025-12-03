"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface SavingsChartProps {
    costPerQuery: number;
}

export default function SavingsChart({ costPerQuery }: SavingsChartProps) {
    // Generate projection data for 30 days
    const projectionData = Array.from({ length: 30 }, (_, i) => {
        const day = i + 1;
        const dailySavings = costPerQuery * 1000; // 1000 queries per day
        const cumulativeSavings = dailySavings * day;

        return {
            day: `Day ${day}`,
            savings: parseFloat(cumulativeSavings.toFixed(2)),
            daily: parseFloat(dailySavings.toFixed(2)),
        };
    });

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-zinc-200 rounded-lg p-3 shadow-lg">
                    <p className="text-zinc-900 font-medium mb-1">{label}</p>
                    <p className="text-emerald-600 text-sm font-semibold">
                        ${payload[0].value.toFixed(2)} saved
                    </p>
                    <p className="text-zinc-500 text-xs mt-1">
                        Daily: ${payload[0].payload.daily.toFixed(2)}
                    </p>
                </div>
            );
        }
        return null;
    };

    const monthlySavings = (costPerQuery * 1000 * 30).toFixed(2);
    const yearlySavings = (costPerQuery * 1000 * 365).toFixed(0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-500" />
                    Cost Savings Projection
                </h3>
                <div className="flex gap-6 text-sm">
                    <div className="text-right">
                        <div className="text-zinc-500 text-xs">Monthly</div>
                        <div className="text-emerald-600 font-bold">${monthlySavings}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-zinc-500 text-xs">Yearly</div>
                        <div className="text-emerald-600 font-bold">${yearlySavings}</div>
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                        dataKey="day"
                        stroke="#71717a"
                        style={{ fontSize: '11px', fontWeight: 500 }}
                        interval={4}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />
                    <YAxis
                        stroke="#71717a"
                        style={{ fontSize: '11px' }}
                        tickFormatter={(value) => `$${value}`}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <Area
                        type="monotone"
                        dataKey="savings"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="url(#savingsGradient)"
                        animationDuration={1000}
                    />
                </AreaChart>
            </ResponsiveContainer>

            <div className="mt-4 text-center text-xs text-zinc-400">
                Based on 1,000 queries/day at ${(costPerQuery * 1000).toFixed(2)} savings per 1,000 queries
            </div>
        </motion.div>
    );
}
