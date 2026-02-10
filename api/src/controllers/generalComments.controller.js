import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const reqGeneralComments = async(req, res) => {

    try {
        const generalComments = await prisma.generalComment.findMany({
            take: 3,
            include: { user: { select: { id: true, name: true, avatar: true } } },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json(generalComments)
    } catch (err) {
        console.error("Помилка при отриманні коментарів:", err)
        res.status(500).json({ error: "Помилка при отриманні коментарів" })
    }
}

export const addGeneralComment = async(req, res) => {

    const { generalComment, generalRating } = req.body;

    const cleanRating = Number(generalRating)

    if (!generalComment || !generalRating) {
        return res.status(500).json({ error: "Помилка при отриманні коментарів" })
    }

    try {
        await prisma.generalComment.create({
            take: 3,
            data: { text: generalComment, rating: cleanRating, userId: req.user.id }
        });

        res.status(200).json({ message: "Успішно добавлено коментар" })
    } catch (err) {
        console.error("Помилка при отриманні коментарів:", err)
        res.status(500).json({ error: "Помилка при отриманні коментарів" })
    }
}