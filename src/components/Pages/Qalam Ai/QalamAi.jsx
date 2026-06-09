import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import GeminiResultBox from "./GeminiResultBox";

function QalamAi({ user, onSearchSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    onSearchSubmit(inputValue);
    setInputValue("");
  };

  return (
    <div>
      <div
        className="flex items-center flex-col justify-between text-sm text-gray-800 max-md:px-4 text-center
       transition-all duration-500 animate-fadeInUp group"
      >
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
          <div className="mb-6">
            <h1
              className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500
             to-purple-600 bg-clip-text text-transparent"
            >
              Hi {user?.name || "there"}
            </h1>
            <p className="text-slate-500 font-medium text-base mt-2 tracking-wide">
              Build your legacy with Knowledge
            </p>
          </div>

          <div
            className="w-full  relative group/input p-[1px] rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700
           to-slate-800 focus-within:from-blue-500 focus-within:via-indigo-500 focus-within:to-purple-500 transition-all 
           duration-500 shadow-xl focus-within:shadow-[0_0_25px_rgba(99,102,241,0.2)]"
          >
            <div className="w-full bg-slate-950/95 rounded-[15px] p-4 flex flex-col backdrop-blur-xl">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                className="w-full resize-none outline-none bg-transparent text-slate-100 placeholder-slate-500 text-base 
                leading-relaxed pr-12 transition-colors"
                placeholder="What do you want to learn?..."
              />

              <div className="flex justify-end items-center mt-2 pt-2 border-t border-slate-900">
                <button
                  onClick={handleSearch}
                  disabled={!inputValue.trim()}
                  className={`flex items-center justify-center p-2 rounded-xl size-9 transition-all duration-300 ${
                    inputValue.trim()
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-900/40 cursor-pointer scale-100 active:scale-95"
                      : "bg-slate-900 text-slate-600 cursor-not-allowed"
                  }`}
                  aria-label="Send"
                >
                  <Search className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GeminiResultBox />
    </div>
  );
}

export default QalamAi;
