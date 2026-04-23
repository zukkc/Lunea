import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { calcSizeUnderCamera } from '../utils/utils';
import {
  useGetControlsHeight,
  useSetControlsHeight,
} from '../store/controls.store';
import React from 'react';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const useSetPreviewDimensions = (): void => {
  const setControlsHeight = useSetControlsHeight();
  const controlsHeight = useGetControlsHeight();
  const { bottom } = useSafeAreaInsets();

  React.useEffect(() => {
    const previewHeight = SCREEN_WIDTH * (16 / 9);
    const underCamSize = calcSizeUnderCamera(
      SCREEN_HEIGHT,
      bottom,
      previewHeight,
    );

    if (controlsHeight !== underCamSize) {
      setControlsHeight(underCamSize);
    }
  }, [SCREEN_HEIGHT, bottom, controlsHeight, setControlsHeight]);
};
