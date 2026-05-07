import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { BlurView, LiquidGlassView,  } from '@sbaiahmed1/react-native-blur'
import type { BlurType, GlassType } from '@sbaiahmed1/react-native-blur' 

type BlurViewManagerProps = React.PropsWithChildren<{
  style?: StyleProp<ViewStyle>
  type?: 'liquidGlass' | 'blur' 

  glassType?: GlassType
  glassTintColor?: string
  glassOpacity?: number
  isGlassInteractive?: boolean
  wrapperStyle?: StyleProp<ViewStyle>

  blurType?: BlurType
  blurAmount?: number
}>

export const BlurViewManager = ({ 
  children,
  style = StyleSheet.absoluteFill,
  type = 'liquidGlass',

  glassType = 'clear',
  glassTintColor = 'clear',
  glassOpacity = 0.5,
  isGlassInteractive = false,
  wrapperStyle = [ StyleSheet.absoluteFill, { overflow: 'hidden' } ],

  blurType = 'dark',
  blurAmount = 10,
}: BlurViewManagerProps): React.JSX.Element => {
  if (type === "liquidGlass") {
  return (
    <View style={wrapperStyle}>
      <LiquidGlassView
        style={style}
        glassType={glassType}
        glassTintColor={glassTintColor}
        glassOpacity={glassOpacity}
        isInteractive={isGlassInteractive}
      >
        {children}
      </LiquidGlassView>
    </View>
  )
  } else { 
  return (
     <View style={wrapperStyle}>
      <BlurView
        style={style}
        blurType={blurType}
        blurAmount={blurAmount}
      >
        {children}
      </BlurView>
    </View> 
  )
  }
}