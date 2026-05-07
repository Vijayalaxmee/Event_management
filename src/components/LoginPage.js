import React, { useState } from "react";
import api from "../Services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // Send OTP
  const sendOtp = async () => {
    if (!phone) {
      setMsg("Please enter phone number");
      return;
    }

    try {
      const res = await api.post("/send-otp-login", {
        phoneNumber: phone
      });

      setMsg(res.data);
    } catch (err) {
      setMsg(err.response?.data || "Error sending OTP");
    }
  };

  // Login
  const login = async () => {
    if (!phone || !otp) {
      setMsg("Please enter phone and OTP");
      return;
    }

    try {
      const res = await api.post("/login", {
        phoneNumber: phone,
        otp: otp
      });

      // store login info (better than only phone string)
      localStorage.setItem(
        "user",
        JSON.stringify({ phone })
      );

      setMsg("Login successful");

      // ✅ FIXED NAVIGATION (IMPORTANT)
      navigate("/home"); // or "/" if you want Dashboard as main page

    } catch (err) {
      setMsg(err.response?.data || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

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

        <button style={styles.loginBtn} onClick={login}>
          Login
        </button>

        {msg && <p style={styles.msg}>{msg}</p>}

        <Link to="/" style={styles.link}>
          Go to Register
        </Link>
      </div>
    </div>
  );
}

// UI STYLES (UNCHANGED)
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)"
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
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  otpBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#6c63ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  loginBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  msg: {
    marginTop: "10px",
    fontWeight: "bold"
  },

  link: {
    display: "block",
    marginTop: "15px",
    color: "#4facfe",
    textDecoration: "none"
  }
};