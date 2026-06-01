import { ChevronRight, ExternalLink, Link2 } from "lucide-react";
import React, { useState } from "react";
import AXIOS_API from "../../../Api/api";
import { useAuth } from "../../../Auth/AuthContext";

function ResourcesContent({ reference }) {
  console.log("ref...from", reference);

  const { user, isLoading } = useAuth();
  const isAdmin = user?.role === "admin";

  const handleDelete = async (id) => {
    try {
      const deleteResponse = await AXIOS_API.delete(
        `/api/v1/course/content/${id}/delete`,
      );

      if (deleteResponse.status === 200) {
        alert("item deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div
        className="animate-fadeIn transition-all duration-500 animate-fadeInUp "
        style={{
          animationDelay: "0.2s",
        }}
      >
        <h2 className="text-xl font-bold text-slate-900 mb-3">Resources</h2>
        <p className="text-xs text-slate-500 mb-4">
          Handpicked external links, documentation, and references related to
          this lesson.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reference.map((resource, idx) => (
            <div
              key={idx}
              rel="noreferrer"
              className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/60
              shadow-[0_8px_30px_rgb(0,0,0,0.06)]
               hover:bg-indigo-50/20 rounded-xl p-4 flex flex-col 
                        justify-between hover:-translate-y-1  cursor-pointer transition-all duration-500 animate-fadeInUp
                         hover:shadow  group`"
              style={{
                animationDelay: "0.2s",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs bg-slate-100 group-hover:bg-indigo-100 text-slate-700 group-hover:text-indigo-700
                     font-bold px-2 
                            py-0.5 rounded-full transition-colors"
                  >
                    Doc Link
                  </span>
                  <div className="flex gap-2">
                    {isAdmin && <svg
                      onClick={() => handleDelete(resource._id)}
                      className="w-4 h-4 text-slate-400 hover:text-rose-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 
                        4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>}
                    <a href={resource.content} target="_blank">
                      {" "}
                      <ExternalLink
                        className="w-4 h-4 text-slate-400
                    hover:text-indigo-700 transition-colors"
                      />
                    </a>
                  </div>
                </div>
                <a href={resource.content} target="_blank">
                  <h3 className="font-bold text-sm text-slate-800 mb-1 group-hover:text-indigo-900 transition-colors">
                    {resource.mainTitle}
                  </h3>
                </a>
                <a href={resource.content} target="_blank">
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {resource.subTitle}
                  </p>
                </a>
              </div>
              <span
                className="text-xs text-indigo-600 font-bold mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 
              transition-opacity"
              >
                Open Link <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResourcesContent;
