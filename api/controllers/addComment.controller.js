import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const addComment = async(req, res) => {

    const { productId, text, rating } = req.body
    const cleanRating = Number(rating)

    try {
        await prisma.comment.create({
            data: { productId, text, rating: cleanRating, userId: req.user.id }
        })
        res.status(200).json({ message: "Продукт додано!" })
    } catch (err) {
        console.error("Помилка додавання коментаря")
        res.status(500).json({ error: err })
    }
}