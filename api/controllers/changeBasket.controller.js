export const addToBasket = (req, res) => {
    const { productId } = req.body;

    let basket = req.cookies.basket ?
        JSON.parse(req.cookies.basket) : [];

    if (!basket.includes(productId)) {
        basket.push(productId);
    }
    console.log("баскет парс після добавлення ", basket)
    res.cookie("basket", JSON.stringify(basket), {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ basket: basket });
    // ЗАПИСУЄ ID ТОВАРУ В ТОКЕН
};

export const removeFromBasket = (req, res) => {
    const { productId } = req.body;

    let basket = req.cookies.basket;
    basket = JSON.parse(basket)

    const removeIndex = basket.findIndex(item => item == productId);

    if (removeIndex != -1) {
        basket.splice(removeIndex, 1);
    }

    console.log("баскет парс після ", basket)
    res.cookie("basket", JSON.stringify(basket), {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ basket: basket });
};