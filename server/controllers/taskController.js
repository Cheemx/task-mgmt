import pool from "../db.js";

const getTasks = async( req, res ) => {
    try {
        // Accessing the logged in User and its user_id from auth middleware
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({ message: "Invalid User!" })
        }

        // Getting the list of tasks
        const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId])

        // Sending the list of tasks
        res.status(200).json({
            message: "List of tasks assigned", 
            Tasks: tasks.rows
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

const addTask = async(req, res) => {
    try {
        // Accessing the userID
        const userId = req.user.userId

        if (!userId) {
            return res.status(401).json({ message: "Invalid User!" })
        }

        // Getting the task from request body
        const { title, description } = req.body

        if(!title || !description){
            console.error("All Fields are Necessary!")
        }

        // Inserting the task into tasks table
        const task = await pool.query("INSERT INTO tasks (user_id, task_title, task_description) VALUES ($1, $2, $3) RETURNING *", [userId, title, description])

        // Sending the response of successful insertion
        if (!task) {
            console.error("Error while inserting the task")
        }
        res.status(200).json({
            message: "Task added successfully!",
            Task: task.rows[0]
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Internal Server Error!"})
    }
}

const toggleTaskState = async(req, res) => {
    try {
        // Accessing the user ID from auth middleware
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({ message: "Invalid User!" })
        }

        // Getting task id from user
        const { id, state } = req.body

        if (!id) {
            return res.status(400).json({ message: "Enter the Task ID"})
        }

        if (typeof state !== "boolean") {
            return res.status(400).json({ message: "True/False states only!"})
        }

        // Updating the state of task
        const updatedTask = await pool.query("UPDATE tasks SET state = $1 WHERE task_id = $2 AND user_id = $3 RETURNING *", [state, id, userId])

        if (!updatedTask.rows.length) {
            return res.status(404).json({ message: "Task not found!"})
        }

        // Sending the response of success
        res.status(200).json({
            message: `Task marked as ${state ? "finished" : "unfinished"}`,
            data: updatedTask.rows[0]
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Internal Server Error!"})
    }
}

const updateTask = async (req, res) => {
    try {
        // Grab the user ID from auth middleware
        const userID = req.user.userId

        if (!userID) {
            return res.status(401).json({ message: "Invalid User!" })
        }

        // Get the updates from request body
        const { id, title, description } = req.body

        if (!id) {
            return res.status(400).json({ message: "Task ID is necessary!"})
        }

        // Update the table with updated task (title and description whatever...)
        let updatedTask
        if (title && description) {
            updatedTask = await pool.query("UPDATE tasks SET task_title = $1, task_description = $2 WHERE task_id = $3 AND user_id = $4 RETURNING *", [title, description, id, userID])

            if (!updatedTask.rows.length) {
                return res.status(404).json({ message: "Updation Failed!"})
            }
            updatedTask = updatedTask
        } else if(!title && description) {
            const updatedTaskDescription = await pool.query("UPDATE tasks SET task_description = $1 WHERE task_id = $2 AND user_id = $3 RETURNING *", [description, id, userID])

            if (!updatedTaskDescription.rows.length) {
                return res.status(404).json({ message: "Updation Failed!"})
            }
            updatedTask = updatedTaskDescription
        } else if(title && !description){
            const updatedTaskTitle = await pool.query("UPDATE tasks SET task_title = $1 WHERE task_id = $2 AND user_id = $3 RETURNING *", [title, id, userID])

            if (!updatedTaskTitle.rows.length) {
                return res.status(404).json({ message: "Updation Failed!"})
            }
            updatedTask = updatedTaskTitle
        } else {
            return res.status(400).json({ message: "Nothing to Update!"})
        }

        // send the response of successful updation
        res.status(200).json({
            message: "Task Updated Successfully!",
            updatedTask: updatedTask.rows[0]
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Server Error" })
    }
}

const deleteTask = async (req, res) => {
    try {
        // Get the userID from auth middleware
        const userID = req.user.userId

        if (!userID) {
            return res.status(401).json({ message: "Invalid User!" })
        }

        // get the task id of task to be deleted
        const { id } = req.body

        if (!id) {
            return res.status(400).json({ message: "Task ID is a required field!" })
        }

        // delete the task from database table
        const taskDel = await pool.query("DELETE FROM tasks WHERE task_id = $1 AND user_id = $2 RETURNING *", [id, userID])

        if (!taskDel.rows.length) {
            return res.status(404).json({ message: "Task not found!"})
        }

        // send the response of successful deletion
        res.status(200).json({
            message: `Task ${id} deleted successfully!`,
            deletedTask: taskDel.rows[0]
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Server Error!"})
    }
}

export{
    getTasks,
    addTask,
    toggleTaskState,
    updateTask,
    deleteTask
}