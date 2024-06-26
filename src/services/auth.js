// services/auth.js

export const login = async (email, password) => {
  // Simulación de una llamada de autenticación
  return {
    token: 'fake-jwt-token',
    role: 'admin',
    name: 'John Doe',
    email
  };
};

export const getUserInfo = async (token) => {
  // Simulación de una llamada para obtener información del usuario
  // Aquí podrías realizar una solicitud HTTP real utilizando fetch o axios
  return {
    email: 'user@example.com',
    role: 'admin',
    name: 'John Doe'
  };
};
