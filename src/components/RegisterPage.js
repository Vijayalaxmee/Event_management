import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  withCredentials: true
});

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const sendOtp = async () => {
    try {
      const res = await api.post("/send-otp-register", {
        phoneNumber: phone
      });
      setMsg(res.data);
    } catch (err) {
      setMsg(err.response?.data || "Failed to send OTP");
    }
  };

  const register = async () => {
    try {
      const res = await api.post("/register", {
        name,
        phoneNumber: phone,
        otp
      });
      setMsg(res.data);
    } catch (err) {
      setMsg(err.response?.data || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button style={styles.otpBtn} onClick={sendOtp}>
          Send OTP
        </button>

        <input
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button style={styles.registerBtn} onClick={register}>
          Register
        </button>

        {msg && <p style={styles.message}>{msg}</p>}

        <p style={styles.linkText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },

  card: {
    width: "320px",
    padding: "25px",
    borderRadius: "15px",
    backgroundColor: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center"
  },

  title: {
    marginBottom: "20px",
    color: "#333"
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  },

  otpBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#6c63ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  registerBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  message: {
    marginTop: "10px",
    color: "#333",
    fontWeight: "bold"
  },

  linkText: {
    marginTop: "15px",
    fontSize: "14px"
  },

  link: {
    color: "#6c63ff",
    textDecoration: "none",
    fontWeight: "bold"
  }
};