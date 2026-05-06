import React, { useState } from 'react';
import api from '../Services/api';
import { Link } from 'react-router-dom';

export default function Register(){
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const register = async () => {
    try{
      await api.post('/auth/register', { name, phone });
      setMessage('OTP sent — check backend console for OTP');
    }catch(e){
      console.error(e);
      setMessage('Failed to send OTP');
    }
  }

  const verify = async () => {
    try{
      const res = await api.post('/auth/verify-otp', { phone, code: otp });
      if(res.data.verified) setMessage('Verified! You can login now');
    }catch(e){
      console.error(e);
      setMessage('OTP invalid or expired');
    }
  }

  return (
    <div className="card">
      <h1>Register</h1>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
      <button onClick={register}>Send OTP</button>
      <input placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
      <button onClick={verify}>Verify & Sign Up</button>
      <div style={{marginTop:10}}>{message}</div>
      <div style={{marginTop:10}}>Already have an account? <Link to="/login">Log in</Link></div>
    </div>
  );
}
