// const jwtHelper = require('../helpers/JWTHelper');

// const middlewareController = {
//   verifyToken: (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//       const decodedToken = jwtHelper.verifyToken(token);
//       if (!decodedToken) {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }

//       req.user = decodedToken;
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//   },

//   verifyTokenAndAdminAuth: (req, res, next) => {
//     middlewareController.verifyToken(req, res, () => {
//       // Đảm bảo rằng middlewareController.verifyToken không trả về trước khi callback được thực thi
//       if (req.user.admin || req.user.id === parseInt(req.params.id, 10)) {
//         next();
//       } else {
//         return res.status(403).json({ message: 'You do not have permission to access' });
//       }
//     });
//   }
// };

// module.exports = middlewareController;
