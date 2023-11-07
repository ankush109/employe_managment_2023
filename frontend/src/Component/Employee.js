import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { API_URL } from "../API_URL/api_url";
import { NavBar } from "../Navigation Bar/header";

export const EmployeePage = () => {
  useEffect(() => {
    getPosts();
    getPostDep();
  }, []);

  const [employee, setEmployee] = useState([]);
  const [department, setDepartment] = useState([]);

  const getPosts = () => {
    axios
      .get(API_URL.EMPLOYEE, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setEmployee(res.data);
      });
  };

  const getPostDep = () => {
    axios
      .get(API_URL.DEPARTMENT, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setDepartment(res.data);
      });
  };

  const [formState, setFormState] = useState({
    modalTitle: "",
    EmployeeId: 0,
    EmployeeName: "",
    Department: "",
    Date_of_Joining: "",
    email: "",
    password: "",
    PhotoFileName: "",
    photoPath: "",
  });

  const addClick = () => {
    setFormState({
      modalTitle: "Add Employee",
      EmployeeId: 0,
      EmployeeName: "",
      Department: "",
      Date_of_Joining: "",
      PhotoFileName: "",
      email: "",
      password: "",
      photoPath: "",
    });
  };

  const editClick = (emp) => {
    setFormState({
      modalTitle: "Update Employee",
      EmployeeId: emp.EmployeeId,
      EmployeeName: emp.EmployeeName,
      Department: emp.Department,
      Date_of_Joining: emp.Date_of_Joining,
      PhotoFileName: emp.PhotoFileName,
      email: "",
      password: "",
      photoPath: "",
    });
  };

  const handleCreate = () => {
    const formData = new FormData();
    formData.append("EmployeeName", formState.EmployeeName);
    formData.append("Department", formState.Department);
    formData.append("Date_of_Joining", formState.Date_of_Joining);
    formData.append(
      "PhotoFileName",
      "data:image/jpeg;base64,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"
    );
    formData.append("email", formState.email);
    formData.append("password", formState.password);

    axios
      .post(API_URL.EMPLOYEE, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert("The Employee is successfully added!");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          alert(`Error while Creating Employee: ${err.response.data.message}`);
        } else if (err.request) {
          alert("Error sending request. Please try again later.");
        } else {
          alert("Unknown error. Please try again later.");
        }
      });
  };

  const imageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axios
      .post(API_URL.PROFILEPHOTO, formData)
      .then((res) => {
        setFormState({
          ...formState,
          PhotoFileName: res.data.fileName,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error while uploading image");
      });
  };

  const handleUpdate = (id) => {
    employee.forEach((emp) => {
      if (emp.EmployeeId === id) {
        axios
          .put(
            `${API_URL.EMPLOYEE}${emp._id}`,
            {
              EmployeeName: formState.EmployeeName,
              Department: formState.Department,
              Date_of_Joining: formState.Date_of_Joining,
              PhotoFileName: formState.PhotoFileName,
            },
            {
              headers: {
                "x-auth-token": localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            alert("You have successfully updated Employee!");
            window.location.reload();
          })
          .catch((err) =>
            alert(
              `Error while updating the Employee: ${err.response.data.message}`
            )
          );
      }
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete Employee?")) {
      axios
        .delete(`${API_URL.EMPLOYEE}${id}`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          alert("You have successfully deleted Employee!");
          window.location.reload();
        })
        .catch((err) =>
          alert(`Error while deleting Employee: ${err.response.data.message}`)
        );
    }
  };

  return (
    <div className="table-responsive navbarCustom">
      <NavBar />
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => addClick()}
      >
        Add Employee
      </button>
      <table className="table table-hover table-sm text-center">
        <thead className="bg-info">
          <tr>
            <th>EmployeeId</th>
            <th>EmployeeName</th>
            <th>profile photo</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((emp) => (
            <tr key={emp._id}>
              <td data-title="ID">{emp.EmployeeId}</td>
              <td data-title="Employee Name">{emp.EmployeeName}</td>
              <td data-title="Profile photo">
                <img
                  className="rounded-circle profileImage"
                  src={formState.photoPath + emp.PhotoFileName}
                  alt=""
                />
              </td>
              <td data-title="Department">{emp.Department}</td>
              <td data-title="DOJ">{emp.Date_of_Joining}</td>
              <td data-title="Action">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(emp)}
                  className="btn btn-sm shadow-lg rounded-pill text-decoration-none"
                >
                  <span>
                    <i
                      className="fa-sharp fa-solid fa-pen-to-square"
                      style={{ fontSize: "10px" }}
                    ></i>
                  </span>
                </button>
                <button
                  className="btn btn-sm shadow-lg  rounded-pill ms-2"
                  onClick={() => handleDelete(emp._id)}
                >
                  <span>
                    <i
                      className="fa-sharp fa-solid fa-trash"
                      style={{ fontSize: "12px" }}
                    ></i>
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h4 className="modal-title">{formState.modalTitle}</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* photo  */}
              <form>
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">EmployeeName:</span>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            EmployeeName: e.target.value,
                          })
                        }
                        value={formState.EmployeeName}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Email:</span>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            email: e.target.value,
                          })
                        }
                        value={formState.email}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Password:</span>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            password: e.target.value,
                          })
                        }
                        value={formState.password}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Department:</span>
                      <input
                        className="form-control"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            Department: e.target.value,
                          })
                        }
                        value={formState.Department}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Date of Joining:</span>
                      <input
                        type="date"
                        className="form-control"
                        value={formState.Date_of_Joining}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            Date_of_Joining: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="p-2 w-50 bd-highlight">
                    <img
                      width="250px"
                      height="250px"
                      alt="d"
                      src={`${formState.photoPath}${formState.PhotoFileName}`}
                    />
                    <input className="m-2" type="file" onChange={imageUpload} />
                  </div>
                </div>
                {/* button to update department  */}
                {formState.EmployeeId !== 0 ? (
                  <button
                    type="button"
                    className=" btn btn-primary float-start"
                    onClick={() => handleUpdate(formState.EmployeeId)}
                  >
                    Update
                  </button>
                ) : null}
                {/* button to create new department  */}
                {formState.EmployeeId === 0 ? (
                  <button
                    type="button"
                    className=" btn btn-primary float-start"
                    onClick={handleCreate}
                  >
                    Create
                  </button>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
