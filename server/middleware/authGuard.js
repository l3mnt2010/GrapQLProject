const jwtHelper = require('../helpers/JWTHelper');

const authMiddleware = (req, res, next) => {
                                        const authHeader = req.headers.authorization;
                                      
                                        if (!authHeader || !authHeader.startsWith('Bearer ')) {
                                          return res.status(401).json({ message: 'Unauthorized' });
                                        }
                                      
                                        const token = authHeader.substring(7);
                                        const decodedToken = jwtHelper.verifyToken(token);
                                      
                                        if (!decodedToken) {
                                          return res.status(401).json({ message: 'Unauthorized' });
                                        }
                                      
                                        req.userId = decodedToken.userId;
                                        next();
                                      };
module.exports = authMiddleware;                                      