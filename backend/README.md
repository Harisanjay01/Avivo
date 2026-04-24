# Community REST API (Express & MySQL)

A production-ready REST API built with Node.js, Express, and MySQL.

## Features
- **Real MySQL Persistence**: Data is stored and fetched from a real database.
- **Security**: Uses prepared statements to prevent SQL injection.
- **Connection Pooling**: Efficient database connection management.
- **Modular Architecture**: Clean separation of concerns (Routes, Controllers, Config).
- **Centralized Error Handling**: Unified error responses.

## Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MySQL Server](https://www.mysql.com/)

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Rename `.env.example` to `.env`.
   - Update `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` with your MySQL credentials.

## MySQL Setup

1. Open your MySQL client (e.g., MySQL Workbench, Command Line, or phpMyAdmin).
2. Create the database and table by importing the `setup.sql` file:
   ```bash
   # Using command line
   mysql -u your_username -p < setup.sql
   ```
   *Or copy the contents of `setup.sql` and run them in your SQL editor.*

## Running the Server

- Development mode:
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

## API Endpoints

### GET /users
Fetches all users from the MySQL database.

**Response (200 OK):**
```json
{
  "users": [
    {
      "id": 1,
      "firstName": "Sarah",
      "lastName": "Johnson",
      "email": "sarah.j@future.io",
      "phone": "+1 555-0101",
      "age": 28,
      "company": "Future Collective",
      "country": "USA",
      "image": "..."
    },
    ...
  ]
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Database connection failed"
}
```
