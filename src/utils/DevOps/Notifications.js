//unifique las 2 funciones de notificaciones en una sola.
//mejorada sin tanta repeticion de estructura y con usi de const.
export function sendNotif(tipo, userId, msg, data) {
  let tiposValidos = ["email", "sms", "push", "inapp"];
  let esValido = tiposValidos.includes(tipo);

  if (esValido) {
    const mensajesLog = {
      email: `Enviando email a usuario ${userId}: ${msg}`,
      sms: `Enviando SMS a usuario ${userId}: ${msg}`,
      push: `Enviando push a usuario ${userId}: ${msg}`,
      inapp: `Guardando notif inapp para usuario ${userId}: ${msg}`,
    };
    console.log(mensajesLog[tipo]);
  }

  return {
    tipo: tipo,
    userId: userId,
    msg: msg,
    data: data,
    sentAt: new Date(),
    ok: esValido,
    ...(esValido ? {} : { err: "tipo no reconocido" }),
  };
}