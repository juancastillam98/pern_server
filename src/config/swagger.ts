import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description:
        "API documentation for managing products. This includes operations for listing, creating, updating, and deleting products.",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],

    paths: {
      "/api/products": {
        get: {
          tags: ["Products"],
          summary: "Get all the products",
          description:
            "Retrieve a list of all products available in the database.",
          responses: {
            200: {
              description: "List of all products",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Product" },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Products"],
          summary: "Create a new product",
          description: "Add a new product to the database.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
                example: {
                  name: "Monitor curvo de 49''",
                  price: 999.99,
                  availability: true,
                },
              },
            },
          },
          responses: {
            201: {
              description: "Product created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" },
                },
              },
            },
            400: {
              description: "Invalid input data",
            },
          },
        },
      },

      "/api/products/{id}": {
        get: {
          tags: ["Products"],
          summary: "Get a product by ID",
          description: "Retrieve a specific product by its unique ID.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID of the product",
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: {
              description: "Product found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" },
                },
              },
            },
            404: { description: "Product not found" },
          },
        },

        put: {
          tags: ["Products"],
          summary: "Update a product",
          description: "Update a product’s information by its ID.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Product ID",
              schema: { type: "integer" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
                example: {
                  name: "Monitor Gamer 27''",
                  price: 399.99,
                  availability: false,
                },
              },
            },
          },
          responses: {
            200: { description: "Product updated successfully" },
            400: { description: "Invalid product data" },
            404: { description: "Product not found" },
          },
        },

        patch: {
          tags: ["Products"],
          summary: "Update product availability",
          description: "Change the availability status of a product.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Product ID",
              schema: { type: "integer" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    availability: {
                      type: "boolean",
                      description: "New availability status",
                    },
                  },
                },
                example: { availability: false },
              },
            },
          },
          responses: {
            200: { description: "Product availability updated successfully" },
            404: { description: "Product not found" },
          },
        },

        delete: {
          tags: ["Products"],
          summary: "Delete a product",
          description: "Remove a product from the database.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Product ID",
              schema: { type: "integer" },
            },
          ],
          responses: {
            204: { description: "Product deleted successfully" },
            404: { description: "Product not found" },
          },
        },
      },
    },

    components: {
      schemas: {
        Product: {
          type: "object",
          required: ["name", "price", "availability"],
          properties: {
            id: {
              type: "integer",
              description: "The unique product ID",
              example: 1,
            },
            name: {
              type: "string",
              description: "Name of the product",
              example: "Monitor curvo de 49''",
            },
            price: {
              type: "number",
              description: "Price of the product in euros",
              example: 999.99,
            },
            availability: {
              type: "boolean",
              description: "Availability status of the product",
              example: true,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            code: { type: "string" },
            message: { type: "string" },
          },
          required: ["code", "message"],
        },
      },
    },
  },
  apis: [], // No necesitamos leer archivos externos
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    /* Agrega tu logo como fondo */
    .topbar-wrapper .link {
      content: url('https://porfolio-johndev.vercel.app/logo/logo.png');
      background-repeat: no-repeat;
      background-size: contain;
      object-fit: contain;
      height: 60px;
      width: 200px;
      display: inline-block;
    }

    /* Ajusta la barra superior si quieres más alto el logo */
    .topbar {
      background-color: #ffffff;
      padding: 10px 0;
    }
  `,
  customSiteTitle: "JohnDev API Docs 🚀",
};
export default swaggerSpec;
export { swaggerUiOptions };
