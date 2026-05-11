import React, { useEffect, useState } from "react";
// import {  User } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AXIOS_API from "../../Api/api";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate()

  const handleSignIn = async(e)=>{
    try {
      console.log("Working....");

      const responseUser = await AXIOS_API.post("/api/v1/user/login", {
        email,
        password
      })

      if(responseUser.status === 200){
        console.log("All Clear...", responseUser);

        setEmail("")
        setPassword("")

        navigate("/Dashboard", {replace:true})
        
      }
      
    } catch (error) {
      
    }

  }

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <div className="w-full max-w-md relative z-10 p-2">
        {/* {if need to add decorations } */}

        <div
          className={`backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden transition-all duration-700 
        ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        >
          <div className="text-center mb-8">
            <h2 className="text-primary text-3xl font-bold tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-800">
              Enter your credentials to access your account
            </p>
          </div>
          <form className="space-y-5">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-800"
                htmlFor="name"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <User className="h-5 w-5 text-slate-400" /> */}
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  id="name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl transition-all focus:outline-none focus:ring-2 
             bg-white/40 backdrop-blur-sm border border-white/60 
             text-gray-800 placeholder-gray-500 
             focus:border-white focus:ring-white/50"
                  placeholder="Enter Your Email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-800"
                htmlFor="name"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <User className="h-5 w-5 text-slate-400" /> */}
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  id="name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl transition-all focus:outline-none focus:ring-2 
             bg-white/40 backdrop-blur-sm border border-white/60 
             text-gray-800 placeholder-gray-500 
             focus:border-white focus:ring-white/50"
                  placeholder="Enter Your Password"
                />
              </div>
            </div>
            <button
                onClick={handleSignIn}
              type="button"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl 
            shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-indigo-500 transition-colors mt-4"
            >
              sign in
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-slate-700">
            Don't have an account? {""}
            <Link
              to={"/SignUp"}
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
