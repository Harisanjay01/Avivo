Full Stack User Management App

This project is a full stack application built as part of an interview assignment. It demonstrates how data flows from a MySQL database, through a Node.js backend, and into a modern React-based frontend dashboard.

Features

Frontend
Displays a list of users with details like avatar, name, company, role, and country
Includes a real-time search that filters users across all fields instantly
Refresh option to sync the UI with the latest data from the database
Ability to add a user locally using a "+" button (only updates UI, not database)

Option to delete users from the UI without affecting backend data
Backend

Provides a GET /users API to fetch all users from the database
Uses Prisma ORM for structured queries and better security
Includes a seeding script to populate the database using DummyJSON sample data


Tech Stack

Frontend
React with functional components and hooks
Chakra UI for building a clean and responsive interface
Axios for API communication
Framer Motion for smooth UI animations

Backend
Node.js with Express.js

Prisma ORM for database interaction

MySQL database hosted on Railway
Setup Instructions

Clone the Project
git clone https://github.com/Harisanjay01/Avivo.git
cd Avivo

Backend Setup
cd backend
npm install

Create a .env file and add your DATABASE_URL

npx prisma db push
npm run seed
npm run dev

The backend will run on http://localhost:5001

Frontend Setup
cd ../frontend
npm install
npm run dev

The frontend will run on http://localhost:5175

Project Overview

This project is structured with clear separation between different layers:

Database Layer

Prisma is used to define and manage the database schema. The User model includes fields such as name, role, and country, aligned with the DummyJSON data structure.

API Layer
The Express server acts as an interface between the frontend and the database. It handles requests and responses, ensuring the frontend does not directly interact with the database.
Frontend Layer
The React application focuses on usability and responsiveness. Instead of waiting for backend updates, it uses local state for adding and removing users instantly, improving user experience.
UI Design

The interface is built using Chakra UI with added animations from Framer Motion, giving it a smooth and modern dashboard feel without relying on basic layouts.
