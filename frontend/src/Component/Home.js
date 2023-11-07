import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../API_URL/api_url";

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
      if (result.data.foundUser.role == "user") {
        navigate("/user");
      }
      navigate("/department");
      // window.location.reload();
    } catch (err) {
      alert(
        "Error While login. Please provide correct email and password! " ||
          err.response.data
      );
    }
  };

  return (
    <div className="homepage">
      <div className="form-container">
        <h3 style={{ color: "black" }}>{modalTitle}</h3>
        <div className="input-group">
          <label style={{ color: "black" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label style={{ color: "black" }}>Password</label>
          <input
            type="password"
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
  );
};
