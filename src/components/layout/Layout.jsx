import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { state } = useAppContext();

    return (
        <div className={`min-h-screen transition-colors duration-300 ${state.darkMode ? 'bg-dark-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
            <div
                className={`transition-all duration-300 ${collapsed ? 'ml-[68px]' : 'ml-[220px]'}`}
            >
                <TopBar />
                <main className="p-6 animate-fade-in">
                    {children}
                </main>
            </div>
        </div>
    );
}
