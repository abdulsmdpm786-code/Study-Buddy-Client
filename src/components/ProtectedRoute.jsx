import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from '../Auth/AuthContext'
import { Loader2 } from 'lucide-react';


export default function ProtectedRoute() {

    const {user, isLoading} = useAuth()
    console.log("this is user",user);
    

    if(isLoading){
        return <div className="flex-1 flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <Loader2 className="w-12 h-12 text-indigo-400 animate-spin relative z-10" />
          </div>
          <p className="mt-4 text-indigo-300 font-medium animate-pulse">Loading...</p>
        </div>
    }

    
    if(!user){
        return<Navigate to={"/SignUp"}/>
    }
   
  return <Outlet />
}

