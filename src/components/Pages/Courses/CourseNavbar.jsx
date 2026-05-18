import React, { useState } from "react";
import { FaPlus, FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AddModal from "./addModal";
import { useAuth } from "../../../Auth/AuthContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const { user, isLoading } = useAuth();

  const isAdmin = user?.role === "admin";

  const handleAdd = () => {
    setIsModal(true);
  };
  return (
    <div>
      <div
        className="w-full px-4 pt-4 flex justify-center sticky top-0 z-50 transition-all duration-500 animate-fadeInUp "
        style={{
          animationDelay: "0.2s",
        }}
      >
        <nav
          className="w-full max-w-4xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg rounded-full
 px-6 py-3 flex justify-between items-center transition-all duration-300 relative"
        >
         {isAdmin && <div>
            <div
              onClick={() => handleAdd()}
              className="w-36 p-2 h-10 bg-indigo-700 hover:bg-indigo-800 rounded-lg flex items-center justify-center gap-2 cursor-default"
            >
              <FaPlus className="text-white text-base" />
              <h1 className="text-white text-base">Add Course</h1>
            </div>
          </div>}

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center bg-white/40 px-6 py-2 rounded-full border border-white/50 shadow-inner">
            <Link
              to="/"
              className="text-slate-800 font-bold hover:text-primary transition-colors relative group"
            >
              All
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/about"
              className="text-slate-600 font-semibold hover:text-primary transition-colors relative group"
            >
              Web Development
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/about"
              className="text-slate-600 font-semibold hover:text-primary transition-colors relative group"
            >
              UI/UX Design
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/about"
              className="text-slate-600 font-semibold hover:text-primary transition-colors relative group"
            >
              Graphic Design
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-xl text-primary p-2.5 bg-white/60 hover:bg-white/80 rounded-full border border-white/50 shadow-sm transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FaXmark /> : <FaBars />}
          </button>

          {/* Mobile Dropdown Menu */}
          <div
            className={`absolute top-full left-0 right-0 mt-3 p-4 bg-white/80 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl transition-all duration-300 ease-in-out md:hidden z-50 origin-top ${isMenuOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"}`}
          >
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-slate-800 font-bold hover:text-primary hover:bg-white/50 px-5 py-3 rounded-xl transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                All
              </Link>
              <Link
                to="/about"
                className="text-slate-600 font-semibold hover:text-primary hover:bg-white/50 px-5 py-3 rounded-xl transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Web Development
              </Link>
              <Link
                to="/about"
                className="text-slate-600 font-semibold hover:text-primary hover:bg-white/50 px-5 py-3 rounded-xl transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                UI/UX Design
              </Link>
              <Link
                to="/about"
                className="text-slate-600 font-semibold hover:text-primary hover:bg-white/50 px-5 py-3 rounded-xl transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Graphic Design
              </Link>
            </div>
          </div>
        </nav>
      </div>
      {isModal && <AddModal onClose={() => setIsModal(false)} />}
    </div>
  );
}

export default Navbar;
