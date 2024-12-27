"use client";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CookMode() {
  const [isCookMode, setIsCookMode] = useState<boolean>(false);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  const handleCookModeToggle = async () => {
    if (isCookMode) {
      if (wakeLock) {
        await wakeLock.release();
        setWakeLock(null);
      }
    } else {
      try {
        const wakeLockInstance = await navigator.wakeLock.request("screen");
        setWakeLock(wakeLockInstance);
        toast.success("Cook mode activated.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
