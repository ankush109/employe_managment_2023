import React, { useEffect, useState } from "react";
import "./userCss.css";
import axios from "axios";
import { NavBar } from "../Navigation Bar/header";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

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
        "http://localhost:4000/api/leave",
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
      toast("Leave application submitted successfully:", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Clear form fields
      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (error) {
      // Handle any errors
      toast("please fill all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="g">
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

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default User;
