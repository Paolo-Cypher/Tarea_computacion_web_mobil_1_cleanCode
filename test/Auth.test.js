import { expect } from "chai";

// Importacion de funciones a testear
import { login, register } from "../src/services/authService.js";
import { dbUsers } from "../src/db/db.js";

// Test: Login
describe("Funcion de Login", () => {
  // Usuario real
  let email = "juan@mail.com";
  let password = "1234";

  // 1er test
  it("Deberia permitir el ingreso con credenciales validas", (done) => {
    login(email, password, (result) => {
      try {
        expect(result.ok).to.be.true;
        expect(result.msg).to.equal("Login exitoso");
        expect(result.data).to.not.be.null;

        done();
      } catch (error) {
        done(error);
      }
    });
  });

  // 2do test
  it("Deberia retornar credenciales invalidas si la pwd es invalida", (done) => {
    login(email, "pwd_invalida", (result) => {
      try {
        expect(result.ok).to.be.false;
        expect(result.msg).to.equal("Credenciales inválidas");

        done();
      } catch (error) {
        done(error);
      }
    });
  });
});

// Test: Register
describe("Funcion de Register", () => {
  // Formulario de registro correcto
  const formData = {
    nombre: "Mr Prueba",
    email: "mrprueba@test.com",
    pass: "mrprueba1234",
    passConfirm: "mrprueba1234",
    rut: "11222333-k", // Formato 12345678-k
    telefono: "123456789", // Formato 912345678
  };

  // 3er test
  it("Deberia permitir registrar con datos correctos", (done) => {
    register(formData, (result) => {
      try {
        expect(result.ok).to.be.true;
        expect(result.msg).to.equal("Registro exitoso");

        const usuarioEnDB = dbUsers.find((u) => u.email === formData.email);
        expect(usuarioEnDB).to.not.be.undefined;
        expect(usuarioEnDB.nombre).to.equal("Mr Prueba");

        done();
      } catch (error) {
        done(error);
      }
    });
  });

  // 4to test
  it("Deberia retornar las contraseñas no coinciden por mal ingreso de contraseña de confirmacion", (done) => {
    const formDataBad = {
        ...formData,
        passConfirm: "mmrpueba1234" // Dato mal escrito
    }

    register(formDataBad, (result) => {
      try {
        expect(result.ok).to.be.false;
        expect(result.data).to.be.null;
        expect(result.errors).to.deep.equal(["Las contraseñas no coinciden"]);

        done();
      } catch (error) {
        done(error);
      }
    });
  })
});
