import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { calcTotalIncome, calcTotalExpenses, calcBalance } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

export default function SummaryCards({ transactions }) {
    const { state } = useAppContext();

    const stats = useMemo(() => {
        const income = calcTotalIncome(transactions);
        const expenses = calcTotalExpenses(transactions);
        const balance = calcBalance(transactions);
        return [
            {
                label: 'Total Balance',
                value: formatCurrency(balance),
                gradient: 'gradient-blue',
                iconBg: 'bg-indigo-500/20',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <path d="M2 10h20" />
                    </svg>
                ),
                change: '+12.5%',
                positive: true,
            },
            {
                label: 'Total Income',
                value: formatCurrency(income),
                gradient: 'gradient-green',
                iconBg: 'bg-emerald-500/20',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                ),
                change: '+8.2%',
                positive: true,
            },
            {
                label: 'Total Expenses',
                value: formatCurrency(expenses),
                gradient: 'gradient-red',
                iconBg: 'bg-red-500/20',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                ),
                change: '-3.1%',
                positive: false,
            },
        ];
    }, [transactions]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stats.map((card, i) => (
                <div
                    key={card.label}
                    className={`group relative rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-default
            ${state.darkMode ? 'glass' : 'glass-light shadow-sm'}`}
                    style={{ animationDelay: `${i * 100}ms` }}
                >
                    {/* Gradient accent line at top */}
                    <div className={`absolute top-0 left-5 right-5 h-0.5 rounded-full ${card.gradient} opacity-60`} />

                    <div className="flex items-start justify-between mb-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                            {card.icon}
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-lg
              ${card.positive
                                ? state.darkMode ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                                : state.darkMode ? 'bg-red-500/15 text-red-400' : 'bg-red-50 text-red-600'
                            }`}>
                            {card.change}
                        </span>
                    </div>

                    <p className={`text-sm mb-1 ${state.darkMode ? 'text-dark-400' : 'text-gray-500'}`}>
                        {card.label}
                    </p>
                    <p className={`text-2xl font-bold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {card.value}
                    </p>
                </div>
            ))}
        </div>
    );
}
