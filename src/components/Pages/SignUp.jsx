import React, { useEffect, useState } from "react";
// import {  User } from "lucide-react";
import { Link, replace } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AXIOS_API from "../../Api/api";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setError("");
    try {
      await AXIOS_API.post("/api/v1/user/register", {
        userName,
        email,
        password,
      });

      setStep(2);
    } catch (error) {
      setError(error.response?.data?.errMsg || "Registration failed");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await AXIOS_API.post("/api/v1/user/registerOtp", {
        email: email,
        otp: otp,
      });
      alert("Success! You can now log in.");
      navigate("/SignIn", { replace: true });
    } catch (error) {
      setError(error.response?.data?.errMsg || "Verification failed");
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <div className="w-full max-w-md relative z-10 p-2">
        <div
          className={`backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden transition-all duration-700 
        ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        >
          <div className="text-center mb-8">
            <h2 className="text-primary text-3xl font-bold tracking-tight">
              Create Account
            </h2>
            <p className="text-sm text-slate-800">
              Access your personalized student dashboard
            </p>
          </div>
          {error && (
            <div className="p-3 mb-4 text-base text-center bg-rose-600 text-white  rounded-lg">
              {error}
            </div>
          )}
          {step === 1 && (
            <form className="space-y-5">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-slate-800"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    id="name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl transition-all focus:outline-none focus:ring-2 
             bg-white/40 backdrop-blur-sm border border-white/60 
             text-gray-800 placeholder-gray-500 
             focus:border-white focus:ring-white/50"
                    placeholder="Enter Your Name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-slate-800"
                  htmlFor="name"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
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
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
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
              {isLoading ? (
                <button
                  type="button"
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl 
            shadow-sm text-base font-medium text-white bg-indigo-400 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-indigo-500 transition-colors mt-4"
                >
                  Loading...
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  type="button"
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl 
            shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-indigo-500 transition-colors mt-4"
                >
                  Create Account
                </button>
              )}
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleVerify} className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-slate-800">
                Check Your Email
              </h2>
              <p className="text-sm text-slate-500">
                We sent a 6-digit code to {email}
              </p>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="p-3 border rounded-lg outline-none focus:border-indigo-500 text-center text-xl tracking-widest font-semibold"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                type="submit"
                className="p-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Verify Email
              </button>
            </form>
          )}
          <p className="mt-8 text-center text-sm text-slate-700">
            Already have an account?{""}
            <Link
              to={"/SignIn"}
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
