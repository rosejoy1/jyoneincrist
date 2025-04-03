import React, { useState } from "react";
import Login from "./Login"; // Import the Login component
import "./Admin.css";

const Admin = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLoginClick = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <div className="admin-container">
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
           
            {/* Pass isPopupOpen to reset the state */}
            <Login key={isPopupOpen} isPopupOpen={isPopupOpen} handleClose={handleClosePopup}  />

          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;