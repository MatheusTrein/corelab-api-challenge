import "reflect-metadata";

import { FakeColorsRepository } from "@modules/vehicles/repositories/fakes/FakeColorsRepository";
import { ListAllColorsUseCase } from "./ListAllColorsUseCase";
import { FakeCacheProvider } from "@shared/containers/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeColorsRepository: FakeColorsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listAllColorsUseCase: ListAllColorsUseCase;

describe("ListAllColorsUseCase", () => {
  beforeEach(async () => {
    fakeColorsRepository = new FakeColorsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listAllColorsUseCase = new ListAllColorsUseCase(
      fakeColorsRepository,
      fakeCacheProvider
    );
  });

  it("should be able to list all colors", async () => {
    await fakeColorsRepository.create({
      name: "Vermelho",
      hexaCode: "#ff0000",
    });
    await fakeColorsRepository.create({ name: "Branco", hexaCode: "#ffffff" });

    const colors = await listAllColorsUseCase.execute();

    expect(colors).toHaveLength(2);
  });
});
