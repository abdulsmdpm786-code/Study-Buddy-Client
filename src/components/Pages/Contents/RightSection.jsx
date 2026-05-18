import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import AXIOS_API from "../../../Api/api";

function RightSection() {
  const {courseContent} = useParams()
console.log("params...", courseContent);

   const [data, setData] = useState([]);


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




 const content =  data.find(e => e._id === courseContent)

    useEffect(() => {
      getCourse();
      
    }, []);

    

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 sticky top-8 border border-slate-100 flex flex-col
       gap-6 transition-all duration-500 animate-fadeInUp "
        style={{
          animationDelay: "0.3s",
        }}>
        {/* Image Placeholder - using a subtle gradient placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-purple-50 rounded-2xl overflow-hidden relative group">
          <img
            src={
              content?.Image ||
              "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop"
            }
            alt="Workspace"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Pricing Section */}
        <div className="space-y-1">
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-slate-900">{content?.price}</span>
            <span className="text-lg text-slate-400 line-through mb-1">
              $69
            </span>
          </div>
          <p className="text-sm text-slate-500">One-time payment</p>
        </div>


        <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-100 self-start">
          Promo will ends in 12:02
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 active:scale-95">
            Add to Cart
          </button>
          <button className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 active:scale-95">
            Enroll Now
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h4 className="font-semibold text-slate-900">Use Coupon</h4>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Input coupon"
              className="flex-1 w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95 text-sm whitespace-nowrap">
              Redeem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSection;
