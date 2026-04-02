import { useAppContext } from '../../context/AppContext';
import { useInsights } from '../../hooks/useInsights';

const typeStyles = {
    info: {
        dark: 'bg-blue-500/10 border-blue-500/20',
        light: 'bg-blue-50 border-blue-200',
        iconBg: 'bg-blue-500/20',
    },
    warning: {
        dark: 'bg-amber-500/10 border-amber-500/20',
        light: 'bg-amber-50 border-amber-200',
        iconBg: 'bg-amber-500/20',
    },
    positive: {
        dark: 'bg-emerald-500/10 border-emerald-500/20',
        light: 'bg-emerald-50 border-emerald-200',
        iconBg: 'bg-emerald-500/20',
    },
};

export default function InsightsPanel({ transactions }) {
    const { state } = useAppContext();
    const insights = useInsights(transactions);

    if (insights.length === 0) return null;

    return (
        <div className={`rounded-2xl p-5 transition-colors duration-300 ${state.darkMode ? 'glass' : 'glass-light shadow-sm'}`}>
            <h3 className={`text-sm font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                Insights & Trends
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {insights.map((insight, i) => {
                    const style = typeStyles[insight.type] || typeStyles.info;
                    return (
                        <div
                            key={i}
                            className={`rounded-xl p-4 border transition-all duration-200 hover:scale-[1.01]
                ${state.darkMode ? style.dark : style.light}`}
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className="flex items-start gap-3">
                                <span className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg ${style.iconBg}`}>
                                    {insight.icon}
                                </span>
                                <div className="min-w-0">
                                    <p className={`text-xs font-semibold mb-0.5 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {insight.title}
                                    </p>
                                    <p className={`text-xs leading-relaxed ${state.darkMode ? 'text-dark-400' : 'text-gray-600'}`}>
                                        {insight.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
