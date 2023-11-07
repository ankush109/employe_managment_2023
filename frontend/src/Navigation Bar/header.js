import { Link } from "react-router-dom";
import "../App.css";

export const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Employee Management System
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/department">
              Departments
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/applications">
              Leave Applications
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/employee">
              Employees
            </Link>
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
