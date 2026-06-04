import { useState } from "react";
import { Search, Volume2, BookOpen, Sparkles } from "lucide-react";
import AXIOS_API from "../../../Api/api";

export default function SmartDictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const [searchWord, setSearchWord] = useState("");


  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setSearchWord("");
    setIsSearching(true);

    try {
      const response = await AXIOS_API.post(
        `/api/v2/dictionary/get`,
        { word: searchTerm },
      );
      setIsSearching(false);
      if (response.status === 200) {
        console.log("got the response", response.data.data[0]);
        setSearchWord(response.data.data[0]);
      }
    } catch (error) {
      setIsSearching(false);
      setError(error.response?.data?.errMsg || "Search failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen font-sans bg-transparent">
      <form onSubmit={handleSearch} className="mb-10">
        <div
          className="relative flex items-center  transition-all duration-500 animate-fadeInUp 
                       `"
          style={{
            animationDelay: "0.2s",
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for any word..."
            className="w-full pl-6 pr-16 py-4 bg-slate-100/80 hover:bg-slate-100 border-2 border-transparent
             focus:border-indigo-500 focus:bg-white rounded-2xl outline-none text-lg font-medium transition-all shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-3 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors
             shadow-md shadow-indigo-600/20"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {!searchWord && !isSearching && !error && (
        <div
          className="flex flex-col items-center justify-center py-20 text-slate-400  transition-all duration-500
         animate-fadeInUp 
                        `"
          style={{
            animationDelay: "0.4s",
          }}
        >
          <BookOpen className="w-16 h-16 mb-4 opacity-50" />
          <h2 className="text-xl font-semibold text-slate-600">
            Start exploring
          </h2>
          <p>Search for a word to see its definitions and synonyms.</p>
        </div>
      )}

      {error && (
        <div
          className="p-3 mb-4 text-base text-center bg-rose-600 text-white  rounded-lg  transition-all duration-500 
          animate-fadeInUp 
                        hover:shadow  group`"
          style={{
            animationDelay: "0.2s",
          }}
        >
          {error}
        </div>
      )}

      {searchWord && (
        <div className="animate-fadeInUp">
          <div className="flex items-center justify-between mb-6 px-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight">
                  {searchWord.word}
                </h1>
                <Sparkles className="w-5 h-5 text-indigo-500 opacity-70 animate-pulse" />
              </div>
              <div className="flex  gap-3">
                {searchWord?.phonetics?.map((text, i) => (
                  <span
                    key={i}
                    className="text-lg text-indigo-600 font-semibold tracking-wide bg-indigo-50 px-2.5 py-0.5 rounded-md"
                  >
                    {text.text}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div
            className="space-y-8 max-h-[55vh]  overflow-y-auto p-6 sm:p-8 bg-gradient-to-br
           from-indigo-50/40 via-slate-50/60 to-white/90 border border-indigo-100/70 rounded-3xl 
           shadow-[inset_0_2px_8px_rgba(99,102,241,0.03),0_20px_40px_-15px_rgba(0,0,0,0.05)] custom-scrollbar"
          >
            {searchWord?.meanings?.map((meaning, index) => (
              <div
                key={index}
                className="bg-white/80 border border-white/60 shadow-sm rounded-2xl p-6 transition-all duration-300 
                hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 
                  rounded-full border border-indigo-100/60"
                  >
                    {meaning.partOfSpeech}
                  </span>
                  <div className="flex-1 h-px bg-slate-200/80"></div>
                </div>

                <div className="mb-6">
                  <h3 className="text-slate-400 text-xs font-bold mb-4 uppercase tracking-wider">
                    Meaning
                  </h3>
                  <ul className="space-y-5 list-none pl-1">
                    {meaning.definitions.map((def, i) => (
                      <li key={i} className="relative pl-6 group">
                        <span
                          className="absolute left-0 top-2 w-2 h-2 rounded-full bg-indigo-500 transition-transform
                         group-hover:scale-120"
                        />

                        <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
                          {def.definition}
                        </p>
                        {def.example && (
                          <div className="mt-1.5 pl-3 border-l-2 border-indigo-200">
                            <p className="text-slate-500 text-sm italic">
                              "{def.example}"
                            </p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {meaning.synonyms && meaning.synonyms.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-start gap-3">
                    <h4 className="text-slate-400 text-xs font-bold mt-1.5 uppercase tracking-wider whitespace-nowrap">
                      Synonyms
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {meaning.synonyms.map((syn, i) => (
                        <span
                          key={i}
                          className="px-3.5 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 font-semibold text-xs rounded-lg border border-slate-200/60 hover:border-indigo-100 transition-all duration-200 cursor-pointer"
                        >
                          {syn}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 px-2 flex justify-between items-center text-xs text-slate-400 font-medium">
            <p>Scroll inside the box to read more definitions</p>
            <a
              href="#"
              className="underline hover:text-slate-600 transition-colors"
            >
              Dictionary Data API
            </a>
          </div>
        </div>
      )}

      {isSearching && (
        <div className="animate-pulse space-y-6 mt-10">
          <div className="h-14 bg-slate-200 rounded-2xl w-1/3"></div>
          <div className="h-64 bg-slate-100/80 rounded-3xl border border-slate-200 w-full"></div>
        </div>
      )}
    </div>
  );
}
