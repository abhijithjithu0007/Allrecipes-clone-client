"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RecipetabProps {
  setMesure: React.Dispatch<React.SetStateAction<number>>;
}

export default function Recipetab({ setMesure }: RecipetabProps) {
  return (
    <div>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger
            value="1X"
            onClick={() => setMesure(1)}
            className="text-black rounded-r-none border border-black"
          >
            1X
          </TabsTrigger>
          <TabsTrigger
            value="2X"
            onClick={() => setMesure(2)}
            className="text-black rounded-none border border-black"
          >
            2X
          </TabsTrigger>
          <TabsTrigger
            value="4X"
            onClick={() => setMesure(4)}
            className="text-black rounded-l-none border border-black"
          >
            4X
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
