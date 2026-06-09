import { Sparkles, Copy, CheckCheck, Plus } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function GeminiResultBox({ isLoading, resultText }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isLoading && !resultText) return null;

  return (
    <div className="w-full mt-2 animate-fadeInUp">
      <div className="p-[1px] rounded-2xl bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950/40 shadow-2xl">
        <div
          className="w-full bg-slate-950/70 backdrop-blur-2xl rounded-[15px] overflow-hidden flex flex-col border
         border-slate-900/60"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-900 bg-slate-900/20">
            <div className="flex items-center gap-2.5 text-indigo-400 font-semibold tracking-wide text-sm">
              <Sparkles className="size-4 animate-pulse" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Qalam AI Engine
              </span>
            </div>
 
            {!isLoading && resultText && (
           
             

                <button
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-slate-200 transition-all duration-200 flex items-center gap-2
                   text-xs bg-slate-900/80 hover:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800/80 
                   active:scale-95"
                >
                  {copied ? (
                    <CheckCheck className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span>{copied ? "Copied!" : "Copy Output"}</span>
                </button>
              
            )}
          </div>

          <div className="p-6 md:p-8 text-left">
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-900 rounded-md w-3/4"></div>
                <div className="h-4 bg-slate-900 rounded-md w-full"></div>
                <div className="h-4 bg-slate-900 rounded-md w-5/6"></div>
                <div className="h-4 bg-slate-900 rounded-md w-1/2 pt-2"></div>
              </div>
            ) : (
              <div
                className="text-left text-slate-300 font-sans text-[15px] md:text-base leading-relaxed tracking-normal prose prose-invert max-w-none 
              prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {resultText}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
