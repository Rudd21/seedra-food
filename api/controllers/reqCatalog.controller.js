import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const reqCatalog = async(req, res) => {
    try {
        const products = await prisma.product.findMany({ include: { comment: { select: { rating: true } } } });

        const cleanProducts = products.map(p => {
            const avg = p.comment.length ?
                p.comment.reduce((s, c) => s + c.rating, 0) / p.comment.length :
                null;

            return {
                ...p,
                avgRating: avg
            };
        });
        res.status(200).json(cleanProducts)
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