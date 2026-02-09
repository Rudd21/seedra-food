import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const reqComment = async(req, res) => {
    const { productId } = req.query

    try {
        const comments = await prisma.comment.findMany({
            where: { productId: productId },
            include: { user: { select: { id: true, name: true, avatar: true } }, replies: { select: { id: true, parentId: true, text: true, userId: true } } },
            orderBy: { createdAt: 'desc' }
        });

        const cleanComments = comments.map(comment => {
            const replies = comment.replies.length;

            return {
                ...comment,
                countReplies: replies
            };
        })
        res.status(200).json(cleanComments)
    } catch (err) {
        console.error("Помилка при отриманні коментарів:", err)
        res.status(500).json({ error: "Помилка при отриманні коментарів" })
    }
}