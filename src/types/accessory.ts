import { z } from "zod";

const accessorySchema = z.object({
  id: z.number(),
  designation: z.string(),
  type: z.string(),
  price: z.number(),
  quantity: z.number(),
  managerId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Accessory = z.infer<typeof accessorySchema>;
