import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://backendchrist.onrender.com/registered-users");
        console.log("Fetched users:", response.data);  // Check response structure
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Download Excel File
  const downloadExcel = async () => {
    try {
      const response = await axios.get("https://backendchrist.onrender.com/export-excel", {
        responseType: "blob", // Get binary data
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "registered_users.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download Excel file. Please try again.", error);
    }
  };
  
  return (
    <div className="admin-panel">
      {/* Header */}
      <header className="header2">
        <h1>Registration Details</h1>
      </header>

      {/* Loading State */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="table-container">
          {/* User Registration Data Table */}
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>ID</th>
                <th>Full Name</th>
                <th>House Name</th>
                <th>Place</th>
                <th>Parish</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Experience</th>
                <th>Accommodation</th>
                <th>Gender</th>
                <th>Category</th>
                <th>Spouse Name</th>
                <th>Spouse Phone</th>
                
                <th>Number of Children</th>
                <th>Children Details</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.fullName || "N/A"}</td>
                    <td>{user.houseName || "N/A"}</td>
                    <td>{user.place || "N/A"}</td>
                    <td>{user.parish || "N/A"}</td>
                    <td>{user.email || "N/A"}</td>
                    <td>{user.phone || "N/A"}</td>
                    <td>{user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}</td>
                    <td>{user.experience || "N/A"}</td>
                    <td>{user.accommodation || "N/A"}</td>
                    <td>{user.gender || "N/A"}</td>
                    <td>{user.category || "N/A"}</td>
                    <td>{user.spouseName || "N/A"}</td>
                    <td>{user.spousePhone || "N/A"}</td>
                    <td>{user.numChildren || 0}</td>
                   
                    <td>
                      {user.children && user.children.length > 0 ? (
                        <ul>
                          {user.children.map((child, i) => (
                            <li key={i}>
                              {child.name} ({child.age} years, {child.gender})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{user.paymentStatus || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="17" className="no-data">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Download Button */}
      <button className="download-btn" onClick={downloadExcel}>
        Download Registered Users (Excel)
      </button>
    </div>
  );
};

export default AdminPanel;
