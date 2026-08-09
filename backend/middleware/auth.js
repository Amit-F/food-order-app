import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Not Authorized, please login again" })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role, householdId: decoded.householdId, isOwner: decoded.isOwner };
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Not Authorized, please login again" })
    }

}

const requireRole = (role) => (req, res, next) => {

    if (!req.user || req.user.role !== role) {
        return res.status(403).json({ success: false, message: "Forbidden" })
    }

    next();

}

const requireOwner = (req, res, next) => {

    if (!req.user || !req.user.isOwner) {
        return res.status(403).json({ success: false, message: "Forbidden" })
    }

    next();

}

export { requireAuth, requireRole, requireOwner }
