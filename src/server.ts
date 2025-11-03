import express from "express";
import router from "./routes";
import db from "./config/db";
import cors, { CorsOptions } from "cors";
import morgan from 'morgan'
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    //console.log(colors.blue("Conexión exitosa con la db"));
  } catch (error) {
    console.log(
      colors.bgRed.white("Hubo un error al conectar con la base de datos")
    );
    console.log(error);
  }
}
connectDB();
const server = express();
//permitir conexions
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de cors"));
      console.log("Denegar");
    }
  },
};
server.use(cors(corsOptions));
//loggin en el backend
server.use(morgan("dev"));
//leer datos de formularios
server.use(express.json());
//Ruta base
server.use("/api/products", router);

//para el testing
/* server.get("/api", (req, res) => {
  res.json("desde api");
}); */

//Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
