import React, { useEffect } from "react";
import {
  Maximize2,
  RotateCw,
  Bookmark,
  ArrowUpRight,
  FileSearch,
} from "lucide-react";
import confetti from "canvas-confetti";
import focus from "../../../assets/focus.png";

function QuizLose({score}) {
  const triggerSadRain = () => {
    confetti({
      particleCount: 100,
      angle: 270,
      spread: 180, 
      origin: { y: 0 },
      colors: ["#808080", "#A9A9A9", "#D3D3D3"], 
      gravity: 1.5, 
      ticks: 300, 
      shapes: ["square"],
    });
  };

  useEffect(() => {
    triggerSadRain();
  }, []);
  return (
    <div
      className="relative w-full max-w-[400px] h-[550px] bg-gradient-to-b from-[#8c2211] via-[#631408] 
    to-[#3a0a03] rounded-[2rem] overflow-hidden flex flex-col items-center pt-14 shadow-2xl mx-auto font-sans"
    >
      <div
        className="absolute inset-0 z-0 flex flex-col items-center justify-between py-10 overflow-hidden pointer-events-none 
      opacity-20"
      >
        <span
          className="text-[8rem] font-black leading-none text-transparent tracking-tighter uppercase 
        [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] scale-y-150 mt-8"
        >
          YOU
        </span>
        <span
          className="text-[8rem] font-black leading-none text-transparent tracking-tighter uppercase
         [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] scale-y-150"
        >
          CAN
        </span>
        <span
          className="text-[7.5rem] font-black leading-none text-transparent tracking-tighter uppercase
         [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] scale-y-150 mb-8"
        >
          DO IT
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full px-6">
        <h1 className="text-[3rem] font-serif text-center leading-[0.85] tracking-tight">
          <span className="block text-[#FDBF0F]">YOU</span>
          <span className="block text-white mt-1">CAN</span>
          <span className="block text-[#FDBF0F] mt-1">DO IT</span>
        </h1>
        <h1 className=" text-5xl mt-5 font-serif text-yellow-400">Score is {score}</h1>

        <div className="relative w-56 h-56 mt-10 flex items-center justify-center">
          <img
            src={focus}
            alt="Target with dart"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default QuizLose;
