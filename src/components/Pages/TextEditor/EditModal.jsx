import React, { useState } from "react";

// Helper function to remove HTML tags and extract plain text
const stripHtml = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

function EditModal({ onClose, data, onSubmit }) {
  console.log(".....sss", data);

  // 1. Initialize state using the helper function to remove tags
  const [description, setDescription] = useState(() =>
    stripHtml(data?.content),
  );

  // 2. Added the missing handleSubmit function so your app doesn't crash
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(description);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fadeInUp">
        <div className="p-6 flex flex-col h-full">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="text-xl font-bold text-slate-900">Edit Blog</h3>
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

          {/* BODY */}
          <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 min-h-[250px] border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-y"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-100 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              // 3. Trigger the handleSubmit function
              onClick={handleSubmit}
              type="button" // Changed to button
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-100 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
