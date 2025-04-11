import React, { useState, useEffect } from "react";

const Form = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;
    if (!username) {
      alert("Please fill out the username.");
      return;
    }
    if (!email) {
      alert("Please fill out the email.");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }
    if (!phone) {
      alert("Please fill out the phone number.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
    if (!dob) {
      alert("Please fill out the date of birth.");
      return;
    }
    const enteredDate = new Date(dob);
    const today = new Date();
    if (enteredDate > today) {
      alert("Invalid date of birth. Date of birth cannot be in the future");
      return;
    }
    alert("Form submitted successfully!");
    setFormData({ username: "", email: "", phone: "", dob: "" });
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal") {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div id="root" style={{ textAlign: "center", paddingTop: "50px" }}>
      <button
        className="openForm-button"
        onClick={() => setIsModalOpen(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          border: "none",
          color: "white",
          fontSize: "1rem",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
        Open Form
      </button>

      {isModalOpen && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              minWidth: "300px",
            }}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <br />
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <br />
                <input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <br />
                <input id="dob" type="date" value={formData.dob} onChange={handleInputChange} />
              </div>
              <br />
              <button
                type="submit"
                className="submit-button"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "green",
                  border: "none",
                  color: "white",
                  fontSize: "1rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}>
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
