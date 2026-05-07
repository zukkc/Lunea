import React from 'react';
import { Text } from 'react-native';

type TextProps = React.ComponentPropsWithoutRef<typeof Text>;

export const WriteText = ({ ...props }: TextProps) => (
  <Text {...props} style={[{ fontFamily: 'Exo2-regular' }, props.style]} />
);
