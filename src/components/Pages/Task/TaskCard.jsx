import React, { useState } from "react";
import {
  ListTodo,
  Clock,
  CheckCircle,
  Plus,
  Briefcase,
  MapPin,
  Calendar,
  GripVertical,
} from "lucide-react";
const initialJobs = [
  {
    id: "1",
    company: "LINEAR",
    role: "Lead Full-Stack Developer",
    status: "To Do",
    location: "Remote (Worldwide)",
    date: "2026-06-08",
  },
  {
    id: "2",
    company: "VERCEL",
    role: "Senior Frontend Developer",
    status: "Ongoing",
    location: "Remote (US)",
    date: "2026-06-10",
  },
  {
    id: "3",
    company: "MONGODB INC.",
    role: "Full-Stack Developer",
    status: "Completed",
    location: "New York, NY",
    date: "2026-06-12",
  },
  {
    id: "4",
    company: "STRIPE",
    role: "Software Engineer",
    status: "Completed",
    location: "Remote",
    date: "2026-06-01",
  },
];

const COLUMNS = [
  {
    id: "To Do",
    title: "To Do",
    color: "border-purple-400",
    text: "text-purple-400",
    iconText: "text-purple-600",
    bg: "bg-purple-500",
    icon: ListTodo,
  },
  {
    id: "Ongoing",
    title: "Ongoing",
    color: "border-blue-400",
    text: "text-blue-400",
    iconText: "text-blue-600",
    bg: "bg-blue-500",
    icon: Clock,
  },
  {
    id: "Completed",
    title: "Completed",
    color: "border-green-400",
    text: "text-green-400",
    iconText: "text-green-600",
    bg: "bg-green-500",
    icon: CheckCircle,
  },
];

function TaskCard() {
  const [jobs, setJobs] = useState(initialJobs);
  const [draggedJobId, setDraggedJobId] = useState(null);

  // --- Drag & Drop Handlers ---
  const handleDragStart = (e, id) => {
    setDraggedJobId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (draggedJobId) {
      setJobs((prev) =>
        prev.map((job) => (job.id === draggedJobId ? { ...job, status } : job)),
      );
      setDraggedJobId(null);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {COLUMNS.map((column) => {
        const columnJobs = jobs.filter((job) => job.status === column.id);
        const ColumnIcon = column.icon;

        return (
          <div
            key={column.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
            className={`bg-white/20 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-6 flex flex-col 
                   relative group overflow-hidden shadow-xl min-h-[60vh] transition-all duration-500 
                          animate-fadeInUp`}
            style={{
              animationDelay: `0.2s`,
            }}
          >
            <div
              className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-60 ${column.iconText}`}
            />

            <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <ColumnIcon
                  size={24}
                  className={`${column.iconText} drop-shadow-sm`}
                />
                <h3 className="font-extrabold text-xl text-slate-800 drop-shadow-sm">
                  {column.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-sm font-bold text-slate-700 shadow-sm">
                  {columnJobs.length}
                </span>
                <button className="text-slate-500 hover:text-slate-800 transition-colors hover:bg-white/40 p-2 rounded-full shadow-sm">
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-5 relative z-10">
              {columnJobs.length > 0 ? (
                columnJobs.map((job, i) => (
                  <div
                    key={job.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, job.id)}
                    className={`bg-[#2A2B38] rounded-2xl p-6 border border-slate-600/50 cursor-grab 
                          active:cursor-grabbing hover:border-slate-500 hover:bg-[#323342] transition-all duration-500 
                          animate-fadeInUp shadow-lg group/card relative`}
                    style={{
                      animationDelay: `0.${i++}s`,
                    }}
                  >
                    <GripVertical
                      size={18}
                      className="absolute top-5 right-5 text-slate-500 opacity-0 group-hover/card:opacity-100 transition-opacity"
                    />

                    <p
                      className={`text-xs font-bold ${column.text} uppercase tracking-wider mb-2 flex items-center gap-2`}
                    >
                      {job.company}
                    </p>

                    <h4 className="text-[17px] font-semibold leading-snug text-white pr-6 mb-5">
                      {job.role}
                    </h4>

                    <div className="space-y-3 text-xs text-slate-400 font-medium">
                      <div className="flex items-center gap-2.5">
                        <MapPin size={14} className="text-slate-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Calendar size={14} className="text-slate-500" />
                        <span>Tracked: {job.date}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="border-2 border-dashed border-white/40 bg-white/10 rounded-2xl h-40 flex flex-col items-center justify-center text-slate-500 transition-colors group-hover:border-white/60 group-hover:bg-white/20 shadow-inner">
                  <Briefcase
                    size={28}
                    className="mb-3 opacity-40 text-slate-600"
                  />
                  <span className="text-sm font-bold text-slate-600">
                    Drop here
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TaskCard;
