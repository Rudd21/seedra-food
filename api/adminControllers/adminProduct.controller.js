import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const searchProductById = async(req, res) => {
    const { q } = req.query;

    try {
        const productInfo = await prisma.product.findUnique({
            where: { id: q },
            include: {
                user: {
                    select: {
                        isBanned: true
                    }
                }
            }
        });
        console.log("Що відправляєм на фронт:", productInfo)
        res.status(200).json(productInfo)
    } catch {
        res.status(500).json({ message: "Невдалося знайти товар за ID" })
    }
}

export const changeStatus = async(req, res) => {
    const { reportId, status } = req.body;

    try {
        await prisma.report.update({
            where: { id: reportId },
            data: { status }
        })

        res.status(200).json({ message: "Статус скарги успішно змінено" })
    } catch {
        res.status(500).json({ message: "Невдалося змінити статус скарги" })
    }
}

export const changeName = async(req, res) => {
    const { productId, name } = req.body;

    try {
        await prisma.product.update({
            where: { id: productId },
            data: { name }
        })

        res.status(200).json({ message: "Назву товару успішно змінено" })
    } catch {
        res.status(500).json({ message: "Невдалося змінити назву товару" })
    }
}

export const changeDescription = async(req, res) => {
    const { productId, description } = req.body;

    try {
        await prisma.product.update({
            where: { id: productId },
            data: { description }
        })

        res.status(200).json({ message: "Опис товару успішно змінено" })
    } catch {
        res.status(500).json({ message: "Невдалося змінити опис товару" })
    }
}

export const changeOldPrice = async(req, res) => {
    const { productId, oldPrice } = req.body;
    console.log("productId, oldPrice:", productId, oldPrice)

    try {

        if (oldPrice == '') {
            return await prisma.product.update({
                where: { id: productId },
                data: { oldPrice: null, isSale: false }
            })
        } else {
            await prisma.product.update({
                where: { id: productId },
                data: { oldPrice, isSale: true }
            })
        }

        res.status(200).json({ message: "Стару ціну товару успішно назначено" })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message })
    }
}

export const changePrice = async(req, res) => {
    const { productId, price } = req.body;

    try {
        await prisma.product.update({
            where: { id: productId },
            data: { price }
        })

        res.status(200).json({ message: "Ціну товару успішно змінено" })
    } catch {
        res.status(500).json({ message: "Невдалося змінити ціну товару" })
    }
}

export const changeVisible = async(req, res) => {
    const { productId } = req.body;

    try {
        await prisma.product.update({
            where: { id: productId },
            data: { isVisible: false }
        })

        res.status(200).json({ message: "Видимість товару успішно змінено" })
    } catch {
        res.status(500).json({ message: "Невдалося змінити видимість товару" })
    }
}