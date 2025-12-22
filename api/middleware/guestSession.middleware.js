import jwt from "jsonwebtoken"

export const guestSession = (req, res) => {
    let guestToken = req.cookies.guest_session;

    if (!guestToken) {
        guestToken = jwt.sign({ type: "guest" }, process.env.JWT_SECRET, { expiresIn: "7d" })
    };

    res.cookie("guest_session", guestToken, {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ guestToken });
};