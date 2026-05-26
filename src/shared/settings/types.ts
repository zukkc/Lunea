import type {
  CameraPosition,
  QualityPrioritization,
  DeviceType,
  Range,
  PixelFormat,
  DynamicRange,
} from 'react-native-vision-camera';

import { CameraDevicePreference } from '../camera/types';

export type SettingsState = {
  devicePreference: CameraDevicePreference;
  changeDevicePreference: (preference: CameraDevicePreference) => void;
  deviceSnapshot: DeviceSnapshot | null;
  setDeviceSnapshot: (snapshot: DeviceSnapshot | null) => void
  fps: number
  setFps: (fps: number) => void
  photoQuality: QualityPrioritization;
  changePhotoQuality: (qualityValue: QualityPrioritization) => void;

  cameraPosition: CameraPosition;
  changeCameraPosition: (position?: CameraPosition) => void;
};

export type OptionType<T> = {
  i18nKey: string;
  value: T;
};

export type SettingKey = keyof SettingsState;

export type FPSRange = {
  min: number
  max: number
}

export type DeviceWithFPS = {
  supportedFPSRanges?: FPSRange[]
  physicalDevices?: DeviceWithFPS[]
}

export type DeviceSnapshot = {
  id: string;
  type: DeviceType;
  position: CameraPosition;
  isVirtualDevice: boolean;
  minZoom: number;
  maxZoom: number;
  supportedFpsValues: number[];
  physicalDevices: {
    id: string;
    type: DeviceType;
    localizedName: string;
    minZoom: number;
    maxZoom: number;
    supportedFPSRanges: Range[];
    supportedPixelFormats: PixelFormat[];
    supportedVideoDynamicRanges: DynamicRange[];
  }[];
}

