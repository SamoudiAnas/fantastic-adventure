import { z } from "zod";

const RTGMachineSchema = z.object({
  id: z.number(),
  designation: z.string(),
  serviceStartDate: z.string(),
  supplier: z.string(),
  catalog: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type RTGMachine = z.infer<typeof RTGMachineSchema>;

export { RTGMachineSchema, type RTGMachine };
