import React, { useState } from "react";

import TaskProgress from "./TaskProgress";
import TaskCard from "./TaskCard";



export default function JobTrackerDashboard() {





  return (
    <div className="relative min-h-screen  p-6 font-sans overflow-hidden text-slate-800">
      <div className="relative z-10 max-w-screen-2xl mx-auto space-y-10">
        <TaskProgress />

       <TaskCard />
      </div>
    </div>
  );
}
