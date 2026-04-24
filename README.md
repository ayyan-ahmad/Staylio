## 🏠 Staylio - Full Stack Vacation Rental Platform

### 📖 Description

Staylio is a full-stack peer-to-peer vacation rental platform inspired by Airbnb. It features secure authentication (Passport.js, JWT), dynamic listings with CRUD operations, Cloudinary image uploads, and a responsive EJS + Bootstrap UI. Built using Node.js, Express, MongoDB, and deployed on Render.

### 🚀 Features

* 🔐 Secure Authentication (Passport.js + JWT)
* 🏡 Create, Read, Update, Delete Listings (CRUD)
* 🖼️ Image Upload using Cloudinary
* 📱 Responsive UI (EJS + Bootstrap)
* 🌍 Fully Deployed on Render

### 🛠️ Tech Stack

* Frontend:** EJS, Bootstrap, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** Passport.js, JWT
* **Cloud Storage:** Cloudinary
* **Deployment:** Render

### 📂 Project Structure

models/        → Database schemas (MongoDB models)  
views/         → EJS templates (UI part)  
controllers/   → Business logic (handling requests & responses)  
routes/        → API routes  
public/        → Static files (CSS, JS, images)  
app.js         → Main server file  


### ⚙️ Installation & Setup

```bash
git clone https://github.com/your-username/staylio.git
cd staylio
npm install
```

### 🔑 Environment Variables (.env)

MONGO_URI=your_mongodb_url
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
JWT_SECRET=your_secret

### ▶️ Run the Project

```bash
npm start
```

### 🌐 Live Demo

👉 staylio-napw.onrender.com/listings
