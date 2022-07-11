import { inject, injectable } from "tsyringe";

import { IVehicleResponse } from "@modules/vehicles/dtos/IVehicleResponse";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { AppError } from "@shared/errors/AppError";
import { VehicleMapper } from "@modules/vehicles/mappers/VehicleMapper";

@injectable()
class FavoriteVehicleUseCase {
  constructor(
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository
  ) {}

  async execute(vehicleId: number): Promise<IVehicleResponse> {
    const vehicle = await this.vehiclesRepository.findById(vehicleId);

    if (!vehicle) {
      throw new AppError({ message: "Vehicle ID is not registered" });
    }

    if (vehicle.isFavorite) {
      throw new AppError({ message: "Vehicle is already favorite" });
    }

    vehicle.isFavorite = true;

    await this.vehiclesRepository.save(vehicle);

    return VehicleMapper.toDTO(vehicle);
  }
}

export { FavoriteVehicleUseCase };
