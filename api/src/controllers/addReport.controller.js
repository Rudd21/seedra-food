import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const addReport = async(req, res) => {

    const { name, description, target, targetId } = req.body
    const userId = req.user.id;
    try {
        await prisma.report.create({
            data: { name, description, target, targetId, userId: req.user.id }
        })
        res.status(200).json({ message: "Скаргу створенно!" })
    } catch (err) {
        console.error("Помилка створення скарги")
        res.status(500).json({ error: err })
    }
}