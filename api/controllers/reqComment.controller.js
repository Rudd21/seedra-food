import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const reqComment = async(req, res) => {
    const { productId } = req.query

    try {
        const comments = await prisma.comment.findMany({
            where: { productId: productId },
            include: { user: { select: { id: true, name: true } } },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json(comments)
    } catch (err) {
        console.error("Помилка при отриманні коментарів:", err)
        res.status(500).json({ error: "Помилка при отриманні коментарів" })
    }
}