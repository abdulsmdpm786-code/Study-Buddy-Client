import React, { useState } from "react";
import AXIOS_API from "../../../Api/api";

function AddModal({ onClose, fetch }) {
  const [mainTitle, setMainTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const addData = {
      title: mainTitle,
      description: content,
      date: new Date().toDateString(),
    };

    try {
      const addResponse = await AXIOS_API.post("/api/v4/todoNote/add", addData);
      onClose()
    } catch (error) {
      setError(error.response?.data?.errMsg || "Adding failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div
        className="relative w-full max-w-md flex flex-col  bg-white rounded-2xl shadow-xl border border-slate-100
       overflow-hidden animate-fadeInUp"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-900">Course details</h3>
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
          {error && (
            <div className="p-3 mb-4 text-base text-center bg-rose-600 text-white  rounded-lg">
              {error}
            </div>
          )}
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={mainTitle}
                  onChange={(e) => setMainTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 
                  transition-colors"
                  id="fullName"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 h-60 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 
                  transition-colors resize-none"
                  id="description"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl 
                transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleSubmit()}
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm
                 shadow-indigo-100 transition-colors"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
