import { useAppContext } from '../../context/AppContext';
import { ALL_CATEGORIES } from '../../data/mockData';

export default function TransactionFilters({ search, setSearch, typeFilter, setTypeFilter, categoryFilter, setCategoryFilter, sortField, sortDir, toggleSort }) {
    const { state } = useAppContext();

    return (
        <div className="flex flex-wrap items-center gap-3 mb-5">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
                <svg className={`absolute left-3 top-1/2 -translate-y-1/2 ${state.darkMode ? 'text-dark-500' : 'text-gray-400'}`}
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-colors duration-200
            ${state.darkMode
                            ? 'bg-dark-700/50 text-white placeholder-dark-500 border border-white/10 focus:border-accent-blue/50'
                            : 'bg-gray-100 text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-indigo-300'
                        }`}
                    aria-label="Search transactions"
                />
            </div>

            {/* Type Filter */}
            <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className={`px-3 py-2.5 rounded-xl text-sm outline-none cursor-pointer transition-colors duration-200
          ${state.darkMode
                        ? 'bg-dark-700/50 text-dark-200 border border-white/10 focus:border-accent-blue/50'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 focus:border-indigo-300'
                    }`}
                aria-label="Filter by type"
            >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            {/* Category Filter */}
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={`px-3 py-2.5 rounded-xl text-sm outline-none cursor-pointer transition-colors duration-200
          ${state.darkMode
                        ? 'bg-dark-700/50 text-dark-200 border border-white/10 focus:border-accent-blue/50'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 focus:border-indigo-300'
                    }`}
                aria-label="Filter by category"
            >
                <option value="all">All Categories</option>
                {ALL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            {/* Sort Buttons */}
            <div className="flex items-center gap-1.5">
                <span className={`text-xs ${state.darkMode ? 'text-dark-500' : 'text-gray-400'}`}>Sort:</span>
                {[
                    { field: 'date', label: 'Date' },
                    { field: 'amount', label: 'Amount' },
                ].map((s) => {
                    const isActive = sortField === s.field;
                    return (
                        <button
                            key={s.field}
                            onClick={() => toggleSort(s.field)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5
                ${isActive
                                    ? state.darkMode
                                        ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/30'
                                        : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                                    : state.darkMode
                                        ? 'bg-dark-700/50 text-dark-400 border border-white/10 hover:text-white'
                                        : 'bg-gray-100 text-gray-500 border border-gray-200 hover:text-gray-700'
                                }`}
                            aria-label={`Sort by ${s.label}${isActive ? (sortDir === 'asc' ? ', ascending' : ', descending') : ''}`}
                        >
                            {s.label}
                            <span className={`text-[11px] font-bold transition-all duration-200 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                                {isActive ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
