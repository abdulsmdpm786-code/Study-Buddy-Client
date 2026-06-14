import React, { useState, useEffect, useRef } from "react";
import AXIOS_API from "../../../Api/api";

export default function DropDown({ id, fetch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);
  console.log("id...f",id);
  

  const options = [
    { id: "Planned", label: "Planned" },
    { id: "InProgress", label: "In Progress" },
    { id: "Done", label: "Done" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDrop = async (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);

console.log("...",id);

    try {
      const editResponse = await AXIOS_API.put(`/api/v4/todoNote/${id}`, {
        isCompleted: option.id
      });

      if (editResponse.status === 200) {
        fetch()
      }
    } catch (error) {}
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-slate-200
         bg-slate-900/50 hover:bg-slate-900/80 border  rounded-xl backdrop-blur-md shadow-lg 
         transition-all duration-200 focus:outline-none
         active:scale-95"
      >
        <span className="flex items-center gap-2">Move to stage</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 text-slate-400 ${
            isOpen ? "rotate-180 text-indigo-400" : ""
          }`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`absolute right-0 z-50 w-48 mt-2 origin-top-right rounded-xl border border-slate-800/90
             bg-slate-950/80 backdrop-blur-xl shadow-2xl transition-all duration-200 ${
               isOpen
                 ? "opacity-100 scale-100 pointer-events-auto"
                 : "opacity-0 scale-95 pointer-events-none"
             }`}
      >
        <div className="p-1.5 space-y-0.5">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                handleDrop(option);
              }}
              className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors duration-150 font-sans 
                tracking-wide ${
                  selectedOption === option.label
                    ? "bg-indigo-600/20 text-indigo-400 font-semibold"
                    : "text-slate-300 hover:bg-slate-900/60 hover:text-white"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
