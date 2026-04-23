import React from 'react';
import { useSettings } from '@/src/core/hooks/settingsHooks';
import { useCamera } from '@/src/core/hooks/cameraHooks';
import {
  CameraDevice,
  getCameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';

import { objectMap } from '@/src/core/utils/generalUtils';

import type { CameraPosition } from 'react-native-vision-camera';

export const useSetupCameraDevice = (): CameraDevice | null => {
  const allDevices = useCameraDevices();

  const { deviceByPosition, setDeviceForPosition, setAllDevices } = useCamera(
    'deviceByPosition',
    'setDeviceForPosition',
    'setAllDevices',
  );

  const { deviceIdByPosition, cameraPosition } = useSettings(
    'deviceIdByPosition',
    'cameraPosition',
  );

  React.useEffect(() => {
    // saves all devices names (mostly for camerasettings to switch between devices)
    if (!allDevices || allDevices.length === 0) return;
    setAllDevices(allDevices);

    objectMap(
      deviceIdByPosition,
      (position: CameraPosition, id: string | null) => {
        let foundDevice: CameraDevice | undefined;

        if (!id) {
          foundDevice = getCameraDevice(allDevices, position);
        } else {
          foundDevice = allDevices.find(d => d.id === id);
        }

        if (!foundDevice) return;
        setDeviceForPosition(position, foundDevice);
      },
    );
  }, [allDevices, deviceIdByPosition, setAllDevices, setDeviceForPosition]);

  return deviceByPosition[cameraPosition];
};
