import express from "express"
import {
    homeHandler,
    registerUser,
    loginUser,
    logoutUser
} from "../controllers/userController.js"
import {
    getTasks,
    addTask,
    toggleTaskState,
    updateTask,
    deleteTask
} from "../controllers/taskController.js"
import authentication from "../middleware/auth.js"

const router = express.Router()

// User routes
router.get("/api", homeHandler)
router.post("/api/register", registerUser)
router.post("/api/login", loginUser)
router.post("/api/logout", authentication, logoutUser)

// Task routes
router.get("/api/user/get/tasks", authentication, getTasks)
router.post("/api/user/add/task", authentication, addTask)
router.patch("/api/user/finish/task", authentication, toggleTaskState)
router.patch("/api/user/edit/task", authentication, updateTask)
router.delete("/api/user/delete/task", authentication, deleteTask)

export default router