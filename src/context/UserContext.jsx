import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const [users, setUsers] = useState([
    // Estructura inicial de ejemplo
    { id: '1', name: 'Juan Pérez', email: 'juan@example.com', role: 'usuario', status: 'Activo', location: 'Oficina 1' },
    // Añadir más usuarios de ejemplo si es necesario
  ]);

  const addUser = (user) => {
    setUsers([...users, { ...user, id: Date.now().toString() }]);//genera un ID unico
  };

  const updateUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const addGroup = (group) => {
    setGroups([...groups, { ...group, id: Date.now() }]);
  };

  const updateGroup = (updatedGroup) => {
    setGroups(
      groups.map((group) => (group.id === updatedGroup.id ? updatedGroup : group))
    );
  };

  const deleteGroup = (groupId) => {
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  const assignAccount = (userId, email, password, role, status, location) => {
    setUsers(users.map(user => user.id === userId ? { ...user, email, role, status, location } : user));
  };

  // const assignAccount = (userId, email, password, role) => {
  //   setUsers(
  //     users.map((user) =>
  //       user.id === userId ? { ...user, email, password, role } : user
  //     )
  //   );
  // };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        updateUser,
        deleteUser,
        groups,
        addGroup,
        updateGroup,
        deleteGroup,
        assignAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
