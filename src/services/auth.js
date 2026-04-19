import { dbUsers } from "../db/db.js";

// PROVISORIO: Propenso a modificaciones

const MAX_ATTEMPTS = 3;

const USER_LEVELS = {
  BRONCE: { name: "bronce", min: 0 },
  PLATA: { name: "plata", min: 100 },
  ORO: { name: "oro", min: 200 },
  PLATINO: { name: "platino", min: 300 },
};

const calculateUserLevel = (points) => {
  if (points >= USER_LEVELS.PLATINO.min) return USER_LEVELS.PLATINO.name; // PLATINO
  if (points >= USER_LEVELS.ORO.min) return USER_LEVELS.ORO.name; // ORO
  if (points >= USER_LEVELS.PLATA.min) return USER_LEVELS.PLATA.name; // PLATA
  return USER_LEVELS.BRONCE.name; // BRONCE
};

const handleFailedLogin = (user) => {
  if (!user) return;

  user.intentos++;
  if (user.intentos >= MAX_ATTEMPTS) user.bloqueado = true;
};

const login = (email, password, dbUsers) => {
  // Verificacion de usuario
  const user = dbUsers.find((u) => u.email === email);
  const isPasswordCorrect = user && user.pass === password;

  if (!isPasswordCorrect) {
    handleFailedLogin(user);
    cb({ ok: false, msg: "Credenciales invalidas", data: null });
    return;
  }

  // Checklist sobre usuario
  if (user.bloqueado) {
    cb({ ok: false, msg: "Usuario bloqueado", data: null });
    return;
  }

  if (!user.activo) {
    cb({ ok: false, msg: "Usuario inactivo", data: null });
    return;
  }

  // Preparacion de datos de sesion
  const sessionData = {
    user: {
      ...user,
      nivel: calculateUserLevel(user.puntos),
      ultimoLogin: new Date().toISOString(),
    },
    token: `tkn_${Math.random().toString(36).substring(2, 11)}`,
    loginTime: new Date(),
  };

  cb({ ok: true, msg: "Login OK", data: sessionData });
  return;
};