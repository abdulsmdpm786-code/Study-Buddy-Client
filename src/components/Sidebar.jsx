import React from 'react';
import { 
  FaPenNib, 
  FaTableColumns, 
  FaListCheck, 
  FaBookOpen, 
  FaClipboardQuestion, 
  FaSpellCheck, 
  FaFileSignature,
  FaXmark,
  FaArrowRightToBracket 
} from 'react-icons/fa6';
import AXIOS_API from '../Api/api';
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {

  const navigate = useNavigate()

  const handleLogOut = async()=>{
    try {
      const loggedOutRes = await AXIOS_API.post("/api/v1/user/logOut")
      if(loggedOutRes.status === 200){
        console.log("Log out successful", loggedOutRes);
        navigate("/", {replace: true})
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <aside className={`w-[280px] md:w-[260px] bg-white/85 md:bg-glass backdrop-blur-xl border-r border-glass-border py-8 flex flex-col shadow-[5px_0_25px_rgba(0,0,0,0.02)] z-30 fixed md:sticky top-0 h-screen transition-all duration-300 ${isOpen ? 'left-0' : '-left-[100%] md:left-0'}`}>
      <div className="flex items-center gap-2.5 mx-4 mb-8 p-3.5 bg-white/70 rounded-xl shadow-sm border border-white/80">
        <div className="text-primary text-xl flex"><FaPenNib /></div>
        <h1 className="text-lg font-extrabold text-primary tracking-tight whitespace-nowrap">Qalam Academy</h1>
        <button className="md:hidden bg-transparent text-slate-500 text-xl ml-auto" onClick={() => setIsOpen(false)}>
          <FaXmark />
        </button>
      </div>
      <nav className="flex flex-col gap-1.5 px-4">
        <a href="#" className="flex items-center px-5 py-3.5 gap-4 font-semibold rounded-xl transition-all duration-300
         bg-primary text-white shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:-translate-y-0.5">
          <FaTableColumns className="text-lg min-w-[24px]" />
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center px-5 py-3.5 gap-4 text-slate-500 font-semibold rounded-xl transition-all duration-300 hover:bg-white/60 hover:text-primary hover:translate-x-1">
          <FaListCheck className="text-lg min-w-[24px]" />
          <span>Tasks</span>
        </a>

       <Link to={"Course"} className="flex items-center px-5 py-3.5 gap-4 text-slate-500 font-semibold rounded-xl transition-all 
         duration-300 hover:bg-white/60 hover:text-primary hover:translate-x-1">
          <FaBookOpen className="text-lg min-w-[24px]" />
          <span>Courses</span>
       
       </Link>
       
        <a href="#" className="flex items-center px-5 py-3.5 gap-4 text-slate-500 font-semibold rounded-xl transition-all duration-300 hover:bg-white/60 hover:text-primary hover:translate-x-1">
          <FaClipboardQuestion className="text-lg min-w-[24px]" />
          <span>Quiz</span>
        </a>
        <a href="#" className="flex items-center px-5 py-3.5 gap-4 text-slate-500 font-semibold rounded-xl transition-all duration-300 hover:bg-white/60 hover:text-primary hover:translate-x-1">
          <FaSpellCheck className="text-lg min-w-[24px]" />
          <span>Dictionary</span>
        </a>
        <a href="#" className="flex items-center px-5 py-3.5 gap-4 text-slate-500 font-semibold rounded-xl transition-all duration-300 hover:bg-white/60 hover:text-primary hover:translate-x-1">
          <FaFileSignature className="text-lg min-w-[24px]" />
          <span>Text Editor</span>
        </a>
        <a 
        onClick={handleLogOut}
        href="#" className="flex items-center px-5 py-3.5 gap-4 bg-rose-700 text-white font-semibold rounded-xl transition-all
         duration-300 hover:bg-rose-800 hover:translate-x-1">
          <FaArrowRightToBracket className="text-lg min-w-[24px]" />
          <span>Log Out</span>
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
