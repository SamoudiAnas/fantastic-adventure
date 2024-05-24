import { z } from "zod";

export const interventionSchema = z.object({
  id: z.string(),
  date: z.string(),
  duration: z.string(),
  registrationNumber: z.number(),
  machineId: z.string(),
  organId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Intervention = z.infer<typeof interventionSchema>;
