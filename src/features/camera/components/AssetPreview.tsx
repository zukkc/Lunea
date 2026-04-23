import React, { useEffect, useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { NitroImage, loadImage } from 'react-native-nitro-image';
import { XIcon } from 'lucide-react-native';

import { useCamera } from '@/src/core/hooks/cameraHooks';

import type { PhotoFile, VideoFile } from 'react-native-vision-camera';

type AssetPreviewProps = {
  asset: PhotoFile | VideoFile;
};

type LoadedImage = Awaited<ReturnType<typeof loadImage>>;

const AssetPreview = ({ asset }: AssetPreviewProps): React.JSX.Element => {
  const [image, setImage] = useState<LoadedImage | null>(null);
  const { deleteTempAsset } = useCamera('deleteTempAsset');

  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  // Preload obrazu
  useEffect(() => {
    let cancelled = false;
    setImage(null); // reset na nowe asset.path
    opacity.value = 0; // zresetuj animację

    (async () => {
      try {
        const img: LoadedImage = await loadImage({ filePath: asset.path });
        if (!cancelled) setImage(img);
      } catch (err: unknown) {
        // typ-bezpieczny catch
        if (err instanceof Error) {
          console.error('loadImage error:', err.message);
        } else {
          console.error('loadImage error:', err);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [asset.path, opacity]);

  useEffect(() => {
    if (image) {
      opacity.value = withTiming(1, { duration: 140 });
    }
  }, [image, opacity]);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
      {image && (
        <Animated.View
          style={[StyleSheet.absoluteFillObject, animatedStyle]}
          pointerEvents="none"
        >
          <NitroImage
            style={StyleSheet.absoluteFillObject}
            resizeMode="contain"
            image={image}
            pointerEvents="none"
          />
        </Animated.View>
      )}

      <Pressable
        onPress={deleteTempAsset}
        style={{ position: 'absolute', top: 12, zIndex: 10, padding: 8 }}
        hitSlop={10}
      >
        <XIcon size={35} color="#fff" />
      </Pressable>
    </View>
  );
};

export default AssetPreview;
