import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import pool from "../db.js"

// Home Handler
const homeHandler = (req, res) => {
    res.json("Welcome to Task Management API")
}

// Register a User
const registerUser = async (req, res) => {
    try {
        // Capturing the required credentials 
        const { name, email, password } = req.body;

        // check if the user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message : 'User already exists'});
        }

        // Hash the password
        const hashedPass = await bcrypt.hash(password, 10)

        // Insert the user into database
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPass]
        )

        res.status(201).json({ message: 'User Registered successfully', data: newUser.rows[0]})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Internal Server Error!"})
    }
}

// Login a User and set Cookies for authentication
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // check if the User exists
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (user.rows.length === 0) {
            return res.status(400).json({ message: "User doesn't exist"})
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.rows[0].password)
        if(!isMatch){
            return res.status(400).json({message : "Invalid Email or Password"})
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.rows[0].user_id}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })

        // Set the token in an HTTP-only cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000,
        })

        // send response of loggedIn user
        res.status(200).json({ message: 'Login Successful'})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: "Internal Server Error!"})
    }
}

// Logout a User and delete a cookie
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000,
        })
        res.status(200).json({ message: "Logout Successful"})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: "Internal Server Error!"})
    }
}

export {
    homeHandler,
    registerUser,
    loginUser,
    logoutUser
}