import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./main.css"
import Login_Signup from "./components/Login_Signup/Login_Signup.jsx";
import Home from "./Pages/Home/Home.jsx";
import Contact from "./components/Contact/contact.jsx";
import PassManager from "./Pages/PasswordManager/passManageer.jsx";
import Calculator from "./Pages/Calculator/calc.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login_Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Home/pass" element={<PassManager />} />
        <Route path="/Home/Calc" element={<Calculator/>}/>
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);