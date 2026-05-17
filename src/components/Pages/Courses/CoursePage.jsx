import React from "react";
import { Search } from "lucide-react";
import {
  FaGraduationCap,
  FaArrowRight,
  FaBars,
  FaXmark,
} from "react-icons/fa6";

import CourseSearch from "./CourseSearch";
import Navbar from "./CourseNavbar";
import CourseList from "./CourseList";

function CoursePage() {

  return (
    <div >
      <CourseSearch />

      <Navbar />

      <CourseList />

     
    </div>
  );
}

export default CoursePage;
