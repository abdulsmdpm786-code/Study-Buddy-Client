import React, { useState } from "react";


function TaskProgress({ note }) {


  const totalListings = note.length;
  const activeApplications = note.filter((j) => j.isCompleted === "InProgress").length;
  const completedProcesses = note.filter((j) => j.isCompleted === "Done").length;
  const completionRate =
    totalListings > 0
      ? Math.round((completedProcesses / totalListings) * 100)
      : 0;

  const topStats = [
    {
      value: totalListings,
      title: "TOTAL TRACKED",
      subtitle: "All saved opportunities",
    },
    {
      value: activeApplications,
      title: "ONGOING",
      subtitle: "Currently in progress",
    },
    {
      value: completedProcesses,
      title: "COMPLETED",
      subtitle: "Finished processes",
    },
    {
      value: `${completionRate}%`,
      title: "COMPLETION RATE",
      subtitle: "Proportion of finished tasks",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {topStats.map((item, i) => (
        <div
          key={i}
          className="relative rounded-3xl bg-white/30 backdrop-blur-2xl border-2 border-white/40 p-7 
              shadow-[0_8px_32px_rgba(0,0,0,0.05)]  hover:bg-white/40 hover:-translate-y-1 
              hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-500
         animate-fadeInUp 
                        `"
          style={{
            animationDelay: `0.${i++}s`,
          }}
        >
          <div className="relative z-10 flex flex-col">
            <h2
              className="text-5xl font-extrabold tracking-tight text-black
                "
            >
              {item.value}
            </h2>
            <p
              className="mt-3 text-sm font-semibold text-indigo-800 tracking-widest uppercase 
            "
            >
              {item.title}
            </p>
            <p className="mt-1 text-xs text-indigo-800 font-medium ">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskProgress;
