import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaArrowRight, FaBars, FaXmark } from 'react-icons/fa6';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-purple-300 mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-pink-300 mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Navbar */}
      <div className="w-full px-4 pt-4 flex justify-center sticky top-0 z-50">
        <nav className="w-full max-w-4xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white shadow-lg">
              <FaGraduationCap className="text-xl" />
            </div>
            <span className="text-2xl font-extrabold text-primary tracking-tight">Qalam Academy</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center bg-white/40 px-6 py-2 rounded-full border border-white/50 shadow-inner">
            <Link to="/" className="text-slate-800 font-bold hover:text-primary transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-slate-600 font-semibold hover:text-primary transition-colors relative group">
              About Us
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
          <div className={`absolute top-full left-0 right-0 mt-3 p-4 bg-white/80 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl transition-all duration-300 ease-in-out md:hidden z-50 origin-top ${isMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}`}>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-slate-800 font-bold hover:text-primary hover:bg-white/50 px-5 py-3 rounded-xl transition-all" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/about" className="text-slate-600 font-semibold hover:text-primary hover:bg-white/50 px-5 py-3 rounded-xl transition-all" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            </div>
          </div>
        </nav>
      </div>


      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
          
          <div className="text-left animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-white/60 text-primary font-bold text-sm mb-6 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              New Dashboard Experience
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              Unlock Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Potential</span>
            </h1>
            
            <p className="text-base text-slate-600 mb-10 leading-relaxed font-medium max-w-lg">
              Access your personalized student dashboard to track assignments, view course progress, and elevate your academic journey. Everything you need, beautifully organized in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/SignUp" 
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-bold text-lg rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_10px_40px_rgba(79,70,229,0.4)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 transition-opacity opacity-0 group-hover:opacity-100"></div>
                <span className="relative">Get Started</span>
                <FaArrowRight className="relative group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="hidden md:block relative animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-3xl blur-3xl transform rotate-3"></div>
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-10 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10"></div>
                <h3 className="text-3xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
                   <FaGraduationCap className="text-primary text-4xl"/> Student Dashboard
                </h3>
                <ul className="space-y-5 mb-8">
                    <li className="flex items-center gap-4 text-slate-700 font-semibold bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm 
                    transition-transform hover:-translate-y-1">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-inner">✓</div>
                        Track your daily tasks and assignments seamlessly.
                    </li>
                    <li className="flex items-center gap-4 text-slate-700 font-semibold bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm transition-transform hover:-translate-y-1">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-inner">✓</div>
                        Access comprehensive course materials anywhere.
                    </li>
                    <li className="flex items-center gap-4 text-slate-700 font-semibold bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm transition-transform hover:-translate-y-1">
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 shadow-inner">✓</div>
                        Monitor your grades and performance analytics.
                    </li>
                </ul>
                <div className="w-full h-40 bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl border border-slate-200/50 flex items-center justify-center 
                overflow-hidden relative shadow-inner">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')]"></div>
                    <span className="text-base font-extrabold text-slate-400 relative z-10 uppercase tracking-[0.2em]">Interactive Interface</span>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
