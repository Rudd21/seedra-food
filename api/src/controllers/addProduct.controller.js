import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addProduct = async(req, res) => {
    const ProductTypes = ["BUNDLES", "HERBS", "VEGETABLES", "FRUITS", "SUPPLIES", "FLOWERS"]

    const { name, type, price, description } = req.body;
    const cleanType = type.trim().toUpperCase();
    const imageName = req.file ? req.file.filename : null;

    if (!name) {
        return res.status(400).json({ error: "Поле 'name' обов'язкове!" });
    }

    if (!ProductTypes.includes(cleanType)) {
        return res.status(400).json({ error: "Не підходить під жодний тип! Челллл" });
    }

    if (!price) {
        return res.status(400).json({ error: "Немає ціни!" });
    }

    if (!description) {
        return res.status(400).json({ error: "Ну чел, постарайся хочаби трошки написати!" });
    }

    try {
        const newProduct = await prisma.product.create({
            data: { image: imageName, name, type: cleanType, price, description, user: { connect: { id: req.user.id } } }
        });
        res.status(200).json({ message: "Продукт успішно додано!", data: newProduct });
    } catch (err) {
        console.error('Помилка при додаванні продукту:', err);
        res.status(500).json({ error: 'Помилка при додаванні продукту:' });
    }
}