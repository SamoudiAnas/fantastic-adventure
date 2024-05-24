export enum idType {
  store = "STORE",
  part = "Part",
  organ = "ORGAN",
  order = "ORDER",
  intervention = "INTERVENTION",
  exitVoucher = "EXIT_VOUCHER",
  accessory = "ACCESSORY",
  rtgMachine = "RTG_MACHINE",
  mold = "MOLD",
}

export const generateId = (idType: idType): string => {
  const timestamp = Date.now();
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
  return `${idType}-${timestamp}${randomNumber}`;
};
