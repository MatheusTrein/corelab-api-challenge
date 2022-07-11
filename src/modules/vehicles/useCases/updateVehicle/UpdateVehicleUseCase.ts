import { inject, injectable } from "tsyringe";

import { Vehicle } from "@modules/vehicles/infra/typeorm/entities/Vehicle";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { IColorProvider } from "@shared/containers/providers/ColorProvider/models/IColorProvider";
import { AppError } from "@shared/errors/AppError";
import { IVehicleResponse } from "@modules/vehicles/dtos/IVehicleResponse";
import { VehicleMapper } from "@modules/vehicles/mappers/VehicleMapper";
import { toCapitalize } from "@utils/toCapitalize";
import { ICacheProvider } from "@shared/containers/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
  id: number;
  name: string;
  brand: string;
  color: string;
  description: string;
  plate: string;
  year: number;
  price: number;
}

@injectable()
class UpdateVehicleUseCase {
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
    const vehicle = await this.vehiclesRepository.findById(data.id);

    if (!vehicle) {
      throw new AppError({ message: "Vehicle id not found" });
    }

    const vehiclePlateAlreadyExistsInAnotherVehicle =
      await this.vehiclesRepository.findByPlate(data.plate);

    if (
      vehiclePlateAlreadyExistsInAnotherVehicle &&
      vehiclePlateAlreadyExistsInAnotherVehicle.id !== vehicle.id
    ) {
      throw new AppError({
        message: "Vehicle plate already registered in another vehicle",
      });
    }

    await this.vehiclesRepository.save({
      ...data,
      brand: { name: toCapitalize(brand) },
      color: {
        name: toCapitalize(color),
        hexaCode: this.colorProvider.stringToHexa(color),
      },
    });

    await this.cacheProvider.invalidatePrefix("brands-list");
    await this.cacheProvider.invalidatePrefix("colors-list");

    const updatedVehicle = (await this.vehiclesRepository.findById(
      data.id
    )) as Vehicle;

    return VehicleMapper.toDTO(updatedVehicle);
  }
}

export { UpdateVehicleUseCase };
