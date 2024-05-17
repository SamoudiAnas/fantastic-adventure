import {
  BookA,
  Building2,
  Hammer,
  Puzzle,
  ReceiptText,
  ShoppingBag,
  WashingMachine,
} from "lucide-react";

export const appRoutes = {
  home: "/",
  stores: "/stores",
  store: (id: string | number) => `/stores/${id}`,
  pieces: "/pieces",
  piece: (id: string | number) => `/pieces/${id}`,
  organs: "/organs",
  organ: (id: string | number) => `/organs/${id}`,
  orders: "/orders",
  order: (id: string | number) => `/orders/${id}`,
  interventions: "/interventions",
  intervention: (id: string | number) => `/interventions/${id}`,
  exitVouchers: "/exit-vouchers",
  exitVoucher: (id: string | number) => `/exit-vouchers/${id}`,
  accessories: "/accessories",
  accessory: (id: string | number) => `/accessories/${id}`,
  rtgMachines: "/rtg-machines",
  rtgMachine: (id: string | number) => `/rtg-machines/${id}`,
};

export const appLinks = [
  {
    name: "Stores",
    path: appRoutes.stores,
    icon: <ShoppingBag className="size-5" />,
  },
  {
    name: "Pieces",
    path: appRoutes.pieces,
    icon: <Puzzle className="size-5" />,
  },
  {
    name: "Organs",
    path: appRoutes.organs,
    icon: <Building2 className="size-5" />,
  },
  {
    name: "Commandes",
    path: appRoutes.orders,
    icon: <BookA className="size-5" />,
  },
  {
    name: "Interventions",
    path: appRoutes.interventions,
    icon: <ShoppingBag className="size-5" />,
  },
  {
    name: "Exit Vouchers",
    path: appRoutes.exitVouchers,
    icon: <ReceiptText className="size-5" />,
  },
  {
    name: "Accessories",
    path: appRoutes.accessories,
    icon: <Hammer className="size-5" />,
  },
  {
    name: "RTG Machines",
    path: appRoutes.rtgMachines,
    icon: <WashingMachine className="size-5" />,
  },
];
