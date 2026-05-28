import { BALANCED_PHYSICAL_DEVICES, FAST_PHYSICAL_DEVICES, QUALITY_PHYSICAL_DEVICES } from "../constants/constants";

import type { CameraDevicePreference } from "@/shared/camera/types";
import type { PhysicalDeviceType } from "react-native-vision-camera";

export function getPhysicalDevices(preference: CameraDevicePreference): PhysicalDeviceType[] {
  switch (preference) {
    case 'fast':
      return FAST_PHYSICAL_DEVICES
    case 'balanced':
      return BALANCED_PHYSICAL_DEVICES

    case 'quality':
      return QUALITY_PHYSICAL_DEVICES
  }
}

