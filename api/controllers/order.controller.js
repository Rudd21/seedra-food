import { PrismaClient } from "@prisma/client"
import crypto from 'crypto'

const prisma = new PrismaClient();

export const createOrder = async(req, res) => {

    const { phoneNumber, totalPrice, productOwnerId } = req.body;

    const cleanTotalPrice = String(totalPrice)

    if (!phoneNumber) return res.status(400).json({ message: "Невказано номер телефону!" })

    if (!totalPrice) return res.status(400).json({ message: "Невказана ціна в замовленні!" })

    try {

        const publicToken = crypto.randomUUID();

        const orders = req.cookies.order_tokens ? JSON.parse(req.cookies.order_tokens) : []

        if (orders.length >= 10) {
            return res.status(400).json({ message: "Забагато активних замовлень" });
        }

        orders.push(publicToken);

        await prisma.order.create({
            data: { phoneNumber, totalPrice: cleanTotalPrice, publicToken, productOwnerId }
        })

        res.cookie("order_tokens", JSON.stringify(orders), {
            httpOnly: true,
            sameSite: "Strict",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Замовлення успішно створено" })
    } catch (err) {
        console.error("Помилка при створенні замовлення:", err);
        res.status(500).json({ message: "Помилка сервера!", error: err.message })
    }

}

export const updateStatusOrder = async(req, res) => {
    const { orderId, status } = req.body;

    const cleanOrderId = String(orderId)

    if (!status) return res.status(400).json({ message: "Невказано новий статус!" })

    try {

        await prisma.order.update({
            where: { publicToken: cleanOrderId },
            data: { status }
        })

        res.status(200).json({ message: "Успішно зміненно статус замовлення" })
    } catch (err) {
        console.error("Помилка під створення замовлення:", err);
        res.status(500).json({ message: "Помилка сервера!", error: err.message })
    }

}

export const reqOrder = async(req, res) => {

    const orders = req.cookies.order_tokens ? JSON.parse(req.cookies.order_tokens) : []

    try {
        const order = await prisma.order.findMany({
            where: { publicToken: { in: orders } },
            orderBy: { createdAt: 'desc' }
        })

        res.status(200).json(order)
    } catch (err) {
        console.error("Помилка при запиті замовлення:", err);
        res.status(500).json({ message: "Помилка сервера!", error: err.message })
    }
}

export const reqOrders = async(req, res) => {
    try {
        const orders = await prisma.order.findMany()

        res.status(200).json(orders)
    } catch (err) {
        console.error("Помилка при запиті замовлень:", err);
        res.status(500).json({ message: "Помилка сервера!", error: err.message })
    }
}

export const reqOrdersByUser = async(req, res) => {
    const { userId } = req.query;
    try {
        const orders = await prisma.order.findMany({
            where: { productOwnerId: userId }
        })

        res.status(200).json(orders)
    } catch (err) {
        console.error("Помилка при запиті замовлень:", err);
        res.status(500).json({ message: "Помилка сервера!", error: err.message })
    }
}



export const deleteOrder = async(req, res) => {
    const { publicToken } = req.body;

    let orders = req.cookies.order_tokens;
    orders = JSON.parse(orders)

    try {
        const removeIndex = orders.findIndex(item => item == publicToken);

        if (removeIndex != -1) {
            orders.splice(removeIndex, 1);
        }

        res.cookie("order_tokens", JSON.stringify(orders), {
            httpOnly: true,
            sameSite: "Strict",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ orders: orders });
    } catch (err) {
        console.error("Помилка при запиті видалення:", err);
        res.status(500).json({ message: "Помилка сервера!", error: err.message })
    }

}