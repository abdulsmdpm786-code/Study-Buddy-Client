import React, { useEffect, useState } from "react";

function QuizTimer({ content }) {
  const quizLength = content.length;

  // const milleSec = quizLength * 1 * 60000;
  // console.log("mille", milleSec);
  const [timer, setTimer] = useState(600);
  const [manage, setManage] = useState(true);

  useEffect(() => {
    let counter;
    if (manage && timer > 0) {
      counter = setInterval(() => {
        setTimer((value) => value - 1);
      }, 1000);
    }
    return () => clearInterval(counter);
  }, [manage, timer]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(Math.floor(timer % 60)).padStart(2, 0);

  return (
    <div>
      <div className=" rounded-lg flex justify-center items-center">
        <h1 className="text-2xl font-bold text-rose-700">
          {minutes}:{seconds}
        </h1>
      </div>
    </div>
  );
}

export default QuizTimer;
