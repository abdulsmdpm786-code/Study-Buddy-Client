import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Dashboard from "./components/Dashboard.jsx";
import HomePage from "./components/Pages/HomePage.jsx";
import SignUp from "./components/Pages/SignUp.jsx";
import SignIn from "./components/Pages/SignIn.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./Auth/AuthContext.jsx";
import CoursePage from "./components/Pages/Courses/CoursePage.jsx";
import CourseContents from "./components/Pages/Contents/CourseContents.jsx";
import QuizHome from "./components/Pages/Quiz/QuizHome.jsx";
import QuizSection from "./components/Pages/Quiz/QuizSection.jsx";
import CreateCourseForm from "./components/Pages/TextEditor/CreateCourseForm.jsx";
import TaskMain from "./components/Pages/Task/TaskMain.jsx";
import DictionaryMain from "./components/Pages/Dictionary/DictionaryMain.jsx";
import AiDashboard from "./components/Pages/Qalam Ai/AiDashboard.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Dashboard",
        element: <App />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "Course",
            element: <CoursePage />,
          },
          {
            path: "course/:courseContent",
            element: <CourseContents />,
          },
          {
            path: "course/quiz",
            element: <QuizHome />,
          },
          {
            path: "course/quiz/:courseId",
            element: <QuizSection />,
          },
          {
            path: "course/editor",
            element: <CreateCourseForm />,
          },
          {
            path: "task",
            element: <TaskMain />,
          },
          {
            path: "dictionary",
            element: <DictionaryMain />,
          },
          {
            path: "ai",
            element: <AiDashboard />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
