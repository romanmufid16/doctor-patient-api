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
        data: result,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async addDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const request: AddDoctorRequest = req.body;
      const result = await DoctorService.add(request);
      const response: WebResponse<DoctorResponse> = {
        success: true,
        message: "Add doctor successfully",
        data: result,
      };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async removeDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const doctorId = req.params.id;
      await DoctorService.removeData(doctorId);
      const response: WebResponse<null> = {
        success: true,
        message: "Remove doctor successfully",
        data: null,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
