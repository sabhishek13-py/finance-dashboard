# FinanceFlow — Finance Dashboard

A modern, glassmorphic finance dashboard built with React, Tailwind CSS, and Recharts. Dark-first design with full light mode support, role-based UI simulation, and local storage persistence.

## Features

- **Dashboard Overview** — Summary cards (Balance, Income, Expenses), area chart for balance over time, donut chart for spending by category
- **Smart Insights** — Auto-generated financial insights with color-coded cards (warnings, positive trends, suggestions)
- **Transactions Management** — Full CRUD table with search, filtering (type/category), sorting (date/amount), and export (CSV/JSON)
- **Role-Based UI** — Switch between Admin (full CRUD) and Viewer (read-only). UI dynamically shows/hides action buttons
- **Dark/Light Mode** — Dark-first glassmorphic design with smooth theme toggle
- **Local Storage Persistence** — Transactions, role, and theme persist across refreshes
- **Animations** — Fade-in, slide-up, scale-in card animations, hover effects on all interactive elements
- **Accessibility** — ARIA labels, semantic HTML, keyboard-navigable controls
- **Export Data** — Export filtered transactions as CSV or JSON

## Tech Stack

- **React 19** + Vite
- **Tailwind CSS 4** (via @tailwindcss/vite)
- **Recharts** — Charts (AreaChart, PieChart)
- **No external state library** — Context API + useReducer

## Setup

```bash
npm install
npm run dev
```

Open [[http://localhost:5173](http://localhost:5173)](https://finance-dashboard2-theta.vercel.app/)

## Role-Based UI

Use the role switcher in the top bar:

| Role   | Capabilities                              |
|--------|-------------------------------------------|
| Admin  | Add, edit, delete transactions. Full access |
| Viewer | Read-only. No mutation buttons shown       |

## Folder Structure

```
src/
├── components/
│   ├── layout/        — Sidebar, TopBar, Layout
│   ├── dashboard/     — SummaryCards, BalanceChart, CategoryChart, InsightsPanel
│   ├── transactions/  — TransactionsTable, TransactionRow, TransactionFilters, TransactionModal
│   └── common/        — EmptyState, RoleSwitcher, DarkModeToggle
├── context/           — AppContext (global state + localStorage sync)
├── hooks/             — useTransactions, useInsights, useFilters
├── utils/             — calculations, formatters
├── data/              — mockData (6 months of generated transactions)
├── App.jsx
├── main.jsx
└── index.css
```

## Key Design Decisions

1. **Dark-first glassmorphism** — Dark backgrounds make charts and colored data pop. Glass effects (`backdrop-blur` + semi-transparent backgrounds) add depth without clutter.
2. **Context + useReducer** — Clean enough for this scope, no external dependency. All state changes go through typed actions.
3. **Custom hooks** — `useTransactions`, `useInsights`, `useFilters` keep components thin and logic reusable.
4. **Inline SVG icons** — Zero dependencies for icons. Full style control, no font loading.
5. **View-based routing** — No react-router needed for two views. Simple state toggle in context.
