import "reflect-metadata";

import { FakeVehiclesRepository } from "@modules/vehicles/repositories/fakes/FakeVehiclesRespository";
import { UpdateVehicleUseCase } from "./UpdateVehicleUseCase";
import { AppError } from "@shared/errors/AppError";
import { FakeColorProvider } from "@shared/containers/providers/ColorProvider/fakes/FakeColorProvider";
import { CreateVehicleUseCase } from "../createVehicle/CreateVehicleUseCase";
import { FakeCacheProvider } from "@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeVehicleRepository: FakeVehiclesRepository;
let fakeColorProvider: FakeColorProvider;
let fakeCacheProvider: FakeCacheProvider;
let createVehicleUseCase: CreateVehicleUseCase;
let updateVehicleUseCase: UpdateVehicleUseCase;

describe("UpdateVehicleUseCase", () => {
  beforeEach(async () => {
    fakeVehicleRepository = new FakeVehiclesRepository();
    fakeColorProvider = new FakeColorProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createVehicleUseCase = new CreateVehicleUseCase(
      fakeVehicleRepository,
      fakeColorProvider,
      fakeCacheProvider
    );
    updateVehicleUseCase = new UpdateVehicleUseCase(
      fakeVehicleRepository,
      fakeColorProvider,
      fakeCacheProvider
    );
  });

  it("should be able to update a vehicle", async () => {
    const vehicle = await createVehicleUseCase.execute({
      name: "Sandero",
      brand: "Renault",
      description: "Único dono, usado 6 anos.",
      color: "Vermelho",
      plate: "IGT2020",
      price: 32000.0,
      year: 2020,
    });

    const updatedVehicle = await updateVehicleUseCase.execute({
      id: vehicle.id,
      name: "UpdatedName",
      brand: "UpdatedBrand",
      description: "UpdatedDescription",
      color: "Amarelo",
      plate: "IGT2020",
      price: 40000.0,
      year: 2020,
    });

    expect(updatedVehicle).toEqual(
      expect.objectContaining({
        id: vehicle.id,
        name: "UpdatedName",
        brand: "UpdatedBrand",
        description: "UpdatedDescription",
        color: "Amarelo",
        plate: "IGT2020",
        price: 40000.0,
        year: 2020,
      })
    );
  });

  it("should not be able to update a vehicle if vehicle id is not registered", async () => {
    await expect(
      updateVehicleUseCase.execute({
        id: Number("fakeId"),
        name: "UpdatedName",
        brand: "UpdatedBrand",
        description: "UpdatedDescription",
        color: "amarelo",
        plate: "IGT2020",
        price: 40000.0,
        year: 2020,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a vehicle if plate is already registered in another vehicle", async () => {
    const vehicle1 = await createVehicleUseCase.execute({
      name: "Sandero",
      brand: "Renault",
      description: "Único dono, usado 6 anos.",
      color: "amarelo",
      plate: "IGT2020",
      price: 32000.0,
      year: 2020,
    });

    const vehicle2 = await createVehicleUseCase.execute({
      name: "Sandero",
      brand: "Renault",
      description: "Único dono, usado 6 anos.",
      color: "amarelo",
      plate: "IGT2021",
      price: 32000.0,
      year: 2020,
    });

    await expect(
      updateVehicleUseCase.execute({
        id: vehicle1.id,
        name: "UpdatedName",
        brand: "UpdatedBrand",
        description: "UpdatedDescription",
        color: "amarelo",
        plate: vehicle2.plate,
        price: 40000.0,
        year: 2020,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
