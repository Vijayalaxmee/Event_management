import React, { useState } from 'react';
import api from '../Services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      await api.post('/auth/send-otp', { phone });
      setMsg('OTP sent — check backend console');
    } catch (e) {
      console.error(e);
      setMsg('Failed to send OTP');
    }
  }

  const login = async () => {
    try {
      // verify OTP first using verify-otp endpoint
      const verifyRes = await api.post('/auth/verify-otp', { phone, code: otp });
      if (verifyRes.data.verified) {
        // then call login endpoint to get user info
        const res = await api.post('/auth/login', { phone });
        localStorage.setItem('user', JSON.stringify(res.data));
        // After login success go to Dashboard (or Home)
        navigate('/dashboard');
      }
    } catch (e) {
      console.error(e);
      setMsg('Login failed: ' + (e.response?.data?.message ?? 'Invalid OTP or not verified'));
    }
  }

  return (
    <div className="card">
      <h1>Log In</h1>
      <input placeholder="Phone Number" value={phone} onChange={e=>setPhone(e.target.value)} />
      <button onClick={sendOtp}>Send OTP</button>
      <input placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
      <button onClick={login}>Login</button>
      <div style={{marginTop:10}}>{msg}</div>
      <div style={{marginTop:10}}>Don't have an account? <Link to="/">Register here</Link></div>
    </div>
  );
}
