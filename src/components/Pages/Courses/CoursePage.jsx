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
import { useState, useEffect } from "react";
import AXIOS_API from "../../../Api/api";

function CoursePage() {
  const [course, setCourse] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const fetchCourse = async () => {
    try {
      const response = await AXIOS_API.get("/api/v1/course/getList", {
        params: {
          search: searchItem,
          category: filter,
        },
      });
      setCourse(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchItem);
    }, 700);

    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    fetchCourse();
  }, [search, filter]);

  console.log("course..", course);

  return (
    <div>
      <CourseSearch onSearchInput={setSearchItem} />

      <Navbar onCategoryInput={setFilter} />

      <CourseList mapCourse={course} />
    </div>
  );
}

export default CoursePage;
