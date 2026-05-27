import React from "react";
import DOMPurify from "dompurify"; // Remember to install this if you haven't!

export default function ReadArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    // Backdrop with a strong blur for an immersive feel
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 sm:p-6">
      
      {/* Article Container: Max width for perfect reading length, white background, shadow */}
      <div className="relative w-full max-w-4xl max-h-[95vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp">
        
        {/* --- STICKY HEADER --- */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
              Article
            </span>
            <span className="text-sm font-medium text-slate-500">
              5 min read {/* You can make this dynamic later! */}
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="overflow-y-auto px-6 py-10 sm:px-12 md:px-20 lg:px-24 scroll-smooth">
          

          {/* --- THE RICH TEXT CONTENT --- 
            This is where the magic of the 'prose' plugin happens!
            prose-lg: Makes the font slightly larger for reading
            prose-indigo: Makes links and accents match your theme
            mx-auto: Centers the text block perfectly
          */}
          <article 
            className="prose prose-slate md:prose-lg prose-indigo mx-auto max-w-none pb-12"
            dangerouslySetInnerHTML={{ 
              __html: DOMPurify.sanitize(article.content || "") 
            }}
          />
          
        </div>
        
        {/* --- BOTTOM GRADIENT FADE --- */}
        {/* Adds a nice visual touch at the bottom of the scroll area */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
}