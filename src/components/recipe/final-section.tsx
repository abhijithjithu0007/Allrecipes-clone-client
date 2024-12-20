import React from "react";
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

export default function Finalsection() {
  return (
    <div className="p-6">
      <div className="flex gap-4 justify-around items-center">
        <Label htmlFor="number" className="text-base font-bold">
          Servings
        </Label>
        <Input
          id="number"
          type="number"
          placeholder="e.g. 1 cup sugar"
          className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2 w-1/2"
        />
      </div>
      <div className="flex justify-around p-4 items-center">
        <Label htmlFor="email" className="text-base font-bold">
          Prep Time
        </Label>
        <div className="flex justify-between gap-4 items-center w-1/2">
          <Input
            id="email"
            type="number"
            defaultValue="0"
            placeholder="e.g. 1 cup sugar"
            className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2 w-24"
          />

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="mins" defaultValue="mins" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">mins</SelectItem>
              <SelectItem value="dark">hours</SelectItem>
              <SelectItem value="system">days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-around p-4 items-center">
        <Label htmlFor="" className="text-base font-bold">
          Meal Type
        </Label>
        <div className="w-1/2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Breakfast" defaultValue="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Breakfast</SelectItem>
              <SelectItem value="dark">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
              <SelectItem value="dessert">Dessert</SelectItem>
              <SelectItem value="side dish">Side Dish</SelectItem>
              <SelectItem value="appetizer">Appetizer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-around p-4 items-center mb-6">
        <Label htmlFor="" className="text-base font-bold">
          Cuisine
        </Label>

        <div className="w-1/2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Italian" defaultValue="" />
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
        <Label htmlFor="" className="text-base font-bold">
          {`Notes (optional)`}
        </Label>

        <Textarea placeholder="Type your notes here." className="min-h-36" />
      </div>
      <div className="flex justify-end gap-6 items-center p-10">
        <AlertDialog>
          <AlertDialogTrigger className="underline font-bold ">
            Cancel
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to leave this page? Your changes will be
                lost if you go back.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <button className="bg-customColor text-lg font-bold p-3 pl-10 pr-10 rounded-sm text-white hover:bg-orange-600">
          Submit Recipe
        </button>
      </div>
    </div>
  );
}
