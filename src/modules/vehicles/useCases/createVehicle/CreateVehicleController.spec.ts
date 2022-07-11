import "reflect-metadata";
import request from "supertest";

import connectionTypeORM from "@shared/infra/typeorm";
import { app } from "@shared/infra/http/app";

describe("CreateVehicleController", () => {
  beforeAll(async () => {
    await connectionTypeORM.initialize();
    await connectionTypeORM.runMigrations();
  });

  afterAll(async () => {
    await connectionTypeORM.dropDatabase();
    await connectionTypeORM.destroy();
  });

  it("should be able to create a vehicle", async () => {
    const response = await request(app).post("/vehicles").send({
      name: "Sandero",
      brand: "Renault",
      description: "Único dono, usado 6 anos.",
      color: "vermelho",
      plate: "IGT2020",
      price: 32000.0,
      year: 2020,
    });

    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });
});
