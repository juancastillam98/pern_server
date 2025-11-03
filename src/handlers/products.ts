import { Request, Response } from "express";
import Product from "../models/Product.model";
import colors from "colors";

//Obtener todos los productos
export const getProducts = async (request: Request, response: Response) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    response.json({ data: products });
  } catch (error) {
    console.log(colors.bgGreen.black.bold("Hubo un error"));
    console.log(error);
  }
};
//Obtener un producto en específico
export const getProductById = async (request: Request, response: Response) => {
  try {
    console.log(request.params.id); //.id es el parámetro a continuación de :id en routes
    const { id } = request.params;
    const product = await Product.findByPk(id);
    if (!product) {
      response.status(404).json({
        error: "Producto no encontrado",
      });
    }
    response.json({ data: product });
  } catch (error) {
    console.log(colors.bgGreen.black.bold("Hubo un error"));
    console.log(error);
  }
};
//Añadir un nuevo producto
export const createProduct = async (request: Request, response: Response) => {
  try {
    const product = await Product.create(request.body);
    response.status(201).json({ data: product }); //devolvemos el producto ya guardado en la bd
  } catch (error) {
    console.log(colors.bgGreen.black.bold("Hubo un error"));
    console.log(error);
  }
};
//Actualizar un producto
export const updateProduct = async (request: Request, response: Response) => {
  try {
    //Obtengo primero el producto
    const { id } = request.params;
    const product = await Product.findByPk(id);
    if (!product) {
      response.status(404).json({
        error: "Producto no encontrado",
      });
    }
    //Actualizado de nuevo el producto
    //console.log(request.body) recuerda, con request.body obtengo los datos que le paso
    await product.update(request.body);
    await product.save();
    response.json({ data: product });
  } catch (error) {
    console.log(colors.bgGreen.black.bold("Hubo un error"));
    console.log(error);
  }
};
//Actualizar una parte del producto
export const updateAvailability = async (
  request: Request,
  response: Response
) => {
  try {
    //Obtengo primero el producto
    const { id } = request.params;
    const product = await Product.findByPk(id);
    if (!product) {
      response.status(404).json({
        error: "Producto no encontrado",
      });
    }
    /* ctualizado solo la disponibilidad
    con esta forma sobreeescribimos todo, pero al ser un patch y no put, solamente se actualiza aquello que especifiquemos
    product.availability = request.body.availability; --así tenemos que especificar qué valor tendrá
    console.log(product.dataValues); // con datavalues podemos ver todas las propiedades del obj 
    // */
    product.availability = !product.dataValues.availability;
    await product.save();
    response.json({ data: product });
  } catch (error) {
    console.log(colors.bgGreen.black.bold("Hubo un error"));
    console.log(error);
  }
};
//Eliminar un product
export const deleteProduct = async (request: Request, response: Response) => {
  try {
    //Obtengo primero el producto
    const { id } = request.params;
    const product = await Product.findByPk(id);
    if (!product) {
      response.status(404).json({
        error: "Producto no encontrado",
      });
    }
    await product.destroy();
    response.json({ data: "Producto eliminado" });
  } catch (error) {
    console.log(colors.bgGreen.black.bold("Hubo un error al eliminarlo"));
    console.log(error);
  }
};
