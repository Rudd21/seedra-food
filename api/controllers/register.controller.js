import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const register = async(req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ message: "Немає значень одного з полів!" })
    }

    try {
        await prisma.user.create({
            data: { name, email, password }
        })
        res.status(200).json({ message: "Користувача додано до бази даних!" })
    } catch (err) {
        console.error("Помилка при додавані користувача до бази даних:", err)
        res.status(500).json({ error: "Помилка при додавані користувача до бази даних!" })
    }
}