"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { ReviewData } from "./reviews";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axios";
import { useEffect } from "react";

interface checkBoxData {
  items: number[];
}

const items = [
  { id: 5, label: "5 star" },
  { id: 4, label: "4 star" },
  { id: 3, label: "3 star" },
  { id: 2, label: "2 star" },
  { id: 1, label: "1 star" },
] as const;

interface FilterreviewProps {
  setFilterReview: React.Dispatch<React.SetStateAction<ReviewData[]>>;
  initilalData: ReviewData[];
}

export function Filterreview({
  setFilterReview,
  initilalData,
}: FilterreviewProps) {
  const form = useForm({
    defaultValues: {
      items: [] as number[],
    },
  });
  const recipeId = useParams().recipeId as string;

  const filterReviewsByRating = async (ratings: number[]) => {
    const { data } = await axiosInstance.get(
      `/review/filter-review-by-rating?recipeId=${recipeId}&ratings=${ratings.join(
        "&ratings="
      )}`
    );
    return data.data;
  };

  const queryFn = async () => {
    return filterReviewsByRating(form.watch("items"));
  };

  const { refetch } = useQuery<{ data: ReviewData[] }, Error>({
    queryKey: ["reviewFilter", form.watch("items")],
    queryFn,
    enabled: false,
  });

  function onSubmit(data: checkBoxData) {
    if (data.items.length === 0) {
      setFilterReview(initilalData);
    } else {
      refetch().then((response) => {
        if (response && response.data) {
          const filteredReviews = Array.isArray(response.data)
            ? response.data
            : [];
          setFilterReview(filteredReviews);
        }
      });
    }
  }

  useEffect(() => {
    setFilterReview(initilalData);
  }, [initilalData]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer">Filter</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-extrabold">
            Filter Review
          </DialogTitle>
          <DialogDescription className="uppercase text-sm font-bold">
            By rating
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-2 space-y-0 p-3"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked: boolean) => {
                                const updatedItems = checked
                                  ? [...(field.value || []), item.id]
                                  : field.value?.filter(
                                      (value) => value !== item.id
                                    ) || [];
                                field.onChange(updatedItems);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose
                type="submit"
                className="p-6 uppercase bg-customColor text-sm font-bold text-white rounded-none"
              >
                Apply
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
