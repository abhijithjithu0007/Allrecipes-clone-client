"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDirections } from "@/lib/features/formSlice";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Textarea } from "../ui/textarea";
import { FaPlus } from "react-icons/fa";
import { AppDispatch, RootState } from "@/lib/store";
import {
  closestCorners,
  DndContext,
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
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMove } from "@dnd-kit/sortable";
import { Button } from "../ui/button";
import { LucideArrowDownUp } from "lucide-react";

export default function Directions() {
  const dispatch: AppDispatch = useDispatch();
  const directions = useSelector((state: RootState) => state.form.directions);

  const [direction, setDirection] = useState<string>("");
  const [reorderMode, setReorderMode] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDirection(e.target.value);
  };

  const handleAddDirection = () => {
    if (direction.trim() !== "") {
      dispatch(setDirections([...directions, direction.trim()]));
      setDirection("");
    }
  };

  const handleRemoveDirection = (index: number) => {
    const updatedDirections = directions.filter((_, i) => i !== index);
    dispatch(setDirections(updatedDirections));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = directions.findIndex((dir) => dir === active.id);
      const newIndex = directions.findIndex((dir) => dir === over?.id);

      const updatedDirections = arrayMove(directions, oldIndex, newIndex);
      dispatch(setDirections(updatedDirections));
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

  function SortableItem({
    id,
    text,
    index,
  }: {
    id: string;
    text: string;
    index: number;
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
        className={`flex gap-2 items-center ${
          reorderMode ? "cursor-grab" : ""
        }`}
        {...(reorderMode ? attributes : {})}
        {...(reorderMode ? listeners : {})}
      >
        <Textarea
          value={text}
          onChange={() => {}}
          className={`p-6 bg-white placeholder:text-base outline outline-1 rounded-none mt-2 ${
            reorderMode ? "cursor-grab" : ""
          }`}
          readOnly
        />
        <IoCloseCircleOutline
          size={30}
          className="cursor-pointer"
          onClick={() => handleRemoveDirection(index)}
        />
      </div>
    );
  }

  return (
    <div className="p-1 sm:p-4 md:p-5">
      <div className="p-4 pb-10">
        <div>
          <h2 className="font-bold">Directions</h2>
          <p className="pt-4 text-gray-500">
            Explain how to make your recipe, including oven temperatures, baking
            or cooking times, and pan sizes, etc. Use optional headers to
            organize the different parts of the recipe (i.e. Prep, Bake,
            Decorate).
          </p>
        </div>

        <div className="p-2 flex flex-col gap-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={directions}
              strategy={verticalListSortingStrategy}
            >
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
              {directions.map((dir, index) => (
                <SortableItem key={dir} id={dir} text={dir} index={index} />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex gap-2 items-center">
            <Textarea
              value={direction}
              onChange={handleInputChange}
              placeholder="e.g. Preheat the oven to 350°F."
              className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2"
            />
          </div>
        </div>
        <div className="pt-5">
          <div
            className="border-2 border-customColor flex w-40 items-center justify-center gap-3 p-3 rounded-sm hover:bg-customColor hover:text-white"
            onClick={handleAddDirection}
          >
            <FaPlus size={20} />
            <button className="text-sm font-semibold">ADD STEP</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
