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

function MainSection() {
  const { courseContent } = useParams();
  console.log("params", courseContent);

  const [data, setData] = useState([]);
  const [isContent, setIsContent] = useState([]);

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

  const notes = [
    {
      id: 1,
      date: "12 June, 2020",
      title: "The title of a note",
      text: "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
      color: "bg-note-blue",
    },
    {
      id: 2,
      date: "12 June, 2020",
      title: "The title of a note",
      text: "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
      color: "bg-note-green",
    },
    {
      id: 3,
      date: "12 June, 2020",
      title: "The title of a note",
      text: "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
      color: "bg-note-purple",
    },
    {
      id: 4,
      date: "12 June, 2020",
      title: "The title of a note",
      text: "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
      color: "bg-note-yellow",
    },
    {
      id: 5,
      date: "12 June, 2020",
      title: "The title of a note",
      text: "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
      color: "bg-note-red",
    },
    {
      id: 6,
      date: "12 June, 2020",
      title: "The title of a note",
      text: "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
      color: "bg-note-gray",
    },
  ];
  return (
    <div className="lg:col-span-2 space-y-10">
      {/* Hero Section */}
      <section
        className="space-y-6 transition-all duration-500 animate-fadeInUp "
        style={{
          animationDelay: "0.2s",
        }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
          {content?.title}
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          Learn how to write effective prompts for ChatGPT, Midjourney, Claude,
          and more. Ideal for marketers, designers, developers, and curious
          learners.
        </p>

        {/* Ratings */}
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
            className="px-6 py-2.5 rounded-lg border-2 bg-indigo-700 text-white font-medium
                 hover:bg-indigo-800  transition-all duration-200 shadow-sm  "
          >
            Add Note
          </button>
        </div>
      </section>

      {/* Notes Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
        {isContent.map((note, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 relative group cursor-pointer transition-all duration-500 animate-fadeInUp"
            style={{ animationDelay: `0.${i + 1}s` }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700/90 bg-white/60 px-2 py-1 rounded-md shadow-sm border border-white/60">
                <FileText className="w-3.5 h-3.5" />
                
              </div>
              <button className="text-slate-500 hover:text-slate-900 transition-colors p-1 rounded-full hover:bg-white/60">
                <Pin className="w-4 h-4" />
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
    </div>
  );
}

export default MainSection;
