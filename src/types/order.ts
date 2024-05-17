export type Order = {
  id: number;
  quantity: number;
  storeId: number;
  piecesIds: number[];
  accessoryId: number[];
  supplierId: number;
  createdAt: string;
  updatedAt: string;
};
