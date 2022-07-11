import "reflect-metadata";

import { FakeVehiclesRepository } from "@modules/vehicles/repositories/fakes/FakeVehiclesRespository";
import { CreateVehicleUseCase } from "./CreateVehicleUseCase";
import { AppError } from "@shared/errors/AppError";
import { FakeColorProvider } from "@shared/containers/providers/ColorProvider/fakes/FakeColorProvider";
import { FakeCacheProvider } from "@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeVehiclesRepository: FakeVehiclesRepository;
let fakeColorProvier: FakeColorProvider;
let fakeCacheProvider: FakeCacheProvider;
let createVehicleUseCase: CreateVehicleUseCase;

describe("CreateVehicleUseCase", () => {
  beforeEach(async () => {
    fakeVehiclesRepository = new FakeVehiclesRepository();
    fakeColorProvier = new FakeColorProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createVehicleUseCase = new CreateVehicleUseCase(
      fakeVehiclesRepository,
      fakeColorProvier,
      fakeCacheProvider
    );
  });

  it("should be able to create a vehicle", async () => {
    const vehicle = await createVehicleUseCase.execute({
      name: "Sandero",
      brand: "Renault",
      description: "Único dono, usado 6 anos.",
      color: "amarelo",
      plate: "IGT2020",
      price: 32000.0,
      year: 2020,
    });

    expect(vehicle).toHaveProperty("id");
  });

  it("should not be able to create vehicle with a already registered plate", async () => {
    await createVehicleUseCase.execute({
      name: "Sandero",
      brand: "Renault",
      description: "Único dono, usado 6 anos.",
      color: "amarelo",
      plate: "IGT2020",
      price: 32000.0,
      year: 2020,
    });

    await expect(
      createVehicleUseCase.execute({
        name: "Sandero",
        brand: "Renault",
        description: "Único dono, usado 6 anos.",
        color: "amarelo",
        plate: "IGT2020",
        price: 32000.0,
        year: 2020,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
