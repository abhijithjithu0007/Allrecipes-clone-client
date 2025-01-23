"use client";
import React, { useEffect, useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import socket from "@/utils/socket";
import Link from "next/link";
import { Button } from "@mui/material";

interface Notification {
  message: string;
  recipeId: string;
  mealType: string;
  recipeName: string;
  timestamp: Date;
}

export default function Notificationicon() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [iconShiwer, setIconShiwer] = useState<boolean>(false);

  useEffect(() => {
    socket.on("newRecipeNotification", (data: Notification) => {
      setNotifications((prev) => [...prev, data]);
      setIconShiwer(true);
      setTimeout(() => setIconShiwer(false), 2500);
    });

    return () => {
      socket.off("newRecipeNotification");
    };
  }, []);

  return (
    <HoverCard>
      <HoverCardTrigger
        asChild
        className={`fixed text-white bg-yellow-500 bottom-8 right-8 sm:bottom-12 sm:right-12 p-3 sm:p-4 rounded-full shadow-lg transition ${
          iconShiwer ? "animate-bounce" : "hover:bg-yellow-600"
        }`}
      >
        <Button>
          <MdNotificationsActive className="text-customColor text-2xl sm:text-xl" />
        </Button>
      </HoverCardTrigger>

      {notifications && notifications.length > 0 ? (
        <HoverCardContent className="rounded-lg p-4 bg-transparent w-60">
          <ul className="space-y-2">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="text-sm rounded-2xl bg-white p-3 shadow-gray-400 shadow-xl text-gray-500"
              >
                <Link
                  href={`/recipe/${notification.recipeId}`}
                  className="text-sm text-gray-800 font-medium hover:text-orange-600"
                >
                  {notification.message}
                </Link>
              </li>
            ))}
          </ul>
        </HoverCardContent>
      ) : (
        <HoverCardContent className="outline-none p-4 bg-transparent w-72">
          <p className="text-sm rounded-2xl bg-white p-3 shadow-gray-400 shadow-xl text-gray-500">
            No notifications yet.
          </p>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}
