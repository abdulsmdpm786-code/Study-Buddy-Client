import React from "react";
import {
  ChevronRight,
  Star,
  Users,
  CheckCircle2,
  Clock,
  Award,
  Pin,
  PlaySquare,
  FileText,
  Medal,
} from "lucide-react";
import { useEffect, useState } from "react";
import AXIOS_API from "../../../Api/api";
import { useParams } from "react-router-dom";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import ResourcesContent from "./ResourcesContent";

function MainSection() {
  const { courseContent } = useParams();
  console.log("params", courseContent);

  const [data, setData] = useState([]);
  const [isContent, setIsContent] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState("");
  const [isMessage, setIsMessage] = useState(false)

  const [addModal, setAddModal] = useState(false)

  const getCourse = async () => {
    try {
      const dataResponse = await AXIOS_API.get("/api/v1/course/getList");

      if (dataResponse.status === 200) {
        console.log("response", dataResponse.data.Courses);
        setData(dataResponse.data.Courses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNotes = async () => {
    try {
      const contentResponse = await AXIOS_API.get(
        `api/v1/course/content/${courseContent}/get`,
      );
      if (contentResponse.status === 200) {
        console.log("clear", contentResponse.data.content);
        setIsContent(contentResponse.data.content);
        setIsMessage(!isMessage)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const content = data.find((e) => e._id === courseContent);

  

  useEffect(() => {
    getCourse();
    getNotes();
  }, []);

  const handleEdit = (note) => {
    setEditData(note);
    setEditModal(true);
  };

  const handleDelete = async (id)=>{
try {
  const deleteResponse = await AXIOS_API.delete(
    `/api/v1/course/content/${id}/delete`
  )

  if(deleteResponse.status === 200){
    alert("item deleted")
    window.location.reload();
  }
} catch (error) {
  console.log(error);
  
}
  }

  const openAddModal = ()=>{
    setAddModal(true)
  }
// console.log("content...",isContent);

  const noteFilter = isContent.filter(n => n.title.type === "note")
  console.log("notes...",noteFilter);

  const reference = isContent.filter(n => n.title.type === "ref")
  console.log("ref..",reference);
  
  


  return (
    <div className="lg:col-span-2 space-y-10">
      <section
        className="space-y-6 transition-all duration-500 animate-fadeInUp "
        style={{
          animationDelay: "0.2s",
        }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
          {content?.title}
        </h1>

        <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
          {content?.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium text-slate-700">
          <div className="flex items-center gap-1.5">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-slate-900 font-semibold text-base">4.9</span>
            <span className="text-slate-500 font-normal">(3,200+ reviews)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-5 h-5 text-indigo-500" />
            <span className="text-slate-900 font-semibold text-base">
              5,747
            </span>
            <span className="text-slate-500 font-normal">members</span>
          </div>
        </div>

        <div className="pt-2">
          <button
          onClick={()=> openAddModal()}
            className="px-6 py-2.5 rounded-lg border-2 bg-indigo-700 text-white font-medium
                 hover:bg-indigo-800  transition-all duration-200 shadow-sm  "
          >
            Add Note
          </button>
        </div>
      </section>


      
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
        
        {noteFilter.map((note, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl p-5 
            hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 relative group cursor-pointer transition-all duration-500 animate-fadeInUp"
            style={{ animationDelay: `0.${i + 1}s` }}
          >
            <div className="flex gap-2 items-start mb-3">
              <div
                onClick={() => handleEdit(note)}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-700/90 bg-white/60 px-2 py-1 
              rounded-md shadow-sm border border-white/60 hover:text-indigo-800"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <button
              onClick={()=> handleDelete(note._id)}
                className="text-slate-500 hover:text-red-800 transition-colors p-1 rounded-full
                bg-white/60"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            <h3 className="font-semibold text-slate-900 mb-2 text-base group-hover:text-indigo-900 transition-colors">
              {note?.subTitle}
            </h3>

            <p className="text-xs text-slate-800/90 leading-relaxed">
              {note?.content}
            </p>
          </div>
        ))}
      </section>

     <ResourcesContent reference={reference} />
      {editModal && (
        <EditModal onClose={() => setEditModal(false)} data={editData} />
      )}

      {addModal && <AddModal onClose={()=> setAddModal(false)}  id={courseContent}   />}

    </div>
  );
}

export default MainSection;
