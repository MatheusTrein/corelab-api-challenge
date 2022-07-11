import { inject, injectable } from "tsyringe";

import { Color } from "@modules/vehicles/infra/typeorm/entities/Color";
import { IColorsRepository } from "@modules/vehicles/repositories/IColorsRepository";
import { ICacheProvider } from "@shared/containers/providers/CacheProvider/models/ICacheProvider";

@injectable()
class ListAllColorsUseCase {
  constructor(
    @inject("ColorsRepository")
    private colorsRepository: IColorsRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  async execute(): Promise<Color[]> {
    const cacheKey = "colors-list";

    let colors = await this.cacheProvider.recover<Color[]>(cacheKey);

    if (!colors) {
      colors = await this.colorsRepository.listAll();

      await this.cacheProvider.save(cacheKey, colors);
    }

    return colors;
  }
}

export { ListAllColorsUseCase };
