//unifique las 2 funciones de notificaciones en una sola.
export function sendNotif(tipo, userId, msg, data) {
  var n = {};
  var sent = false;
  if (tipo == "email") {
    // simular envio email
    console.log("Enviando email a usuario " + userId + ": " + msg);
    n = { tipo: "email", userId: userId, msg: msg, data: data, sentAt: new Date(), ok: true };
    sent = true;
  }
  if (tipo == "sms") {
    // simular envio sms
    console.log("Enviando SMS a usuario " + userId + ": " + msg);
    n = { tipo: "sms", userId: userId, msg: msg, data: data, sentAt: new Date(), ok: true };
    sent = true;
  }
  if (tipo == "push") {
    // simular push notification
    console.log("Enviando push a usuario " + userId + ": " + msg);
    n = { tipo: "push", userId: userId, msg: msg, data: data, sentAt: new Date(), ok: true };
    sent = true;
  }
  if (tipo == "inapp") {
    // simular notificacion interna
    console.log("Guardando notif inapp para usuario " + userId + ": " + msg);
    n = { tipo: "inapp", userId: userId, msg: msg, data: data, sentAt: new Date(), ok: true };
    sent = true;
  }
  if (sent == false) {
    n = { tipo: tipo, userId: userId, msg: msg, data: data, sentAt: new Date(), ok: false, err: "tipo no reconocido" };
  }
  return n;
}