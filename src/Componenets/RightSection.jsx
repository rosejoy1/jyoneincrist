import React from "react";
import "./RightSection.css";
import christ from "./Images/One.webp";

const RightSection = () => {
  return (
    <div className="right-section">
      <h2 className=" one ">One In Christ</h2>
      <p className=" two">Zonal Conference \ lets  Gather in "HIS" Name</p>
      <img src={christ} className="img-christ"  alt="" />
      <div className="contact-info">
        <p><i className="bi bi-envelope"></i> DONATION: hello@reallygreatsite.com</p>
        <p><i className="bi bi-globe"></i> WEBSITE: reallygreatsite.com</p>
        <p><i className="bi bi-telephone"></i> PHONE: +123-456-7890</p>
        <p><i className="bi bi-geo-alt"></i> LOCATION: slsdlashkahflashf</p>
      </div>
    </div>
  );
};

export default RightSection;
