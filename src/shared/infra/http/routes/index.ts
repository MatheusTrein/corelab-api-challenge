import { vehiclesRouter } from "@modules/vehicles/infra/http/routes/vehicles.routes";
import { Router } from "express";

const router = Router();

router.use("/vehicles", vehiclesRouter);

export { router };
