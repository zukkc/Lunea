import React from 'react';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';

import {
  useSetControlsStatus,
} from '../store/controls.store';

type CameraGestureHandlerProps = React.PropsWithChildren<{
  onSetZoom: (z: number) => void
  tabBarSwipeSpeed?: number;
  controlsSwipeSpeed?: number;
}>;

const CameraGestureHandler = ({
  children,
  onSetZoom,
  tabBarSwipeSpeed = 1200,
  controlsSwipeSpeed = 1200,
}: CameraGestureHandlerProps) => {
  const setControlsStatus = useSetControlsStatus();

  const swipe = Gesture.Pan()
    .maxPointers(1)
    .activeOffsetY([-Infinity, Infinity])
    .minDistance(20)
    .minVelocity(tabBarSwipeSpeed)
    .onEnd(({ velocityY }) => {
      'worklet';
      if (velocityY < -controlsSwipeSpeed) {
        scheduleOnRN(setControlsStatus, 'shown');
      } else if (velocityY > controlsSwipeSpeed) {
        scheduleOnRN(setControlsStatus, 'hidden');
      }
    });

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      onSetZoom(e.scale)
    })

  const combinedGestures = Gesture.Simultaneous(swipe, pinch)

  return <GestureDetector gesture={combinedGestures}>{children}</GestureDetector>;
};

export default CameraGestureHandler;
