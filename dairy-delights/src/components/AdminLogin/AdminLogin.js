import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin({ setIsAdminLoggedIn }) {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const ADMIN_CODE = "2003";

  const handleLogin = (e) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      setIsAdminLoggedIn(true); // login success
      navigate("/orders");
    } else {
      alert("Invalid security code!");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Enter Security Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
