import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { DepartmentPage } from "../Component/Department";
import { HomePage } from "../Component/Home";
import User from "../Component/User";
import { useEffect } from "react";
import Applications from "../Component/Applications";
import { EmployeePage, EmpoyeePage } from "../Component/Employee";

export const AllRouter = () => {
  const userRole = localStorage.getItem("user");
  const json = JSON.parse(userRole);

  useEffect(() => {
    console.log(json?.role === "user", "user");
  });

  const routes = [
    {
      path: "/applications",
      element: <Applications />,
    },
    {
      path: "/user",
      element: json?.role === "user" ? <User /> : <Navigate to="/" />,
    },
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/department",
      element: <DepartmentPage />,
    },
    {
      path: "/employee",
      element: <EmployeePage />,
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
