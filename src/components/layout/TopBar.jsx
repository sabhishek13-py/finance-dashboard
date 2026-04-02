import { useAppContext } from '../../context/AppContext';
import RoleSwitcher from '../common/RoleSwitcher';
import DarkModeToggle from '../common/DarkModeToggle';

export default function TopBar() {
    const { state } = useAppContext();

    const titles = {
        dashboard: 'Dashboard',
        transactions: 'Transactions',
    };

    return (
        <header
            className={`h-16 flex items-center justify-between px-6 border-b transition-colors duration-300
        ${state.darkMode
                    ? 'bg-dark-900/80 border-white/5'
                    : 'bg-white/80 border-gray-200'
                } backdrop-blur-md`}
            role="banner"
        >
            <div>
                <h1 className={`text-xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {titles[state.currentView] || 'Dashboard'}
                </h1>
                <p className={`text-xs ${state.darkMode ? 'text-dark-400' : 'text-gray-500'}`}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <RoleSwitcher />
                <DarkModeToggle />
                <div className={`w-9 h-9 rounded-full gradient-purple flex items-center justify-center text-white text-sm font-bold`}>
                    JD
                </div>
            </div>
        </header>
    );
}
