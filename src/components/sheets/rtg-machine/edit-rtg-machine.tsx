import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

import { firestore } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { collections } from "@/constants/collections";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RTGMachine, RTGMachineSchema } from "@/types";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { Loader2 } from "lucide-react";

interface EditRTGMachineProps {
  rtgMachine: RTGMachine;
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const EditRTGMachine = ({
  rtgMachine,
  open,
  setIsOpen,
}: EditRTGMachineProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RTGMachine>({
    resolver: zodResolver(RTGMachineSchema),
    defaultValues: { ...rtgMachine },
  });

  const onSubmit: SubmitHandler<RTGMachine> = async (data) => {
    try {
      setIsLoading(true);
      const ref = doc(firestore, collections.rtgMachines, rtgMachine.id);
      await updateDoc(ref, {
        ...data,
      });
      refreshData();
      reset();
      setIsOpen(false);
      toast({
        title: "Success",
        description: "RTGMachine edited successfully",
        variant: "success",
      });
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
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle> Edit RTGMachine</SheetTitle>
          <SheetDescription>
            Edit a new RTG Machine to the store
          </SheetDescription>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="mt-4">
              <label htmlFor="rtgMachineDesignation">Designation</label>
              <Input
                placeholder="RTGMachine Designation"
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
                <>Edit RTGMachine</>
              )}
            </Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};