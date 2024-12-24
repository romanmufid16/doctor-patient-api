import { Doctor } from "@prisma/client";

export interface DoctorResponse {
  id: string;
  name: string;
  specialty: string;
  phoneNumber: string;
}

export type AddDoctorRequest = {
  name: string;
  specialty: string;
  phoneNumber: string;
};

export const toDoctorResponse = (doctor: Doctor): DoctorResponse => {
  return {
    id: doctor.id,
    name: doctor.name,
    specialty: doctor.specialty,
    phoneNumber: doctor.phoneNumber,
  };
};
