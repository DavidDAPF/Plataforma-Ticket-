// src/App.jsx
import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import UserDetail from './pages/UserDetail.jsx'; // Import UserDetail
import SupportDashboard from './pages/SupportDashboard.jsx';
//import Tickets from './pages/Tickets.jsx';
import Users from './pages/Users.jsx';
import Equipment from './pages/Equipment.jsx';
import Settings from './pages/Settings.jsx';
import PasswordReset from './pages/PasswordReset.jsx';
import CreateTicket from './pages/Tickets.jsx';
import { AuthProvider, AuthContext } from './context/AuthContext.jsx';
import EquipmentProvider from './context/EquipmentContext.jsx';
import { TicketProvider } from './context/TicketContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { LocationProvider } from './context/LocationContext.jsx';
import { useNavigate } from 'react-router-dom';
import Header from './components/common/Header.jsx';
import PrivateRoute from './components/common/PrivateRoute.jsx'; // Import PrivateRoute
import UserTickets from './pages/UserTickets.jsx';
import SupportTickets from './pages/SupportTickets.jsx';

const App = () => {
  const { user, loading } = useContext(AuthContext);// Asegúrate de utilizar useContext correctamente

  if (loading){
    //Mostrar algo mientras se valida el token
    return <div>Cargando...</div>
  }

  return (
      <TicketProvider>
        <UserProvider>
          <EquipmentProvider>
            <LocationProvider>
              <ToastContainer />
              { user && <Header /> }
                <Routes>
                 <Route path="/login" element={<Login />} />
                 <Route path="/" element={<Navigate to="/dashboard"/>} />
                 <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
                 <Route path="/my-tickets" element={<PrivateRoute>{user ? <UserTickets /> : <Navigate to="/login" /> }</PrivateRoute>} />
                 <Route path="/create-ticket" element={<PrivateRoute><CreateTicket /></PrivateRoute>} />
                 <Route path="/support/dashboard" element={<PrivateRoute><SupportDashboard /></PrivateRoute>} />
                 <Route path="/support/my-tickets" element={<PrivateRoute><SupportTickets /></PrivateRoute>} />
                 <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
                 <Route path="/equipment" element={<PrivateRoute><Equipment /></PrivateRoute>} />
                 <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                 <Route path="/user/:id" element={<PrivateRoute><UserDetail /></PrivateRoute>} />
                 <Route path='/reset-password/:token' element={<PasswordReset />} /> {/*Nueva ruta para recuperar el password*/}
             </Routes>
            </LocationProvider>
          </EquipmentProvider>
        </UserProvider>
      </TicketProvider>
  );
};

export default App;
