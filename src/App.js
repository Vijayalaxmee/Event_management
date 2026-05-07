import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/LoginPage";
import Register from "./components/RegisterPage";
import Dashboard from "./components/dashboard";
import EventDetails from "./components/EventDetails";
import LogoutPage from "./components/LogoutPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* MAIN PAGE */}
        <Route path="/home" element={<Dashboard />} />

        {/* EVENT FLOW */}
        <Route path="/event/:id" element={<EventDetails />} />
        
          <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;