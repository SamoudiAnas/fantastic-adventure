import { z } from "zod";

const exitVoucherSchema = z.object({
  id: z.number(),
  dateIssue: z.string(),
  usageDescription: z.string(),
  registrationNumberInterv: z.number(),
  idInterv: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ExitVoucher = z.infer<typeof exitVoucherSchema>;
