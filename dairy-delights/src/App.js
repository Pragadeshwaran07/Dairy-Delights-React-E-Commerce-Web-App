import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Order from "./components/Order/Order";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import OrderRequests from "./components/OrderRequests/OrderRequests";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // 🔔 Notifications global state
  const [notifications, setNotifications] = useState([]);

  return (
    <Router>
      <div className="app">
        <Header
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          isAdminLoggedIn={isAdminLoggedIn}
          setIsAdminLoggedIn={setIsAdminLoggedIn}
          notifications={notifications}         // ✅ pass to Header
        />

        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  search={search}
                  setSearch={setSearch}
                  category={category}
                  setCategory={setCategory}
                />
              }
            />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/order-summary/:id" element={<OrderSummary />} />
            <Route
              path="/admin-login"
              element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />}
            />
            <Route
              path="/orders"
              element={
                <OrderRequests
                  notifications={notifications}       // ✅ pass to OrderRequests
                  setNotifications={setNotifications} // ✅ so it can update
                />
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;


