# 🥛 Dairy Delights – Online Dairy Store (React + JSON Server)

Dairy Delights is a full-stack **React.js e-commerce application** designed for ordering fresh, organic dairy products online. It includes a modern user interface, customer order flow, and an admin dashboard for order management.

![React](https://img.shields.io/badge/React-18-blue) 
![JSON Server](https://img.shields.io/badge/Backend-JSON--Server-orange) 
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🛍️ Customer Features
- **Browse Product Catalog** (Milk, Butter, Cheese, Yogurt, Paneer, etc.)
- **Search & Filter** dairy items by name and category
- **Place Orders Easily** with form validation & quantity handling
- **Order Summary Page** showing order details & pricing
- **Real-Time Notifications** when orders are placed or updated

---

### 👨‍💼 Admin Features
- **Secure Admin Login** using a secret code
- **Order Dashboard** with all customer order details
- **Update Order Status** (Pending → Approved / Ignored)
- **Filter Orders** based on status
- **Notification Bell** with unread count

---

### 🎨 UI/UX Features
- Fully **Responsive Design**
- Modern **green-themed styling**
- Smooth hover effects & transitions
- Clean layout for product grid & admin overview
- Custom notification pop-ups

---

## 🛠️ Tech Stack

| Layer        | Technology |
|--------------|------------|
| Frontend     | React.js, React Router DOM |
| Styling      | CSS3, Flexbox, Grid |
| Icons        | React Icons (Font Awesome) |
| Backend      | JSON Server (db.json) |
| State Mgmt   | React Hooks (useState, useEffect) |

---

## 📦 Installation & Setup

### ✔️ Requirements
- Node.js (v14+)
- npm or yarn

### ✔️ Steps

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/dairy-delights.git
cd dairy-delights
```

#### 2️⃣ Install Frontend Dependencies
```bash
npm install
```

#### 3️⃣ Start JSON Server (Backend)
```bash
npm run server
```
Runs at → **http://localhost:3001**

#### 4️⃣ Start React Application
```bash
npm start
```
Runs at → **http://localhost:3000**

---

## 🗂️ Project Structure

```
dairy-delights/
├── public/
│   ├── dairies/             # Product images
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AdminLogin/      # Admin login
│   │   ├── Footer/          # Footer
│   │   ├── Header/          # Navigation + Search
│   │   ├── LandingPage/     # Product listing grid
│   │   ├── Notification/    # Notification bell & popups
│   │   ├── Order/           # Customer order form
│   │   ├── OrderRequests/   # Admin order management
│   │   └── OrderSummary/    # Order confirmation
│   ├── data/
│   │   └── db.json          # JSON Server database
│   ├── App.js               # Main App component
│   └── index.js             # App entry point
```

---

## 🎯 Key Application Modules

### 🔐 **Admin Login**
- Admin access via security code  
- Redirects to Order Dashboard after login

### 🏠 **Landing Page**
- Displays all dairy products in a responsive grid  
- Search bar + Category filters  
- “Order Now” buttons for each item

### 🧾 **Order Form**
- Customer details  
- Product summary  
- Real-time price calculation  
- Validation for all fields

### 📋 **Order Summary**
- Displays ordered product  
- Customer details  
- Estimated delivery time  
- Total pricing

### 👨‍💼 **Admin Dashboard**
- View all customer orders  
- Approve / Ignore orders  
- Filter by *Pending*, *Approved*, *Ignored*

---

## 📊 API Endpoints (JSON Server)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | Fetch all products |
| GET | /products/:id | Fetch specific product |
| GET | /orders | Fetch all orders |
| POST | /orders | Create new order |
| PATCH | /orders/:id | Update order status |

---

## 🎨 Color Scheme

| Purpose | Color |
|---------|--------|
| Primary Green | `#2e7d32` |
| Secondary Green | `#256629` |
| Accent (Buttons) | `#ff5722` |
| Background | `#f5f5f5` |

---

## 📱 Responsive Design
- Mobile-first UI  
- Adaptive grids  
- Touch-friendly buttons  
- Smooth navigation  

---

## 🔒 Security Features
- Admin authentication  
- Frontend form validation  
- React’s built-in XSS protection  

---

## 🚀 Future Enhancements
- User login system  
- Payment gateway integration  
- Email/SMS notifications  
- Inventory management  
- Customer reviews system  
- Admin analytics dashboard  

---

## 🤝 Contributing
1. Fork the repository  
2. Create a feature branch  
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Commit changes  
   ```bash
   git commit -m "Add new feature"
   ```
4. Push branch  
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Open a Pull Request  

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Author
**Pragadesh**  
Frontend Developer  
GitHub: `@your-username`  
Email: your-email@example.com  

---

## ⭐ Support
If you like this project, please **star ⭐ the repository**!

