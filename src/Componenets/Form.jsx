import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Form.css"; // Custom CSS for styling
import logo from "./Images/jy.png";
import Counter from "./Counter";
import RightSection from "./RightSection";
import axios from "axios";
import Admin from "./Admin"

const Form = () => {
  const [category, setCategory] = useState("");;
  const [isFormValid, setIsFormValid] = useState(false);
  const [numChildren, setNumChildren] = useState(0);


  const [formData, setFormData] = useState({
    fullName: "",
    houseName: "",
    place: "",
    parish: "",
    email: "",
    phone: "",
    dob: "",
    experience: "",
    accommodation: "",
    gender: "",
    homeLocation: "",
    spouseName: "",
    spousePhone: "",
    numChildren:"",
    children: [],
  });

  // Handle input changes
  const handleChange = (e) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => {
        const updatedForm = { ...prevState, [name]: value };
    
        // If category is family, handle spouse data
        if (updatedForm.category === "family") {
          if (updatedForm.gender === "male" && name === "spouseName") {
            updatedForm.spouseName = value;
          } else if (updatedForm.gender === "female" && name === "spouseName") {
            updatedForm.spouseName = value;
          }
    
          if (updatedForm.gender === "male" && name === "spousePhone") {
            updatedForm.spousePhone = value;
          } else if (updatedForm.gender === "female" && name === "spousePhone") {
            updatedForm.spousePhone = value;
          }
        }
        validateForm(updatedForm);
        return updatedForm;
      });
    };
       const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedForm = { ...prevState, [name]: value };
      validateForm(updatedForm);
      return updatedForm;
    });
  };
  const handleChildrenChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedChildren = [...prevData.children];
      
      // Ensure the child object exists before modifying
      if (!updatedChildren[index]) {
        updatedChildren[index] = { name: "", age: "", gender: "" };
      }
  
      updatedChildren[index] = {
        ...updatedChildren[index],
        [field]: value,
      };
  
      return { ...prevData, children: updatedChildren };
    });
  };
  

  // Validate form fields
  const validateForm = (updatedForm) => {
    const requiredFields = [
      "fullName",
      "houseName",
      "place",
      "parish",
      "email",
      "phone",
      "dob",
     
      "accommodation",
      "gender",
      
    ];

    if (updatedForm.category === "family") {
      requiredFields.push("spouseName", "spousePhone");
    }
  
    // Check if all required fields are filled
    const isValid = requiredFields.every(
      (field) => updatedForm[field]?.trim() !== ""
    );
  
    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Use formData directly
    const formDataToSubmit = {
      ...formData,
      numChildren: numChildren,
      children: formData.children.map(child => ({
        name: child.name,
        age: child.age,
        gender: child.gender,
      })),
    };
  
  ;
  
    try {
      const response = await axios.post("http://localhost:5000/submit-form", formDataToSubmit, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Success:", response.data);
      alert("Form submitted successfully!");
  
      // Razorpay payment logic
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please try again.");
        return;
      }
  
      const options = {
        key: "rzp_test_FDdpxQ8060aeNv", // Your Razorpay key
        amount: 150000, // In smallest unit (paise for INR)
        currency: "INR",
        name: "Jesus Youth Event",
        description: "Registration Fee",
        image: logo,
        handler: function (response) {
          alert("Payment Successful!");
          window.location.href = "/"; // Redirect after success
        },
        prefill: {
          name: formData.fullName,  // Use formData.fullName here
          email: formData.email,    // Use formData.email here
          contact: formData.phone,  // Use formData.phone here
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            alert("Payment cancelled.");
          },
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
  
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Form submission failed. Please try again.");
    }
  };
  

  return (
    <div className="body-form">
<div className="form-wrapper d-flex flex-column align-items-center justify-content-center p-4 w-100">
  {/* Header */}
  <header className="header d-flex flex-column flex-md-row align-items-center justify-content-between w-100">
    {/* Logo & Title Section */}
    <div className="logo-section d-flex align-items-center text-center text-md-start">
      <img 
        src={logo} 
        alt="Jesus Youth Logo" 
        className="logo-img"
        style={{
          width: "10px", // Scales with viewport width
          maxWidth: "100px", // Ensures it doesn't get too big
          minWidth: "60px", // Prevents it from getting too small
          height: "auto" // Maintains aspect ratio
        }} 
      />
      <h2 style={{fontSize:"23px" ,letterSpacing:"2px 2px"}} className="text-white ms-2 fw-bold text-uppercase text-center text-md-start">
        <span >JESUS YOUTH</span> <br className="d-none d-md-block" />
        <span >MANANTHAVADY</span>
      </h2>
    </div>

    {/* Countdown Timer */}
    <div className="mt-3 mt-md-0">
      <Counter targetDate="2025-04-25T00:00:00" />
      
    </div>
  </header>



  

      {/* Form Section */}
      <div className="form-container">
      <div className="right-section text-center">
       <RightSection />
    <Admin />
       

</div>

        <div className="left-section">
          <h3 className="text-white fw-bold ">FILL THE FORM</h3>
          <form action="http://localhost:5000/submit-form" method="POST" onSubmit={handleSubmit} className="row g-3"  >
            {/* FULL NAME */}
            <div className="col-12">
              <label className="form-label text-white">FULL NAME</label>
              <input type="text" className="form-control"  name="fullName" value={formData.fullName} onChange={handleChange} style={{ height: "60px" }}  required />
            </div>

              {/* HOME LOCATION & HOUSE NAME */}
              <div className="col-md-6">
              <label className="form-label  text-white" >HOUSE NAME</label>
              <input type="text" style={{ height: "60px" }}  name="houseName" value={formData.houseName} onChange={handleChange} className="form-control" required />
            </div>
          

            {/* PLACE & PARISH */}
            <div className="col-md-6">
              <label className="form-label text-white">PLACE</label>
              <input type="text" style={{ height: "60px" }} name="place"  value={formData.place} onChange={handleChange} className="form-control" required />
            </div>
           
              <div className="col-md-6">
                <label className="form-label text-white">HOME LOCATION</label>
                <select className="form-select" name="homeLocation" value={formData.homeLocation} onChange={handleChange} required>
                  <option value="">SELECT LOCATION</option>
                  <option value="Mananthavady">MANANTHAVADY</option>
                  <option value="Dwaraka">DWARAKA</option>
                  <option value="Nadavayal">NADAVAYAL</option>
                  <option value="Pulpally">PULPALLY</option>
                  <option value="Bathery">BATHERY</option>
                  <option value="Kalpetta">KALPETTA</option>
                  <option value="Thariyode">THARIYODE</option>
                  <option value="Kallody">KALLODY</option>
                  <option value="Kallody">OTHER</option>
                </select>
              </div>
            <div className="col-md-6">
              <label className="form-label text-white">PARISH</label>
              <input type="text" style={{ height: "60px" }} name="parish" value={formData.parish} onChange={handleChange} className="form-control" required />
            </div>

            {/* EMAIL & PHONE */}
            <div className="col-md-6">
              <label className="form-label text-white">EMAIL</label>
              <input type="email" className="form-control" name ="email" value={formData.email} onChange={handleChange} style={{ height: "60px" }} required />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white">PHONE</label>
              <input type="tel" name = "phone" value={formData.phone} onChange={handleChange} className="form-control" style={{ height: "60px" }} required />
            </div>

            {/* DATE OF BIRTH & EXPERIENCE */}
            <div className="col-md-6">
              <label className="form-label text-white">DATE OF BIRTH</label>
              <input type="date" name = "dob" value={formData.dob} onChange={handleChange} style={{ height: "60px" }} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white">YEARS OF EXPERIENCE IN JY</label>
              <input type="number" name ="experience" value={formData.experience} onChange={handleChange} style={{ height: "60px" }} className="form-control" min="0" required />
            </div>

               {/* ACCOMMODATION - DROPDOWN */}
               <div className="col-md-6">
              <label className="form-label text-white">ACCOMMODATION</label>
              <select className="form-select" name ="accommodation" value={formData.accommodation} onChange={handleChange} style={{ height: "60px" }} required>
                <option value="">SELECT ACCOMMODATION</option>
                <option value="common">COMMON ACCOMMODATION</option>
                <option value="paid">PAID ACCOMMODATION</option>
              </select>
            </div>


            {/* GENDER - DROPDOWN */}
            <div className="col-md-6">
              <label className="form-label text-white" > GENDER</label>
              <select
              name="gender"
              value={formData.gender}
                className="form-select"
                style={{ height: "60px" }}
                required
                onChange={handleChange}
              >
                <option value="">SELECT GENDER</option>
                <option value="female">FEMALE</option>
                <option value="male">MALE</option>
                
              </select>
            </div>

            {/* CATEGORY - DROPDOWN */}
            <div className="col-md-12">
              <label className="form-label text-white">CATEGORY</label>
              <select style={{ height: "60px" }}
              name="category"
                className="form-select"
                value={formData.category}
                required
                onChange={handleChange}
              >
                <option value="">SELECT CATEGORY</option>
                <option value="family">FAMILY</option>
                <option value="youth">YOUTH</option>
                <option value="campus">CAMPUS</option>
              </select>
            </div>

            {formData.category === "family" && (
            <>
              {formData.gender === "male" && (
             <>
            <div className="col-md-6">
              <label className="form-label text-white">WIFE'S NAME</label>
              <input type="text" style={{ height: "60px" }}  name="spouseName"
            value={formData.spouseName || ""}
            onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white">WIFE'S PHONE NUMBER</label>
              <input type="tel" style={{ height: "60px"  }}   name="spousePhone"
            value={formData.spousePhone || ""}
            onChange={handleChange} className="form-control" required />
            </div>
            </>
          )}
    {formData.gender === "female" && (
         <>
          <div className="col-md-6">
            <label className="form-label text-white">HUSBAND'S NAME</label>
            <input type="text" style={{ height: "60px" }}  name="spouseName"
            value={formData.spouseName || ""}
            onChange={handleChange} className="form-control" required />
           </div>
          <div className="col-md-6">
            <label className="form-label text-white">HUSBAND'S PHONE NUMBER</label>
            <input type="tel" style={{ height: "60px" }}   name="spousePhone"
            value={formData.spousePhone || ""}
            onChange={handleChange} className="form-control" required />
        </div>
        </>
    )}
    <div className="col-md-6">
      <label className="form-label text-white">NUMBER OF CHILDREN</label>
      <input
    style={{ height: "60px" }}
    type="number"
    name="numChildren"
    className="form-control"
    min="0"
    value={numChildren || ""}
    onChange={(e) => setNumChildren(parseInt(e.target.value))}
    required
  />


    </div>

    {/* CHILDREN DETAILS DYNAMICALLY GENERATED */}
    {Array.from({ length: numChildren }).map((_, index) => (
  <div key={index} className="row child-details">
    <div className="col-md-4">
      <label className="form-label text-white">CHILD {index + 1} NAME</label>
      <input
        type="text"
        style={{ height: "60px" }}
        className="form-control"
        name={`children[${index}].name`}
        value={formData.children[index]?.name || ""}
        onChange={(e) => handleChildrenChange(index, "name", e.target.value)}
        required
      />
    </div>
    <div className="col-md-4">
      <label className="form-label text-white">AGE</label>
      <input
        type="number"
        style={{ height: "60px" }}
        className="form-control"
        name={`children[${index}].age`}
        value={formData.children[index]?.age || ""}
        onChange={(e) => handleChildrenChange(index, "age", e.target.value)}
        min="0"
        required
      />
    </div>
    <div className="col-md-4">
      <label className="form-label text-white">GENDER</label>
      <select
        style={{ height: "60px" }}
        className="form-select"
        name={`children[${index}].gender`}
        value={formData.children[index]?.gender || ""}
        onChange={(e) => handleChildrenChange(index, "gender", e.target.value)}
        required
      >
        <option value="">SELECT GENDER</option>
        <option value="male">MALE</option>
        <option value="female">FEMALE</option>
      </select>
    </div>
  </div>
))}

              </>
            )}

          

         
            {/* SUBMIT BUTTON */}
            <div className="col-12">
          <button 
    type="submit"  id="submit-b" style={{ height: "60px" }}
    className="btn custom-submit-btuttonn w-100 d-flex align-items-center justify-content-center"
  >
    SUBMIT <span className="check-icon">&#10003;</span>
  </button>

            </div>
          </form>
        </div>
        </div>
      
      </div>
    </div>
  );
};

export default Form;