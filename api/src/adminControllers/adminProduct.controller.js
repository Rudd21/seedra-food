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

export const updateProduct = async(req, res) => {
    const ProductTypes = ["BUNDLES", "HERBS", "VEGETABLES", "FRUITS", "SUPPLIES", "FLOWERS"]

    const { id, image, name, type, price, oldPrice, description } = req.body;

    console.log("Отриманий oldPrice", req.body.oldPrice);

    const cleanType = type.trim().toUpperCase();
    const imageName = req.file ? req.file.filename : null;

    const isSale = oldPrice ? false : true
    console.log("isSale", isSale)
    const checkOldPrice = oldPrice == '' ? null : oldPrice
    const checkImage = imageName ? imageName : image

    if (!ProductTypes.includes(cleanType)) {
        return res.status(400).json({ error: "Не підходить під жодний тип!" });
    }

    try {
        const newProduct = await prisma.product.update({
            where: { id },
            data: { image: checkImage, name, type: cleanType, price, oldPrice: checkOldPrice, isSale, description }
        });
        res.status(200).json({ message: "Продукт успішно оновлено!", data: newProduct });
    } catch (err) {
        console.error('Помилка при оновлені продукту:', err);
        res.status(500).json({ error: 'Помилка прионовлені продукту:' });
    }
}