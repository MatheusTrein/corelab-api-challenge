import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllColorsUseCase } from "./ListAllColorsUseCase";

class ListAllColorsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllColorsUseCase = container.resolve(ListAllColorsUseCase);

    const colors = await listAllColorsUseCase.execute();

    return response.json(colors);
  }
}

export { ListAllColorsController };
