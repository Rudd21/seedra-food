import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const searchCommentById = async(req, res) => {
    const { q } = req.query;

    try {
        const commentInfo = await prisma.comment.findUnique({
            where: { id: q }
        })

        res.status(200).json(commentInfo)
    } catch {
        res.status(500).json({ message: "Невдалося знайти коментар за ID" })
    }
}

export const deleteComment = async(req, res) => {
    const { commentId } = req.body;

    try {
        const object = await prisma.comment.delete({
            where: { id: commentId }
        })
        res.status(200).json({ message: "Успішно видалено коментар" })
    } catch {
        res.status(500).json({ message: "Невдалося видалити коментар" })
    }
}