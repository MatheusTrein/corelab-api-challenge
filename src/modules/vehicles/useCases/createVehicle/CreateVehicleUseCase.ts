import { inject, injectable } from "tsyringe";

import { Vehicle } from "@modules/vehicles/infra/typeorm/entities/Vehicle";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { IColorProvider } from "@shared/containers/providers/ColorProvider/models/IColorProvider";
import { AppError } from "@shared/errors/AppError";
import { VehicleMapper } from "@modules/vehicles/mappers/VehicleMapper";
import { IVehicleResponse } from "@modules/vehicles/dtos/IVehicleResponse";
import { toCapitalize } from "@utils/toCapitalize";
import { ICacheProvider } from "@shared/containers/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
  name: string;
  brand: string;
  color: string;
  description: string;
  plate: string;
  year: number;
  price: number;
}

@injectable()
class CreateVehicleUseCase {
  constructor(
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository,
    @inject("ColorProvider")
    private colorProvider: IColorProvider,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  async execute({
    brand,
    color,
    ...data
  }: IRequest): Promise<IVehicleResponse> {
    const vehiclePlateAlreadyExists = await this.vehiclesRepository.findByPlate(
      data.plate
    );

    if (vehiclePlateAlreadyExists) {
      throw new AppError({ message: "Vehicle plate already registered" });
    }

    const { id } = await this.vehiclesRepository.create({
      ...data,
      brand: { name: toCapitalize(brand) },
      color: {
        name: toCapitalize(color),
        hexaCode: this.colorProvider.stringToHexa(color),
      },
    });

    await this.cacheProvider.invalidatePrefix("brands-list");
    await this.cacheProvider.invalidatePrefix("colors-list");

    const vehicle = (await this.vehiclesRepository.findById(id)) as Vehicle;

    return VehicleMapper.toDTO(vehicle);
  }
}

export { CreateVehicleUseCase };
