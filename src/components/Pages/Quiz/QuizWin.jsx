import React, { useEffect } from "react";
import { Maximize2, RotateCw, Bookmark } from "lucide-react";
import confetti from "canvas-confetti";
import Prize from "../../../assets/prize.png"

function QuizWin( {score}) {
  const triggerFireworks = () => {
    const duration = 3000; // 3 seconds
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff0000", "#00ff00", "#0000ff"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff0000", "#00ff00", "#0000ff"],
        zIndex: 9999,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  useEffect(() => {
    triggerFireworks();
  }, []);
  return (
   
      <div
        className="relative w-full max-w-[400px] h-[550px] bg-gradient-to-b from-[#113a2a] to-[#082015] rounded-[2.5rem] 
    overflow-hidden p-6 font-sans shadow-2xl mx-auto"
      >

        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#b5ff00] rounded-full mix-blend-screen blur-[80px] opacity-60"></div>

        <div className="absolute -bottom-10 -left-20 w-80 h-80 bg-[#4dff00] rounded-full mix-blend-screen blur-[90px] opacity-50"></div>

        <div className="absolute top-[30%] -left-10 w-32 h-32 bg-[#b5ff00] rounded-full mix-blend-screen blur-[50px] opacity-40"></div>



        <h1 className="relative z-10 text-center mt-5 text-4xl sm:text-5xl font-serif text-white leading-[1.1] tracking-tight">
          You
          <br />
          Won
        </h1>
        <div className="text-center text-yellow-400 text-5xl font-serif font-bold mt-5">
          <h1>Score is {score}</h1>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[350px] z-10 flex items-end justify-center pointer-events-none">
          <img
            src={Prize}
            alt="Golden Trophy"
            className="w-full h-auto object-contain"
          />
        </div>

      </div>
    
  );
}

export default QuizWin;
