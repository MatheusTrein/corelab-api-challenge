import "reflect-metadata";

import { FakeVehiclesRepository } from "@modules/vehicles/repositories/fakes/FakeVehiclesRespository";
import { FakeCacheProvider } from "@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider";
import { FakeColorProvider } from "@shared/containers/providers/ColorProvider/fakes/FakeColorProvider";
import { CreateVehicleUseCase } from "../createVehicle/CreateVehicleUseCase";
import { IVehicleResponse } from "@modules/vehicles/dtos/IVehicleResponse";
import { FavoriteVehicleUseCase } from "./FavoriteVehicleUseCase";
import { AppError } from "@shared/errors/AppError";

let vehicle: IVehicleResponse;

let fakeVehicleRepository: FakeVehiclesRepository;
let fakeColorProvider: FakeColorProvider;
let fakeCacheProvider: FakeCacheProvider;
let createVehicleUseCase: CreateVehicleUseCase;
let favoriteVehicleUseCase: FavoriteVehicleUseCase;

describe("FavoriteVehicleUseCase", () => {
  beforeEach(async () => {
    fakeVehicleRepository = new FakeVehiclesRepository();
    fakeColorProvider = new FakeColorProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createVehicleUseCase = new CreateVehicleUseCase(
      fakeVehicleRepository,
      fakeColorProvider,
      fakeCacheProvider
    );
    favoriteVehicleUseCase = new FavoriteVehicleUseCase(fakeVehicleRepository);

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

  it("should be able to favorite vehicle", async () => {
    const vehicleFavorited = await favoriteVehicleUseCase.execute(vehicle.id);

    expect(vehicleFavorited.isFavorite).toBe(true);
  });

  it("should not be able to favorite vehicle with non-existing vehicle id", async () => {
    await expect(
      favoriteVehicleUseCase.execute(Number("wrong-id"))
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to favorite vehicle if it is already favorited", async () => {
    const vehicleFavorited = await favoriteVehicleUseCase.execute(vehicle.id);

    await expect(
      favoriteVehicleUseCase.execute(vehicleFavorited.id)
    ).rejects.toBeInstanceOf(AppError);
  });
});
