import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const addComment = async(req, res) => {

    const { productId, text } = req.body

    try {
        const newComment = await prisma.comment.create({
            data: { productId, text, userId: req.user.id }
        })
        res.status(200).json({ message: "Продукт додано!" })
    } catch (err) {
        console.error("Помилка додавання коментаря")
        res.status(500).json({ error: err })
    }
}