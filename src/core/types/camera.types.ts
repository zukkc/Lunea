import {
  Camera as VisionCamera,
  PhotoFile,
  VideoFile,
  TakePhotoOptions,
  CameraPosition,
  CameraDevice,
} from 'react-native-vision-camera';

export type CameraState = {
  ref: VisionCamera | null;
  isActive: boolean;
  photo: PhotoFile | null;
  video: VideoFile | null;
  setRef: (r: VisionCamera | null) => void;
  setActive: (v: boolean) => void;
  setPhoto: (p: PhotoFile | null) => void;
  setVideo: (v: VideoFile | null) => void;
  takePhoto: (opts?: TakePhotoOptions) => Promise<void>;
  deleteTempAsset: () => Promise<void>;
  deviceByPosition: DeviceMap;
  setDeviceForPosition: (
    position: CameraPosition,
    device: CameraDevice | string,
  ) => void;
  allDevices?: Array<CameraDevice>;
  setAllDevices: (devices: Array<CameraDevice>) => void;
};

export type CameraKey = keyof CameraState;

export type PhotoQuality = 'speed' | 'balanced' | 'quality';

export type DeviceIdMap = {
  front: string | null;
  back: string | null;
  external: string | null;
};

export type DeviceMap = {
  front: CameraDevice | null;
  back: CameraDevice | null;
  external: CameraDevice | null;
};
