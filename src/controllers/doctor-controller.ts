import { NextFunction, Request, Response } from "express";
import { WebResponse } from "../lib/web-response";
import { AddDoctorRequest, DoctorResponse } from "../models/doctor-model";
import { DoctorService } from "../services/doctor-service";

export class DoctorController {
  static async getAllDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await DoctorService.getAll();
      const response: WebResponse<DoctorResponse[]> = {
        success: true,
        message: "Get all doctors successfully",
        data: result
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}