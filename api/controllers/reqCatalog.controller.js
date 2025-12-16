import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const reqCatalog = async(req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products)
    } catch (err) {
        console.error("Помилка при отриманні каталогу:", err)
        res.status(500).json({ error: "Помилка при отриманні каталогу" })
    }
}