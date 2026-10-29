# M-Task

## Project Overview

M-Task is a task management system application MERN-Stack that helps users to organize their daily tasks in professional or study,set due date for tasks and track their progress. M-Task project contain role based athuentcation superadmin role is for managing users and monitoring users task, viewing reports and superadmin can handel contact enquiries from users and external visitor send reply mail for enquiries and another role is user cane create tasks,update task,set duedate is optional and track their task progress and M-Task is inspired by microsoft TO Do

## Features in M-Task

* User registration, login, and forgotpassword reset
* create, edit, and delete tasks
* Mark tasks as important or completed
* set due dates for tasks and track overdue
* Organize tasks using custom list like work,clg etc.
* view due tasks in calendar
* Mange profile and appilcation settings
* superadmin dashboard, user management, task view, report montoring and contact enquiries

## technologies used

* Frontend: React, Vite, Tailwind-CSS
* Backend: Node.js, Express.js
* Database: MongoDB, Mongoose
* Authentication: JWT token and bcrypt
* Email: Nodemailer

## Requirements

* Node.js and npm
* Mongodb
* SMTP account for email features

## How to Run the M-TASK project

## 1.Install the dependencies

cd backend run
npm install

cd /frontend run
npm install


## 2.create .env envronment file in the backed folder

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password

Replace the placeholder area values with your oun configuration input. keep the .env file in gitognore


## 3.Start the backend

## open terminal and run:

cd backend
node Server.js

The backend runs on "http://localhost:5001"

## 4.Start the forntend

## open another new terminal and run:

cd frontend
npm run dev

open the url shown in the frontend terminal,its on "http://localhost:5173"

## 5.run using Makefile

The project includes Makefile to simplify starting the application.

Requirements: GNU Make, Node.js, npm, and a configured MongoDB connection.

To start the backend and frontend together, open a terminal in the project root folder and run:

make dev

This command starts both frontend and backend. The frontend is available at http://localhost:5173, and the backend runs at http://localhost:5001.