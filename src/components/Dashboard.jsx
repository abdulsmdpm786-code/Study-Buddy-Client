import React, { useState, useEffect } from "react";
import {
  FaGraduationCap,
  FaEarthAmericas,
  FaBook,
  FaRegLightbulb,
  FaNoteSticky,
  FaMedal,
} from "react-icons/fa6";

const Dashboard = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const cardBase =
    "bg-glass backdrop-blur-2xl border border-glass-border rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] flex flex-col relative overflow-hidden transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:bg-glass-hover hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] animate-fadeInUp group";
  const iconWrapper =
    "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1300px] mx-auto">
      {/* Welcome Banner */}
      <div
        className="col-span-1 md:col-span-3 row-span-2 rounded-3xl p-10 flex flex-col md:flex-row items-center 
        justify-between shadow-[0_15px_40px_rgba(30,58,138,0.3)] text-white relative overflow-hidden transition-all 
        duration-500 animate-fadeInUp group"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #152c6b 100%)",
          animationDelay: "0.1s",
        }}
      >
        <div className="max-w-full md:max-w-[60%] z-10 relative">
          <p className="text-sm text-white/80 mb-3 font-medium uppercase tracking-wide">
            {currentDate}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight text-white drop-shadow-md">
            Welcome Abdul Samad PM
          </h2>
          <p className="text-[1.05rem] text-white/90 italic font-light">
            "In order to be irreplaceable one must always be different."
          </p>
          <p className="text-sm text-white/70 mt-2 text-right font-medium">
            -- Coco Chanel
          </p>
        </div>
        <div className="text-[8rem] md:text-[10rem] text-white/15 absolute right-5 -bottom-5 -rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110">
          <FaGraduationCap />
        </div>
      </div>

      {/* Legacy Card */}
      <div
        className={`${cardBase} col-span-1 md:col-span-3 xl:col-span-1 xl:row-span-3 !flex-col md:!flex-row xl:!flex-col
         text-center xl:justify-center items-center gap-6 xl:gap-0 p-8`}
        style={{
          background:
            "linear-gradient(135deg, rgba(251, 204, 238, 0.6), rgba(255, 255, 255, 0.4))",
          animationDelay: "0.2s",
        }}
      >
        <div className="text-[4rem] xl:text-[5rem] text-emerald-500 drop-shadow-[0_10px_15px_rgba(16,185,129,0.3)] animate-float mb-0 xl:mb-6">
          <FaEarthAmericas />
        </div>
        <div className="text-left xl:text-center">
          <h3 className="text-xl font-bold text-primary mb-4 leading-snug">
            Build Your Legacy, One Lesson at a Time.
          </h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            To improve productivity, always have a shittier task to put off.
          </p>
          <button className="w-full md:w-auto xl:w-full bg-primary hover:bg-primary-hover text-white py-3.5 px-6 rounded-xl font-semibold shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-0.5">
            Continue Learning
          </button>
        </div>
      </div>

      {/* Dictionary Section */}
      <div
        className={cardBase}
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 243, 138, 0.5), rgba(255, 255, 255, 0.3))",
          animationDelay: "0.3s",
        }}
      >
        <div className={`${iconWrapper} text-amber-500`}>
          <FaBook />
        </div>
        <h4 className="font-bold text-slate-800">Dictionary Section</h4>
        <p className="text-sm text-slate-500 mt-1">Review Tasks</p>
      </div>

      {/* Quiz Section */}
      <div
        className={cardBase}
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 209, 199, 0.5), rgba(255, 255, 255, 0.3))",
          animationDelay: "0.4s",
        }}
      >
        <div className={`${iconWrapper} text-orange-600`}>
          <FaRegLightbulb />
        </div>
        <h4 className="font-bold text-slate-800">Quiz Section</h4>
        <p className="text-sm text-slate-500 mt-1">Check it out</p>
      </div>

      {/* Note Section */}
      <div
        className={cardBase}
        style={{
          background:
            "linear-gradient(135deg, rgba(251, 204, 238, 0.5), rgba(255, 255, 255, 0.3))",
          animationDelay: "0.5s",
        }}
      >
        <div className={`${iconWrapper} text-pink-600`}>
          <FaNoteSticky />
        </div>
        <h4 className="font-bold text-slate-800">Note Section</h4>
        <p className="text-sm text-slate-500 mt-1">More to learn</p>
      </div>

      {/* Victory Vault */}
      <div
        className={`${cardBase} col-span-1 md:col-span-2`}
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 204, 153, 0.5), rgba(255, 255, 255, 0.3))",
          animationDelay: "0.6s",
        }}
      >
        <div className={`${iconWrapper} text-orange-700`}>
          <FaMedal />
        </div>
        <h4 className="font-bold text-primary mb-1">Victory Vault</h4>
        <p className="text-sm text-slate-700 leading-relaxed">
          Success is a series of small wins played out over time. You've put in
          the work, faced the challenges, and come out on top
        </p>
      </div>

      {/* Gather More */}
      <div
        className={`${cardBase} justify-between`}
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 232, 115, 0.5), rgba(255, 255, 255, 0.3))",
          animationDelay: "0.7s",
        }}
      >
        <div>
          <div className={`${iconWrapper} text-yellow-700`}>
            <FaMedal />
          </div>
          <p className="font-bold text-primary mb-3">Gather More</p>
        </div>
        <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg font-semibold transition-transform hover:-translate-y-0.5">
          Learn
        </button>
      </div>

      {/* Study Timer */}
      <div
        className={`${cardBase} justify-between !bg-white/70 hover:!bg-white/85`}
        style={{ animationDelay: "0.8s" }}
      >
        <h4 className="font-bold text-primary text-lg">Study Timer</h4>
        <div className="text-[2.5rem] font-extrabold text-primary my-3 tracking-tighter tabular-nums drop-shadow-sm">
          {formatTime(time)}
        </div>
        <p className="text-sm text-slate-500 mb-4">Message</p>
        <div className="flex gap-3">
          <button
            className={`flex-1 py-2.5 rounded-lg text-white font-bold shadow-md transition-all hover:-translate-y-0.5 ${isActive ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"}`}
            onClick={toggleTimer}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            className="flex-1 py-2.5 rounded-lg text-white font-bold bg-red-500 hover:bg-red-600 shadow-md transition-all hover:-translate-y-0.5"
            onClick={resetTimer}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
