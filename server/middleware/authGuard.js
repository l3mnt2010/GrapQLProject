const jwtHelper = require('../helpers/JWTHelper');

// Middleware xác thực và phân quyền cho Express
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.substring(7);

    try {
      const decodedToken = jwtHelper.verifyToken(token);
      if (!decodedToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.userId = decodedToken.userId;
      req.userRole = decodedToken.role;

      if (roles.length && !roles.includes(req.userRole)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
};

module.exports = authMiddleware;
