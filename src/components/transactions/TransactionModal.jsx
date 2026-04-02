import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

export default function TransactionModal({ isOpen, onClose, onSave, transaction }) {
    const { state } = useAppContext();
    const isEdit = !!transaction;

    const [form, setForm] = useState({
        description: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (transaction) {
            setForm({
                description: transaction.description,
                amount: String(transaction.amount),
                category: transaction.category,
                type: transaction.type,
                date: transaction.date,
            });
        } else {
            setForm({
                description: '',
                amount: '',
                category: 'Food',
                type: 'expense',
                date: new Date().toISOString().split('T')[0],
            });
        }
    }, [transaction, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.description.trim() || !form.amount) return;

        onSave({
            ...(transaction ? { id: transaction.id } : {}),
            description: form.description.trim(),
            amount: parseFloat(form.amount),
            category: form.category,
            type: form.type,
            date: form.date,
        });
        onClose();
    };

    const categories = form.type === 'income' ? CATEGORIES.income : CATEGORIES.expense;

    const inputClass = `w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors duration-200
    ${state.darkMode
            ? 'bg-dark-700/50 text-white border border-white/10 focus:border-accent-blue/50 placeholder-dark-500'
            : 'bg-gray-100 text-gray-900 border border-gray-200 focus:border-indigo-300 placeholder-gray-400'
        }`;

    const labelClass = `block text-xs font-medium mb-1.5 ${state.darkMode ? 'text-dark-300' : 'text-gray-600'}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className={`relative w-full max-w-md rounded-2xl p-6 shadow-2xl animate-scale-in
          ${state.darkMode ? 'bg-dark-800 border border-white/10' : 'bg-white border border-gray-200'}`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 id="modal-title" className={`text-lg font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {isEdit ? 'Edit Transaction' : 'Add Transaction'}
                    </h2>
                    <button
                        onClick={onClose}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer
              ${state.darkMode ? 'hover:bg-white/10 text-dark-400' : 'hover:bg-gray-100 text-gray-400'}`}
                        aria-label="Close modal"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Type Toggle */}
                    <div className="flex gap-2">
                        {['expense', 'income'].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => {
                                    setForm((f) => ({
                                        ...f,
                                        type: t,
                                        category: t === 'income' ? CATEGORIES.income[0] : CATEGORIES.expense[0],
                                    }));
                                }}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 capitalize cursor-pointer
                  ${form.type === t
                                        ? t === 'income'
                                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                            : 'bg-red-500/15 text-red-400 border border-red-500/30'
                                        : state.darkMode
                                            ? 'bg-dark-700/50 text-dark-400 border border-white/10 hover:text-white'
                                            : 'bg-gray-100 text-gray-400 border border-gray-200 hover:text-gray-700'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div>
                        <label className={labelClass}>Description</label>
                        <input
                            type="text"
                            value={form.description}
                            onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                            placeholder="e.g., Grocery Store"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Amount ($)</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.amount}
                                onChange={(e) => setForm(f => ({ ...f, amount: e.target.value }))}
                                placeholder="0.00"
                                className={inputClass}
                                required
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Date</label>
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
                                className={inputClass}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Category</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                            className={inputClass + ' cursor-pointer'}
                        >
                            {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer
                ${state.darkMode
                                    ? 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white gradient-blue hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            {isEdit ? 'Save Changes' : 'Add Transaction'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
