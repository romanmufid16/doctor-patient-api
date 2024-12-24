import { prismaClient } from "../app/database";
import { logger } from "../app/logging";
import redisClient from "../app/redis";
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
    const cacheKey = "doctors";
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      logger.debug("Retrieving data from cache");
      return JSON.parse(cachedData);
    }

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

    const doctorResponse = doctors.map(toDoctorResponse);

    await redisClient.set(cacheKey, JSON.stringify(doctorResponse), {
      EX: 60,
    });

    logger.debug("Retrieved data from database");
    return doctorResponse;
  }

  static async removeData(doctorId: string): Promise<void> {
    await prismaClient.doctor.update({
      where: {
        id: doctorId,
      },
      data: {
        statusId: 2,
      },
    });

    await redisClient.del("doctors");
  }
}
