import { getCommonSupportedFpsValues } from "./fps"

import type { CameraDevice } from "react-native-vision-camera"

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