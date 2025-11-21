import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";
import "./Header.css";

function Header({
  search,
  setSearch,
  category,
  setCategory,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  notifications,
  setNotifications,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === "/";

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Dairy Delights</Link>
      </div>

      {isLandingPage && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="milk">Milk</option>
            <option value="butter">Butter</option>
            <option value="buttermilk">Buttermilk</option>
            <option value="cheese">Cheese</option>
            <option value="curd">Curd</option>
            <option value="cream">Cream</option>
            <option value="yogurt">Yogurt</option>
            <option value="ghee">Ghee</option>
            <option value="paneer">Paneer</option>
          </select>
        </div>
      )}

      <nav className="header-right">
        <Notification
          notifications={notifications}
          setNotifications={setNotifications}
        />
        {isAdminLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/admin-login" className="admin-btn">
            Admin Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;


