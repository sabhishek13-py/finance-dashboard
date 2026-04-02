import { useAppContext } from '../context/AppContext';

export function useTransactions() {
    const { state, dispatch } = useAppContext();

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    };

    const updateTransaction = (transaction) => {
        dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
    };

    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    };

    return {
        transactions: state.transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        role: state.role,
        isAdmin: state.role === 'admin',
    };
}
