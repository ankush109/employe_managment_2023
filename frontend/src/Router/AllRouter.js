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
  const router = createBrowserRouter([
    {
      path: "/applications",
      element: <Applications />,
    },
    {
      path: "/user",
      element: <User />,
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
  ]);
  return <RouterProvider router={router} />;
};
