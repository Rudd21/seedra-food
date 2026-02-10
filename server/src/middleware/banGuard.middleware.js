export const banGuard = (req, res, next) => {
    if (req.user && req.user.isBanned) {
        return res.status(403).json({
            message: "Користувач заблокований",
            banUntil: req.user.banUntil,
            banReason: req.user.banReason
        })
    }
    next();
}