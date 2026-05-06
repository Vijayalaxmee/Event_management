import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/LoginPage';
import Home from './components/HomePage';
import Dashboard from './components/dashboard';
import Register from './components/RegisterPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
