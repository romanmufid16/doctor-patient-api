import { prismaClient } from "../app/database";
import {
  AddDoctorRequest,
  DoctorResponse,
  toDoctorResponse,
} from "../models/doctor-model";
import { DoctorValidation } from "../validation/doctor-validation";
import { Validation } from "../validation/validation";

export class DoctorService {
  static async add(request: AddDoctorRequest): Promise<DoctorResponse> {
    const doctorRequest = Validation.validate(DoctorValidation.ADD, request);

    const doctor = await prismaClient.doctor.create({
      data: doctorRequest,
    });

    return toDoctorResponse(doctor);
  }

  static async getAll(): Promise<DoctorResponse[]> {
    const status = await prismaClient.status.findUnique({
      where: {
        code: "ACT",
      },
      select: {
        id: true,
      },
    });

    const doctors = await prismaClient.doctor.findMany({
      where: {
        statusId: status!.id,
      },
    });

    return doctors.map(toDoctorResponse);
  }
}
