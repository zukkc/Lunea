import { useSettingsStore } from "@/shared/settings/store";
import { useCameraDevice } from "react-native-vision-camera"

export const useSetupCameraDevice = () => {
    const position = useSettingsStore(s => s.cameraPosition);
    const device = useCameraDevice(position, {
        physicalDevices: ['ultra-wide-angle', 'wide-angle', 'telephoto']
    });

    return device;
}