import express from "express";
import { DoctorController } from "../controllers/doctor-controller";

const doctorRoute = express.Router();

doctorRoute.get('/', DoctorController.getAllDoctor);

export default doctorRoute;