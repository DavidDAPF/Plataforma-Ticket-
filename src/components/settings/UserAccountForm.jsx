import React, { useState, useContext } from "react";
import { LocationContext } from '../../context/LocationContext.jsx';

const UserAccountForm = ({ user, onSave }) => {
  const { locations } = useContext(LocationContext);
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(user ? user.role : 'usuario');
  const [status, setStatus] = useState(user ? user.status : 'Activo');
  const [location, setLocation] = useState(user ? user.location : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user.id, email, password, role, status, location);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2">Correo Electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Rol</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="usuario">Usuario</option>
          <option value="soporte">Soporte</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Estatus</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Localización</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Seleccionar Localización</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.name}>{loc.name}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default UserAccountForm;
