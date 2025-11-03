import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();
const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + "/../models/**/*"], //dirname es para decir que se vaya a la raíz
  logging: false,
});
export default db;
