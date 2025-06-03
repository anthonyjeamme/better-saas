import { DeviceType, getDeviceType } from "../functions/getDeviceType";
import { useEffect, useState } from "react";

/**
 *
 */
export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType());

  useEffect(() => {
    const handleDeviceTypeChange = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener("resize", handleDeviceTypeChange);
  }, []);

  return deviceType;
}
