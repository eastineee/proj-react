import "./App.css"; 
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";  // Import Register page
import Login from "./Login";        // Import Login page
import Dashboard from "./Dashboard"; // Import Dashboard page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} /> {/* Redirect "/" to "/register" */}
        <Route path="/register" element={<Register />} />  {/* Register page */}
        <Route path="/login" element={<Login />} /> {/* Login page route */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page route */}
      </Routes>
    </Router>
  );
}

export default App;
