# Task Management System

The **Task Management System** is a REST API developed using **Node.js** and **PostgreSQL**. It allows users to manage tasks with various CRUD operations and features authentication and authorization implemented with **JWT** and **bcrypt**.

## Features
- User registration and authentication
- Task creation, retrieval, updating, and deletion
- Marking tasks as finished or unfinished
- Secure handling of sensitive data

## Getting Started

Follow these steps to set up and run the project on your local machine:

### Prerequisites
1. Install and set up PostgreSQL on your machine.

### Installation Steps
1. Navigate to the project directory and locate the database setup file at:
   `task-mgmt/server/database.sql`
2. Run the commands in this file on your PostgreSQL shell to clone the database and seed it with dummy data.
3. Update the database pool configuration in the file:
   `task-mgmt/server/db.js`
   Modify it to match your PostgreSQL settings.
4. Set your environment variables by using the `.env.sample` file as a reference.
5. In your terminal, execute the following commands:
   ```bash
   npm install
   npm run dev
   ```
   - `npm install`: Installs all project dependencies.
   - `npm run dev`: Starts the development server.

6. The project should now be running on the port specified in your `.env` file.
7. You'll have to register and log in some dummy users to test the functionality!

## Postman Collection
You can view and test all the available routes using the following Postman collection:
[Task Management System Postman Collection](https://warped-meadow-913182.postman.co/workspace/New-Team-Workspace~850b93a7-4078-4f7e-bcb5-331e137d6e73/collection/32759292-7300d197-a7ee-4bcb-8d15-711e58e1444f?action=share&creator=32759292)

## Routes

### User Routes
| Method | Route                       | Description                   |
|--------|-----------------------------|-------------------------------|
| GET    | `/api`                     | Home route                   |
| POST   | `/api/register`            | Register a new user          |
| POST   | `/api/login`               | Log in a user                |
| POST   | `/api/logout`              | Log out the authenticated user |

### Task Routes
| Method | Route                            | Description                          |
|--------|----------------------------------|--------------------------------------|
| GET    | `/api/user/get/tasks`           | Get tasks for the logged-in user     |
| POST   | `/api/user/add/task`            | Add a new task                       |
| PATCH  | `/api/user/finish/task`         | Mark a task as finished or unfinished |
| PATCH  | `/api/user/edit/task`           | Edit a task's title or description   |
| DELETE | `/api/user/delete/task`         | Delete a task                        |

## Notes
- Ensure your PostgreSQL service is running before starting the application.
- Adjust environment variables according to your local setup.

That's it! Your Task Management System is ready to use. 🚀
