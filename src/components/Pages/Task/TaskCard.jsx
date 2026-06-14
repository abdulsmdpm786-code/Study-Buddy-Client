import React, { useState } from "react";
import {
  Plus,
  Paperclip,
  MessageSquare,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Loader2,
  Pencil,
  Trash,
} from "lucide-react";
import EditModal from "./EditModal";
import AXIOS_API from "../../../Api/api";
import DropDown from "./DropDown";

// --- Initial Data ---
const initialTasks = [
  { id: "1", status: "Planned", progress: 0 },
  { id: "2", status: "Planned", progress: 0 },
  { id: "3", status: "In Progress", progress: 50 },
  { id: "4", status: "In Progress", progress: 80 },
  { id: "5", status: "In Progress", progress: 75 },
  { id: "6", status: "Done", progress: 100 },
  { id: "7", status: "On Hold", progress: 50 },
  { id: "8", status: "On Hold", progress: 80 },
  { id: "9", status: "On Hold", progress: 75 },
].map((task) => ({
  ...task,
  // Shared dummy data to match the screenshot
  title: "Research landing page trends.",
  description: "Compile competitor landing page designs for inspiration. G...",
  date: "12 Nov",
  comments: 2,
  attachments: 2,
  avatars: [
    "https://i.pravatar.cc/150?u=1",
    "https://i.pravatar.cc/150?u=2",
    "https://i.pravatar.cc/150?u=3",
  ],
}));

const COLUMNS = [
  { id: "Planned", title: "Planned", icon: CircleDashed },
  { id: "InProgress", title: "In Progress", icon: Loader2 },
  { id: "Done", title: "Done", icon: CheckCircle2 },
];

// --- Helper Functions ---
const getProgressDisplay = (progress) => {
  if (progress === 0) {
    return { icon: CircleDashed, color: "text-gray-400" };
  }
  if (progress === 100) {
    return { icon: CheckCircle2, color: "text-emerald-500" };
  }
  if (progress < 75) {
    return { icon: Loader2, color: "text-amber-500" };
  }
  return { icon: Loader2, color: "text-emerald-500" };
};

console.log("now date", new Date().toDateString());

export default function TaskBoard({ note, fetch }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState("");

  // --- Drag & Drop Handlers ---
  const handleDragStart = (e, id) => {
    setDraggedTaskId(id);
    e.dataTransfer.effectAllowed = "move";
    // Optional: Make the drag ghost slightly transparent
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
    setDraggedTaskId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (draggedTaskId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === draggedTaskId ? { ...task, status } : task,
        ),
      );
    }
  };

  const handleEdit = (data) => {
    setModal(true);
    setData(data);
  };

  const handleDelete = async (id) => {
    try {
      const response = await AXIOS_API.delete(`/api/v4/todoNote/${id}`);
      if (response.status === 200) {
        fetch()
      }
    } catch (error) {
      setError(error.response?.data?.errMsg || "Course Adding Failed");
    }
  };

  return (
    <div className="min-h-screen  overflow-x-auto">
      <div className="flex items-start  gap-6 w-max">
        {COLUMNS.map((column, i) => {
          const columnTasks = note.filter(
            (task) => task.isCompleted === column.id,
          );
          const ColumnIcon = column.icon;

          return (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
              className="flex flex-col flex-shrink-0 w-80 bg-gray-50/60 rounded-2xl p-3 border border-gray-100
                transition-all duration-500
         animate-fadeInUp 
                        `"
              style={{
                animationDelay: `0.${i++}s`,
              }}
            >
              <div className="flex justify-between items-center mb-4 px-1 text-gray-700 ">
                <div className="flex items-center gap-2">
                  <ColumnIcon className="w-[18px] h-[18px] text-gray-500" />
                  <h3 className="text-sm font-medium">{column.title}</h3>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-h-[150px]">
                {columnTasks.map((task, i) => {
                  const { icon: ProgressIcon, color: progressColor } =
                    getProgressDisplay(task.progress);

                  return (
                    <div
                      key={i}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      onDragEnd={handleDragEnd}
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4 cursor-grab
                       active:cursor-grabbing hover:shadow-md hover:border-gray-300 
                       transition-all  duration-500
         animate-fadeInUp 
                        `"
                      style={{
                        animationDelay: `0.${i++}s`,
                      }}
                    >
                      <div>
                        <h4 className="text-[13px] font-semibold text-gray-900 leading-snug">
                          {task.title}
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed line-clamp-3">
                          {task.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-[11px] font-medium">
                        <div className="flex items-center gap-1.5 text-indigo-500">
                          <CalendarDays className="w-3.5 h-3.5" />
                          <span className="font-bold">{task.date}</span>
                        </div>
                        <div
                          className={`flex items-center gap-1 ${progressColor}`}
                        >
                          <ProgressIcon className="w-3.5 h-3.5" />
                          <span>{task.progress}%</span>
                        </div>
                      </div>

                      <div className="flex justify-end  pt-1">
                        <div className="flex justify-end gap-3 text-xs text-gray-400 font-medium">
                          <div
                            onClick={() => handleEdit(task)}
                            className="flex items-center gap-1 hover:text-indigo-600 cursor-default transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </div>
                          <div
                            onClick={() => handleDelete(task._id)}
                            className="flex items-center gap-1 hover:text-rose-900 cursor-default transition-colors"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                      <DropDown id={task._id} fetch={fetch}/>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {modal && <EditModal onClose={() => setModal(false)} data={data} />}
    </div>
  );
}
