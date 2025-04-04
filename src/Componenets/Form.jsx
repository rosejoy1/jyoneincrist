import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Form.css"; // Custom CSS for styling
import logo from "./Images/jy.png";
import Counter from "./Counter";
import RightSection from "./RightSection";
import axios from "axios";
import Admin from "./Admin";
import Login from "./Login"; // Import the Login component
import "./Admin.css";
import qrcode from "./Images/qrcode.jpg";
import DialogBox from "./DialogBox";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Form = () => {
  const [category, setCategory] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [numChildren, setNumChildren] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);


  const [showInitialPaymentButtons, setShowInitialPaymentButtons] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    message: "",
  });

  const handlePayment = async () => {
    console.log("handlePayment triggered");

    closePaymentModal();

    try {
      if (!formData.email) {
        alert("Please enter your email before proceeding.");
        return;
      }

      console.log("Submitting payment for:", formData.email);

      const response = await fetch("https://backendchrist.onrender.com/update-payment-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          paymentStatus: "yes",
        }),
      });

      const data = await response.json();
      console.log("Raw backend response:", data);

      if (data.success || data.message) {
        setFormData((prev) => ({ ...prev, paymentStatus: "yes" }));

        setDialogContent({
          title: "🎉 Registration Completed",
          message: "Your payment was successful! Please send the screenshot to Jesus Youth Mananthavady (+91 8943548306).",
        });
      } else {
        alert("Payment update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Failed to update payment status. Please try again.");
    }

    setShowDialog(true);
  };

  const handlePayLater = async () => {
    closePaymentModal();
    try {
      if (!formData.email) {
        alert("Please enter your email before proceeding.");
        return;
      }

      // Send request to backend to update payment status to "no"
      const response = await fetch("https://backendchrist.onrender.com/update-payment-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          paymentStatus: "no", // <-- Ensure it updates as "no"
        }),
      });

      const data = await response.json();
      console.log("Payment update response:", data); // Debugging

      if (data.message) {
        setFormData((prev) => ({ ...prev, paymentStatus: "no" })); // Update local state

        setDialogContent({
          title: "ℹ️ Registration Completed",
          message: "Your payment is pending. Please complete it later.",
        });
      } else {
        alert("Payment update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Failed to update payment status. Please try again.");
    }

    setShowDialog(true);
  };


  // FOR HANDLE ADMIN LOGIN
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLoginClick = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

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
    numChildren: "",
    paymentStatus: "NO",
    children: [],
  });

  // Handle general input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "numChildren" ? parseInt(value) : value;

    setFormData((prevState) => {
      const updatedForm = {
        ...prevState,
        [name]: parsedValue,
      };

      // Handle spouse fields (if needed)
      if (
        updatedForm.category === "family" &&
        (name === "spouseName" || name === "spousePhone") &&
        updatedForm.gender
      ) {
        updatedForm[name] = value;
      }

      validateForm(updatedForm);
      return updatedForm;
    });
  };

  // Handle child input changes
  const handleChildrenChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedChildren = [...prevData.children];

      // Ensure the child exists
      if (!updatedChildren[index]) {
        updatedChildren[index] = { name: "", age: "", gender: "" };
      }

      updatedChildren[index] = {
        ...updatedChildren[index],
        [field]: value,
      };

      return {
        ...prevData,
        children: updatedChildren,
      };
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

    const isValid = requiredFields.every((field) => {
      const value = updatedForm[field];

      if (typeof value === "string") {
        return value.trim() !== "";
      }

      return value !== undefined && value !== null && value !== "";
    });

    setIsFormValid(isValid);
  };


  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formDataToSubmit = {
      ...formData,
      numChildren: numChildren,
      children: formData.children.map((child) => ({
        name: child.name,
        age: child.age,
        gender: child.gender,
      })),
      paymentStatus: "no", // Default until payment is confirmed
    };

    try {
      const response = await axios.post(
        "https://backendchrist.onrender.com/submit-form",
        formDataToSubmit,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Success:", response.data);

      setShowInitialPaymentButtons(true);  // Show modal after API success
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Form submission failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading after API response
    }
  };

  const handleShowPaymentModal = () => {
    console.log("Opening Payment Modal...");
    setShowPaymentModal(true); // ✅ Ensure modal is opened
  };
  function closePaymentModal() {
    setShowPaymentModal(false);
  }

  return (
    <div className="body-form">
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      {showDialog && (
        <DialogBox
          title={dialogContent.title}
          message={dialogContent.message}
          onClose={() => {
            setShowDialog(false);
          }}
        />
      )}
      {showInitialPaymentButtons && (
        <div className="payment-choice-modal">
          <div className="modal-content">
            <h3>Choose a Payment Option</h3>
            <p>Please choose whether to pay now or later.</p>
            <button
              className="btn btn-success m-2"
              onClick={() => {
                setShowInitialPaymentButtons(false);
                setShowPaymentModal(true);
              }}
            >
              Pay Now
            </button>
            <button
              className="btn btn-secondary m-2"
              onClick={() => {
                setShowInitialPaymentButtons(false);
                handlePayLater();
              }}
            >
              Pay Later
            </button>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close" onClick={() => setShowPaymentModal(false)}>
              &times;
            </span>
            <h3>Complete Your Payment</h3>
            <p>Choose any of the following payment options:</p>

            <h4>Option 1: UPI Payment</h4>
            <div className="qr-container">
              <img src={qrcode} alt="QR Code" width="200" />
            </div>
            <p>
              <strong>UPI ID:</strong> 8943548306
            </p>

            <h4>Option 2: Bank Transfer</h4>

            <p>
              <strong>Account Number:</strong> 10690100407606
            </p>
            <p>
              <strong>IFSC Code:</strong> FDRL0001069
            </p>

            <div className="btn-container">
              <button className="btn btn-green" onClick={handlePayment}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="form-wrapper d-flex flex-column align-items-center justify-content-center p-4 w-100">
        {/* Header */}
        <header className="header d-flex flex-column flex-md-row align-items-center justify-content-between w-100">
          {/* Logo & Title Section */}
          <div className="logo-section d-flex align-items-center text-center text-md-start">
            <img
              src={logo}
              alt="Jesus Youth Logo"
              className="logo-img"
              onDoubleClick={handleLoginClick}
              style={{
                width: "10px", // Scales with viewport width
                maxWidth: "100px", // Ensures it doesn't get too big
                minWidth: "60px", // Prevents it from getting too small
                height: "auto", // Maintains aspect ratio
              }}
            />
            <div className="admin-container">
              {isPopupOpen && (
                <div className="popup-overlay">
                  <div className="popup">
                    {/* Pass isPopupOpen to reset the state */}
                    <Login
                      key={isPopupOpen}
                      isPopupOpen={isPopupOpen}
                      handleClose={handleClosePopup}
                    />
                  </div>
                </div>
              )}
            </div>
            <h2
              style={{ fontSize: "23px", letterSpacing: "2px 2px" }}
              className="text-white ms-2 fw-bold text-uppercase text-center text-md-start"
            >
              <span>JESUS YOUTH</span> <br className="d-none d-md-block" />
              <span>MANANTHAVADY</span>
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
            <h3 className="text-white fw-bold ">REGISTRATION</h3>
            <form
              action="https://backendchrist.onrender.com/submit-form"
              method="POST"
              onSubmit={handleSubmit}
              className="row g-3"
            >
              {/* FULL NAME */}
              <div className="col-12">
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={{ height: "60px" }}
                  placeholder="Full Name"
                  required
                />
              </div>

              {/*HOUSE NAME */}
              <div className="col-md-6">
                <input
                  type="text"
                  style={{ height: "60px" }}
                  name="houseName"
                  value={formData.houseName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="House Name"
                  required
                />
              </div>

              {/* GENDER - DROPDOWN */}
              <div className="col-md-6">
                <select
                  name="gender"
                  value={formData.gender}
                  className="form-select"
                  style={{ height: "60px" }}
                  required
                  onChange={handleChange}
                >
                  <option value="" selected disabled hidden>
                    SELECT GENDER
                  </option>
                  <option value="female">FEMALE</option>
                  <option value="male">MALE</option>
                </select>
              </div>

              {/* DATE OF BIRTH  */}
              <div className="col-md-6">
                <DatePicker
                  selected={formData.dob}
                  onChange={(date) =>
                    handleChange({ target: { name: "dob", value: date } })
                  }
                  placeholderText="Date Of Birth"
                  className="form-control"
                  dateFormat="dd-MM-yyyy"
                  wrapperClassName="date-picker-wrapper w-100"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  dropdownMode="select"
                />
              </div>

              {/* PLACE & PARISH */}
              <div className="col-md-6">
                <input
                  type="text"
                  style={{ height: "60px" }}
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Native Place"
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  style={{ height: "60px" }}
                  name="parish"
                  value={formData.parish}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Parish"
                  required
                />
              </div>

              <div className="col-md-6">
                <select
                  className="form-select"
                  style={{ height: "60px" }}
                  name="homeLocation"
                  value={formData.homeLocation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Home Location</option>
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

              {/* EMAIL & PHONE */}
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ height: "60px" }}
                  placeholder="E-Mail"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  style={{ height: "60px" }}
                  placeholder="Contact"
                  required
                />
              </div>

              {/* CATEGORY - DROPDOWN */}
              <div className="col-md-12">
                <select
                  style={{ height: "60px" }}
                  name="category"
                  className="form-select"
                  value={formData.category}
                  required
                  onChange={handleChange}
                >
                  <option value="" selected disabled hidden>
                    SELECT CATEGORY
                  </option>
                  <option value="family">FAMILY</option>
                  <option value="youth">YOUTH</option>
                  <option value="campus">CAMPUS</option>
                  <option value="campus">TEENS</option>
                </select>
              </div>

              {/* EXPERIENCE  */}
              <div className="col-md-6">
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  style={{ height: "60px" }}
                  className="form-control"
                  min="0"
                  placeholder="Year of Experience in JY"
                  required
                />
              </div>

              {/* ACCOMMODATION - DROPDOWN */}
              <div className="col-md-6">
                <select
                  className="form-select"
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleChange}
                  style={{ height: "60px" }}
                  required
                >
                  <option value="" selected disabled hidden>SELECT ACCOMMODATION</option>
                  <option value="common">COMMON ACCOMMODATION</option>
                  <option value="paid">PAID ACCOMMODATION</option>
                  <option value="not needed">NOT NEEDED</option>
                </select>
              </div>

              {formData.category === "family" && (
                <>
                  {formData.gender === "male" && (
                    <>
                      <div className="col-md-6">
                        <input
                          type="text"
                          style={{ height: "60px" }}
                          name="spouseName"
                          placeholder="Wife's Name"
                          value={formData.spouseName || ""}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="number"
                          style={{
                            height: "60px",
                            WebkitAppearance: "none",
                            MozAppearance: "textfield",
                          }}
                          name="spousePhone"
                          value={formData.spousePhone || ""}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Wife's Phone Number"
                          required
                        />
                      </div>
                    </>
                  )}
                  {formData.gender === "female" && (
                    <>
                      <div className="col-md-6">
                        <input
                          type="text"
                          style={{ height: "60px" }}
                          name="spouseName"
                          value={formData.spouseName || ""}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Husband's Name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="tel"
                          style={{ height: "60px" }}
                          name="spousePhone"
                          value={formData.spousePhone || ""}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Husband's Phone Number"
                          required
                        />
                      </div>
                    </>
                  )}
                  <div className="col-md-6">
                    <input
                      type="number"
                      name="numChildren"
                      value={formData.numChildren || ""}
                      min="0"
                      className="form-control"
                      style={{ height: "60px" }}
                      onChange={(e) => {
                        handleChange(e); // updates formData
                        setNumChildren(parseInt(e.target.value)); // keeps UI state in sync
                      }}
                    />
                  </div>

                  {/* CHILDREN DETAILS DYNAMICALLY GENERATED */}
                  {Array.from({ length: numChildren }).map((_, index) => (
                    <div key={index} className="row child-details">
                      <div className="col-md-4">
                        <label className="form-label text-white">
                          CHILD {index + 1} NAME
                        </label>
                        <input
                          type="text"
                          style={{ height: "60px" }}
                          className="form-control"
                          name={"children[${index}].name"}
                          value={formData.children[index]?.name || ""}
                          onChange={(e) =>
                            handleChildrenChange(index, "name", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-white">AGE</label>
                        <input
                          type="number"
                          style={{ height: "60px" }}
                          className="form-control"
                          name={"children[${index}].age"}
                          value={formData.children[index]?.age || ""}
                          onChange={(e) =>
                            handleChildrenChange(index, "age", e.target.value)
                          }
                          min="0"
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-white">GENDER</label>
                        <select
                          style={{ height: "60px" }}
                          className="form-select"
                          name={"children[${index}].gender"}
                          value={formData.children[index]?.gender || ""}
                          onChange={(e) =>
                            handleChildrenChange(
                              index,
                              "gender",
                              e.target.value
                            )
                          }
                          required
                        >
                          <option value="" selected disabled hidden>
                            SELECT GENDER
                          </option>
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
                  type="submit"
                  id="submit-b"
                  style={{ height: "60px" }}
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
