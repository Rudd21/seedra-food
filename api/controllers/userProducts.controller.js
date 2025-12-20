import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const userProducts = async(req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                userId: req.user.id
            }
        })
        res.status(200).json(products)
    } catch (error) {
        console.log("Виникла помилка при отриммані продуктів користувача", error)
        res.status(500).json({ error: "Помилка при отримані продуктів користувача" })
    }
}