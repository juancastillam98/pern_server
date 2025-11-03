import request from "supertest";
import { Request } from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  test("should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.status).toHaveProperty("errors");
  });
  test("should validate that the price should be greater than 0", async () => {
    const response = await request(server)
      .post("/api/products")
      .send({ name: "pepito", price: 0 });
    expect(response.status).toBe(400);
    expect(response.status).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
  });
  test("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "pepito",
      price: 399,
      availability: true,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(404);
  });
});

describe("GET /api/products", () => {
  test("GET a JSON response with products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
  });
});
