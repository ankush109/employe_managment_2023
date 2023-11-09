import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavBar } from "../Navigation Bar/header";

const styles = {
  container: {
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",

    justifyContent: "center",
    minHeight: "30vh",
    padding: "20px",
  },
  listItem: {
    border: "1px solid black",
    padding: "20px",
    margin: "10px",
    borderRadius: "5px",
    width: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontWeight: "bold",
    marginRight: "10px",
  },
  value: {
    flex: 1,
  },
  header: {
    textAlign: "center",
    textDecoration: "none",
    padding: "20px",
    marginTop: "20px",
    border: "1px solid black",
  },
};

function Applications() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // Make an API call to fetch the list of leaves
    axios
      .get("http://localhost:4000/api/applications", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setLeaves(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaves:", error);
      });
  }, []);

  return (
    <>
      <NavBar />

      <h2
        style={{
          textAlign: "center",
          textDecoration: "none",
          padding: "20px",
          marginTop: "20px",

          border: "1px 1px 1px 1 px solid black",
          paddingTop: "2px",
        }}
      >
        Leave Applications
      </h2>

      <div style={styles.container}>
        {leaves.map(
          (leave) =>
            leave.name && (
              <div key={leave._id} style={styles.listItem}>
                <div className="flex">
                  {" "}
                  <div style={styles.label}>Name:</div>
                  <div style={styles.value}>{leave.name}</div>
                </div>
                <div className="flex">
                  <div style={styles.label}>Start Date:</div>
                  <div style={styles.value}>{leave.startDate}</div>
                </div>
                <div className="flex">
                  <div style={styles.label}>End Date:</div>
                  <div style={styles.value}>{leave.endDate}</div>
                </div>
                <div className="flex">
                  <div style={styles.label}>Reason:</div>
                  <div style={styles.value}>{leave.reason}</div>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}

export default Applications;
