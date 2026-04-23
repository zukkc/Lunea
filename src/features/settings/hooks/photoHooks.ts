import { useSettings } from "../../../core/hooks/settingsHooks";
import { PHOTO_QUALITY } from "../constants/settings";
import { convertToOptionType } from "../utils/utils";

export const useAllPhotoQualityOptions = () => {
  return PHOTO_QUALITY.map(q => convertToOptionType(q));
}

export const useSelectedPhotoQuality = () => {
  const q = useSettings('photoQuality')
  console.log(q)
  return convertToOptionType(q);
}
