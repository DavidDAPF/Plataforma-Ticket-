// authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

import crypto from 'crypto';
import nodemailer from 'nodemailer';

import createTransporter from '../config/emailConfig.js';


// Función para generar el token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Registro de usuario
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validar campos requeridos
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Por favor llene los campos requeridos' });
  }

  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Hash de la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crear nuevo usuario
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Datos del usuario invalido' });
  }
});

// Login de usuario
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validar campos requeridos
  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor llene los campos requeridos' });
  }

  // Verificar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Correo o password invalido' });
  }

  // Verificar contraseña
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Correo o password invalido' });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
});

// Obtener perfil del usuario
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
});

const requestPasswordReset = asyncHandler(async(req, res)=>{
  const {email} = req.body;


  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

  //user.requestPasswordToken = resetTokenHash;
  //user.requestPasswordExpire = Date.now() + 3600000; // 1 hora
  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpire = Date.now() + 3600000; // 1 hora
  
  await user.save();

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  const transporter = createTransporter();

  const message = {
    from: '"Soporte" <no-reply@mail.com>',
    to: user.email,
    subject: 'Restablecimiento de contraseña',
    html: `
      <h1>Has solicitado restablecer tu contraseña</h1>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('Mensaje enviado: %s', info.messageId);
    console.log('Vista previa URL: %s', nodemailer.getTestMessageUrl(info));
    res.status(200).json({ message: 'Correo electrónico enviado' });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(500);
    //throw new Error('Error al enviar el correo electrónico');
    res.status(500).json({message:`Error al enviar el correo electronico`, error: error.message});
  }
});


// resetear la contrasena
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  console.log('Token recibido: ', token);
  console.log('Password recibido: ', password);

  const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
  console.log('Hash del token recibido', resetTokenHash);

  const user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    console.log('Token invalido o ha expirado');
    return res.status(400).json({ message: 'Token inválido o ha expirado' });
  }

  console.log('Usuario encontrado: ', user);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  console.log('Contrasena actualizada para el usuario', user);

  res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
});


export { register, login, getUserProfile, requestPasswordReset, resetPassword};
