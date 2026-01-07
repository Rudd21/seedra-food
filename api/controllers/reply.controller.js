import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const addReply = async(req, res) => {

    const { commentId, replyText } = req.body

    try {
        await prisma.reply.create({
            data: { text: replyText, commentId, userId: req.user.id }
        })
        res.status(200).json({ message: "Відповідь на коментар додано!" })
    } catch (err) {
        console.error("Помилка додавання коментаря")
        res.status(500).json({ error: err })
    }
}

export const reqReply = async(req, res) => {

    const { q } = req.query;

    try {
        const replies = await prisma.reply.findMany({
            where: { commentId: q }
        })
        console.log("replies:", replies)
        res.status(200).json(replies)
    } catch (err) {
        console.error("Помилка отримання списку відповідей")
        res.status(500).json({ error: err })
    }
}