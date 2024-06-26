import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext.jsx';

const UserList = () => {
  const { users, fetchUsers } = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="user-list">
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios disponibles</p>
      )}
    </div>
  );
};

export default UserList;
