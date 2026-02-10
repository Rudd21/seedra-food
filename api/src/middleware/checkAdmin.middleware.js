export const requireAdmin = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "Доступ заборонено" });
    }
    next();
};