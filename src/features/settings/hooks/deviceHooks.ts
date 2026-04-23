import { useCamera, useCameraDevicesNamesByPosition } from "@/src/core/hooks/cameraHooks";
import { convertToOptionType } from "../utils/utils";

/////////////////// FRONT DEVICE /////////////////////

export const useAllFrontDevicesOptions = () => {
const frontDevices = useCameraDevicesNamesByPosition('front') ?? []
    return frontDevices.map(name => convertToOptionType(name),
  );
} 

export const useFrontDeviceSelectedOption = () => {
  const { deviceByPosition } = useCamera('deviceByPosition');
 return deviceByPosition.front?.name
    ? convertToOptionType(deviceByPosition.front.name)
    : undefined;
}

////////////////// BACK DEVICE /////////////////////////

export const useAllBackDevicesOptions = () => {
const backDevices = useCameraDevicesNamesByPosition('back') ?? []
    return backDevices.map(name => convertToOptionType(name),
  );
} 

export const useBackDeviceSelectedOption = () => {
  const { deviceByPosition } = useCamera('deviceByPosition');
 return deviceByPosition.back?.name
    ? convertToOptionType(deviceByPosition.back.name)
    : undefined;
}
