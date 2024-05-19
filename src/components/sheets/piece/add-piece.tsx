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
import { Piece, pieceSchema } from "@/types";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export const AddPiece = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const id = useMemo(() => generateId(idType.piece), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Piece>({
    resolver: zodResolver(pieceSchema),
    defaultValues: {
      id: id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  const addPiece = async (data: Piece) => {
    try {
      setIsLoading(true);
      await setDoc(doc(firestore, collections.pieces, data.id), data);
      refreshData();
      reset();
      toast({
        title: "Success",
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
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = handleSubmit(addPiece);

  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: "default" })}>
        Add Piece
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle> Add Piece</SheetTitle>
          <SheetDescription>Add a new piece to the store</SheetDescription>

          <form onSubmit={onSubmit}>
            <fieldset className="mt-4">
              <label htmlFor="partDesignation">Part Designation</label>
              <Input
                placeholder="Part Designation"
                className="mt-2"
                {...register("partDesignation")}
              />
              {errors.partDesignation && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.partDesignation.message}
                </p>
              )}
            </fieldset>

            <fieldset className="mt-4">
              <label htmlFor="pieceType">Piece Type</label>
              <Input
                placeholder="Piece Type"
                className="mt-2"
                {...register("pieceType")}
              />
              {errors.pieceType && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.pieceType.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="pieceUnit">Piece Unit</label>
              <Input
                placeholder="Piece Unit"
                className="mt-2"
                {...register("pieceUnit")}
              />
              {errors.pieceUnit && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.pieceUnit.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="price">Price</label>
              <Input
                placeholder="Price"
                className="mt-2"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="quantity">Quantity</label>
              <Input
                placeholder="Quantity"
                className="mt-2"
                {...register("quantity", { valueAsNumber: true })}
              />
              {errors.quantity && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.quantity.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="receptionDate">Reception Date</label>
              <Input
                placeholder="Reception Date"
                className="mt-2"
                {...register("receptionDate")}
              />
              {errors.receptionDate && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.receptionDate.message}
                </p>
              )}
            </fieldset>
            <Button disabled={isLoading} type="submit" className="mt-4">
              {isLoading ? "Loading..." : "Add Piece"}
            </Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
