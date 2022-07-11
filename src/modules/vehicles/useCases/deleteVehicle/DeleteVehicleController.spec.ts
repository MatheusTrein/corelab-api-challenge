import "reflect-metadata";
import request from "supertest";

import connectionTypeORM from "@shared/infra/typeorm";
import { app } from "@shared/infra/http/app";
import { IVehicleResponse } from "@modules/vehicles/dtos/IVehicleResponse";

let vehicle: IVehicleResponse;

describe("DeleteVehicleController", () => {
  beforeAll(async () => {
    await connectionTypeORM.initialize();
    await connectionTypeORM.runMigrations();

    const responseCreateVehicle = await request(app).post("/vehicles").send({
      name: "Sandero",
      brand: "Renault",
      description: "Único dono, usado 6 anos.",
      color: "Vermelho",
      plate: "IGT2020",
      price: 32000.0,
      year: 2020,
    });

    vehicle = responseCreateVehicle.body;
  });

  afterAll(async () => {
    await connectionTypeORM.dropDatabase();
    await connectionTypeORM.destroy();
  });

  it("should be able to delete a vehicle", async () => {
    const response = await request(app)
      .delete(`/vehicles/${vehicle.id}`)
      .send();

    expect(response.status).toBe(200);
  });
});
