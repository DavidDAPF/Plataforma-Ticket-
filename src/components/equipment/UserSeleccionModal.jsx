import React from 'react';

const UserSelectionModal = ({ isOpen, onClose, users, onUserSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Seleccionar Usuario</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div className="mb-4">
          <h4 className="text-gray-700">Usuarios disponibles:</h4>
          <ul className="mt-2 space-y-2">
            {users && users.length > 0 ? (
              users.map((user) => (
                <li
                  key={user._id}
                  className="flex justify-between items-center p-2 border rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    if(user._id){
                    console.log('Usuario seleccionado: ', user._id);
                    onUserSelect(user._id);
                  }else{
                    console.error('El usuario seleccionado no tiene un ID valido', user);
                  }}
                }
                >
                  <span>{user.name} ({user.email})</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No hay usuarios disponibles para asignar</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserSelectionModal;

