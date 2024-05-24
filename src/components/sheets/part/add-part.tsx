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
import { collection, doc, setDoc } from "firebase/firestore";
import { collections } from "@/constants/collections";
import { generateId, idType } from "@/helpers/generateId";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Part, partSchema } from "@/types";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { organs } from "@/constants/organs";
import { Command } from "cmdk";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/combobox";
import { cn } from "@/utils/cn";

export const AddPart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { toast } = useToast();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const id = useMemo(() => generateId(idType.part), [open]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Part>({
    resolver: zodResolver(partSchema),
    defaultValues: {
      id: id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  const onSubmit: SubmitHandler<Part> = async (data) => {
    try {
      setIsLoading(true);
      const ref = doc(collection(firestore, collections.parts));
      await setDoc(ref, data);
      refreshData();
      reset();
      toast({
        title: "Success",
        description: "Part added successfully",
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
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: "default" })}>
        Add Part
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle> Add Part</SheetTitle>
          <SheetDescription>Add a new part to the store</SheetDescription>

          <form onSubmit={handleSubmit(onSubmit)}>
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
              <label htmlFor="partType">Part Type</label>
              <Input
                placeholder="Part Type"
                className="mt-2"
                {...register("partType")}
              />
              {errors.partType && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.partType.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="partUnit" className="mb-2 block">
                Part Unit
              </label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                  className={buttonVariants({
                    variant: "outlined-ghost",
                    className: "w-full justify-between",
                  })}
                >
                  {value
                    ? organs.find((organ) => organ.value === value)?.label
                    : "Select organ..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search organ..." />
                    <CommandEmpty>No organ found.</CommandEmpty>
                    <CommandGroup>
                      {organs?.map((organ) => (
                        <CommandItem
                          key={organ.value}
                          value={organ.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue,
                            );
                            setOpen(false);
                          }}
                          className={
                            value === organ.value ? "bg-indigo-100" : ""
                          }
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === organ.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {organ.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.partUnit && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.partUnit.message}
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
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>Add Part</>
              )}
            </Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
