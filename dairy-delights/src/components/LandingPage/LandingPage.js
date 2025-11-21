import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage({ search, setSearch, category, setCategory }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      item.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="landing-container">
      <h2>Our Dairy Products</h2>

      <div className="products-grid">
        {filteredProducts.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.productName} />
            <h3>{item.productName}</h3>
            <p>{item.description}</p>
            <p><b>Price:</b> ₹{item.price}</p>
            <button onClick={() => navigate(`/order/${item.id}`)}>
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
