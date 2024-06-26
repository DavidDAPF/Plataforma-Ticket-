import React, { useContext, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import PasswordRecoveryModal from '../components/auth/PasswordRecoveryModal.jsx';

const Login = () => {
  // const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const {handleLogin} = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await handleLogin(email, password);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
    }
  };

      
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Correo Electrónico</label>
            <input type="email" ref={emailRef} className="w-full px-4 py-2 border rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Contraseña</label>
            <input type="password" ref={passwordRef} className="w-full px-4 py-2 border rounded-md" required />
          </div>
          {/* Boton de logueo*/}
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Iniciar Sesión
          </button>
          <div className="mt-4 text-center">
            {/* Boton de modal recuperacion de pass*/}
            <button type="button" onClick={handleOpenModal} className="text-blue-500 hover:underline">
              ¿Olvidó su clave?
            </button>
          </div>
        </form>
      </div>
      <PasswordRecoveryModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Login;
