import React, { useEffect, useState } from "react";

import TaskProgress from "./TaskProgress";
import TaskCard from "./TaskCard";
import AXIOS_API from "../../../Api/api";



export default function JobTrackerDashboard() {

  const [error, setError] = useState("")
  const [notes, setNotes] = useState([])

  const fetchNotes = async ()=>{
    try {
      const response = await AXIOS_API.get(
        "/api/v4/todoNote/get"
      )
      console.log(response.data.note);
      setNotes(response?.data?.note)
      
    } catch (error) {
      setError(error.response?.data?.errMsg || "Course Adding Failed");
    }
  }


useEffect(()=>{
  fetchNotes()
},[])

  return (
    <div className="relative min-h-screen  p-3 font-sans overflow-hidden text-slate-800">
      <div className="relative z-10 max-w-screen-2xl mx-auto space-y-10">
        <TaskProgress />

       <TaskCard  note={notes}/>
      </div>
    </div>
  );
}
