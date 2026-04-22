# 👤 User Directory — Full Stack App

A premium full-stack user management app built with **React**, **Node.js/Express**, **Prisma ORM**, and **MySQL**.

Data is sourced from [DummyJSON](https://dummyjson.com/users) and stored in a remote Railway MySQL database.

---

## 🗂️ Project Structure

```
avivo/
├── backend/          # Node.js + Express + Prisma
│   ├── prisma/
│   │   ├── schema.prisma   # Prisma data model
│   │   └── seed.js         # DB seeder (fetches from DummyJSON)
│   ├── server.js           # Express API server
│   └── .env                # Environment variables
└── frontend/         # React + Vite + Chakra UI
    └── src/
        ├── components/
        │   ├── SearchBar.jsx
        │   ├── UserTable.jsx
        │   └── UserCard.jsx
        ├── App.jsx
        ├── theme.js
        └── main.jsx
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

### Push Schema to Database
```bash
npx prisma db push
```

### Seed the Database
Fetches 30 users from DummyJSON and inserts them into MySQL:
```bash
npm run seed
# or
node prisma/seed.js
```

### Start the Server
```bash
npm start          # production
npm run dev        # development (with nodemon auto-reload)
```

Server runs at: **http://localhost:5000**

### API Endpoints
| Method | Endpoint  | Description            |
|--------|-----------|------------------------|
| GET    | /users    | Returns all users      |
| GET    | /         | Health check           |

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs at: **http://localhost:5173**

---

## ✨ Features

| Feature | Description |
|---|---|
| 📋 User Table | Displays avatar, name, company, role, country |
| 🔍 Search | Real-time filter across name, email, company, role, country |
| ➕ Add User | Injects a static user into local state (no DB write) |
| 🗑️ Delete | Removes user from the current view (no DB write) |
| 🔄 Refresh | Re-fetches users from the API to restore state |
| ⏳ Loading State | Spinner with message during API calls |
| ⚠️ Error State | Alert banner on failed API requests |

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, Chakra UI v2, Axios, Framer Motion |
| Backend    | Node.js, Express 5, Prisma 5        |
| Database   | MySQL (Railway hosted)              |
| ORM        | Prisma 5 (SQL injection protected)  |

---

## 🌱 Environment Variables

Create `backend/.env`:
```env
DATABASE_URL="mysql://user:password@host:port/dbname"
PORT=5000
```
