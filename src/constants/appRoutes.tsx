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
  stores: "/magasins",
  store: (id: string | number) => `/stores/${id}`,
  parts: "/parts",
  part: (id: string | number) => `/parts/${id}`,
  organs: "/organs",
  organ: (id: string | number) => `/organs/${id}`,
  orders: "/commandes",
  order: (id: string | number) => `/commandes/${id}`,
  interventions: "/interventions",
  intervention: (id: string | number) => `/interventions/${id}`,
  exitVouchers: "/bon-de-sortie",
  exitVoucher: (id: string | number) => `/bon-de-sortie/${id}`,
  accessories: "/accessoires",
  accessory: (id: string | number) => `/accessoires/${id}`,
  rtgMachines: "/machines-rtg",
  rtgMachine: (id: string | number) => `/machines-rtg/${id}`,
};

export const appLinks = [
  {
    name: "Magasins",
    path: appRoutes.stores,
    icon: <ShoppingBag className="size-5" />,
  },
  {
    name: "Parts",
    path: appRoutes.parts,
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
    name: "Accessoires",
    path: appRoutes.accessories,
    icon: <Hammer className="size-5" />,
  },
  {
    name: "Machine RTG",
    path: appRoutes.rtgMachines,
    icon: <WashingMachine className="size-5" />,
  },
];
