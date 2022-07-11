import "reflect-metadata";

import { FakeBrandsRepository } from "@modules/vehicles/repositories/fakes/FakeBrandsRepository";
import { ListAllBrandsUseCase } from "./ListAllBrandsUseCase";
import { FakeCacheProvider } from "@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeBrandsRepository: FakeBrandsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listAllBrandsUseCase: ListAllBrandsUseCase;

describe("ListAllBrandsUseCase", () => {
  beforeEach(async () => {
    fakeBrandsRepository = new FakeBrandsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listAllBrandsUseCase = new ListAllBrandsUseCase(
      fakeBrandsRepository,
      fakeCacheProvider
    );
  });

  it("should be able to list all brands", async () => {
    await fakeBrandsRepository.create("Renault");
    await fakeBrandsRepository.create("Chevrolet");

    const brands = await listAllBrandsUseCase.execute();

    expect(brands).toHaveLength(2);
  });
});
