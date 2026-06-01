import { useState } from "react";
import TiptapEditor from "./TiptapEditor";
import { useEffect } from "react";
import AXIOS_API from "../../../Api/api";
import DOMPurify from "dompurify";
import EditModal from "./editModal";
import ReadArticleModal from "./ReadArticleModal";

export default function CreateCourseForm() {
  const [description, setDescription] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [editData, setEditData] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [readData, setReadData] = useState("");
  const [error, setError] = useState("");

  console.log(".......", blogs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    console.log("Sending to database:", description);

    try {
      const addText = await AXIOS_API.post("/api/v1/textEditor/create", {
        content: description,
      });
      if (addText.status === 200) {
        setBlogs(addText?.data?.text);
        window.location.reload();
      }
    } catch (error) {
      setError(error.response?.data?.errMsg || "Verification failed");
    }
  };

  const fetchBlogs = async () => {
    try {
      const responseBlogs = await AXIOS_API.get("/api/v1/textEditor/get");
      if (responseBlogs.status === 200) {
        console.log("text clear....", responseBlogs);
        const data = responseBlogs.data.text;
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteNote = await AXIOS_API.delete(
        `/api/v1/textEditor/${id}/delete`,
      );
      if (deleteNote.status === 200) {
        console.log("note deleted.....");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (blog) => {
    setEditData(blog);
    setIsModal(true);
  };

  const handleRead = (data) => {
    setIsRead(true);
    setReadData(data);
  };

  console.log("edit data..", editData);

  useEffect(() => {
    fetchBlogs();
  }, []);
  console.log("blog...", blogs);

  if (blogs === "") {
    console.log("blog is empty");
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-8 max-w-3xl mx-auto transition-all duration-300 animate-fadeInUp group h-full "
        style={{
          animationDelay: `0.2s`,
        }}
      >
        <h1 className="text-2xl font-bold mb-4">Create Blogs</h1>
        {error && (
          <div className="p-3 mb-4 text-base text-center bg-rose-600 text-white  rounded-lg transition-all duration-300 animate-fadeInUp group h-full "
        style={{
          animationDelay: `0.1s`,
        }}>
            {error}
          </div>
        )}

        <TiptapEditor value={description} onChange={setDescription} />

        <button
          onClick={() => handleSubmit()}
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Add Blog
        </button>
      </form>
      <div>
        <h1
          className="text-5xl font-bold text-indigo-600  transition-all duration-500 animate-fadeInUp flex flex-col"
          style={{ animationDelay: `0.2s` }}
        >
          Blogs
        </h1>
        <div>
          <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
            {blogs.length > 0 ? (
              blogs.map((blog, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/60
                   shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                   hover:-translate-y-1 relative group cursor-pointer transition-all duration-500 animate-fadeInUp flex flex-col"
                  style={{ animationDelay: `0.${i + 1}s` }}
                >
                  <div className="flex gap-2 items-start mb-3">
                    <div
                      onClick={() => handleEdit(blog)}
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-700/90 bg-white/60 px-2 
                    py-1 rounded-md shadow-sm border border-white/60 hover:text-indigo-800"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-slate-500 hover:text-red-800 transition-colors p-1 rounded-full
                bg-white/60"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                    className=" text-xs text-slate-800 prose prose-sm line-clamp-6 font-serif flex-1"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(blog.content),
                    }}
                  />
                  <button
                    onClick={() => handleRead(blog)}
                    className="w-full bg-indigo-600 rounded-lg py-2 mt-1 text-white text-lg hover:bg-indigo-800"
                  >
                    Read More
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xl text-slate-400 leading-relaxed mt-5">
                No blogs created
              </p>
            )}
          </section>
        </div>
      </div>
      {isModal && (
        <EditModal onClose={() => setIsModal(false)} data={editData} />
      )}
      {isRead && (
        <ReadArticleModal onClose={() => setIsRead(false)} article={readData} />
      )}
    </div>
  );
}
