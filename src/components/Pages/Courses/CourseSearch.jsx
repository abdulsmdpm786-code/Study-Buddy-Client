import React from 'react'
import { Search } from "lucide-react";
import { useState } from 'react';

function CourseSearch({onSearchInput}) {

  // const [value, setValue] = useState("")
  return (
    <div>
        <div
  className="flex items-center flex-col justify-between text-sm text-gray-800 max-md:px-4 text-center py-20
   transition-all duration-500 animate-fadeInUp group"
  style={{
    animationDelay: "0.2s",
  }}
>
  <div className="flex flex-col items-center justify-center w-full">
    <h1 className="text-4xl md:text-[40px] text-indigo-800 font-bold">
      What do you want to learn?
    </h1>
    <p className="text-base mt-2">Build your legacy with Knowledge</p>
    <div className="max-w-xl w-full bg-gray-900 rounded-xl overflow-hidden mt-4">
      <textarea
      // value={value}
      onChange={(e)=> onSearchInput(e.target.value)}
        className="w-full p-3 pb-0 resize-none outline-none bg-transparent text-white"
        placeholder="Tell us about your interest..."
        
      ></textarea>
      <div className="flex justify-end pb-2 px-3">
        <button
        // onClick={()=> onSearchInput()}
          className="flex items-center justify-center p-1 rounded size-6 bg-indigo-600 text-white"
          aria-label="Send"
        >
          <Search />
        </button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default CourseSearch