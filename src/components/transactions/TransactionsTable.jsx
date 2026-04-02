import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useTransactions } from '../../hooks/useTransactions';
import { useFilters } from '../../hooks/useFilters';
import TransactionFilters from './TransactionFilters';
import TransactionRow from './TransactionRow';
import TransactionModal from './TransactionModal';
import EmptyState from '../common/EmptyState';
import { exportToCSV, exportToJSON } from '../../utils/calculations';

export default function TransactionsTable() {
    const { state } = useAppContext();
    const { transactions, addTransaction, updateTransaction, deleteTransaction, isAdmin } = useTransactions();
    const filters = useFilters(transactions);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setModalOpen(true);
    };

    const handleAdd = () => {
        setEditingTransaction(null);
        setModalOpen(true);
    };

    const handleSave = (data) => {
        if (data.id) {
            updateTransaction(data);
        } else {
            addTransaction(data);
        }
    };

    const handleDelete = (id) => {
        deleteTransaction(id);
    };

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className={`text-lg font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        All Transactions
                    </h2>
                    <p className={`text-xs mt-0.5 ${state.darkMode ? 'text-dark-400' : 'text-gray-500'}`}>
                        {filters.filtered.length} transactions found
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {/* Export */}
                    <div className="relative group">
                        <button
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5
                ${state.darkMode
                                    ? 'bg-dark-700/50 text-dark-300 border border-white/10 hover:text-white'
                                    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:text-gray-900'
                                }`}
                            aria-label="Export data"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                            </svg>
                            Export
                        </button>
                        <div className={`absolute right-0 top-full mt-1 rounded-xl overflow-hidden shadow-xl z-10 hidden group-hover:block
              ${state.darkMode ? 'bg-dark-800 border border-white/10' : 'bg-white border border-gray-200'}`}>
                            <button
                                onClick={() => exportToCSV(filters.filtered)}
                                className={`w-full px-4 py-2 text-xs text-left cursor-pointer transition-colors
                  ${state.darkMode ? 'text-dark-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Export CSV
                            </button>
                            <button
                                onClick={() => exportToJSON(filters.filtered)}
                                className={`w-full px-4 py-2 text-xs text-left cursor-pointer transition-colors
                  ${state.darkMode ? 'text-dark-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Export JSON
                            </button>
                        </div>
                    </div>

                    {/* Add Button (Admin only) */}
                    {isAdmin && (
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 rounded-xl text-xs font-medium text-white gradient-blue hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            Add Transaction
                        </button>
                    )}
                </div>
            </div>

            {/* Filters */}
            <TransactionFilters {...filters} />

            {/* Table */}
            <div className={`rounded-2xl overflow-hidden transition-colors duration-300 ${state.darkMode ? 'glass' : 'glass-light shadow-sm'}`}>
                {filters.filtered.length === 0 ? (
                    <EmptyState
                        icon={filters.search || filters.typeFilter !== 'all' || filters.categoryFilter !== 'all' ? '🔍' : '📭'}
                        title={filters.search || filters.typeFilter !== 'all' || filters.categoryFilter !== 'all' ? 'No results found' : 'No transactions yet'}
                        message={
                            filters.search || filters.typeFilter !== 'all' || filters.categoryFilter !== 'all'
                                ? 'Try adjusting your search or filters'
                                : 'Start tracking your finances by adding your first transaction.'
                        }
                        action={isAdmin && !(filters.search || filters.typeFilter !== 'all' || filters.categoryFilter !== 'all') ? handleAdd : undefined}
                        actionLabel="Add First Transaction"
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className={state.darkMode ? 'border-b border-white/5' : 'border-b border-gray-100'}>
                                    {['Transaction', 'Category', 'Type', 'Amount', ''].map((h) => (
                                        <th key={h} className={`text-left text-xs font-medium py-3 px-4
                      ${state.darkMode ? 'text-dark-500' : 'text-gray-400'}`}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filters.filtered.map((t) => (
                                    <TransactionRow
                                        key={t.id}
                                        transaction={t}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            <TransactionModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditingTransaction(null); }}
                onSave={handleSave}
                transaction={editingTransaction}
            />
        </div>
    );
}
