import type { CameraPosition, QualityPrioritization } from 'react-native-vision-camera';

export type SettingsState = {
  photoQuality: QualityPrioritization;
  changePhotoQuality: (qualityValue: QualityPrioritization) => void;
  cameraPosition: CameraPosition;
  changeCameraPosition: (position?: CameraPosition) => void;
};

export type OptionType<T> = {
  label: string;
  value: T;
};

export type SettingKey = keyof SettingsState;
