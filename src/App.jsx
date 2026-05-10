import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { FaBars } from "react-icons/fa6";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Header */}
      <div
        className="md:hidden flex justify-between items-center px-5 py-4 bg-glass backdrop-blur-md border-b
       border-glass-border sticky top-0 z-20"
      >
        <div className="text-lg font-extrabold text-primary tracking-tight whitespace-nowrap">
          Qalam Academy
        </div>
        <button
          className="text-2xl text-primary p-1 flex"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-20 transition-opacity duration-300 md:hidden 
          ${isSidebarOpen ? "opacity-100 block" : "opacity-0 hidden"}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 p-5 md:p-10 overflow-y-auto h-auto md:h-screen scrollbar-custom">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
