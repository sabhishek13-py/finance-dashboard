export const CATEGORIES = {
    expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Education'],
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Refund'],
};

export const ALL_CATEGORIES = [...CATEGORIES.expense, ...CATEGORIES.income];

export const CATEGORY_COLORS = {
    Food: '#f97316',
    Transport: '#6366f1',
    Shopping: '#a855f7',
    Bills: '#ef4444',
    Entertainment: '#22d3ee',
    Health: '#10b981',
    Education: '#f59e0b',
    Salary: '#10b981',
    Freelance: '#6366f1',
    Investment: '#22d3ee',
    Gift: '#a855f7',
    Refund: '#f59e0b',
};

function generateTransactions() {
    const transactions = [];
    const now = new Date(2026, 3, 1); // April 1, 2026

    const expenseEntries = [
        { desc: 'Grocery Store', cat: 'Food', min: 15, max: 120 },
        { desc: 'Restaurant Dinner', cat: 'Food', min: 25, max: 85 },
        { desc: 'Coffee Shop', cat: 'Food', min: 4, max: 12 },
        { desc: 'Uber Ride', cat: 'Transport', min: 8, max: 35 },
        { desc: 'Gas Station', cat: 'Transport', min: 30, max: 60 },
        { desc: 'Metro Pass', cat: 'Transport', min: 50, max: 50 },
        { desc: 'Amazon Order', cat: 'Shopping', min: 20, max: 200 },
        { desc: 'Clothing Store', cat: 'Shopping', min: 30, max: 150 },
        { desc: 'Electricity Bill', cat: 'Bills', min: 60, max: 120 },
        { desc: 'Internet Bill', cat: 'Bills', min: 40, max: 70 },
        { desc: 'Phone Bill', cat: 'Bills', min: 30, max: 55 },
        { desc: 'Netflix Subscription', cat: 'Entertainment', min: 15, max: 15 },
        { desc: 'Movie Tickets', cat: 'Entertainment', min: 12, max: 30 },
        { desc: 'Gym Membership', cat: 'Health', min: 40, max: 60 },
        { desc: 'Pharmacy', cat: 'Health', min: 10, max: 50 },
        { desc: 'Online Course', cat: 'Education', min: 15, max: 100 },
        { desc: 'Books Purchase', cat: 'Education', min: 10, max: 40 },
    ];

    const incomeEntries = [
        { desc: 'Monthly Salary', cat: 'Salary', min: 4500, max: 5500 },
        { desc: 'Freelance Project', cat: 'Freelance', min: 500, max: 2000 },
        { desc: 'Stock Dividends', cat: 'Investment', min: 100, max: 500 },
        { desc: 'Birthday Gift', cat: 'Gift', min: 50, max: 200 },
        { desc: 'Product Refund', cat: 'Refund', min: 20, max: 100 },
    ];

    let id = 1;

    // Generate 6 months of data
    for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
        const month = new Date(now);
        month.setMonth(month.getMonth() - monthOffset);

        // Add salary (1st of month)
        const salaryDate = new Date(month.getFullYear(), month.getMonth(), 1);
        transactions.push({
            id: id++,
            description: 'Monthly Salary',
            amount: 4500 + Math.floor(Math.random() * 1000),
            category: 'Salary',
            type: 'income',
            date: salaryDate.toISOString().split('T')[0],
        });

        // Add freelance (random, 50% chance)
        if (Math.random() > 0.4) {
            const freelanceDay = 5 + Math.floor(Math.random() * 20);
            const freelanceDate = new Date(month.getFullYear(), month.getMonth(), freelanceDay);
            const entry = incomeEntries[1];
            transactions.push({
                id: id++,
                description: entry.desc,
                amount: entry.min + Math.floor(Math.random() * (entry.max - entry.min)),
                category: entry.cat,
                type: 'income',
                date: freelanceDate.toISOString().split('T')[0],
            });
        }

        // Add investment income (random, 30% chance)
        if (Math.random() > 0.6) {
            const invDay = 15 + Math.floor(Math.random() * 10);
            const invDate = new Date(month.getFullYear(), month.getMonth(), invDay);
            transactions.push({
                id: id++,
                description: 'Stock Dividends',
                amount: 100 + Math.floor(Math.random() * 400),
                category: 'Investment',
                type: 'income',
                date: invDate.toISOString().split('T')[0],
            });
        }

        // Add 12-18 expenses per month
        const numExpenses = 12 + Math.floor(Math.random() * 7);
        for (let i = 0; i < numExpenses; i++) {
            const entry = expenseEntries[Math.floor(Math.random() * expenseEntries.length)];
            const day = 1 + Math.floor(Math.random() * 28);
            const date = new Date(month.getFullYear(), month.getMonth(), day);
            transactions.push({
                id: id++,
                description: entry.desc,
                amount: entry.min + Math.floor(Math.random() * (entry.max - entry.min)),
                category: entry.cat,
                type: 'expense',
                date: date.toISOString().split('T')[0],
            });
        }
    }

    return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export const initialTransactions = generateTransactions();
