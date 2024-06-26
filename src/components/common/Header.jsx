// src/components/common/Header.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Nombre de Empresa</h1>
        {user && (
          <nav className="space-x-4">
            {user.role === 'admin' && (
              <>
                <Link to="/support/dashboard" className="hover:underline">Home</Link>
                <Link to="/tickets" className="hover:underline">Tickets</Link>
                <Link to="/users" className="hover:underline">Usuarios</Link>
                <Link to="/equipment" className="hover:underline">Equipos</Link>
                <Link to="/settings" className="hover:underline">Configuraciones</Link>
              </>
            )}
            {user.role === 'soporte' && (
              <>
                <Link to="/support/dashboard" className="hover:underline">Home</Link>
                <Link to="/tickets" className="hover:underline">Tickets</Link>
                <Link to="/users" className="hover:underline">Usuarios</Link>
                <Link to="/equipment" className="hover:underline">Equipos</Link>
              </>
            )}
            {user.role === 'usuario' && (
              <>
                <Link to="/dashboard" className="hover:underline">Home</Link>
                <Link to="/user/tickets" className="hover:underline">Ver Mis Tickets</Link>
                <Link to="/user/create-ticket" className="hover:underline">Crear Ticket</Link>
              </>
            )}
            <button onClick={handleLogout} className="hover:underline">Cerrar Sesión</button>
            <span>{user.name}</span>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;




// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { SettingsContext } from '../../context/SettingsContext.jsx';
// import { AuthContext } from '../../context/AuthContext.jsx';

// const Header = () => {
//   const { logo } = useContext(SettingsContext);
//   const { user } = useContext(AuthContext);

//   return (
//     <header className="bg-blue-600 text-white shadow-md">
//       <div className="container mx-auto p-4 flex justify-between items-center">
//         <div className="flex items-center">
//           {logo && <img src={logo} alt="Company Logo" className="h-10 mr-4" />}
//           <h1 className="text-xl font-bold">Soporte Técnico</h1>
//         </div>
//         <nav className="space-x-4 flex items-center">
//           <Link to="/support/dashboard" className="hover:underline">
//             Home
//           </Link>
//           <Link to="/tickets" className="hover:underline">
//             Tickets
//           </Link>
//           <Link to="/users" className="hover:underline">
//             Usuarios
//           </Link>
//           <Link to="/equipment" className="hover:underline">
//             Equipos
//           </Link>
//           <Link to="/settings" className="hover:underline">
//             Configuraciones
//           </Link>
//           <Link to="/login" className="hover:underline">
//             Cerrar Sesión
//           </Link>
//           {user && (
//             <span className="ml-4">
//               Bienvenido, {user.name}
//             </span>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
