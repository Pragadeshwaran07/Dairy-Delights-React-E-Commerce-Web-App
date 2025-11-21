import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Order.css";

function Order() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    email: "",
    contact: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState({});

  // fetch product
  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  // validate fields live
  const validate = (name, value) => {
    let error = "";

    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "") ||
      (typeof value === "number" && value <= 0)
    ) {
      error = "This field is required";
    } else {
      switch (name) {
        case "firstName":
        case "lastName":
          if (!/^[A-Za-z][A-Za-z\s]*$/.test(value)) {
            error =
              "Must start with a letter and contain only letters/spaces";
          }
          break;
        case "postalCode":
          if (!/^\d{6}$/.test(value)) error = "Postal Code must be 6 digits";
          break;
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            error = "Invalid email address";
          break;
        case "contact":
          if (!/^\d{10}$/.test(value)) error = "Contact must be 10 digits";
          break;
        case "quantity":
          if (parseInt(value) <= 0) error = "Quantity must be at least 1";
          break;
        default:
          break;
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(form).forEach((field) => {
      newErrors[field] = validate(field, form[field]);
    });

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (hasError) {
      alert("Please fix errors before submitting ❌");
      return;
    }

    const orderDate = new Date();
    const deliveryStart = new Date(Date.now() + 30 * 60 * 1000);
    const deliveryEnd = new Date(Date.now() + 60 * 60 * 1000);

    const order = {
      ...form,
      productName: product.productName,
      price: product.price * form.quantity,
      image: product.image, 
      orderDate: orderDate.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      deliveryTime: `${deliveryStart.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })} - ${deliveryEnd.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    };

    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
    .then((res) => res.json())
    .then((data) => {
      alert(`Order placed for ${form.quantity} ${product.productName}(s) 🎉`);
      navigate(`/order-summary/${data.id}`); // ✅ redirect to summary page
      })
      .catch((err) => console.error(err));

  };

  if (!product) return <p>Loading...</p>;

  const totalPrice = product.price * form.quantity;

  const orderDateNow = new Date();
  const deliveryStartNow = new Date(Date.now() + 30 * 60 * 1000);
  const deliveryEndNow = new Date(Date.now() + 60 * 60 * 1000);

  return (
    <div className="order-container">
      <h2>Place Your Order</h2>
      <div className="order-details">
        <div className="order-left">
          <img
            src={process.env.PUBLIC_URL + "/" + product.image}
            alt={product.productName}
          />
          <div className="product-info">
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <p>Price per item: ₹{product.price}</p>
            <p className="total-price">Total: ₹{totalPrice}</p>
            <p>
              <b>Order Date:</b>{" "}
              {orderDateNow.toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>
              <b>Delivery Time:</b>{" "}
              {deliveryStartNow.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {deliveryEndNow.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Form */}
        <form onSubmit={handleSubmit} className="order-form">
          {[
            { name: "firstName", type: "text", placeholder: "First Name" },
            { name: "lastName", type: "text", placeholder: "Last Name" },
            { name: "address", type: "text", placeholder: "Delivery Address" },
            { name: "city", type: "text", placeholder: "City" },
            { name: "state", type: "text", placeholder: "State" },
            { name: "postalCode", type: "text", placeholder: "Postal Code" },
            { name: "email", type: "email", placeholder: "Email" },
            { name: "contact", type: "text", placeholder: "Contact Number" },
            {
              name: "quantity",
              type: "number",
              placeholder: "Quantity",
              min: 1,
            },
          ].map((field) => (
            <div key={field.name} className="input-group">
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                min={field.min || undefined}
              />
              {errors[field.name] && (
                <span className="error">{errors[field.name]}</span>
              )}
            </div>
          ))}

          <button type="submit">Confirm Order</button>
        </form>
      </div>
    </div>
  );
}

export default Order;
