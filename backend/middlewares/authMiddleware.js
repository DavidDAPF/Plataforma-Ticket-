// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';

// export const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       //console.log('Token decodificado: ',decoded);  // para ver el log del token

//       req.user = await User.findById(decoded.id).select('-password');

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error('No autorizado, token fallido');
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error('No autorizado, no token');
//   }
// });
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Asignar el usuario a la solicitud
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log('Error con el token:', error.message); // Aquí nos aseguramos de que 'error' esté definido.
      res.status(401);
      throw new Error('No autorizado, token fallido');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No autorizado, no token');
  }
});