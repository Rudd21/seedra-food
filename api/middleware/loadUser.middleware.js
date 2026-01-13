import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const loadUser = async(req, res, next) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id }
    })

    if (!user) {
        return res.status(401).json({ message: "Користувача не знайдено" })
    }

    req.user = user;
    next();
}