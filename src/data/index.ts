import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log("Datos eliminados correctamente");
    exit(0); // 0 significa que finalizó SIN errores
  } catch (error) {
    console.log("Hubo un error");
    exit(1); //1 significa que finalizó CON errores
  }
};
if (process.argv[2] == "--clear") {
  clearDB();
}
//en el package.log, hay un script llamado 'db' que apunta a esta ruta. llamado pretest
console.log(process.argv);
