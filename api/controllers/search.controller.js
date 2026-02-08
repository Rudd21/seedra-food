import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchUsers = async(req, res) => {
    const { q } = req.query;

    try {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: q,
                    mode: 'insensitive'
                }
            }
        })
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: "Невдалося дістати користувача" })
    }
}

export const searchProduct = async(req, res) => {
    const { q } = req.query;

    try {
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: q,
                    mode: 'insensitive'
                }
            }
        })
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: "Невдалося дістати товари" })
    }
}