import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

import { firestore } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { collections } from "@/constants/collections";
import { generateId, idType } from "@/helpers/generateId";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store, storeSchema } from "@/types";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const AddStore = () => {
  const { toast } = useToast();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const id = useMemo(() => generateId(idType.store), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Store>({
    resolver: zodResolver(storeSchema),
    values: {
      id: "ss",
      manager: "",
      capacity: 0,
      piecesIds: 0,
      exitVoucherIds: 0,
      accessoireIds: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  const onSubmit = async (data: Store) => {
    try {
      await setDoc(doc(firestore, collections.stores, data.id), data);
      refreshData();
      toast({
        title: "Succès",
        description: "Le magasin a été ajouté avec succès",
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout du magasin",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: "default" })}>
        Ajouter un magasin
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ajouter un magasin</SheetTitle>
          <SheetDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit,
            quae vero. Voluptas adipisci praesentium.
          </SheetDescription>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="mt-4">
              <label htmlFor="capacity">Capacité</label>
              <Input
                placeholder="Capacité"
                className="mt-2"
                {...register("capacity", { valueAsNumber: true })}
              />
              {errors.capacity && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.capacity.message}
                </p>
              )}
            </fieldset>

            <fieldset className="mt-4">
              <label htmlFor="manager">Manager</label>
              <Input
                placeholder="Manager"
                className="mt-2"
                {...register("manager")}
              />
              {errors.manager && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.manager.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="bon-de-sortie">Bon de sortie</label>
              <Input
                placeholder="Bon de sortie"
                className="mt-2"
                {...register("exitVoucherIds", { valueAsNumber: true })}
              />
              {errors.exitVoucherIds && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.exitVoucherIds.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="piecesIds">Pièces</label>
              <Input
                placeholder="Pièces"
                className="mt-2"
                {...register("piecesIds", { valueAsNumber: true })}
              />
              {errors.exitVoucherIds && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.exitVoucherIds.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="accessoire">Accessoire</label>
              <Input
                placeholder="Accessoire"
                className="mt-2"
                {...register("accessoireIds", { valueAsNumber: true })}
              />
              {errors.accessoireIds && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.accessoireIds.message}
                </p>
              )}
            </fieldset>
            <Button type="submit" className="mt-4">
              Ajouter
            </Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
