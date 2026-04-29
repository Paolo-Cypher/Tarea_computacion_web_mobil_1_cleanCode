//unifique las 2 funciones de notificaciones en una sola.
//mejorada sin tanta repeticion de estructura y con usi de const.
export function sendNotif(tipo, userId, msg, data) { 
  
  let tiposValidos = ["email", "sms", "push", "inapp"];// estos son los canales que permite.
  let esValido = tiposValidos.includes(tipo);// comprueva el tipo.

  if (esValido) {// Esto permite la ejecucion.
    const mensajesLog = { // se usa un diccionario para evitar poner varios if/else.
      email: `Enviando email a usuario ${userId}: ${msg}`,
      sms: `Enviando SMS a usuario ${userId}: ${msg}`,
      push: `Enviando push a usuario ${userId}: ${msg}`,
      inapp: `Guardando notif inapp para usuario ${userId}: ${msg}`,
    };
    console.log(mensajesLog[tipo]); // Acceso dinamico.
  }

  return {
    tipo: tipo,
    userId: userId,
    msg: msg,
    data: data,
    sentAt: new Date(), // Para marcar cuando se procesa una solicitud. 
    ok: esValido,
    ...(esValido ? {} : { err: "tipo no reconocido" }),// Esto es un operador condicional,
    // se encarga de entregar error cuando sea necesario.
  };
}
