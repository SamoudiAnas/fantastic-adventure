import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { interventionsTypes } from "@/constants/interventions-type";
import { firestore } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { collections } from "@/constants/collections";
import { generateId, idType } from "@/helpers/generateId";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Intervention, interventionSchema } from "@/types";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { queryClient } from "@/pages/_app";
import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "react-query";
import { getAllOrgans } from "@/api/organs.client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/combobox";
import { cn } from "@/utils/cn";

interface AddInterventionProps {
  rtgMachineId: string;
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddIntervention = ({
  rtgMachineId,
  open,
  setIsOpen,
}: AddInterventionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isTypeSelectOpen, setIsTypeSelectOpen] = useState(false);

  useEffect(() => {
    console.log(type);
  }, [type]);

  const { data, isSuccess } = useQuery(queryKeys.organs, getAllOrgans, {
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
  });

  const { toast } = useToast();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const id = useMemo(() => generateId(idType.intervention), [open]);

  const {
    register,
    handleSubmit,
    reset,
    setValue: setFormValue,
    formState: { errors },
  } = useForm<Intervention>({
    resolver: zodResolver(interventionSchema),

    defaultValues: {
      id: id,
      machineId: rtgMachineId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  const onSubmit: SubmitHandler<Intervention> = async (data) => {
    try {
      setIsLoading(true);
      const ref = doc(firestore, collections.interventions, data.id);
      await setDoc(ref, data);
      refreshData();
      reset();
      queryClient.invalidateQueries(queryKeys.interventions);
      toast({
        title: "Success",
        description: "Intervention added successfully",
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
          <SheetTitle> Add Intervention</SheetTitle>
          <SheetDescription>
            Add a new intervention to the store
          </SheetDescription>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="mt-4">
              <label htmlFor="registrationNumber" className="mb-2 block">
                Organ
              </label>
              <Popover open={isSelectOpen} onOpenChange={setIsSelectOpen}>
                <PopoverTrigger
                  disabled={!isSuccess}
                  className={buttonVariants({
                    variant: "outlined-ghost",
                    className: "w-full justify-between",
                  })}
                >
                  {value
                    ? data?.organs.find(
                        (organ) => organ.id.toLowerCase() === value,
                      )?.designation
                    : "Select organ..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search organ..." />
                    <CommandEmpty>No organ found.</CommandEmpty>
                    <CommandGroup>
                      {data?.organs?.map((organ) => (
                        <CommandItem
                          key={organ.id}
                          value={organ.id}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue,
                            );
                            setFormValue("organId", currentValue);
                            setIsSelectOpen(false);
                          }}
                          className={value === organ.id ? "bg-indigo-100" : ""}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === organ.id ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {organ.designation}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.registrationNumber && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.registrationNumber.message}
                </p>
              )}
            </fieldset>

            <fieldset className="mt-4">
              <label htmlFor="type" className="mb-2 block">
                Type
              </label>
              <Popover
                open={isTypeSelectOpen}
                onOpenChange={setIsTypeSelectOpen}
              >
                <PopoverTrigger
                  disabled={!isSuccess}
                  className={buttonVariants({
                    variant: "outlined-ghost",
                    className: "w-full justify-between",
                  })}
                >
                  {type
                    ? interventionsTypes.find(
                        (intervention) =>
                          intervention.value.toLowerCase() ===
                          type.toLowerCase(),
                      )?.label
                    : "Select intervention type..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search intervention type..." />
                    <CommandEmpty>No type found.</CommandEmpty>
                    <CommandGroup className="max-h-96 overflow-y-auto">
                      {interventionsTypes.map(({ label, value }) => (
                        <CommandItem
                          key={value}
                          value={value}
                          onSelect={(currentValue) => {
                            setType(currentValue === type ? "" : currentValue);
                            setFormValue("type", currentValue);
                            setIsTypeSelectOpen(false);
                          }}
                          className={
                            type.toLowerCase() === value.toLowerCase()
                              ? "bg-indigo-100"
                              : ""
                          }
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              type === value ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.registrationNumber && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.registrationNumber.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="interventionDesignation">Date</label>
              <Input
                type="date"
                placeholder="Intervention Designation"
                className="mt-2"
                {...register("date")}
              />
              {errors.date && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.date.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="duration">Duration</label>
              <Input
                placeholder="Duration (in hours)"
                className="mt-2"
                {...register("duration")}
              />
              {errors.duration && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.duration.message}
                </p>
              )}
            </fieldset>
            <fieldset className="mt-4">
              <label htmlFor="registrationNumber" className="mb-2 block">
                Registration Number
              </label>
              <Input
                placeholder="Registration Number"
                className="mt-2"
                {...register("registrationNumber", { valueAsNumber: true })}
              />
              {errors.registrationNumber && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.registrationNumber.message}
                </p>
              )}
            </fieldset>

            <Button
              disabled={isLoading}
              type="submit"
              className="mt-4"
              onClick={() => {
                console.log(errors, rtgMachineId);
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>Add Intervention</>
              )}
            </Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
