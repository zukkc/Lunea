import React from 'react';
import {
  CommonResolutions,
  usePhotoOutput,
  useVideoOutput
} from 'react-native-vision-camera';
import type { CameraOutput } from 'react-native-vision-camera';

import { useSettingsStore } from '@/shared/settings/store';
import { CapturedAsset } from '@/shared/camera/types';

type CameraCapture = {
  outputs: Array<CameraOutput>
  asset: CapturedAsset | null
  takePhoto: () => void
}

export const useCameraCapture = (): CameraCapture => {
  const [asset, setAsset] = React.useState<CapturedAsset | null>(null);

  // ======================== SETTINGS ========================== //

  // Returns the photo quality selected in settings
  const photoQuality = useSettingsStore(s => s.photoQuality);

  // ============================================================== //


  const photoOutput = usePhotoOutput({
    qualityPrioritization: photoQuality,
    targetResolution: CommonResolutions.FHD_16_9
  });

  const videoOutput = useVideoOutput({
    enableAudio: true,
    targetResolution: CommonResolutions.FHD_16_9
  });

  const takePhoto = async () => {
    try {
      const raw = await photoOutput.capturePhoto({}, {});
      const image = await raw.toImageAsync();
      setAsset({ type: "photo", raw, image });
    } catch (e) {
      console.error(e)
    }
  }

  return {
    outputs: [videoOutput, photoOutput],
    asset,
    takePhoto,
  }
}