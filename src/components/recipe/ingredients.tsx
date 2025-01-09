"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIngredients } from "@/lib/features/formSlice";
import { Input } from "../ui/input";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { AppDispatch, RootState } from "@/lib/store";
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { LucideArrowDownUp } from "lucide-react";

export default function Ingredients() {
  const dispatch: AppDispatch = useDispatch();
  const ingredients = useSelector((state: RootState) => state.form.ingredients);

  const [ingredient, setIngredient] = useState<string>("");
  const [reorderMode, setReorderMode] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() !== "") {
      const newIngredients = [...ingredients, ingredient.trim()];
      dispatch(setIngredients(newIngredients));
      setIngredient("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    dispatch(setIngredients(updatedIngredients));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = ingredients.findIndex((ing) => ing === active.id);
      const newIndex = ingredients.findIndex((ing) => ing === over?.id);

      const updatedIngredients = arrayMove(ingredients, oldIndex, newIndex);
      dispatch(setIngredients(updatedIngredients));
    }
  };

  const toggleReorderMode = () => {
    setReorderMode(!reorderMode);
  };

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(touchSensor, mouseSensor);

  function SortableIngredient({
    id,
    ingredient,
    index,
    onRemove,
  }: {
    id: string;
    ingredient: string;
    index: number;
    onRemove: (index: number) => void;
  }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex gap-2 items-center"
      >
        <Input
          type="text"
          value={ingredient}
          className={`p-6 bg-white placeholder:text-base outline outline-1 rounded-none mt-2 ${
            reorderMode ? "cursor-grab" : ""
          }`}
          readOnly
        />
        <IoCloseCircleOutline
          size={30}
          className="cursor-pointer"
          onClick={() => onRemove(index)}
        />
      </div>
    );
  }

  return (
    <div className="p-1 sm:p-4 md:p-5">
      <div className="p-4 pb-10">
        <div>
          <h2 className="font-bold">Ingredients</h2>
          <p className="pt-4 text-gray-500">
            Enter one ingredient per line. Include the quantity (i.e. cups,
            tablespoons) and any special preparation (i.e. sifted, softened,
            chopped). Use optional headers to organize the different parts of
            the recipe (i.e. Cake, Frosting, Dressing).
          </p>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={ingredients}
            strategy={verticalListSortingStrategy}
          >
            <div className="p-2 flex flex-col gap-3">
              <div className="flex justify-end items-center">
                <Button
                  variant={"ghost"}
                  className="uppercase text-center font-extrabold"
                  onClick={toggleReorderMode}
                >
                  <LucideArrowDownUp className="font-bold text-gray-600" />
                  {reorderMode ? "Done" : "Reorder"}
                </Button>
              </div>
              {ingredients.map((ing, index) => (
                <SortableIngredient
                  key={ing}
                  id={ing}
                  ingredient={ing}
                  index={index}
                  onRemove={handleRemoveIngredient}
                />
              ))}

              <div className="flex gap-2 items-center">
                <Input
                  type="text"
                  value={ingredient}
                  onChange={handleInputChange}
                  placeholder="e.g. 2 cups of flour, sifted"
                  className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2"
                />
                <IoCloseCircleOutline size={30} className="invisible" />
              </div>
            </div>
          </SortableContext>
        </DndContext>
        <div className="pt-5">
          <div
            className="border-2 border-customColor flex w-44 lg:w-64 items-center justify-center gap-3 p-2 md:p-3 lg:p-4 rounded-sm hover:bg-customColor hover:text-white"
            onClick={handleAddIngredient}
          >
            <FaPlus size={20} />
            <button className="text-sm font-semibold">ADD INGREDIENT</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
