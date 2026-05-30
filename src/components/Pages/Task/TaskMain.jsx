import React from 'react'

function TaskMain() {
    const cardBase =
    "bg-glass backdrop-blur-2xl border border-glass-border rounded-3xl p-6 px-20 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] flex flex-col relative overflow-hidden transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:bg-glass-hover hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] animate-fadeInUp group";
  return (
    <div className='flex justify-center items-center'>
        <div
                className={cardBase}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 243, 138, 0.5), rgba(255, 255, 255, 0.3))",
                  animationDelay: "0.3s",
                }}
              >
                <h4 className="font-bold text-slate-500 text-xl">Working on progress..</h4>
                
              </div>

    </div>
  )
}

export default TaskMain