import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LogoutPage() {
  const [phone, setPhone] = useState(localStorage.getItem("phoneNumber") || "");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/logout", { phoneNumber: phone });
      setMessage(res.data);
      localStorage.removeItem("phoneNumber");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data || "Logout failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#f0f2f5" }}>
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Logout</h3>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="btn btn-danger w-100 mb-2" onClick={logout}>
          Logout
        </button>
        <Link to="/register" className="btn btn-primary w-100">Home</Link>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
}

export default LogoutPage;
