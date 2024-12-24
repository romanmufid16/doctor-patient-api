import express from "express";
import cors from "cors";
import { ErrorMiddleware } from "../middlewares/error.middleware";
import doctorRoute from "../routes/doctor-routes";

export const web = express();

web.use(cors());
web.use(express.json());

web.use("/api/doctors", doctorRoute);


web.use(ErrorMiddleware);