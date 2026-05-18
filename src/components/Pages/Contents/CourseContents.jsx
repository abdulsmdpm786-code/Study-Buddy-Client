import React from "react";

import MainSection from "./MainSection";
import RightSection from "./RightSection";

function CourseContents() {
  


  return (
    <div>
      <div className="min-h-screen py-5 px-2  max-w-9xl mx-auto">


        <main className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 xl:gap-16">
         <MainSection />
          <RightSection />
        </main>
      </div>
    </div>
  );
}

export default CourseContents;
