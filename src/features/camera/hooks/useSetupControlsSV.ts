import React from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { useControlsStore } from '../store/controls.store';

export const useSetupControlsSV = () => {
  const localControlsX = useSharedValue(0);
  const localExposureOpacity = useSharedValue(1);

  const setupControlsX = useControlsStore(s => s.setupControlsX);
  const setupExposureOpacity = useControlsStore(s => s.setupExposureOpacity);

  React.useEffect(() => {
    setupControlsX(localControlsX);
    setupExposureOpacity(localExposureOpacity);
  }, [
    setupControlsX,
    setupExposureOpacity,
    localControlsX,
    localExposureOpacity,
  ]);

  const controlsX = useControlsStore(s => s.controlsX);
  const exposureOpacity = useControlsStore(s => s.exposureOpacity);
  return { controlsX, exposureOpacity };
};
