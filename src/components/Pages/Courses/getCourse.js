import { useState } from "react";


export function useCourse(){

    const [isLoading, setIsLoading] = useState(true)
    const [courses, setIsCourses] = useState([])

    const refreshCourse = async ()=>{
        setIsLoading(true)
        try {
            
        } catch (error) {
            
        }
    }
}