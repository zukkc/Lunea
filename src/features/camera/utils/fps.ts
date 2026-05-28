import type { DeviceWithFPS, FPSRange } from "@/shared/settings/types"

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