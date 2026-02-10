import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async(req, res) => {
    try {

        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return res.status(400).json({ message: "Пароль або пошта не вірна!" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Пароль або пошта не вірна!" })
        }

        const token = jwt.sign({ id: user.id, email: user.email },
            process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60
        })

        res.status(200).json({ message: "Авторизація успішна", token })

    } catch (err) {
        console.error("Помилка під час логіну:", err);
        res.status(500).json({ message: "Помилка сервера!", error: err.message })
    }
}