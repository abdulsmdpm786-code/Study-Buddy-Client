import React from "react";
import QuizDiv from "./QuizDiv";

function QuizHome() {
  return (
    <div>
      <div className="min-h-screen  p-4 md:p-10 font-sans flex justify-center items-start">
        {/* Main Card */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 items-start">
          <div
            className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(100,100,150,0.05)] p-6 sm:p-8 w-full 
        lg:w-[400px] shrink-0 hover:-translate-y-1  cursor-pointer transition-all duration-500 animate-fadeInUp 
                        hover:shadow  group`"
            style={{
              animationDelay: "0.2s",
            }}
          >
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-[#1A1A32] font-black text-2xl">
                  Quiz Section
                </h2>
                <span className="text-indigo-500/80 text-sm font-bold tracking-wide">
                  50 / 100 XP
                </span>
              </div>

              <div className="h-3 w-full bg-[#F3F1FA] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 w-1/2 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
              <div className="bg-[#FCFCFF] border border-indigo-50/50 rounded-2xl py-5 px-2 flex flex-col items-center justify-center gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-indigo-500 h-7 w-7 mb-1"
                >
                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                  <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                </svg>
                <span className="text-[#1A1A32] font-black text-2xl leading-none">
                  1
                </span>
                <span className="text-indigo-500/70 text-[9px] font-bold tracking-widest uppercase mt-1">
                  Quizzes
                </span>
              </div>

              <div className="bg-[#FCFCFF] border border-indigo-50/50 rounded-2xl py-5 px-2 flex flex-col items-center justify-center gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-500 h-7 w-7 mb-1"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
                <span className="text-[#1A1A32] font-black text-2xl leading-none">
                  30%
                </span>
                <span className="text-indigo-500/70 text-[9px] font-bold tracking-widest uppercase mt-1">
                  Avg Score
                </span>
              </div>

              {/* Max Streak Stat */}
              <div className="bg-[#FCFCFF] border border-indigo-50/50 rounded-2xl py-5 px-2 flex flex-col items-center justify-center gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-orange-500 h-7 w-7 mb-1"
                >
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
                <span className="text-[#1A1A32] font-black text-2xl leading-none">
                  1
                </span>
                <span className="text-indigo-500/70 text-[9px] font-bold tracking-widest uppercase mt-1 text-center">
                  Max
                  <br />
                  Streak
                </span>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-100 to-transparent mb-6"></div>

            <div>
              <h3 className="text-indigo-500/80 text-xs font-bold tracking-widest uppercase mb-4">
                Quiz rules
              </h3>
              <div className="flex gap-3 h-16 overflow-hidden">
                <h1 className="text-sm  text-gray-600  leading-relaxed ">
                  This quiz contains 10 MCQ questions and must be completed
                  within 10 minutes. Each question has one correct answer, A minimum score of 70% is required.
                </h1>
              </div>
            </div>
          </div>

          <QuizDiv />
        </div>
      </div>
    </div>
  );
}

export default QuizHome;
