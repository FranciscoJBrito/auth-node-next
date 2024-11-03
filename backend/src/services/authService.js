const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerUserService = async ({ email, password, name }) => {
  // Verificar si el usuario ya existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  // Hacer hashing de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear nuevo usuario en la base de datos
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return { id: newUser.id, email: newUser.email };
};

const loginUserService = async ({ email, password }) => {
  // Buscar el usuario por email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  // Verificar la contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Credenciales inválidas');
  }

  // Generar el access token
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '1h' }
  );

  // Generar el refresh token
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // Configuración de las cookies
  const HttpOnlyMode = process.env.NODE_ENV === 'production' ? true : false;

  return {
    accessToken,
    refreshToken,
    HttpOnlyMode
  }
};

module.exports = { registerUserService, loginUserService };