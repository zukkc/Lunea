import React from "react";
import { useSettingsStore } from "@/shared/settings/store";
import { useCameraDevice } from "react-native-vision-camera"
import { getPhysicalDevices } from "../utils";

export const useSetupCameraDevice = () => {
    const devicePreference = useSettingsStore(s => s.devicePreference);
    const position = useSettingsStore(s => s.cameraPosition);

    const preferedPhysicalDevices = React.useMemo(() => getPhysicalDevices(devicePreference), [devicePreference])

    const device = useCameraDevice(position, {
        physicalDevices: preferedPhysicalDevices 
    });
    
    return device;
}