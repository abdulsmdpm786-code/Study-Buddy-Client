import React, {  useState } from "react";
import QuizWin from "./QuizWin";
import QuizLose from "./QuizLose";

function QuizPrize({score}) {

  const isWin = score >= 50;
 
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      { isWin ? <QuizWin score={score} /> : <QuizLose  score={score} />}
      


    </div>
  );
}

export default QuizPrize;
