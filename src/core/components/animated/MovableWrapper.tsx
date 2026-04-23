import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

import type { SharedValue } from 'react-native-reanimated'

type MovableWrapperProps = React.PropsWithChildren<{
  style?: StyleProp<ViewStyle>
  xValue?: SharedValue<number>
  yValue?: SharedValue<number>
}>

const MovableWrapper = ({ children, style, xValue, yValue}: MovableWrapperProps): React.JSX.Element => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: xValue ? xValue.value : 0 },
      { translateY: yValue ? yValue.value : 0 }
    ]      
  }))

  return (
    <Animated.View
      style={[ style, animatedStyle ]}
    >
      {children}
    </Animated.View>
  )
}

export default MovableWrapper
