// src/components/Navbar.jsx
export default function Navbar({ setPage }) {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-center space-x-4 md:space-x-8">
        <button
          onClick={() => setPage("dashboard")}
          className="text-white text-base md:text-lg font-medium px-4 py-2 rounded-xl transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Dashboard
        </button>
        <button
          onClick={() => setPage("optimization")}
          className="text-white text-base md:text-lg font-medium px-4 py-2 rounded-xl transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Optimization
        </button>
        <button
          onClick={() => setPage("reports")}
          className="text-white text-base md:text-lg font-medium px-4 py-2 rounded-xl transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Reports
        </button>
      </div>
    </nav>
  );
}
