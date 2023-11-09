import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../API_URL/api_url";
import { toast } from "react-toastify";
import { Input, TextField } from "@mui/material";
export const HomePage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalTitle, setModalTitle] = useState("Login");

  const loginClick = () => {
    setModalTitle("Login");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //  console.log();
      const result = await axios.post(API_URL.LOGIN, {
        email: email,
        password: password,
      });
      console.log(result, "user");
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.foundUser));
      // alert("You are logged in successfully!");
      toast(`welcome ${result.data.foundUser.name}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (result.data.foundUser.role == "user") {
        navigate("/user");
      } else {
        navigate("/department");
      }

      // window.location.reload();
    } catch (err) {
      toast(
        "Error While login. Please provide correct email and password! " ||
          err.response.data,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  return (
    <div className="homepage">
      <div className="form-container">
        <h3 style={{ color: "black" }}>{modalTitle}</h3>
        <div className="o">
          <div className="input-group">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              required
              value={email}
              aria-label="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button className="btn btn-primary" onClick={handleLogin}>
              {modalTitle}
            </button>
          </div>
        </div>
      </div>
      <div>
        <img src="https://i0.wp.com/juntrax.com/blog/wp-content/uploads/2021/01/Employee-Management-System.jpg?resize=840%2C480&ssl=1" />
      </div>
    </div>
  );
};
