import jwt from "jsonwebtoken"

const authentication = (req, res, next) => {
    const token = req.cookies.auth_token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access!"})
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (err) {
        throw new Error(401, "Unauthorized Access Token!")
    }
}

export default authentication