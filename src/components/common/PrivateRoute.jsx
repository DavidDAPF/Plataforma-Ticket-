// import React, { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext.jsx';

// const PrivateRoute = ({ requiredRole }) => {
//   const { user, token } = useContext(AuthContext);

//   if (!user ||!token || tokenExpired(token)) {
//     return <Navigate to="/login" replace />;
//   }

//   if (requiredRole && user.role!== requiredRole) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// };

// const tokenExpired = (token) => {
//   // Verificar si el token ha expirado
//   const expirationTime = token.expirationTime;
//   const currentTime = new Date().getTime();
//   return currentTime > expirationTime;
// }

// export default PrivateRoute;

// src/components/common/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
