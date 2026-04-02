import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { getBalanceOverTime } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

export default function BalanceChart({ transactions }) {
    const { state } = useAppContext();
    const data = useMemo(() => getBalanceOverTime(transactions), [transactions]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={`rounded-xl px-4 py-3 shadow-xl border text-xs ${state.darkMode ? 'bg-dark-800 border-white/10' : 'bg-white border-gray-200'}`}>
                    <p className={`font-semibold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>{label}</p>
                    {payload.map((entry) => (
                        <p key={entry.name} className={`${state.darkMode ? 'text-dark-300' : 'text-gray-600'}`}>
                            <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: entry.color }} />
                            {entry.name}: {formatCurrency(entry.value)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className={`rounded-2xl p-5 transition-colors duration-300 ${state.darkMode ? 'glass' : 'glass-light shadow-sm'}`}>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className={`text-sm font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>Balance Over Time</h3>
                    <p className={`text-xs mt-0.5 ${state.darkMode ? 'text-dark-400' : 'text-gray-500'}`}>Monthly income vs expenses</p>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                    <defs>
                        <linearGradient id="gradientIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradientExpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradientBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={state.darkMode ? '#1e293b' : '#f1f5f9'} />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: state.darkMode ? '#64748b' : '#94a3b8', fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: state.darkMode ? '#64748b' : '#94a3b8', fontSize: 12 }}
                        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#gradientIncome)" strokeWidth={2} name="Income" />
                    <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#gradientExpenses)" strokeWidth={2} name="Expenses" />
                    <Area type="monotone" dataKey="balance" stroke="#6366f1" fill="url(#gradientBalance)" strokeWidth={2} name="Balance" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
