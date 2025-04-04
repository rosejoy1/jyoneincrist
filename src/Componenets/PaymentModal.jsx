import React from "react";
import qrcode from "./Images/qrcode.jpg"; 

const PaymentModal = ({ isOpen, onClose}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Complete Your Payment</h3>
        <p>Choose any of the following payment options:</p>

        <h4>Option 1: UPI Payment</h4>
        <div className="qr-container">
          <img src={qrcode} alt="QR Code" width="200" />
        </div>
        <p><strong>UPI ID:</strong> 8943548306</p>

        <h4>Option 2: Bank Transfer</h4>
       
        <p><strong>Account Number:</strong> 10690100407606</p>
        <p><strong>IFSC Code:</strong> FDRL0001069</p>

        <button className="dialog-button" onClick={onClose}>
          OK
        </button>
       
      </div>
    </div>
  );
};

export default PaymentModal;
