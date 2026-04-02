import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'finance-dashboard';

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                transactions: parsed.transactions || initialTransactions,
                role: parsed.role || 'admin',
                darkMode: parsed.darkMode !== undefined ? parsed.darkMode : true,
                currentView: 'dashboard',
            };
        }
    } catch (e) {
        console.warn('Failed to load state from localStorage', e);
    }
    return {
        transactions: initialTransactions,
        role: 'admin',
        darkMode: true,
        currentView: 'dashboard',
    };
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_VIEW':
            return { ...state, currentView: action.payload };
        case 'SET_ROLE':
            return { ...state, role: action.payload };
        case 'TOGGLE_DARK_MODE':
            return { ...state, darkMode: !state.darkMode };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [
                    { ...action.payload, id: Date.now() },
                    ...state.transactions,
                ],
            };
        case 'UPDATE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.map((t) =>
                    t.id === action.payload.id ? { ...t, ...action.payload } : t
                ),
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter((t) => t.id !== action.payload),
            };
        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, null, loadState);

    // Persist to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    transactions: state.transactions,
                    role: state.role,
                    darkMode: state.darkMode,
                })
            );
        } catch (e) {
            console.warn('Failed to save state', e);
        }
    }, [state.transactions, state.role, state.darkMode]);

    // Apply dark mode class
    useEffect(() => {
        document.documentElement.classList.toggle('light', !state.darkMode);
    }, [state.darkMode]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useAppContext must be used within AppProvider');
    return ctx;
}
