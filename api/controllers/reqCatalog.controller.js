import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const reqCatalog = async(req, res) => {
    const page = Number(req.query.page)
    const LIMIT = 8;

    const skip = (page - 1) * LIMIT

    try {
        const products = await prisma.product.findMany({
            skip,
            take: LIMIT,
            include: {
                comment: {
                    select: {
                        rating: true
                    }
                }
            },
            orderBy: { id: 'asc' }
        });

        const total = await prisma.product.count();

        const cleanProducts = products.map(p => {
            const avg = p.comment.length ?
                p.comment.reduce((s, c) => s + c.rating, 0) / p.comment.length :
                null;

            return {
                ...p,
                avgRating: avg
            };
        });

        if (cleanProducts.length === 0) return res.status(500).json({ message: "Більше немає товару" })

        res.status(200).json({
            items: cleanProducts,
            currentPage: page,
            totalPages: Math.ceil(total / LIMIT)
        });
    } catch (err) {
        console.error("Помилка при отриманні каталогу:", err)
        res.status(500).json({ error: "Помилка при отриманні каталогу" })
    }
}


export const reqMostSaleProducts = async(req, res) => {
    try {
        const mostSaleProducts = await prisma.product.findMany({
            take: 5,
            where: { isSale: true },
            orderBy: { deltaSale: 'desc' }
        });

        await res.status(200).json(mostSaleProducts)
    } catch (err) {
        console.error("Помилка при отриманні каталогу:", err)
        res.status(500).json({ error: "Помилка при отриманні каталогу" })
    }
}