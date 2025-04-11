import React, { useState, useEffect, useRef } from "react";

const Form = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    // Validate all fields filled
    if (!username || !email || !phone || !dob) {
      alert("Please fill out all fields.");
      return;
    }

    // Validatation of email format
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // Validatation of 10-digit phone number
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // Validatation of date is not in the future
    const enteredDate = new Date(dob);
    const today = new Date();
    if (enteredDate > today) {
      alert("Invalid date of birth. Date of birth cannot be in the future");
      return;
    }

    // If valid, reset form and close modal
    alert("Form submitted successfully!");
    setFormData({ username: "", email: "", phone: "", dob: "" });
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  //   allstyles
  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    fontSize: "1rem",
    marginBottom: "15px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    fontSize: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div id="root" style={{ textAlign: "center", paddingTop: "50px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "600" }}>User Details Modal</h2>

      <button onClick={() => setIsModalOpen(true)} style={buttonStyle} className="openForm-button">
        Open Form
      </button>

      {isModalOpen && (
        <div className="modal" style={modalStyle}>
          <div className="modal-content" style={modalContentStyle} ref={modalRef}>
            <h3 style={{ marginBottom: "20px" }}>Fill Details</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username" style={labelStyle}>
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                style={inputStyle}
              />

              <label htmlFor="email" style={labelStyle}>
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                style={inputStyle}
              />

              <label htmlFor="phone" style={labelStyle}>
                Phone Number:
              </label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={inputStyle}
              />

              <label htmlFor="dob" style={labelStyle}>
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleInputChange}
                style={inputStyle}
              />

              <button className="submit-button" type="submit" style={buttonStyle}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
