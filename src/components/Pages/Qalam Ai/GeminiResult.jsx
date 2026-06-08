import { Sparkles, Copy, CheckCheck } from "lucide-react";
import { useState } from "react";

export default function GeminiResultBox({ isLoading, resultText , error}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  console.log("error,,,",error);
  


  if (!isLoading && !resultText) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 animate-fadeInUp">

      <div className="p-[1px] rounded-2xl bg-gradient-to-b from-slate-700/50 to-slate-800/20 shadow-2xl">
        

        <div className="w-full bg-slate-950/80 backdrop-blur-xl rounded-[15px] overflow-hidden flex flex-col">

          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800/60 bg-slate-900/30">
            <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm">
              <Sparkles className="size-4 animate-pulse" />
              <span>Study Buddy Response</span>
            </div>
            
         
            {!isLoading && resultText && (
              <button 
                onClick={handleCopy}
                className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 text-xs bg-slate-800/50 px-2.5 py-1 rounded-md"
              >
                {copied ? <CheckCheck className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>


          <div className="p-6 text-left">
            {isLoading ? (
 
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-800 rounded-md w-3/4"></div>
                <div className="h-4 bg-slate-800 rounded-md w-full"></div>
                <div className="h-4 bg-slate-800 rounded-md w-5/6"></div>
                <div className="h-4 bg-slate-800 rounded-md w-1/2 mt-4"></div>
              </div>
            ) : (
  
              <div className="text-slate-200 text-base leading-relaxed whitespace-pre-wrap">
                {/* Note: For production, you should wrap {resultText} in a Markdown renderer 
                  like 'react-markdown' so Gemini's bold text and lists format perfectly.
                */}
                {resultText}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}