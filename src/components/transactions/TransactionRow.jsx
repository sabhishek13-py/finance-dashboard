import { useAppContext } from '../../context/AppContext';
import { formatDate, formatCurrencyFull } from '../../utils/formatters';
import { CATEGORY_COLORS } from '../../data/mockData';

export default function TransactionRow({ transaction, onEdit, onDelete }) {
    const { state } = useAppContext();
    const isAdmin = state.role === 'admin';
    const isIncome = transaction.type === 'income';

    return (
        <tr className={`group transition-colors duration-150
      ${state.darkMode ? 'hover:bg-white/[0.02] border-b border-white/5' : 'hover:bg-gray-50 border-b border-gray-100'}`}>
            <td className="py-3 px-4">
                <div>
                    <p className={`text-sm font-medium ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {transaction.description}
                    </p>
                    <p className={`text-xs ${state.darkMode ? 'text-dark-500' : 'text-gray-400'}`}>
                        {formatDate(transaction.date)}
                    </p>
                </div>
            </td>

            <td className="py-3 px-4">
                <span
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg"
                    style={{
                        background: `${CATEGORY_COLORS[transaction.category] || '#6366f1'}15`,
                        color: CATEGORY_COLORS[transaction.category] || '#6366f1',
                    }}
                >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: CATEGORY_COLORS[transaction.category] || '#6366f1' }} />
                    {transaction.category}
                </span>
            </td>

            <td className="py-3 px-4">
                <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md uppercase
          ${isIncome
                        ? state.darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                        : state.darkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'
                    }`}>
                    {transaction.type}
                </span>
            </td>

            <td className="py-3 px-4">
                <span className={`text-sm font-semibold ${isIncome
                    ? state.darkMode ? 'text-emerald-400' : 'text-emerald-600'
                    : state.darkMode ? 'text-red-400' : 'text-red-600'
                    }`}>
                    {isIncome ? '+' : '-'}{formatCurrencyFull(transaction.amount)}
                </span>
            </td>

            <td className="py-3 px-4">
                {isAdmin && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={() => onEdit(transaction)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer
                ${state.darkMode ? 'hover:bg-white/10 text-dark-400 hover:text-white' : 'hover:bg-gray-200 text-gray-400 hover:text-gray-700'}`}
                            aria-label="Edit transaction"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => onDelete(transaction.id)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer
                ${state.darkMode ? 'hover:bg-red-500/20 text-dark-400 hover:text-red-400' : 'hover:bg-red-50 text-gray-400 hover:text-red-600'}`}
                            aria-label="Delete transaction"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}
