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

  useEffect(() => {
    socket.on("newRecipeNotification", (data: Notification) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off("newRecipeNotification");
    };
  }, []);

  return (
    <HoverCard>
      <HoverCardTrigger
        asChild
        className="fixed text-white bg-yellow-500 bottom-12 right-12 p-4 rounded-full shadow-lg hover:bg-yellow-600 transition"
      >
        <Button>
          <MdNotificationsActive size={30} />
        </Button>
      </HoverCardTrigger>
      {notifications && notifications.length > 0 ? (
        <HoverCardContent className="rounded-lg p-4 bg-white shadow-lg w-60">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
            Notifications 📢
          </h3>
          <ul className="space-y-2">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded-md transition"
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
        <HoverCardContent className="rounded-lg p-4 bg-white shadow-lg w-72">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
            Notifications 📢
          </h3>
          <p className="text-sm text-gray-500">No notifications yet.</p>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}
