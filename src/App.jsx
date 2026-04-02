import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/layout/Layout';
import SummaryCards from './components/dashboard/SummaryCards';
import BalanceChart from './components/dashboard/BalanceChart';
import CategoryChart from './components/dashboard/CategoryChart';
import InsightsPanel from './components/dashboard/InsightsPanel';
import TransactionsTable from './components/transactions/TransactionsTable';

function DashboardView() {
  const { state } = useAppContext();

  return (
    <div className="space-y-6 animate-slide-up">
      <SummaryCards transactions={state.transactions} />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <BalanceChart transactions={state.transactions} />
        </div>
        <div className="lg:col-span-2">
          <CategoryChart transactions={state.transactions} />
        </div>
      </div>
      <InsightsPanel transactions={state.transactions} />
    </div>
  );
}

function AppContent() {
  const { state } = useAppContext();

  return (
    <Layout>
      {state.currentView === 'dashboard' && <DashboardView />}
      {state.currentView === 'transactions' && <TransactionsTable />}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
