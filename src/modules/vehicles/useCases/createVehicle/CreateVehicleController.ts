import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateVehicleUseCase } from "./CreateVehicleUseCase";

class CreateVehicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, description, plate, year, color, price } =
      request.body;

    const createVehicleUseCase = container.resolve(CreateVehicleUseCase);

    const vehicle = await createVehicleUseCase.execute({
      name,
      brand,
      description,
      plate,
      year,
      color,
      price,
    });

    return response.status(201).json(vehicle);
  }
}

export { CreateVehicleController };
