import type { CameraPosition } from 'react-native-vision-camera';
import type { DeviceIdMap, PhotoQuality } from './camera.types';

export type SettingsState = {
  photoQuality: PhotoQuality;
  changePhotoQuality: (qualityValue: PhotoQuality) => void;
  cameraPosition: CameraPosition;
  changeCameraPosition: (position?: CameraPosition) => void;
  deviceIdByPosition: DeviceIdMap;
  setDeviceIdForPosition: (position: CameraPosition, id: string | null) => void;
};

export type OptionType<T> = {
  label: string;
  value: T;
};

export type SettingKey = keyof SettingsState;
