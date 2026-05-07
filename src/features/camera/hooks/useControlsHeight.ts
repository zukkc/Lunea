import { Dimensions, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { calcSizeUnderCamera } from '../utils/utils';
import React, { useState } from 'react';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type ControlsMeasures = {
  height: number
  bottomInset: number
}

export const useControlsHeight = (): ControlsMeasures => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight} = useWindowDimensions();

  return React.useMemo(() => {
    const previewHeight = screenWidth * (16 / 9)

    return {
      height: calcSizeUnderCamera(
        screenHeight,
        bottomInset,
        previewHeight,
      ),
      bottomInset,
    }
  }, [screenWidth, screenHeight, bottomInset])
};
