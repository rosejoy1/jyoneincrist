import React from 'react';
import './DialogBox.css';

const DialogBox = ({ title, message }) => {
  const handleOkClick = () => {
    window.location.href = '/'; // Redirects to the home page
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <h3 className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>
        <button className="dialog-button" onClick={handleOkClick}>
          OK
        </button>
      </div>
    </div>
  );
};

export default DialogBox;
