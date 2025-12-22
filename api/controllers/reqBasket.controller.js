export const reqBasket = async(req, res) => {
    try {
        console.log("Печево яке прилетіло: ", req.cookies)
        res.status(200).json()
    } catch (err) {
        console.error("Помилка при отриманні каталогу:", err)
        res.status(500).json({ error: "Помилка при отриманні каталогу" })
    }
}