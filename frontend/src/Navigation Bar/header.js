import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useEffect } from "react";

export const NavBar = () => {
  const navigate = useNavigate();
  const User = localStorage.getItem("user");
  const json = JSON.parse(User);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    console.log(json.role, "s");
  }, []);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container">
        {" "}
        <Link className="navbar-brand" to="/department">
          Employee Management System
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {json.role !== "user" ? (
              <Link className="nav-link" to="/department">
                Departments
              </Link>
            ) : (
              ""
            )}
          </li>
          <li className="nav-item">
            {json.role !== "user" ? (
              <Link className="nav-link" to="/applications">
                Leave Applications
              </Link>
            ) : (
              ""
            )}
          </li>
          <li className="nav-item">
            {json.role !== "user" ? (
              <Link className="nav-link" to="/employee">
                Employees
              </Link>
            ) : (
              ""
            )}
          </li>
          <li className="nav-item">
            {json.role === "user" ? (
              <h1
                style={{
                  fontSize: "17px",
                  color: "white",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Welcome , {json.name}
              </h1>
            ) : (
              ""
            )}
          </li>
          <li className="nav-item">
            <button
              className="btn btn-light btn-outline-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
