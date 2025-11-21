import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderSummary.css";

function OrderSummary() {
  const { id } = useParams(); // order id
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!order) return <p>Loading your order...</p>;

  return (
    <div className="summary-container">
      <h2>✅ Order Confirmed!</h2>
      <p className="thankyou">Thank you for your purchase, {order.firstName} 🎉</p>

      <div className="summary-card">
        <img
        src={`/${order.image}`}
        alt={order.productName}
        className="summary-img"
        />

        <div className="summary-details">
          <h3>{order.productName}</h3>
          <p><b>Quantity:</b> {order.quantity}</p>
          <p><b>Total Price:</b> ₹{order.price}</p>
          <p><b>Order Date:</b> {order.orderDate}</p>
          <p><b>Delivery Time:</b> {order.deliveryTime}</p>
        </div>
      </div>

      <div className="customer-info">
        <h3>📦 Delivery Details</h3>
        <p><b>Name:</b> {order.firstName} {order.lastName}</p>
        <p><b>Address:</b> {order.address}, {order.city}, {order.state} - {order.postalCode}</p>
        <p><b>Contact:</b> {order.contact}</p>
        <p><b>Email:</b> {order.email}</p>
      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default OrderSummary;
