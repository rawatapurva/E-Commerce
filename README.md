# 🛍️ Shopping App

A full-stack shopping application built with **React**, **Node.js**, **Express**, and **MongoDB**.  
It supports user authentication, cart management, and product display using the Fake Store API.

---

## 🚀 Features
- **User Authentication** (Signup, Login, Logout)
- **Cart Management** (Add, Remove, Persist per user)
- **Product Listing** using [Fake Store API](https://fakestoreapi.com/)
- **Responsive UI** with React & TailwindCSS
- **Backend** with Express & MongoDB (Atlas)
- **Redux Toolkit** for state management

---

## 🛠️ Tech Stack
**Frontend:**
- React + Vite
- Redux Toolkit
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas

---

## ⚡ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/shopping-app.git
cd shopping-app

Install dependencies

For frontend:
cd frontend
npm install

For backend:
cd ../backend
npm install

⚙️ Environment Variables

Create .env in the backend folder:

MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret
PORT=5000

Create .env in the frontend folder:

VITE_API_URL=https://fakestoreapi.com/products
VITE_BACKEND_URL=http://localhost:5000/api

