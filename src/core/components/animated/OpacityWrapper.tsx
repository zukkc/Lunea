import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

type OpacityWrapperProps = React.PropsWithChildren<{
  opacity?: SharedValue<number>;
  style?: StyleProp<ViewStyle>;
}>;

const OpacityWrapper = ({
  children,
  opacity,
  style,
}: OpacityWrapperProps): React.JSX.Element => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity ? opacity.value : 1,
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

export default OpacityWrapper;
