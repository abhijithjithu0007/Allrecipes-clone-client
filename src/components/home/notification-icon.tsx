import React from "react";
import { MdNotificationsActive } from "react-icons/md";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export default function Notificationicon() {
  return (
    <div className="m-3">
      <HoverCard>
        <HoverCardContent className="rounded-2xl p-3 bg-white shadow-md hover:cursor-pointer">
          A new recipe added
        </HoverCardContent>
        <HoverCardTrigger className="fixed text-orange-600 bg-yellow-400 bottom-12 right-12 p-3 rounded-full">
          <MdNotificationsActive size={25} />
        </HoverCardTrigger>
      </HoverCard>
    </div>
  );
}
