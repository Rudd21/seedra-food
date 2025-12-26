import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const reqBasket = async(req, res) => {
        try {
            let productsId = JSON.parse(req.cookies.basket);

            console.log("Що має запарсилось,", productsId);
            let listProducts = []

            for (let productId of productsId) {
                const productData = await prisma.product.findUnique({
                    where: { id: productId }
                })

                if (productData) {
                    listProducts.push(productData)
                } else {
                    console.log("Товар не знайдено!")
                }
            }

            console.log("Список що знайшлося для користувача: ", listProducts)
            res.status(200).json(listProducts)

            listProducts = []
        } catch (err) {
            console.error("Помилка при отриманні каталогу:", err)
            res.status(500).json({ error: "Помилка при отриманні каталогу" })
        }
    }
    // Очищати listProducts після завершання справи