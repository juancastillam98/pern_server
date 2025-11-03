import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/products";
import { handleInputErrors } from "./middleware";
const router = Router();
//todas las rutas

/*El funciomaniento es el siguiente.
Cundo se hace un petición de post,
1. se valida,
2. se pasa al middleware, donde se comprueba si hay errores,
2. Si no los hay, se continúa con la inserción en la bd
*/


router.get("/", getProducts);
//obtener un producto

router.get(
  "/:id",
  param("id").isInt().withMessage("Id no válido"),
  handleInputErrors,
  getProductById
);
//añadir productos
router.post(
  "/",
  //Validación - nombre
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacío")
    .isLength({ min: 2, max: 20 })
    .withMessage("EL nombre debe tener entre 1 y 20 caracteres"),

  //Validación - precio
  body("price")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacío")
    .isNumeric()
    .withMessage("Valor no válido")
    .custom((value) => value > 0)
    .withMessage("El precio no puede ser negativo"),
  handleInputErrors,
  createProduct
);
//Actualizar un producto
router.put(
  "/:id",
  //Validación - nombre
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacío")
    .isLength({ min: 2, max: 20 })
    .withMessage("EL nombre debe tener entre 1 y 20 caracteres"),
  //Validación - precio
  body("price")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacío")
    .isNumeric()
    .withMessage("Valor no válido")
    .custom((value) => value > 0)
    .withMessage("El precio no puede ser negativo"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para la disponibilidad no válido"),
  param("id").isInt().withMessage("Id no válido"),
  handleInputErrors, //middleware
  updateProduct
);
//Actualizar la disponibilidad de un producto
router.patch(
  "/:id",
  param("id").isInt().withMessage("Id no válido"),
  handleInputErrors,
  updateAvailability
);

//Eliminar un producto
router.delete(
  "/:id",
  param("id").isInt().withMessage("Id no válido"),
  handleInputErrors,
  deleteProduct
);

export default router;
