import { inject, injectable } from "tsyringe";

import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteVehicleUseCase {
  constructor(
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository
  ) {}

  async execute(vehicleId: number): Promise<void> {
    const vehicle = await this.vehiclesRepository.findById(vehicleId);

    if (!vehicle) {
      throw new AppError({ message: "Vehicle ID is not registered" });
    }

    await this.vehiclesRepository.delete(vehicleId);
  }
}

export { DeleteVehicleUseCase };
