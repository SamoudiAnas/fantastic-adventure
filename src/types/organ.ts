import { z } from "zod";

const organSchema = z.object({
  id: z.number(),
  designation: z.string(),
  serviceStartDate: z.string(),
  supplier: z.string(),
  catalog: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type Organ = z.infer<typeof organSchema>;

export { organSchema, type Organ };
