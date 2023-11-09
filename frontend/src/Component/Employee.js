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
  const [loading, setloading] = useState(false);
  const getPosts = () => {
    axios
      .get(API_URL.EMPLOYEE, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setloading(false);
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
    formData.append("PhotoFileName", "");
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
    <>
      <NavBar />
      {loading ? (
        <div
          style={{
            color: "black",
            top: "0",
            paddingBottom: "100px",
          }}
          className="flex"
        >
          <h1>loading ... </h1>
        </div>
      ) : (
        <div className="table-responsive navbarCustom">
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
                          <span className="input-group-text">
                            EmployeeName:
                          </span>
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
                          <span className="input-group-text">
                            Date of Joining:
                          </span>
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
                        <input
                          className="m-2"
                          type="file"
                          onChange={imageUpload}
                        />
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
      )}
    </>
  );
};
