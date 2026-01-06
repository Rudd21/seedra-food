import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const searchUserById = async(req, res) => {
    const { q } = req.query;

    try {
        const userInfo = await prisma.user.findUnique({
            where: { id: q }
        })

        res.status(200).json(userInfo)
    } catch {
        res.status(500).json({ message: "Невдалося знайти користувача за ID" })
    }
}

export const banUser = async(req, res) => {
    const { userId, days, reason } = req.body;

    const banDays = Number(days);
    const banUntil = new Date()
    banUntil.setDate(banUntil.getDate() + banDays);

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                isBanned: true,
                banReason: reason,
                banUntil
            }
        })

        res.status(200).json("Успішно забанено користувача!")
    } catch {
        res.status(500).json({ message: "Невдалося забанити користувача" })
    }
}

export const unbanUser = async(req, res) => {
    const { userId } = req.body;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                isBanned: false,
                banReason: null,
                banUntil: null
            }
        })

        res.status(200).json("Успішно розбанено користувача!")
    } catch {
        res.status(500).json({ message: "Невдалося розбанити користувача" })
    }
}