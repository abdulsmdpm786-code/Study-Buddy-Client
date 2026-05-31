import React, { useState } from "react";
import AXIOS_API from "../../../Api/api";
import { Plus, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";

function QuizAddModal({ onClose }) {
  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { courseContent } = useParams();
  console.log("params.....from", courseContent);

  const [quizItems, setQuizItems] = useState([
    { question: "", options: [], answer: "", definition: "" },
  ]);

  const handleQuizAdd = () => {
    setQuizItems([
      ...quizItems,
      { question: "", options: [], answer: "", definition: "" },
    ]);
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedItems = quizItems.filter(
      (_, index) => index !== indexToRemove,
    );
    setQuizItems(updatedItems);
  };

  const handleChange = (index, event) => {
    const newQuizItems = [...quizItems];

    newQuizItems[index][event.target.name] = event.target.value;
    setQuizItems(newQuizItems);
  };

  const handleSubmit = async () => {
    const addData = {
      courseId: courseContent,
      title: quizTitle,
      description: description,
      questions: quizItems,
    };
    try {
      const addResponse = await AXIOS_API.post(
        `/api/v1/course/quiz/${courseContent}/create`,
        addData,
      );

      if (addResponse.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      setError(error.response?.data?.errMsg || "Registration failed");
    }
  };

  console.log("items.......", quizItems);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div
        className="relative w-full max-w-2xl flex flex-col bg-white rounded-2xl shadow-xl border border-slate-100
       overflow-hidden animate-fadeInUp"
      >
        <div className="p-6 flex flex-col max-h-[90vh]">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="text-xl font-bold text-slate-900">Quiz Form</h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto pr-2 max-h-[60vh]">
            {error && (
              <div className="p-3 mb-4 text-base text-center bg-rose-600 text-white  rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Quiz Title
              </label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-colors"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 h-24 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 
                transition-colors resize-none"
              />
            </div>

            {quizItems.map((item, index) => (
              <div
                key={index}
                className="relative p-5 border border-slate-200 rounded-xl bg-slate-50/50 mb-4
                transition-all duration-500 animate-fadeInUp 
                        hover:shadow  group`"
                style={{
                  animationDelay: "0.2s",
                }}
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Question {index + 1}
                  </label>
                  <input
                    type="text"
                    name="question"
                    value={item.question}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="flex gap-3 mt-3">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Options (Comma separated)
                    </label>
                    <input
                      type="text"
                      name="options"
                      value={item.options}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Correct Answer
                    </label>
                    <input
                      type="text"
                      name="answer"
                      value={item.answer}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Definition / Explanation
                  </label>
                  <input
                    type="text"
                    name="definition"
                    value={item.definition}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                {quizItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleQuizAdd}
              className="w-full py-3 mt-2 flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Another Question
            </button>
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-100 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-100 transition-colors"
            >
              Add Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizAddModal;
