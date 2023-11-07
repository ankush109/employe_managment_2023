import React, { useEffect, useState } from "react";
import "./userCss.css";
import axios from "axios";
import { NavBar } from "../Navigation Bar/header";

function User() {
  const User = localStorage.getItem("user");
  const json = JSON.parse(User);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/leave",
        {
          startDate,
          endDate,
          reason,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      // Handle the response as needed
      console.log("Leave application submitted successfully:", response.data);

      // Clear form fields
      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (error) {
      // Handle any errors
      console.error("Error submitting leave application:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="leave-application">
        <h2>Leave Application Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>

          <label>
            Reason:
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default User;
