import { CameraDevicePreference } from "@/shared/camera/types";
import type { PhysicalDeviceType } from "react-native-vision-camera";
import { BALANCED_PHYSICAL_DEVICES, FAST_PHYSICAL_DEVICES, QUALITY_PHYSICAL_DEVICES } from "../constants/constants";

export function calcSizeUnderCamera(
  screenHeight: number,
  bottomNavHeight: number,
  cameraPreviewHeight: number,
): number {
  return (screenHeight - cameraPreviewHeight - bottomNavHeight) / 2;
  // DZIELIMY TUTAJ PRZEZ DWA PONIEWAZ RESZTA JAKA NAM ZOSTAJE TO TAKI SAM OBSZAR NA GORZE I NA DOLA (NAD I POD CAMERA) -
  // - a my tutaj potrzebujemy okreslic wielkosc dolu
  // (sa rowne dzieki zastosowaniu contain w resizeMode w komponencie kamery ktory ustawia preview dokaldnie na srodku wolnego obszaru)
};

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