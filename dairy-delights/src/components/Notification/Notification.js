import React, { useEffect } from "react";
import "./Notification.css";

function Notification({ notifications, setNotifications }) {
  const [showDropdown, setShowDropdown] = React.useState(false);

  // Initial ignored orders fetch pannitu notifications fill panna
  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => {
        const ignoredOrders = data
          .filter((order) => order.status === "Ignored ❌")
          .map((order) => ({
            id: order.id,
            message: `Your order for ${order.productName} is canceled ❌. Refund will be processed.`,
          }));
        setNotifications(ignoredOrders);
      })
      .catch((err) => console.error(err));
  }, [setNotifications]);

  return (
    <div className="notification-container">
      <div
        className="notification-bell"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        🔔
        {notifications.length > 0 && (
          <span className="badge">{notifications.length}</span>
        )}
      </div>

      {showDropdown && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <p>No new notifications</p>
          ) : (
            notifications.map((note) => (
              <div key={note.id} className="notification-item">
                {note.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Notification;

