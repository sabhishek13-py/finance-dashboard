export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatCurrencyFull(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
}

export function formatDateShort(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
    }).format(date);
}

export function formatPercent(value) {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}

export function getMonthName(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
}

export function getMonthYear(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
}
