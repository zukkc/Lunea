import type { CameraPosition, QualityPrioritization } from 'react-native-vision-camera';
import { CameraDevicePreference } from '../camera/types';

export type SettingsState = {
  devicePreference: CameraDevicePreference;
  changeDevicePreference: (preference: CameraDevicePreference) => void;
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
