import React from "react";
import "./DialogBox.css"; // Import the CSS file

const DialogBox = ({ title, message, onClose }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <h3 className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>
        <button className="dialog-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default DialogBox;
