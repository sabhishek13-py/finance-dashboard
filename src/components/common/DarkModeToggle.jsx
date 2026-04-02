import { useAppContext } from '../../context/AppContext';

export default function DarkModeToggle() {
    const { state, dispatch } = useAppContext();

    return (
        <button
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer
        ${state.darkMode
                    ? 'bg-dark-700 text-amber-400 hover:bg-dark-600 border border-white/10'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                }`}
            aria-label={state.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {state.darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
}
