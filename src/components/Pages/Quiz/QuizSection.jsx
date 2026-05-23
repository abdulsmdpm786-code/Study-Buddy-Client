import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AXIOS_API from "../../../Api/api";

export default function QuizSection() {
  const [quizContent, setQuizContent] = useState([]);
  const [quizQuestion, setQuizQuestion] = useState([]);
  const { courseId } = useParams();

  const handleFetch = async () => {
    try {
      const quizQuestions = await AXIOS_API.get(
        `api/v1/course/quiz/${courseId}/find`,
      );

      if (quizQuestions.status === 200) {
        console.log("quiz questions.....", quizQuestions);
        setQuizContent(quizQuestions.data.Quiz[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const questionsText = quizContent
  console.log("content..", quizContent);
  
console.log(".....",questionsText?.questions);


  useEffect(() => {
    handleFetch();
  }, []);

  const questions = [
    {
      question: "Which software is mainly used for UI/UX Design?",
      options: ["Photoshop", "Figma", "Premiere Pro", "After Effects"],
    },
    {
      question: "HTML stands for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Home Tool Markup Language",
        "Hyper Tool Machine Language",
      ],
    },
    {
      question: "Which CSS framework are we using?",
      options: ["Bootstrap", "Material UI", "Tailwind", "Bulma"],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState("");

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden ">
      {/* Main Container - Adjusted max-width for a compact fit */}
      <div className="w-full max-w-3xl relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
          bg-clip-text text-transparent"
          >
            Quiz Challenge
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Test your knowledge with interactive questions
          </p>
        </div>

        {/* Quiz Card */}
        <div
          className="w-full backdrop-blur-2xl bg-white/35 border border-white/40 rounded-[24px] px-3 sm:px-4 py-2 
        shadow-[0_8px_32px_rgba(31,38,135,0.15)]"
        >
          {/* Top Status Area */}
          <div className="flex flex-row gap-4 justify-between items-center mb-6">
            <div className="backdrop-blur-xl bg-white/30 border border-white/40 px-4 py-2 rounded-2xl">
              <p className="text-xs sm:text-sm text-slate-500">Question</p>
              <h3 className="font-bold text-base sm:text-lg text-slate-800">
                {currentQuestion + 1} / {questions.length}
              </h3>
            </div>

            <div className="backdrop-blur-xl bg-white/30 border border-white/40 px-4 py-2 sm:px-5 sm:py-3 rounded-2xl">
              <span className="font-semibold text-sm sm:text-base text-purple-700">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 sm:h-3 bg-white/30 rounded-full overflow-hidden mb-8">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            />
          </div>

          {/* Side-by-Side Question and Answers Area */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Question Side (Left) */}
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl md:leading-snug font-semibold text-slate-800">
                {questions[currentQuestion].question}
              </h2>
            </div>

            {/* Options Side (Right) */}
            <div className="flex-1 flex flex-col gap-3 sm:gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelected(option)}
                  className={`p-3 sm:p-4 rounded-2xl backdrop-blur-xl border text-left transition-all ${
                    selected === option
                      ? "bg-white/60 border-blue-400 shadow-md"
                      : "bg-white/25 border-white/40 hover:bg-white/40"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-slate-700 font-medium">
                    <div
                      className={`min-w-[2.5rem] h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        selected === option
                          ? "bg-blue-500 text-white shadow-sm"
                          : "bg-white/50 text-slate-600"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-4 justify-between mt-8 md:mt-10 pt-4 border-t border-white/30">
            <button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              className="px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-2xl bg-white/30 border border-white/40 disabled:opacity-40 hover:bg-white/50 transition-colors text-slate-700 font-medium"
            >
              Previous
            </button>

            <button
              onClick={() => {
                if (currentQuestion < questions.length - 1) {
                  setCurrentQuestion((prev) => prev + 1);
                  setSelected("");
                }
              }}
              className="px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-colors shadow-lg shadow-blue-500/20"
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
