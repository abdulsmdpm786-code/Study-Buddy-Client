import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import TaskProgress from "./TaskProgress";
import TaskCard from "./TaskCard";
import AXIOS_API from "../../../Api/api";
import AddModal from "./AddModal";

export default function JobTrackerDashboard() {
  const [error, setError] = useState("");
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await AXIOS_API.get("/api/v4/todoNote/get");
      console.log(response.data.note);
      setNotes(response?.data?.note);
    } catch (error) {
      setError(error.response?.data?.errMsg || "Course Adding Failed");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="relative min-h-screen  p-3 font-sans overflow-hidden text-slate-800">
      <div className="relative z-10 max-w-screen-2xl mx-auto space-y-10">
        <TaskProgress />
        <div>
          <button
          onClick={()=> setModal(true)}
            className="bg-indigo-700 px-6 py-2 rounded-lg  text-white flex justify-center items-center gap-2
          hover:bg-indigo-800 transition-all duration-500
         animate-fadeInUp 
                        `"
            style={{
              animationDelay: `0.2s`,
            }}
          >
            <Plus className="w-4 h-4" />
            Add Todo
          </button>
        </div>

        <TaskCard note={notes} />
      </div>
      {modal && <AddModal onClose={()=> setModal(false)}/>}
    </div>
  );
}
