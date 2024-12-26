// src/pages/PasswordReset.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordReset = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [success, setSuccess] = useState(false); // Estado para manejar el éxito
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      console.log('Enviando solicitud de restablecimiento de contraseña');
      console.log('Token:', token);
      console.log('Password:', password);

      // await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      const response = await axios.put(`http://localhost:5000/api/auth/reset-password/${token}`, {password});
      setSuccess(true); //Cambiar el estado a exito
      //alert('Contraseña restablecida exitosamente.');
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      alert('Error al restablecer la contraseña. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Restablecer Contraseña</h2>
        {success ? (
          <div>
            <p className="text-green-500">Contraseña restablecida exitosamente.</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Ir al Inicio de Sesión
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Nueva Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Restablecer Contraseña
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
