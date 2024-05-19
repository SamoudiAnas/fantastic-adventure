import { z } from "zod";

const pieceSchema = z.object({
  id: z.string(),
  partDesignation: z.string(),
  pieceUnit: z.string(),
  pieceType: z.string(),
  price: z.number(),
  quantity: z.number(),
  receptionDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type Piece = z.infer<typeof pieceSchema>;

export { pieceSchema, type Piece };
