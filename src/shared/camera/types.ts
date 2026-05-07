import { Image } from "react-native-nitro-image";
import { CameraPosition, Photo} from "react-native-vision-camera";

export type CameraState = {
  isActive: boolean;
  setActive: (v: boolean) => void;
};

export type CapturedAsset =
  | {
      type: 'photo'
      raw: Photo 
      image: Image
    }
  | {
      type: 'video'
      uri: string
    }

export type Video = string

export type CameraKey = keyof CameraState;