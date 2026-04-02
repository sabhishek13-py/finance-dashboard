import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { getSpendingByCategory } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { CATEGORY_COLORS } from '../../data/mockData';

export default function CategoryChart({ transactions }) {
    const { state } = useAppContext();
    const data = useMemo(() => getSpendingByCategory(transactions), [transactions]);
    const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const d = payload[0];
            return (
                <div className={`rounded-xl px-4 py-3 shadow-xl border text-xs ${state.darkMode ? 'bg-dark-800 border-white/10' : 'bg-white border-gray-200'}`}>
                    <p className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>{d.name}</p>
                    <p className={`${state.darkMode ? 'text-dark-300' : 'text-gray-600'}`}>
                        {formatCurrency(d.value)} ({((d.value / total) * 100).toFixed(1)}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={`rounded-2xl p-5 transition-colors duration-300 ${state.darkMode ? 'glass' : 'glass-light shadow-sm'}`}>
            <div className="mb-5">
                <h3 className={`text-sm font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>Spending by Category</h3>
                <p className={`text-xs mt-0.5 ${state.darkMode ? 'text-dark-400' : 'text-gray-500'}`}>Where your money goes</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-[180px] h-[180px] flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={3}
                                dataKey="value"
                                strokeWidth={0}
                            >
                                {data.map((entry) => (
                                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#6366f1'} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex-1 space-y-2 min-w-0">
                    {data.slice(0, 5).map((item) => (
                        <div key={item.name} className="flex items-center gap-2 text-xs">
                            <span
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ background: CATEGORY_COLORS[item.name] || '#6366f1' }}
                            />
                            <span className={`flex-1 truncate ${state.darkMode ? 'text-dark-300' : 'text-gray-600'}`}>
                                {item.name}
                            </span>
                            <span className={`font-medium flex-shrink-0 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {((item.value / total) * 100).toFixed(0)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
