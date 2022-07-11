import "reflect-metadata";
import request from "supertest";

import connectionTypeORM from "@shared/infra/typeorm";
import { app } from "@shared/infra/http/app";
import { Vehicle } from "@modules/vehicles/infra/typeorm/entities/Vehicle";

let vehicle: Vehicle;

describe("FavoriteVehicleContoller", () => {
  beforeAll(async () => {
    await connectionTypeORM.initialize();
    await connectionTypeORM.runMigrations();

    const createResponse = await request(app).post("/vehicles").send({
      name: "Sandero",
      brand: "Renault",
      description: "Único dono, usado 6 anos.",
      color: "vermelho",
      plate: "IGT2020",
      price: 32000.0,
      year: 2020,
    });

    vehicle = createResponse.body;
  });

  afterAll(async () => {
    await connectionTypeORM.dropDatabase();
    await connectionTypeORM.destroy();
  });

  it("should be able to favorite vehicle", async () => {
    const response = await request(app)
      .patch(`/vehicles/favorite/${vehicle.id}`)
      .send();

    expect(response.body).toHaveProperty("isFavorite", true);
  });
});
