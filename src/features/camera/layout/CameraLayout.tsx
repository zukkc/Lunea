import React from 'react'
import { View } from 'react-native'
import { PropsWithChildren } from 'react'

type CameraLayoutProps = PropsWithChildren

const CameraLayout = ({ children }: CameraLayoutProps): React.JSX.Element => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
      }}

    >
      {children}
    </View>
  )
}

export default CameraLayout;
