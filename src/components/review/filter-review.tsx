import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CheckboxReactHookFormMultiple } from "./checkbox-filter";

export default function Filterreview() {
  return (
    <Drawer>
      <DrawerTrigger>Filter</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center text-2xl">
            Filter Reviews
          </DrawerTitle>
          <DrawerDescription className="pl-10 text-black uppercase font-bold">
            By rating
          </DrawerDescription>
        </DrawerHeader>
        <div className="w-full">
          <CheckboxReactHookFormMultiple />
        </div>
        <DrawerFooter>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
