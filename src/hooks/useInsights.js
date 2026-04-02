import { useMemo } from 'react';
import { generateInsights } from '../utils/calculations';

export function useInsights(transactions) {
    return useMemo(() => generateInsights(transactions), [transactions]);
}
