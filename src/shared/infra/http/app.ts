import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import createTypeORMConnection from "@shared/infra/typeorm";
import "@shared/containers";
import { AppError } from "@shared/errors/AppError";
import { router } from "./routes";
import { errors } from "celebrate";
import colorsCreate from "@shared/infra/typeorm/seeds/colors";
import rateLimiter from "./middlewares/rateLimiter";

createTypeORMConnection.initialize().then((dataSource) => {
  if (process.env.NODE_ENV !== "test") {
    colorsCreate(dataSource);
  }
});

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(rateLimiter);
app.use(router);

// Celebrate Errors
app.use(errors());

// Exception Handling
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(error);
    if (error instanceof AppError) {
      return response.status(error.statusCode).json(error);
    } else {
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export { app };
