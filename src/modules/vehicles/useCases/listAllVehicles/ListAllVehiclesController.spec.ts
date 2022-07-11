import "reflect-metadata";
import request from "supertest";

import connectionTypeORM from "@shared/infra/typeorm";
import { app } from "@shared/infra/http/app";

describe("ListAllVehiclesController", () => {
  beforeAll(async () => {
    await connectionTypeORM.initialize();
    await connectionTypeORM.runMigrations();

    await request(app).post("/vehicles").send({
      name: "Sandero",
      brand: "Renault",
      description: "Único dono, usado 6 anos.",
      color: "Vermelho",
      plate: "IGT2020",
      price: 30000.0,
      year: 2019,
    });

    await request(app).post("/vehicles").send({
      name: "Onix",
      brand: "Chevrolet",
      description: "Único dono, usado 6 anos.",
      color: "Amarelo",
      plate: "IGT2021",
      price: 40000.0,
      year: 2020,
    });

    await request(app).post("/vehicles").send({
      name: "Renegade",
      brand: "Jeep",
      description: "Único dono, usado 6 anos.",
      color: "Azul",
      plate: "IGT2022",
      price: 50000.0,
      year: 2021,
    });
  });
  afterAll(async () => {
    await connectionTypeORM.dropDatabase();
    await connectionTypeORM.destroy();
  });

  it("should be able to list all vehicles with query strings", async () => {
    const response = await request(app)
      .get("/vehicles")
      .query({
        brand: "Jeep",
        color: "Azul",
        minPrice: 40000,
        maxPrice: 60000,
        year: 2021,
        textSearch: "Ren",
      })
      .send();

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });
});
