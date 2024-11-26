CREATE DATABASE taskmgmt;

-- Creation of Users table into task-mgmt db
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Creation of Tasks table into task-mgmt db
CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    task_title VARCHAR(250) UNIQUE NOT NULL,
    task_description TEXT,
    state BOOLEAN DEFAULT FALSE 
);

-- Inserting dummy data into the users table
-- You'll have to register and login users and to test the functionality!

-- Inserting dummy data into the tasks table
INSERT INTO tasks (user_id, task_title, task_description, state) VALUES
(1, 'Complete project documentation', 'Finalize and submit the documentation for the task management system.', FALSE),
(1, 'Set up PostgreSQL database', 'Install and configure PostgreSQL for the project.', TRUE),
(2, 'Create API endpoints', 'Develop and test the API endpoints for user registration and authentication.', FALSE),
(2, 'Debug login functionality', 'Identify and fix bugs in the login feature.', TRUE),
(3, 'Design database schema', 'Draft the schema for the database tables and relationships.', FALSE),
(3, 'Seed database with test data', 'Insert dummy data into the database for testing purposes.', TRUE),
(4, 'Implement task editing', 'Add functionality for editing existing tasks.', FALSE),
(4, 'Write unit tests', 'Create and execute unit tests for all API endpoints.', TRUE);
