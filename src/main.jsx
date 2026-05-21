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
