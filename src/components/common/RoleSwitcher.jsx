import { useAppContext } from '../../context/AppContext';

export default function RoleSwitcher() {
    const { state, dispatch } = useAppContext();

    return (
        <div className="relative">
            <select
                value={state.role}
                onChange={(e) => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg appearance-none cursor-pointer pr-7 transition-colors duration-200 outline-none
          ${state.darkMode
                        ? 'bg-dark-700 text-dark-200 border border-white/10 hover:border-white/20'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300'
                    }`}
                aria-label="Select user role"
            >
                <option value="admin">👑 Admin</option>
                <option value="viewer">👁 Viewer</option>
            </select>
            <svg className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${state.darkMode ? 'text-dark-400' : 'text-gray-400'}`}
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
            </svg>
        </div>
    );
}
