import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const reqUser = async(req, res) => {
    const { userId } = req.query;

    console.log("Користувача що треба знайти:", userId)

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        console.log("User дані профіля якого запитуються:", user)

        res.status(200).json(user)
    } catch (err) {
        console.error("Помилка при отриманні профіля користувача:", err)
        res.status(500).json({ error: "Помилка при отриманні профілю" })
    }
}