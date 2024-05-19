import { z } from "zod";

const interventionSchema = z.object({
  id: z.number(),
  date: z.string(),
  duration: z.string(),
  registrationNumber: z.number(),
  exitVoucherId: z.number(),
  machineId: z.number(),
  organId: z.number(),
  moldId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Intervention = z.infer<typeof interventionSchema>;
