import { CameraDevicePreference } from "@/shared/camera/types";
import { BALANCED_PHYSICAL_DEVICES, FAST_PHYSICAL_DEVICES, QUALITY_PHYSICAL_DEVICES } from "../constants/constants";
import type { PhysicalDeviceType, CameraDevice } from "react-native-vision-camera";
import type { DeviceWithFPS, FPSRange } from "@/shared/settings/types";

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

export function createCameraDeviceSnapshot(device: CameraDevice) {
  const physicalDevices =
    device.physicalDevices.length > 0 ? device.physicalDevices : [device]

  return {
    id: device.id,
    type: device.type,
    position: device.position,
    isVirtualDevice: device.isVirtualDevice,
    minZoom: device.minZoom,
    maxZoom: device.maxZoom,

    supportedFpsValues: getCommonSupportedFpsValues(device),

    physicalDevices: physicalDevices.map((physicalDevice) => ({
      id: physicalDevice.id,
      type: physicalDevice.type,
      localizedName: physicalDevice.localizedName,
      minZoom: physicalDevice.minZoom,
      maxZoom: physicalDevice.maxZoom,
      supportedFPSRanges: physicalDevice.supportedFPSRanges,
      supportedPixelFormats: physicalDevice.supportedPixelFormats,
      supportedVideoDynamicRanges:
        physicalDevice.supportedVideoDynamicRanges,
    })),
  }
}

export function getCommonSupportedFpsValues(device: DeviceWithFPS | undefined) {
  if (!device) return []

  const physicalDevices =
    device.physicalDevices && device.physicalDevices.length > 0
      ? device.physicalDevices
      : [device]

  const commonFpsValues = [24, 30, 60, 120, 240]

  return commonFpsValues.filter((fps) =>
    physicalDevices.every((physicalDevice) =>
      supportsFps(physicalDevice.supportedFPSRanges ?? [], fps),
    ),
  )
}

function supportsFps(ranges: FPSRange[], fps: number) {
  return ranges.some((range) => fps >= range.min && fps <= range.max)
}