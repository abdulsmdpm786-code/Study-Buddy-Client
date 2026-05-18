import React, { useEffect, useState } from "react";
import AXIOS_API from "../../../Api/api";
import { useAuth } from "../../../Auth/AuthContext";
import CourseModal from "./CourseModal";
import { useNavigate } from "react-router-dom";

function CourseList() {
  const [data, setData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [editCourse, setEditCourse] = useState("")
  const navigate = useNavigate()

  const { user, isLoading } = useAuth();
  console.log("user details", user.role);

  const isAdmin = user?.role === "admin";
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

  useEffect(() => {
    getCourse();
  }, []);

  console.log("data id", data);

  const handleDelete = async (id) => {
    try {
      const deleteResponse = await AXIOS_API.delete(
        `/api/v1/course/deleteCourse/${id}`,
      );
      if (deleteResponse.status === 200) {
        getCourse();
        console.log("Deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = (course) => {
      setEditCourse(course)
    setIsModal(!isModal);
  };

  const handleRoute = (id)=>{
    navigate(`/Dashboard/course/${id}`)

  } 


  return (
    <div>
      <div className="grid grid-cols-3">
        {data &&
          data.map((data, index) => (
            <div
              key={data._id}
              className="relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white 
            shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fadeInUp group h-full mt-5"
              style={{
                animationDelay: `0.${(index || 0) + 1}s`,
              }}
            >
              {/* Image Header Wrapper */}
              <div className="relative block w-full p-2 overflow-hidden aspect-video">
                <div className="w-full h-full overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={
                      data.image ||
                      data.Image ||
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
                    }
                    alt={data.title || "Course Image"}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Short Category Badge */}
                {data.shortTitle && (
                  <span
                    className="absolute top-4 left-4 rounded-md bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 text-xs 
                font-semibold text-white tracking-wide"
                  >
                    {data.shortTitle}
                  </span>
                )}

                {/* 🚨 ADMIN ACTION BUTTONS (Edit & Delete overlaid on the top right) */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => handleModal(data)}
                      className="p-2 rounded-lg bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white hover:text-indigo-600 shadow-sm transition-all active:scale-95"
                      aria-label="Edit course"
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
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleDelete(data._id)}
                      className="p-2 rounded-lg bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-red-50 hover:text-red-600 
                      shadow-sm transition-all active:scale-95"
                      aria-label="Delete course"
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
                )}
              </div>

              {/* Content Body */}
              <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                <div className="space-y-2.5">
                  {/* Title */}
                  <h5 className="text-lg font-bold leading-snug tracking-tight text-slate-900 line-clamp-2">
                    {data.title || "Untitled Course"}
                  </h5>

                  {/* Price & Metadata Container */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-indigo-600">
                        {data.price || "Free"}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-medium">
                        $699
                      </span>
                    </div>

                    {/* Duration Badge */}
                    {data.duration && (
                      <div
                        className="flex items-center text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md border
                     border-slate-100"
                      >
                        <svg
                          className="w-3.5 h-3.5 mr-1 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {data.duration}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button
                onClick={()=> handleRoute(data._id)}
                  type="button"
                  className="w-full mt-auto flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 
                text-center text-sm font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98]
                 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
                >
                  
                  Learn More
                </button>
              </div>
            </div>
          ))}
      </div>
      {isModal && <CourseModal course={editCourse} onClose={() => setIsModal(false)} />}
    </div>
  );
}

export default CourseList;
