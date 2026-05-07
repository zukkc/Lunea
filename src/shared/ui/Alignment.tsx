import React from 'react';
import { View } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';

type CenterProps = React.PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  horizontal?: HorizontalOpts;
  vertical?: VerticalOpts;
}>;

type Axis = 'start' | 'center' | 'end';

type HorizontalOpts = Axis | 'evenly' | 'around' | 'between';
type VerticalOpts = Axis | 'baseline' | 'stretch';

const axisMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  around: 'space-around',
  evenly: 'space-evenly',
  between: 'space-between',
  baseline: 'baseline',
  stretch: 'stretch',
} as const;

export const Alignment = ({
  children,
  style,
  horizontal = 'center',
  vertical = 'center',
}: CenterProps): React.JSX.Element => {
  return (
    <View
      style={[
        style,
        { justifyContent: axisMap[vertical], alignItems: axisMap[horizontal] },
      ]}
    >
      {children}
    </View>
  );
};
