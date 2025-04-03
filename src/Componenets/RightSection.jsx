import React from "react";
import "./RightSection.css";
import christ from "./Images/One.webp";

const RightSection = () => {
  return (
    <div className="right-section">
      <h2 className=" one ">One In Christ</h2>
      <p className=" two"><span className="one_one">Zonal Conference </span><br></br> Let's  gather in His name.</p>
      <img src={christ} className="img-christ"  alt="" />
      <div className="contact-info">
        <p style ={{color:"rgb(228, 172, 228);"}}><i  className="bi detail bi-envelope"></i>Venue : Mary Matha Art & Science College Mananthavady</p>
        <p style ={{color:"rgb(228, 172, 228);"}}><i  className="bi detail bi-globe"></i> Date : 2025 April 25,26,27</p>
        <p style={{ color: "rgb(228, 172, 228);" }}><i className="bi detail bi-telephone"></i> Phone : +91 8943548306 / +91 9946844676</p>
        <p style ={{color:"rgb(228, 172, 228);",textTransform:'lowercase'}}><i  className="bi detail bi-geo-alt"></i> Email : jesusyouthmananthavady@gmail.com</p>
      </div>
    </div>
  );
};


export default RightSection;