"use client";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export default function CookMode() {
  const [isCookMode, setIsCookMode] = useState<boolean>(false);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  const handleCookModeToggle = async () => {
    if (isCookMode) {
      if (wakeLock) {
        await wakeLock.release();
        setWakeLock(null);
        console.log("Cook mode turn off.");
      }
    } else {
      try {
        const wakeLockInstance = await navigator.wakeLock.request("screen");
        setWakeLock(wakeLockInstance);
        console.log("Cook mode activated.");
      } catch (err) {
        console.error(err);
      }
    }

    setIsCookMode(!isCookMode);
  };

  return (
    <div className="flex items-center space-x-2 pt-10">
      <Switch id="airplane-mode" onClick={handleCookModeToggle} />
      <Label htmlFor="cook-mode" className="text-base font-bold">
        Cook Mode{" "}
        <span className="text-gray-700 font-medium text-sm">
          (Keep screen wake)
        </span>
      </Label>
    </div>
  );
}
