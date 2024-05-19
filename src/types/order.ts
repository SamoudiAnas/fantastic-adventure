import { z } from "zod";

const orderSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  storeId: z.number(),
  piecesIds: z.array(z.number()),
  accessoryId: z.array(z.number()),
  supplierId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type Order = z.infer<typeof orderSchema>;

export { orderSchema, type Order };
