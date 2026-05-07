import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { NitroImage } from 'react-native-nitro-image';
import { XIcon } from 'lucide-react-native';

import { CapturedAsset } from '@/src/shared/camera/types';

type AssetPreviewProps = {
  asset: CapturedAsset;
};

const AssetPreview = ({ asset }: AssetPreviewProps): React.JSX.Element => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {asset.type === "photo" && (
        <View
          style={StyleSheet.absoluteFill}
        >
          <NitroImage
            style={StyleSheet.absoluteFill}
            resizeMode="contain"
            image={asset.image}
            pointerEvents="none"
          />
        </View>
      )}

      <Pressable
        onPress={() => console.log("wywolac metode dispose")}
        style={{ position: 'absolute', top: 12, zIndex: 10, padding: 8 }}
        hitSlop={10}
      >
        <XIcon size={35} color="#fff" />
      </Pressable>
    </View>
  );
};

export default AssetPreview;
