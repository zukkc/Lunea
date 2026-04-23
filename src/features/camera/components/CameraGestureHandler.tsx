import React from 'react';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';

import {
  useHideControls,
  useHideExposure,
  useShowControls,
  useShowExposure,
} from '../store/controls.store';

type CameraGestureHandlerProps = React.PropsWithChildren<{
  tabBarSwipeSpeed?: number;
  controlsSwipeSpeed?: number;
}>;

const CameraGestureHandler = ({
  children,
  tabBarSwipeSpeed = 1200,
  controlsSwipeSpeed = 1200,
}: CameraGestureHandlerProps) => {
  const showControls = useShowControls();
  const hideControls = useHideControls();

  const showExposure = useShowExposure();
  const hideExposure = useHideExposure();

  const swipe = Gesture.Pan()
    .maxPointers(1)
    .activeOffsetY([-Infinity, Infinity])
    .minDistance(20)
    .minVelocity(tabBarSwipeSpeed)
    .onEnd(({ velocityY, velocityX }) => {
      'worklet';
      if (velocityY < -tabBarSwipeSpeed) {
        scheduleOnRN(hideExposure);
      } else if (velocityY > tabBarSwipeSpeed) {
        scheduleOnRN(showExposure);
      }

      if (velocityX < -controlsSwipeSpeed) {
        scheduleOnRN(showControls);
      } else if (velocityX > controlsSwipeSpeed) {
        scheduleOnRN(hideControls);
      }
    });

  return <GestureDetector gesture={swipe}>{children}</GestureDetector>;
};

export default CameraGestureHandler;
