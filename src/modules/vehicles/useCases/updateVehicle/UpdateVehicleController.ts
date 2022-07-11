import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateVehicleUseCase } from "./UpdateVehicleUseCase";

class UpdateVehicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, brand, description, plate, year, color, price } =
      request.body;

    const updateVehicleUseCase = container.resolve(UpdateVehicleUseCase);

    const updatedVehicle = await updateVehicleUseCase.execute({
      id: Number(id),
      name,
      brand,
      description,
      plate,
      year,
      color,
      price,
    });

    return response.json(updatedVehicle);
  }
}

export { UpdateVehicleController };
