import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const userProducts = async(req, res) => {
    try {
        const products = await prisma.product.findMany({
            // where: {
            //     userId: req.user.id
            // }
            where: { userId: req.user.id },
            include: {
                comment: {
                    select: {
                        rating: true,
                        text: true,
                        userId: true
                    }
                }
            }
        })
        await console.log("Що я вибрав про товари користувача:", products);

        const cleanProducts = products.map(p => {
            const avg = p.comment.length ? p.comment.reduce((s, c) => s + c.rating, 0) / p.comment.length : null;

            return {
                ...products,
                avgRating: avg
            };
        })

        res.status(200).json(cleanProducts)
    } catch (error) {
        console.log("Виникла помилка при отриммані продуктів користувача", error)
        res.status(500).json({ error: "Помилка при отримані продуктів користувача" })
    }
}