import React, { useState } from "react";
import "./createAccount.css";

function CreateAccount() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", roll: "", dob: "",
    bloodGroup: "", nationality: "",
    gender: "", caste: "", stream: "", year: "2024",
    enrollmentNo: "", examName: "", examRank: "",
    studentPan: "", studentPassport: "",
    address: "", district: "", state: "", pin: "",
    guardianName: "",

    fatherName: "", fatherMobile: "", fatherOccupation: "", fatherDesignation: "", fatherAge: "",
    fatherPan: "", fatherPassport: "", fatherAddress: "", fatherPin: "", fatherDistrict: "",

    motherName: "", motherMobile: "", motherOccupation: "", motherDesignation: "", motherAge: "",
    motherPan: "", motherPassport: "", motherAddress: "", motherPin: "", motherDistrict: "",

    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const states = ["Select State", "West Bengal", "Bihar", "Odisha", "Assam", "Jharkhand", "Uttar Pradesh"];
  const genders = ["Select Gender", "Male", "Female", "Other"];
  const castes = ["Select Caste", "General", "SC", "ST", "OBC"];
  const streams = ["Select Stream", "CSE", "ECE", "ME", "CE"];

  const requiredFields = Object.keys(form).filter(key => !key.toLowerCase().includes("passport"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "dob") setForm({ ...form, dob: value, password: value });
  };

  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);
  const isValidEmail = (email) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

  const handleSubmit = async () => {
    // Check all required fields
    for (let key of requiredFields) {
      if (!form[key] || form[key].trim() === "") {
        setError(`Please fill the field: ${key}`);
        return;
      }
    }

    // Validate phone and email
    if (!isValidPhone(form.phone) || !isValidPhone(form.fatherMobile) || !isValidPhone(form.motherMobile)) {
      setError("All phone numbers must be valid 10-digit numbers starting with 6-9.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Invalid email format.");
      return;
    }

    if (new Set([form.phone, form.fatherMobile, form.motherMobile]).size !== 3) {
      setError("Student, father, and mother phone numbers must be different.");
      return;
    }

    try {
      const res = await fetch("https://techno-backend-76p3.onrender.com/api/students/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        setError("Failed to create student. Server error.");
        return;
      }

      setError("");
      setSuccess("Account created successfully!");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
  };

  const renderInput = (label, name, type = "text") => (
    <div className="input-group">
      <label>{label}</label>
      <input type={type} name={name} value={form[name]} onChange={handleChange} />
    </div>
  );

  const renderSelect = (label, name, options) => (
    <div className="input-group">
      <label>{label}</label>
      <select name={name} value={form[name]} onChange={handleChange}>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="create-account-container">
      <h2>Create Student Account</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <section>
        <h3>Personal Info</h3>
        {renderInput("Full Name", "name")}
        {renderInput("Email", "email")}
        {renderInput("Phone", "phone")}
        {renderInput("Roll Number", "roll")}
        {renderInput("Date of Birth (DD-MM-YYYY)", "dob")}
        {renderInput("Blood Group", "bloodGroup")}
        {renderInput("Nationality", "nationality")}
        {renderInput("Address", "address")}
        {renderInput("District", "district")}
        {renderSelect("State", "state", states)}
        {renderInput("PIN Code", "pin")}
        {renderSelect("Gender", "gender", genders)}
        {renderSelect("Caste", "caste", castes)}
        {renderSelect("Stream", "stream", streams)}
        {renderInput("Joining Year", "year")}
        {renderInput("Enrollment No", "enrollmentNo")}
        {renderInput("Exam Name", "examName")}
        {renderInput("Exam Rank", "examRank")}
        {renderInput("PAN Number", "studentPan")}
        {renderInput("Passport (optional)", "studentPassport")}
        {renderInput("Guardian Name", "guardianName")}
      </section>

      <section>
        <h3>Father's Info</h3>
        {renderInput("Father's Name", "fatherName")}
        {renderInput("Mobile", "fatherMobile")}
        {renderInput("Occupation", "fatherOccupation")}
        {renderInput("Designation", "fatherDesignation")}
        {renderInput("Age", "fatherAge")}
        {renderInput("PAN", "fatherPan")}
        {renderInput("Passport (optional)", "fatherPassport")}
        {renderInput("Address", "fatherAddress")}
        {renderInput("District", "fatherDistrict")}
        {renderInput("PIN Code", "fatherPin")}
      </section>

      <section>
        <h3>Mother's Info</h3>
        {renderInput("Mother's Name", "motherName")}
        {renderInput("Mobile", "motherMobile")}
        {renderInput("Occupation", "motherOccupation")}
        {renderInput("Designation", "motherDesignation")}
        {renderInput("Age", "motherAge")}
        {renderInput("PAN", "motherPan")}
        {renderInput("Passport (optional)", "motherPassport")}
        {renderInput("Address", "motherAddress")}
        {renderInput("District", "motherDistrict")}
        {renderInput("PIN Code", "motherPin")}
      </section>

      <button className="submit-btn" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateAccount;
