import { inject, injectable } from "tsyringe";

import { Brand } from "@modules/vehicles/infra/typeorm/entities/Brand";
import { IBrandsRepository } from "@modules/vehicles/repositories/IBrandsRepository";
import { ICacheProvider } from "@shared/containers/providers/CacheProvider/models/ICacheProvider";

@injectable()
class ListAllBrandsUseCase {
  constructor(
    @inject("BrandsRepository")
    private brandsRepository: IBrandsRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  async execute(): Promise<Brand[]> {
    const cacheKey = "brands-list";

    let brands = await this.cacheProvider.recover<Brand[]>(cacheKey);

    if (!brands) {
      brands = await this.brandsRepository.listAll();

      await this.cacheProvider.save(cacheKey, brands);
    }

    return brands;
  }
}

export { ListAllBrandsUseCase };
