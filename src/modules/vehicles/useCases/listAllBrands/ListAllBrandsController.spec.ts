import "reflect-metadata";
import request from "supertest";

import connectionTypeORM from "@shared/infra/typeorm";
import { app } from "@shared/infra/http/app";

describe("ListAllBrandsController", () => {
  beforeAll(async () => {
    await connectionTypeORM.initialize();
    await connectionTypeORM.runMigrations();

    await request(app).post("/vehicles").send({
      name: "Sandero",
      brand: "Renault",
      description: "Único dono, usado 6 anos.",
      color: "Vermelho",
      plate: "IGT2020",
      price: 32000.0,
      year: 2020,
    });

    await request(app).post("/vehicles").send({
      name: "Onix",
      brand: "Chevrolet",
      description: "Único dono",
      color: "Amarelo",
      plate: "IGT2021",
      price: 50000.0,
      year: 2020,
    });
  });

  afterAll(async () => {
    await connectionTypeORM.dropDatabase();
    await connectionTypeORM.destroy();
  });

  it("should be albe to list all brands", async () => {
    const response = await request(app).get("/vehicles/brands").send();

    expect(response.body).toHaveLength(2);
  });
});
