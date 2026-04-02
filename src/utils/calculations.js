export function calcTotalIncome(transactions) {
    return transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
}

export function calcTotalExpenses(transactions) {
    return transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
}

export function calcBalance(transactions) {
    return transactions.reduce((sum, t) => {
        return t.type === 'income' ? sum + t.amount : sum - t.amount;
    }, 0);
}

export function getSpendingByCategory(transactions) {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const categoryMap = {};

    expenses.forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

    return Object.entries(categoryMap)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
}

export function getBalanceOverTime(transactions) {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    const monthlyMap = {};

    sorted.forEach((t) => {
        const key = t.date.substring(0, 7); // YYYY-MM
        if (!monthlyMap[key]) {
            monthlyMap[key] = { income: 0, expenses: 0 };
        }
        if (t.type === 'income') {
            monthlyMap[key].income += t.amount;
        } else {
            monthlyMap[key].expenses += t.amount;
        }
    });

    const months = Object.keys(monthlyMap).sort();
    let runningBalance = 0;

    return months.map((month) => {
        const data = monthlyMap[month];
        runningBalance += data.income - data.expenses;
        const date = new Date(month + '-01T00:00:00');
        const label = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
        return {
            month: label,
            income: data.income,
            expenses: data.expenses,
            balance: runningBalance,
        };
    });
}

export function getMonthlyTotals(transactions) {
    const monthlyMap = {};

    transactions.forEach((t) => {
        const key = t.date.substring(0, 7);
        if (!monthlyMap[key]) {
            monthlyMap[key] = { income: 0, expenses: 0 };
        }
        if (t.type === 'income') {
            monthlyMap[key].income += t.amount;
        } else {
            monthlyMap[key].expenses += t.amount;
        }
    });

    return Object.entries(monthlyMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, data]) => {
            const date = new Date(month + '-01T00:00:00');
            const label = new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(date);
            return { month: label, ...data };
        });
}

export function generateInsights(transactions) {
    const insights = [];
    const expenses = transactions.filter((t) => t.type === 'expense');
    const incomes = transactions.filter((t) => t.type === 'income');

    // Highest spending category
    const categorySpending = getSpendingByCategory(transactions);
    if (categorySpending.length > 0) {
        const top = categorySpending[0];
        const totalExpenses = calcTotalExpenses(transactions);
        const pct = ((top.value / totalExpenses) * 100).toFixed(0);
        insights.push({
            type: 'info',
            icon: '📊',
            title: 'Top Spending Category',
            message: `${top.name} accounts for ${pct}% of your total expenses ($${top.value.toLocaleString()})`,
        });
    }

    // Monthly comparison
    const months = {};
    expenses.forEach((t) => {
        const key = t.date.substring(0, 7);
        months[key] = (months[key] || 0) + t.amount;
    });

    const sortedMonths = Object.entries(months).sort(([a], [b]) => b.localeCompare(a));
    if (sortedMonths.length >= 2) {
        const [currentMonth, currentTotal] = sortedMonths[0];
        const [prevMonth, prevTotal] = sortedMonths[1];
        const change = ((currentTotal - prevTotal) / prevTotal) * 100;

        if (change > 10) {
            insights.push({
                type: 'warning',
                icon: '⚠️',
                title: 'Spending Increase',
                message: `Spending is up ${change.toFixed(0)}% compared to last month. Consider reviewing your expenses.`,
            });
        } else if (change < -10) {
            insights.push({
                type: 'positive',
                icon: '📈',
                title: 'Spending Decreased',
                message: `Great job! Spending is down ${Math.abs(change).toFixed(0)}% compared to last month.`,
            });
        } else {
            insights.push({
                type: 'info',
                icon: '📊',
                title: 'Steady Spending',
                message: `Your spending is relatively stable compared to last month (${change > 0 ? '+' : ''}${change.toFixed(0)}%).`,
            });
        }
    }

    // Income stability
    const incomeMonths = {};
    incomes.forEach((t) => {
        const key = t.date.substring(0, 7);
        incomeMonths[key] = (incomeMonths[key] || 0) + t.amount;
    });

    const sortedIncomeMonths = Object.entries(incomeMonths).sort(([a], [b]) => b.localeCompare(a));
    if (sortedIncomeMonths.length >= 2) {
        const avgIncome = sortedIncomeMonths.reduce((s, [, v]) => s + v, 0) / sortedIncomeMonths.length;
        const latestIncome = sortedIncomeMonths[0][1];

        if (latestIncome > avgIncome * 1.15) {
            insights.push({
                type: 'positive',
                icon: '💰',
                title: 'Income Boost',
                message: `This month's income is ${((latestIncome / avgIncome - 1) * 100).toFixed(0)}% above your average. Nice!`,
            });
        }
    }

    // Savings rate
    const totalIncome = calcTotalIncome(transactions);
    const totalExpenses = calcTotalExpenses(transactions);
    if (totalIncome > 0) {
        const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
        if (savingsRate > 20) {
            insights.push({
                type: 'positive',
                icon: '🎯',
                title: 'Strong Savings',
                message: `You're saving ${savingsRate.toFixed(0)}% of your income. Keep it up!`,
            });
        } else if (savingsRate > 0) {
            insights.push({
                type: 'info',
                icon: '💡',
                title: 'Savings Opportunity',
                message: `Your savings rate is ${savingsRate.toFixed(0)}%. Try to aim for 20% or more.`,
            });
        } else {
            insights.push({
                type: 'warning',
                icon: '⚠️',
                title: 'Overspending Alert',
                message: `You're spending more than you earn. Review your budget immediately.`,
            });
        }
    }

    return insights;
}

export function exportToCSV(transactions) {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = transactions.map((t) => [
        t.date,
        t.description,
        t.category,
        t.type,
        t.amount,
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
}

export function exportToJSON(transactions) {
    const jsonContent = JSON.stringify(transactions, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
}
