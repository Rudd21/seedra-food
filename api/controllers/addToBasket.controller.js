export const addToBasket = (req, res) => {
    const { productId } = req.body;

    let basket = req.cookies.basket ?
        JSON.parse(req.cookies.basket) : { products: [] };

    if (!basket.products.includes(productId)) {
        basket.products.push(productId);
    }

    res.cookie("basket", JSON.stringify(basket), {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ basket: basket.products });
};