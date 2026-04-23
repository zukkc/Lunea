import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type Props = React.PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  rounded?: number;
}>;

const Rounded = ({ children, style, rounded = 100, ...rest }: Props) => {
  return (
    <View
      style={[
        {
          borderRadius: rounded,
          overflow: 'hidden',
          borderWidth: 0.3,
          borderColor: 'white',
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default Rounded;
