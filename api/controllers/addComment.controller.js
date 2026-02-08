import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const addComment = async(req, res) => {

    const { productId, text, rating } = req.body
    const cleanRating = Number(rating)

    if (!rating) {
        return res.status(500).json({ message: "Немає рейтингу" })
    }

    try {
        await prisma.comment.create({
            data: { productId, text, rating: cleanRating, userId: req.user.id }
        })
        res.status(200).json({ message: "Коментар додано!" })
    } catch (err) {
        console.error("Помилка додавання коментаря")
        res.status(500).json({ error: err })
    }
}

export const addReply = async(req, res) => {

    const { productId, parentId, replyText } = req.body

    if (!replyText) {
        return res.status(500).json({ message: "Немає тексту" })
    }

    try {
        await prisma.comment.create({
            data: { productId, text: replyText, parentId, userId: req.user.id }
        })
        res.status(200).json({ message: "Відповідь на коментар додано!" })
    } catch (err) {
        console.error("Помилка додавання відповіді на коментар")
        res.status(500).json({ error: err })
    }
}