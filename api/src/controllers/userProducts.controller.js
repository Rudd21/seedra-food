import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const userProducts = async(req, res) => {
    const { id } = req.params;

    try {
        const products = await prisma.product.findMany({
            where: { userId: id },
            include: {
                comment: {
                    select: {
                        rating: true
                    }
                }
            }
        })

        const cleanProducts = products.map(p => {
            const avg = p.comment.length ? p.comment.reduce((s, c) => s + c.rating, 0) / p.comment.length : null;

            return {
                ...p,
                avgRating: avg
            };
        })

        res.status(200).json(cleanProducts)
    } catch (error) {
        console.log("Виникла помилка при отриммані продуктів користувача", error)
        res.status(500).json({ error: "Помилка при отримані продуктів користувача" })
    }
}