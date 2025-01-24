"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdOutlineNotificationsActive } from "react-icons/md";
import socket from "@/utils/socket";
import Link from "next/link";

interface Notification {
  message: string;
  recipeId: string;
  mealType: string;
  recipeName: string;
  timestamp: Date;
}

export default function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [iconShiver, setIconShiver] = useState<boolean>(false);

  useEffect(() => {
    socket.on("newRecipeNotification", (data: Notification) => {
      setNotifications((prev) => [...prev, data]);
      setIconShiver(true);
      setTimeout(() => setIconShiver(false), 5000);
    });

    return () => {
      socket.off("newRecipeNotification");
    };
  }, []);

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <div className="relative">
            <MdOutlineNotificationsActive
              className={`text-gray-700 text-xl sm:text-2xl hover:text-yellow-500 transition duration-300
                ${iconShiver ? "animate-bounce" : ""}`}
            />
          </div>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold">
              Notifications
            </SheetTitle>
          </SheetHeader>

          <div className="p-4">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500">No notifications yet.</p>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <Link href={`/recipe/${notification.recipeId}`} key={index}>
                    <div className="p-3 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-200">
                      <p className="text-base font-medium text-gray-800">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
