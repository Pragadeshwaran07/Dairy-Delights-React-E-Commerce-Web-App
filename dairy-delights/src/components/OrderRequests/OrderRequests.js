import React, { useEffect, useState } from "react";
import "./OrderRequests.css";

function OrderRequests({ setNotifications }) {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  const handleApprove = (id) => {
    fetch(`http://localhost:3001/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Approved ✅" }),
    })
      .then(() => {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: "Approved ✅" } : o))
        );
      })
      .catch((err) => console.error(err));
  };

  const handleIgnore = (id, productName) => {
    fetch(`http://localhost:3001/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Ignored ❌" }),
    })
      .then(() => {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: "Ignored ❌" } : o))
        );

        // 🔔 Add notification instantly to App state
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now(),
            message: `Your order for ${productName} is canceled ❌. Refund will be processed.`,
          },
        ]);
      })
      .catch((err) => console.error(err));
  };

  const getStatusClass = (status) => {
    if (status?.includes("Approved")) return "status approved";
    if (status?.includes("Ignored")) return "status ignored";
    return "status pending";
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "pending") return !order.status || order.status === "Pending...";
    if (filter === "approved") return order.status?.includes("Approved");
    if (filter === "ignored") return order.status?.includes("Ignored");
    return true;
  });

  return (
    <div className="orders-container">
      <h2>Order Requests</h2>

      <div className="filter-bar">
        <label>Filter Orders: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="ignored">Ignored</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p>No {filter} orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Order Date</th>
              <th>Delivery Date & Time</th>
              <th>Status</th>
              {filter === "pending" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.firstName} {order.lastName}</td>
                <td>{order.email}</td>
                <td>{order.contact}</td>
                <td>
                  {order.address}, {order.city}, {order.state} - {order.postalCode}
                </td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>₹{order.price}</td>
                <td>{order.orderDate}</td>
                <td>
                  {order.orderDate
                    ? `${order.orderDate.split(",")[0]} | ${order.deliveryTime}`
                    : order.deliveryTime || "Not Assigned"}
                </td>

                <td>
                  <span className={getStatusClass(order.status)}>
                    {order.status || "Pending..."}
                  </span>
                </td>
                {filter === "pending" && (
                  <td>
                    <button
                      onClick={() => handleApprove(order.id)}
                      className="approve-btn"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleIgnore(order.id, order.productName)}
                      className="ignore-btn"
                    >
                      Ignore
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderRequests;

