import { dbUsers } from "../db/db.js";

const MAX_LOGIN_ATTEMPTS = 3;
const MIN_PASSWORD_LENGTH = 8;
const MIN_NAME_LENGTH = 3;
const MIN_PHONE_LENGTH = 9; // Fromato 912345678
const MIN_RUT_LENGTH = 10; // Formato 12345678-k

const USER_LEVELS = {
  BRONCE: { name: "bronce", minPoints: 0 },
  PLATA: { name: "plata", minPoints: 100 },
  ORO: { name: "oro", minPoints: 200 },
  PLATINO: { name: "platino", minPoints: 300 },
};

const calculateUserLevel = (points) => {
  if (points >= USER_LEVELS.PLATINO.minPoints) return USER_LEVELS.PLATINO.name;
  if (points >= USER_LEVELS.ORO.minPoints) return USER_LEVELS.ORO.name;
  if (points >= USER_LEVELS.PLATA.minPoints) return USER_LEVELS.PLATA.name;
  return USER_LEVELS.BRONCE.name;
};

const generateToken = () =>
  `tkn_${Math.random().toString(36).substring(2, 11)}`;

const createSession = (user) => ({
  user: {
    ...user,
    nivel: calculateUserLevel(user.puntos),
    ultimoLogin: new Date().toISOString(),
  },
  token: generateToken(),
  loginTime: new Date(),
});

const registerFailedAttempt = (user) => {
  if (!user) return;
  user.intentos++;
  if (user.intentos >= MAX_LOGIN_ATTEMPTS) user.bloqueado = true;
};

const validateRegistrationData = (formData) => {
  const errors = [];

  if (!formData.nombre || formData.nombre.length < MIN_NAME_LENGTH)
    errors.push("Nombre inválido: mínimo 3 caracteres");

  if (!formData.email || !formData.email.includes("@"))
    errors.push("Email inválido");

  if (!formData.pass || formData.pass.length < MIN_PASSWORD_LENGTH)
    errors.push(
      `La contraseña debe tener mínimo ${MIN_PASSWORD_LENGTH} caracteres`,
    );

  if (formData.pass !== formData.passConfirm)
    errors.push("Las contraseñas no coinciden");

  if (!formData.rut || formData.rut.length < MIN_RUT_LENGTH)
    errors.push("RUT inválido");

  if (!formData.telefono || formData.telefono.length < MIN_PHONE_LENGTH)
    errors.push("Teléfono inválido");

  return errors;
};

const sendEmail = (email, nombre) => {
  console.log(`Enviando email de bienvenida a ${email}`);
};

const isEmailAlreadyRegistered = (email) =>
  dbUsers.some((user) => user.email === email);

const saveUser = (formData) => ({
  id: Math.floor(Math.random() * 9000) + 1000,
  nombre: formData.nombre,
  email: formData.email,
  pass: formData.pass, // En caso real se debe hashear
  rut: formData.rut,
  telefono: formData.telefono,
  tipo: "cliente",
  puntos: 0,
  descuento: 0,
  historial: [],
  carrito: [],
  wishlist: [],
  direcciones: [],
  metodoPago: [],
  activo: true,
  intentos: 0,
  bloqueado: false,
  ultimoLogin: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const login = (email, password, callback) => {
  const user = dbUsers.find((u) => u.email === email);
  const isPasswordCorrect = user?.pass === password;

  if (!isPasswordCorrect) {
    registerFailedAttempt(user);
    callback({ ok: false, msg: "Credenciales inválidas", data: null });
    return;
  }

  if (user.bloqueado) {
    callback({ ok: false, msg: "Usuario bloqueado", data: null });
    return;
  }

  if (!user.activo) {
    callback({ ok: false, msg: "Usuario inactivo", data: null });
    return;
  }

  callback({ ok: true, msg: "Login exitoso", data: createSession(user) });
};

const register = (formData, callback) => {
  const errors = validateRegistrationData(formData);
  if (errors.length > 0) {
    callback({ ok: false, errors: errors, data: null });
    return;
  }

  if (isEmailAlreadyRegistered(formData.email)) {
    callback({
      ok: false,
      errors: ["El email ya está registrado"],
      data: null,
    });
    return;
  }

  const newUser = saveUser(formData);
  dbUsers.push(newUser);
  sendEmail(formData.email, formData.name);

  callback({ ok: true, msg: "Registro exitoso", data: createSession(newUser) });
};

export { login, register };
