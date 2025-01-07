"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  setServings,
  setPrepTime,
  setMealType,
  setCuisine,
  setNotes,
  submitForm,
} from "@/lib/features/formSlice";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "../ui/textarea";
import { AppDispatch, RootState } from "@/lib/store";
import Link from "next/link";

export default function Finalsection() {
  const dispatch: AppDispatch = useDispatch();
  const { servings, prepTime, mealType, cuisine, notes } = useSelector(
    (state: RootState) => state.form
  );

  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setServings(e.target.value));
  };

  const handlePrepTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPrepTime({ value: e.target.value, unit: prepTime.unit }));
  };

  const handleUnitChange = (unit: string) => {
    dispatch(setPrepTime({ value: prepTime.value, unit }));
  };

  const handleMealTypeChange = (value: string) => {
    dispatch(setMealType(value));
  };

  const handleCuisineChange = (value: string) => {
    dispatch(setCuisine(value));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setNotes(e.target.value));
  };

  const handleSubmit = () => {
    dispatch(submitForm());
  };

  return (
    <div className="p-1 sm:p-4 md:p-5">
      <div className="flex gap-4 justify-around items-center">
        <Label htmlFor="number" className="text-base font-bold">
          Servings
        </Label>
        <Input
          id="number"
          type="number"
          value={servings}
          onChange={handleServingsChange}
          placeholder="e.g. 2"
          className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2 w-1/2"
        />
      </div>

      <div className="flex justify-around p-4 items-center">
        <Label htmlFor="prepTime" className="text-base font-bold">
          Prep Time
        </Label>
        <div className="flex justify-between gap-4 items-center w-1/2">
          <Input
            id="prepTime"
            type="number"
            value={prepTime.value}
            onChange={handlePrepTimeChange}
            placeholder=""
            className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2 w-24"
          />
          <Select onValueChange={handleUnitChange}>
            <SelectTrigger>
              <SelectValue placeholder="mins" defaultValue={prepTime.unit} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mins">mins</SelectItem>
              <SelectItem value="hours">hours</SelectItem>
              <SelectItem value="days">days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-around p-4 items-center">
        <Label htmlFor="mealType" className="text-base font-bold">
          Meal Type
        </Label>
        <div className="w-1/2">
          <Select onValueChange={handleMealTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Breakfast" defaultValue={mealType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Breakfast">Breakfast</SelectItem>
              <SelectItem value="Lunch">Lunch</SelectItem>
              <SelectItem value="Dinner">Dinner</SelectItem>
              <SelectItem value="Snack">Snack</SelectItem>
              <SelectItem value="Dessert">Dessert</SelectItem>
              <SelectItem value="Side-dish">Side-Dish</SelectItem>
              <SelectItem value="Appetizer">Appetizer</SelectItem>
              <SelectItem value="Salads">Salads</SelectItem>
              <SelectItem value="Drinks">Drinks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-around p-4 items-center mb-6">
        <Label htmlFor="cuisine" className="text-base font-bold">
          Cuisine
        </Label>
        <div className="w-1/2">
          <Select onValueChange={handleCuisineChange}>
            <SelectTrigger>
              <SelectValue placeholder="Italian" defaultValue={cuisine} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Italian">Italian</SelectItem>
              <SelectItem value="Chinese">Chinese</SelectItem>
              <SelectItem value="Indian">Indian</SelectItem>
              <SelectItem value="Mexican">Mexican</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="Japanese">Japanese</SelectItem>
              <SelectItem value="American">American</SelectItem>
              <SelectItem value="Korean">Korean</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <hr />

      <div className="p-8 flex flex-col gap-3">
        <Label htmlFor="notes" className="text-base font-bold">
          Notes (optional)
        </Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={handleNotesChange}
          placeholder="Type your notes here."
          className="min-h-36"
        />
      </div>

      <div className="flex justify-end gap-6 items-center p-10">
        <AlertDialog>
          <AlertDialogTrigger className="underline font-bold">
            Cancel
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to leave this page? If any changes it will
                be lost if you go back.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Link href="/home">
                <AlertDialogAction>Continue</AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <button
          onClick={handleSubmit}
          className="bg-customColor text-lg font-bold p-3 pl-10 pr-10 rounded-sm text-white hover:bg-orange-600"
        >
          Submit Recipe
        </button>
      </div>

      <hr />

      <div className="p-8">
        <p className="text-gray-500 text-sm italic">
          Allrecipes is all about cooks like you. If you found this recipe in a
          magazine, cookbook, or on a website, we can't publish it. Published
          recipes are subject to our Terms of Service.
        </p>
      </div>
    </div>
  );
}
