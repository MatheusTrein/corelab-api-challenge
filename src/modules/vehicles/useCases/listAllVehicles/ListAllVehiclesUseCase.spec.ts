import "reflect-metadata";

import { FakeVehiclesRepository } from "@modules/vehicles/repositories/fakes/FakeVehiclesRespository";
import { FakeColorProvider } from "@shared/containers/providers/ColorProvider/fakes/FakeColorProvider";
import { CreateVehicleUseCase } from "../createVehicle/CreateVehicleUseCase";
import { ListAllVehiclesUseCase } from "./ListAllVehiclesUseCase";
import { FakeCacheProvider } from "@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeVehicleRepository: FakeVehiclesRepository;
let fakeColorProvider: FakeColorProvider;
let fakeCacheProvider: FakeCacheProvider;
let createVehicleUseCase: CreateVehicleUseCase;
let listAllVehiclesUseCase: ListAllVehiclesUseCase;

describe("ListAllVehiclesUseCase", () => {
  beforeEach(async () => {
    fakeVehicleRepository = new FakeVehiclesRepository();
    fakeColorProvider = new FakeColorProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createVehicleUseCase = new CreateVehicleUseCase(
      fakeVehicleRepository,
      fakeColorProvider,
      fakeCacheProvider
    );
    listAllVehiclesUseCase = new ListAllVehiclesUseCase(fakeVehicleRepository);

    await createVehicleUseCase.execute({
      name: "Sandero",
      brand: "Renault",
      description: "Único dono, usado 6 anos.",
      color: "Amarelo",
      plate: "IGT2021",
      price: 40000.0,
      year: 2019,
    });

    await createVehicleUseCase.execute({
      name: "Onix",
      brand: "Chevrolet",
      description: "Único dono, usado 6 anos.",
      color: "Vermelho",
      plate: "IGT2022",
      price: 50000.0,
      year: 2020,
    });

    await createVehicleUseCase.execute({
      name: "Renegade",
      brand: "Jeep",
      description: "Único dono, usado 6 anos.",
      color: "Prata",
      plate: "IGT2023",
      price: 60000.0,
      year: 2021,
    });
  });

  it("should be able to find vehicles", async () => {
    const vehicles = await listAllVehiclesUseCase.execute({
      brand: "Jeep",
      color: "Prata",
      maxPrice: 70000,
      minPrice: 50000,
      year: 2021,
      textSearch: "Ren",
    });

    expect(vehicles).toHaveLength(1);
  });
});
