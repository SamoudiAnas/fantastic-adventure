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

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Organ, organSchema } from "@/types";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

export const AddOrgan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const id = useMemo(() => generateId(idType.organ), [open]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Organ>({
    resolver: zodResolver(organSchema),
    defaultValues: {
      id: id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  const onSubmit: SubmitHandler<Organ> = async (data) => {
    try {
      setIsLoading(true);
      const ref = doc(firestore, collections.organs, data.id);
      await setDoc(ref, data);
      refreshData();
      reset();
      toast({
        title: "Success",
        description: "Organ added successfully",
        variant: "success",
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={buttonVariants({ variant: "default" })}>
        Add Organ
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle> Add Organ</SheetTitle>
          <SheetDescription>Add a new organ to the store</SheetDescription>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="mt-4">
              <label htmlFor="organDesignation">Organ Designation</label>
              <Input
                placeholder="Organ Designation"
                className="mt-2"
                {...register("designation")}
              />
              {errors.designation && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.designation.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="serviceStartDate">Service Start Date</label>
              <Input
                placeholder="Service Start Date"
                className="mt-2"
                {...register("serviceStartDate")}
              />
              {errors.serviceStartDate && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.serviceStartDate.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="supplier" className="mb-2 block">
                Supplier
              </label>
              <Input
                placeholder="Supplier"
                className="mt-2"
                {...register("supplier")}
              />
              {errors.supplier && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.supplier.message}
                </p>
              )}
            </fieldset>

            <fieldset className="mt-4">
              <label htmlFor="catalog">Catalog</label>
              <Input
                placeholder="Catalog"
                className="mt-2"
                {...register("catalog")}
              />
              {errors.catalog && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.catalog.message}
                </p>
              )}
            </fieldset>

            <Button disabled={isLoading} type="submit" className="mt-4">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>Add Organ</>
              )}
            </Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
