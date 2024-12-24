import { z, ZodType } from "zod";

export class DoctorValidation {
  static readonly ADD: ZodType = z.object({
    name: z.string().min(1).max(100),
    specialty: z.string().min(1).max(100),
    phoneNumber: z.string().min(11).max(15),
  });
}
