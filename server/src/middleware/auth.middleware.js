import { text } from "express"

import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: 'Немає токену!' })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Ваш токенс не дійсний!' })
    }
};