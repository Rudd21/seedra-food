import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const reqBlogPosts = async(req, res) => {

    try {
        const blogPosts = await prisma.blogPost.findMany({
            take: 8,
            orderBy: { createdAt: 'desc' }
        })

        res.status(200).json(blogPosts)
    } catch (err) {
        console.error("Виникла помилка при отримані списку постів блогу:", err)
        res.status(500).json({ error: "Невдалося отримати список постів блогу" })
    }
}

export const reqBlogPost = async(req, res) => {

    const { id } = req.query;

    if (!id) {
        return res.status(500).json({ error: "Невказано конкретний пост" })
    }

    try {
        const blogPost = await prisma.blogPost.findUnique({
            where: { id }
        })

        res.status(200).json(blogPost)
    } catch (err) {
        console.error("Виникла помилка при отримані посту блогу:", err)
        res.status(500).json({ error: "Невдалося отримати пост блогу" })
    }
}

export const addBlogPost = async(req, res) => {

    const { nameBlogPost, descBlogPost } = req.body;
    const userId = req.user.id;
    const imageName = req.file ? req.file.filename : null;

    if (!imageName) {
        return res.status(500).json({ error: "Невказано картинку до поста" })
    }

    if (!nameBlogPost || !descBlogPost) {
        return res.status(500).json({ error: "Недостатньо заповнених полів" })
    }

    try {
        await prisma.blogPost.create({
            data: { image: imageName, name: nameBlogPost, description: descBlogPost, userId }
        })

        res.status(200).json({ message: "Успішно додано пост у блог!" })
    } catch (err) {
        console.error("Виникла помилка при додавані поста у блог:", err)
        res.status(500).json({ error: "Невдалося добавити пост у блог" })
    }

}