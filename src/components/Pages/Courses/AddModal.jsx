import React, { useState } from "react";
import AXIOS_API from "../../../Api/api";

function AddModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [shortTitle, setShortTitle] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
    
    const file = e.target.files[0];
    console.log("Did I catch a file?", file);
    if (file) {
      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("shortTitle", shortTitle)
    formData.append("title", title);
    formData.append("price", price);
    formData.append("duration", duration);
    formData.append("Image", imageFile);

    try {
      const addResponse = await AXIOS_API.post(
        "/api/v1/course/create",
        formData,
      );

      if (addResponse.status === 200) {
        alert("Course Added");
        onClose();
      }
    } catch (error) {
      console.error("Failed to Add", error);
    }
  };
  console.log("image", imageFile);



  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div
        className="relative w-full max-w-md flex flex-col bg-white rounded-2xl shadow-xl border border-slate-100
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

          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Short Title
                </label>
                <input
                  type="text"
                  value={shortTitle}
                  onChange={(e) => setShortTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 
                  transition-colors"
                  id="fullName"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 
                  transition-colors"
                  id="fullName"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-semibold text-slate-700 mb-1"
                    htmlFor="email"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-colors"
                    id="email"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-slate-700 mb-1"
                    htmlFor="dateOfBirth"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 
                    transition-colors text-slate-600"
                    id="dateOfBirth"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-slate-700 mb-1"
                  htmlFor="profileImage"
                >
                  Profile Image
                </label>

                <div
                  className="mt-1 mb-3 flex items-center justify-center w-full h-36 rounded-xl border-2 border-dashed
                 border-slate-200 bg-slate-50 overflow-hidden relative"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-slate-400 text-xs flex flex-col items-center gap-1">
                      <svg
                        className="w-7 h-7 text-slate-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 
                        16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>No image selected</span>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 
                  file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
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
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-100 transition-colors"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
