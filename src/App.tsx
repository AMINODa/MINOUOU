import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/banking/Login";
<<<<<<< HEAD
=======
import Register from "./components/banking/Register";
>>>>>>> 9f77d8f (first commit)
import BankLayout from "./components/banking/BankLayout";
import AdminLayout from "./components/banking/AdminLayout";
import Dashboard from "./components/banking/Dashboard";
import AdminDashboard from "./components/banking/AdminDashboard";
import Accounts from "./components/banking/Accounts";
import Transfers from "./components/banking/Transfers";
import Transactions from "./components/banking/Transactions";
<<<<<<< HEAD
import Savings from "./components/banking/Savings";
import CurrencyAccounts from "./components/banking/CurrencyAccounts";
import VisaCard from "./components/banking/VisaCard";
=======
import CurrencyAccounts from "./components/banking/CurrencyAccounts";
import VisaCard from "./components/banking/VisaCard";
import AccountInfo from "./components/banking/AccountInfo";
import AccountStatus from "./components/banking/AccountStatus";
import Settings from "./components/banking/Settings";
>>>>>>> 9f77d8f (first commit)
import CustomerManagement from "./components/banking/CustomerManagement";
import BankCurrencySettings from "./components/banking/BankCurrencySettings";
import BankAccounts from "./components/banking/BankAccounts";
import CustomerDepositInstructions from "./components/banking/CustomerDepositInstructions";
<<<<<<< HEAD
=======
import ConnectionTest from "./components/banking/ConnectionTest";
import { DebugPanel } from "./components/ui/debug-panel";
>>>>>>> 9f77d8f (first commit)
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Login />} />
=======
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/connection-test" element={<ConnectionTest />} />
>>>>>>> 9f77d8f (first commit)

          {/* مسارات العميل */}
          <Route path="/bank" element={<BankLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="currencies" element={<CurrencyAccounts />} />
            <Route path="transfers" element={<Transfers />} />
            <Route path="transactions" element={<Transactions />} />
<<<<<<< HEAD
            <Route path="savings" element={<Savings />} />
            <Route path="visa" element={<VisaCard />} />
            <Route path="settings" element={<Dashboard />} />
=======
            <Route path="visa" element={<VisaCard />} />
            <Route path="account-info" element={<AccountInfo />} />
            <Route path="account-status" element={<AccountStatus />} />
            <Route path="settings" element={<Settings />} />
>>>>>>> 9f77d8f (first commit)
            <Route path="help" element={<Dashboard />} />
            <Route
              path="deposit-instructions"
              element={<CustomerDepositInstructions />}
            />
          </Route>

          {/* مسارات المدير */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="accounts" element={<BankAccounts />} />
            <Route path="transactions" element={<AdminDashboard />} />
            <Route path="currencies" element={<BankCurrencySettings />} />
            <Route path="alerts" element={<AdminDashboard />} />
            <Route path="security" element={<AdminDashboard />} />
<<<<<<< HEAD
            <Route path="settings" element={<AdminDashboard />} />
          </Route>
=======
            <Route path="settings" element={<AdminDashboard   {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        />} />
  
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}        </Route>
>>>>>>> 9f77d8f (first commit)

          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
<<<<<<< HEAD
=======
        <DebugPanel />
>>>>>>> 9f77d8f (first commit)
      </>
    </Suspense>
  );
}

export default App;
