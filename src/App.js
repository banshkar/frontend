import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Optimization from "./pages/Optimization";
import Reports from "./pages/Reports";
import Recommendations from "./pages/Recommendations";
import Suggestions from "./pages/Suggestions";
import ChatBotPage from "./pages/ChatBotPage";
import ControlRoom from "./pages/ ControlRoom";

export default function App() {
  const [page, setPage] = useState("dashboard");

  // Dummy metrics for Recommendations and Suggestions
  const dummyMetrics = {
    fuelUse: 260,
    efficiency: 82,
    vibration: 6.5,
    kilnTemp: 1230,
    co2: 420,
  };

  return (
    <div className="bg-gray-900 min-h-screen font-sans text-gray-100">
      <Navbar setPage={setPage} />
      <main className="container mx-auto px-4 md:px-8 py-6">
        {page === "dashboard" && <Dashboard />}
        {page === "optimization" && <Optimization />}
        {page === "reports" && <Reports />}     
      </main>
    </div>
  );
}
