import { useState, useMemo } from 'react';

export function useFilters(transactions) {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortField, setSortField] = useState('date');
    const [sortDir, setSortDir] = useState('desc');

    const filtered = useMemo(() => {
        let result = [...transactions];

        // Search
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (t) =>
                    t.description.toLowerCase().includes(q) ||
                    t.category.toLowerCase().includes(q)
            );
        }

        // Type filter
        if (typeFilter !== 'all') {
            result = result.filter((t) => t.type === typeFilter);
        }

        // Category filter
        if (categoryFilter !== 'all') {
            result = result.filter((t) => t.category === categoryFilter);
        }

        // Sort
        result.sort((a, b) => {
            let cmp = 0;
            if (sortField === 'date') {
                cmp = new Date(a.date) - new Date(b.date);
            } else if (sortField === 'amount') {
                cmp = a.amount - b.amount;
            } else if (sortField === 'category') {
                cmp = a.category.localeCompare(b.category);
            }
            return sortDir === 'asc' ? cmp : -cmp;
        });

        return result;
    }, [transactions, search, typeFilter, categoryFilter, sortField, sortDir]);

    const toggleSort = (field) => {
        if (sortField === field) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDir('desc');
        }
    };

    return {
        search,
        setSearch,
        typeFilter,
        setTypeFilter,
        categoryFilter,
        setCategoryFilter,
        sortField,
        sortDir,
        toggleSort,
        filtered,
    };
}
