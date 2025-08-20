import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import PhotoUpload from "./components/photoUpload";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Recognition from "./components/recognition.jsx"; // ⬅️ new import
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PhotoUpload />} />
        <Route path="/recognition" element={<Recognition />} /> {/* ⬅️ new route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
