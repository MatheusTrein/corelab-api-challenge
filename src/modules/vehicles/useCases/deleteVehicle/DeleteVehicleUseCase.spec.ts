import "reflect-metadata";

import { FakeVehiclesRepository } from "@modules/vehicles/repositories/fakes/FakeVehiclesRespository";
import { FakeColorProvider } from "@shared/containers/providers/ColorProvider/fakes/FakeColorProvider";
import { CreateVehicleUseCase } from "../createVehicle/CreateVehicleUseCase";
import { DeleteVehicleUseCase } from "./DeleteVehicleUseCase";
import { IVehicleResponse } from "@modules/vehicles/dtos/IVehicleResponse";
import { AppError } from "@shared/errors/AppError";
import { FakeCacheProvider } from "@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider";

let vehicle: IVehicleResponse;

let fakeVehicleRepository: FakeVehiclesRepository;
let fakeColorProvider: FakeColorProvider;
let fakeCacheProvider: FakeCacheProvider;
let createVehicleUseCase: CreateVehicleUseCase;
let deleteVehicleUseCase: DeleteVehicleUseCase;

describe("DeleteVehicleUseCase", () => {
  beforeEach(async () => {
    fakeVehicleRepository = new FakeVehiclesRepository();
    fakeColorProvider = new FakeColorProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createVehicleUseCase = new CreateVehicleUseCase(
      fakeVehicleRepository,
      fakeColorProvider,
      fakeCacheProvider
    );
    deleteVehicleUseCase = new DeleteVehicleUseCase(fakeVehicleRepository);

    vehicle = await createVehicleUseCase.execute({
      name: "Sandero",
      brand: "Renault",
      description: "Único dono, usado 6 anos.",
      color: "amarelo",
      plate: "IGT2020",
      price: 32000.0,
      year: 2020,
    });
  });

  it("should be able to delete a vehicle", async () => {
    await deleteVehicleUseCase.execute(vehicle.id);

    const vehicles = await fakeVehicleRepository.findByQueryString({});

    expect(vehicles).toHaveLength(0);
  });

  it("should not be able to delete a vehicle with non-existing id registered", async () => {
    await expect(
      deleteVehicleUseCase.execute(Number("wrongId"))
    ).rejects.toBeInstanceOf(AppError);
  });
});
