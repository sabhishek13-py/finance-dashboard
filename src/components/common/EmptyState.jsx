import { useAppContext } from '../../context/AppContext';

export default function EmptyState({ icon, title, message, action, actionLabel }) {
    const { state } = useAppContext();

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-5 ${state.darkMode ? 'bg-dark-700' : 'bg-gray-100'}`}>
                <span className="text-4xl">{icon || '📭'}</span>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                {title || 'Nothing here yet'}
            </h3>
            <p className={`text-sm text-center max-w-sm mb-5 ${state.darkMode ? 'text-dark-400' : 'text-gray-500'}`}>
                {message || 'Start adding data to see it appear here.'}
            </p>
            {action && (
                <button
                    onClick={action}
                    className="px-5 py-2.5 rounded-xl gradient-blue text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
                >
                    {actionLabel || 'Get Started'}
                </button>
            )}
        </div>
    );
}
