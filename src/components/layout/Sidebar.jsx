import { useAppContext } from '../../context/AppContext';

const navItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
    },
    {
        id: 'transactions',
        label: 'Transactions',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
    },
];

export default function Sidebar({ collapsed, onToggle }) {
    const { state, dispatch } = useAppContext();

    return (
        <aside
            className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 flex flex-col
        ${collapsed ? 'w-[68px]' : 'w-[220px]'}
        ${state.darkMode ? 'bg-dark-900/95 border-r border-white/5' : 'bg-white/95 border-r border-gray-200'}`}
            role="navigation"
            aria-label="Main navigation"
        >
            {/* Logo */}
            <div className={`flex items-center h-16 px-4 ${collapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="w-9 h-9 rounded-xl gradient-blue flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                </div>
                {!collapsed && (
                    <span className={`font-bold text-lg tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        FinanceFlow
                    </span>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = state.currentView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => dispatch({ type: 'SET_VIEW', payload: item.id })}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                ${collapsed ? 'justify-center' : ''}
                ${isActive
                                    ? state.darkMode
                                        ? 'bg-accent-blue/15 text-accent-blue'
                                        : 'bg-indigo-50 text-indigo-600'
                                    : state.darkMode
                                        ? 'text-dark-400 hover:text-white hover:bg-white/5'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            aria-current={isActive ? 'page' : undefined}
                            title={item.label}
                        >
                            {item.icon}
                            {!collapsed && <span>{item.label}</span>}
                        </button>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className="px-3 pb-4">
                <button
                    onClick={onToggle}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer
            ${collapsed ? 'justify-center' : ''}
            ${state.darkMode ? 'text-dark-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}>
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    {!collapsed && <span>Collapse</span>}
                </button>
            </div>
        </aside>
    );
}
