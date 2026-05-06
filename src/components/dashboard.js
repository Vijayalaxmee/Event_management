import React from 'react';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div style={{padding:20}}>
      <h1>Login Successful 🎉</h1>
      {user ? (
        <div>
          <p>Welcome, <strong>{user.name}</strong> (Phone: {user.phone})</p>
        </div>
      ) : (
        <p>Welcome! (No user info found in localStorage)</p>
      )}
      <p>This is the page shown after successful login. Replace this with the wireframe UI if you prefer.</p>
    </div>
  );
}
