import { ChevronRight, ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";
import AXIOS_API from "../../../Api/api";
import { useNavigate } from "react-router-dom";

function QuizDiv() {
  const [quizData, setQuizData] = useState([]);
  const navigate = useNavigate();

  const fetchQuiz = async () => {
    try {
      const quizResponse = await AXIOS_API.get("api/v1/course/quiz/getAll");
      if (quizResponse.status === 200) {
        console.log("got quiz");

        setQuizData(quizResponse.data.Quiz);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  console.log("quiz data..", quizData);

  const handleQuiz = (id) => {
    navigate(`/Dashboard/course/quiz/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-stretch">
      {quizData &&
        quizData.map((data, i) => (
          <div key={data._id}>
            <a
              rel="noreferrer"
              className="bg-indigo-800 rounded-xl p-4 flex flex-col h-full justify-between hover:-translate-y-1 cursor-pointer 
              transition-all duration-500 animate-fadeInUp hover:shadow-lg group"
              style={{
                animationDelay: `0.${i + 2}s`,
              }}
            >
              <div className="p-2">
                
                <div className="flex  items-center justify-between mb-2 flex-1">
                  <span
                    className="text-xs bg-slate-100 group-hover:bg-indigo-100 text-slate-700 group-hover:text-indigo-700
                   font-bold px-2 py-0.5 rounded-full transition-colors"
                  >
                    Quiz Link
                  </span>

                  <div className="flex gap-2">
                    <svg
                      className="w-4 h-4 text-slate-400 hover:text-rose-400 transition-colors"
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
                    </svg>

                    <svg
                      className="w-4 h-4 text-slate-400 hover:text-indigo-300 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
                
                  <h3 className="font-bold text-sm text-white mb-1  transition-colors">
                    {data.title}
                  </h3>
                  <p className="text-xs text-indigo-100/80 leading-relaxed font-normal mt-2">
                    {data.description}
                  </p>
              
              </div>

              <div
                onClick={() => handleQuiz(data.courseId)}
                className="bg-gray-200 w-full p-2 rounded-lg text-indigo-700 font-bold  text-center
                 group-hover:bg-white transition-colors mt-auto"
              >
                Start Quiz
              </div>
            </a>
          </div>
        ))}
    </div>
  );
}

export default QuizDiv;
