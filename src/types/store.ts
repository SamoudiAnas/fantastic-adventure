import { z } from "zod";

const storeSchema = z.object({
  id: z.string({
    required_error: "L'identifiant est requis",
  }),
  manager: z.string({
    required_error: "Le manager est requis",
  }),
  capacity: z.number({
    required_error: "La capacité est requise",
  }),
  piecesIds: z.number({
    required_error: "Les pièces sont requises",
  }),
  exitVoucherIds: z.number({
    required_error: "Les bons de sortie sont requis",
  }),
  accessoireIds: z.number({
    required_error: "Les accessoires sont requis",
  }),
  createdAt: z.string({
    required_error: "La date de création est requise",
  }),
  updatedAt: z.string({
    required_error: "La date de modification est requise",
  }),
});

type Store = z.infer<typeof storeSchema>;

export { storeSchema, type Store };
