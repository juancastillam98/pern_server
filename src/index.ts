import server from "./server";
import colors from "colors";
const port = process.env.PORT || 4000;
//Todo lo que esté en este fichero, se ejecuta en la terminal.
server.listen(port, () => {
  console.log(colors.cyan.bold(`Rest api desde el puerto ${port}`));
});
