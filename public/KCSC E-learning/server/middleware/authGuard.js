const JWTHelper = require('../helpers/JWTHelper');

const middlewareController = {
  verifyTokenAndAuth: () => (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }
    const token = authHeader.split(" ")[1];
    
    try {
      const decodedToken = JWTHelper.verifyToken(token);
      if (!decodedToken) {
        req.user = null;
        return next();
      }
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        return res.status(401).json({ message: "Token has expired" });
      }
      req.user = decodedToken;
      next();
    } catch (error) {
      req.user = null;
      return next();
    }
  }
};

module.exports = middlewareController;
