import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type DividerType = {
  thickness?: number;
  rounded?: number;
  color?: string;
  marginH?: number;
  marginV?: number;
  style?: StyleProp<ViewStyle>
};

const Divider = ({
  thickness = 2,
  rounded = 100,
  color = '#2A2A2A',
  marginH = 0,
  marginV = 0,
  style,
}: DividerType): React.JSX.Element => {
  return (
    <View
      style={[{
        width: '100%',
        height: thickness,
        borderRadius: rounded,
        backgroundColor: color,
        marginHorizontal: marginH,
        marginVertical: marginV
      },
      style 
      ]}
    />
  );
};

export default Divider;
