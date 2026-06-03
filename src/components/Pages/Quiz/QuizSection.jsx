import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AXIOS_API from "../../../Api/api";
import QuizTimer from "./QuizTimer";
import QuizPrize from "./QuizPrize";

export default function QuizSection() {
  const [quizContent, setQuizContent] = useState([]);
  const { courseId } = useParams();
  const [isWarning, setIsWarning] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [prizeModal, setPrizeModal] = useState(false)


  const handleFetch = async () => {
    try {
      const quizQuestions = await AXIOS_API.get(
        `/api/v1/course/quiz/${courseId}/find`,
      );

      if (quizQuestions.status === 200) {
        console.log("quiz questions.....", quizQuestions);
        setQuizContent(quizQuestions.data.Quiz[0].questions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("quiz content..", quizContent);

  useEffect(() => {
    handleFetch();
  }, []);

  let [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState("");
  let [score, setScore] = useState(0);
  const answer = quizContent[currentQuestion]?.answer;
  const [length, setLength] = useState(quizContent?.length)

  const handleForward = () => {
    setIsAnswer(false);
    setIsWrong(false);

    if (!selected) {
      setIsAnswer(true);
      return;
    }

    if (selected === answer) {
      setIsAnswer(!isAnswer);
      setScore(score + 8);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsWarning(!isWarning);
      setIsWrong(!isWrong);
    }

    if (currentQuestion === quizContent.length - 1) {
      setCurrentQuestion(0);
      setPrizeModal(true)
    }
  };


  const handleDone = () => {
    setCurrentQuestion(currentQuestion + 1);
    setIsWrong(!isWrong);
    setIsWarning(!isWarning);
  };

  console.log("selected option...", selected);
  console.log("current answer...", answer);
  console.log("score...", score);

  const progress = ((currentQuestion + 1) / quizContent.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden ">
      <div className="w-full max-w-3xl relative z-10 flex flex-col items-center">
    
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

  
        <div
          className="w-full backdrop-blur-2xl bg-white/35 border border-white/40 rounded-[24px] px-3 sm:px-4 py-4 
        shadow-[0_8px_32px_rgba(31,38,135,0.15)] transition-all duration-300 animate-fadeInUp group h-full mt-5"
          style={{
            animationDelay: "0.2s",
          }}
        >
       
          <div className="flex flex-row gap-4 justify-between items-center mb-6">
            <div className="flex gap-4">
              <div className="backdrop-blur-xl bg-white/30 border border-white/40 px-4 py-2 rounded-2xl">
                <p className="text-xs sm:text-sm text-slate-500">Question</p>
                <h3 className="font-bold text-base sm:text-lg text-slate-800">
                  {currentQuestion + 1} / {quizContent.length}
                </h3>
              </div>
              <div className="backdrop-blur-xl bg-green-300 border border-white/40 px-6 py-2  rounded-2xl">
                <p className="text-xs sm:text-sm ">Score</p>
                <h3 className="font-bold text-base sm:text-lg text-slate-800">
                  {score} / 80
                </h3>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/30 border border-white/40 px-4 py-2 sm:px-5 sm:py-3 rounded-2xl">
              <QuizTimer content={quizContent} />
            </div>
          </div>

        
          <div className="w-full h-2 sm:h-3 bg-white/30 rounded-full overflow-hidden mb-8">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            />
          </div>

       
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl md:leading-snug font-semibold text-slate-800">
                {quizContent[currentQuestion]?.question}
              </h2>
              {isAnswer && (
                <div
                  className="p-6 text-sm text-amber-500 rounded-xl bg-amber-50 font-normal mt-2 transition-all duration-300
                   animate-fadeInUp group  "
                  style={{
                    animationDelay: "0.2s",
                  }}
                  role="alert"
                >
                  <span className="font-semibold mr-2">Attention</span>
                  Please Select One Answer
                </div>
              )}
              {isWarning && (
                <div
                  className="p-6 text-sm text-amber-500 rounded-xl bg-amber-50 font-normal mt-2 transition-all duration-300 
                  animate-fadeInUp group  "
                  style={{
                    animationDelay: "0.2s",
                  }}
                  role="alert"
                >
                  <span className="font-semibold mr-2">wrong</span>
                  Answer is: {answer}
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-3 sm:gap-4">
              {quizContent[currentQuestion]?.options.map((option, index) => (
                <div
                  key={index}
                  className="w-full transition-all duration-300 animate-fadeInUp group h-full "
                  style={{
                    animationDelay: `0.${index + 1}s`,
                  }}
                >
                  <button
                    onClick={() => setSelected(option)}
                    className={`w-full p-3 sm:p-4 rounded-2xl backdrop-blur-xl border text-left transition-all ${
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
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-4 justify-between mt-8 md:mt-10 pt-4 border-t border-white/30">
            <button
              // disabled={currentQuestion === 0}
              // onClick={() => }
              className="px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-2xl bg-white/30 border border-white/40 disabled:opacity-40 hover:bg-white/50 transition-colors text-slate-700 font-medium"
            >
              Previous
            </button>

            {isWrong ? (
              <button
                onClick={() => handleDone()}
                className="text-white bg-brand box-border border text-sm sm:text-base border-transparent bg-indigo-600 rounded-lg focus:ring-4 
                focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base px-6 py-2.5 focus:outline-none"
              >
                {" "}
                Done
              </button>
            ) : (
              <button
                onClick={() => handleForward()}
                className="px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base rounded-2xl bg-gradient-to-r from-blue-500
                 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-colors shadow-lg
                  shadow-blue-500/20"
              >
                {currentQuestion === quizContent.length - 1
                  ? "Finish"
                  : "Next →"}
              </button>
            )}
          </div>
        </div>
      </div>
      {prizeModal && <QuizPrize  score={score}/>}
    </div>
  );
}

// if (currentQuestion < quizContent.length - 1) {
//                   setCurrentQuestion((prev) => prev + 1);
//                   setSelected("");
//                 }
