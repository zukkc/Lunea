import { View } from 'react-native';
import React from 'react';
import {
  Camera as VisionCamera,
} from 'react-native-vision-camera';

import Controls from '../components/Controls';
import HasNoPermissionView from '../components/HasNoPermissionView';
import AssetPreview from '../components/AssetPreview';
import CameraGestureHandler from '../components/CameraGestureHandler';

import { useCameraStore } from '../store/camera.store';
import { useCameraCapture } from '../hooks/useCameraCapture';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCameraAndMicPermission } from '../hooks/useCameraAndMicPermission';
import { useSetupCameraDevice } from '../hooks/useSetupCameraDevice';
import { useCameraZoom } from '../hooks/useCameraZoom';
import { useSyncCameraDeviceSnapshot } from '../hooks/useSyncCameraDeviceSnapshot';
import { useSettingsStore } from '@/shared/settings/store';

// DEFAULT ZOOM VALUE
const DEFAULT_ZOOM = 2

const Camera = (): React.JSX.Element => {
  // TODO: Check why this component renders twice when taking a photo
  
// Returns the height of the phone's bottom safe area / navigation area
  const { bottom: bottomNavHeight } = useSafeAreaInsets();

  // ====================== KAMERA ================== //

  // Handles camera actions such as taking photos and recording videos
  const { outputs, asset, takePhoto } = useCameraCapture();

  // Checks whether camera and microphone permissions are granted
  const { isPermissionsGranted } = useCameraAndMicPermission();

  // Checks whether the camera should be active
  const isCameraActive = useCameraStore(s => s.isActive);

  // Automatically selects the best available camera device
  const device = useSetupCameraDevice();
  
  // Syncs the current device snapshot for settings
  useSyncCameraDeviceSnapshot(device) 

  // SETTINGS
  const chosenFps = useSettingsStore(s => s.fps); 

  const { zoom, setZoom } = useCameraZoom({ 
    initialZoom: DEFAULT_ZOOM, 
    minZoom: device?.minZoom, 
    maxZoom: device?.maxZoom 
  });

  // Checks whether permissions have been granted
  if (!isPermissionsGranted) {
    return <HasNoPermissionView />;
  }

  // Checks whether a physical camera device is available
  if (!device) {
    return <View />;
  }

  console.log(device)

  return (
    <View style={{ flex: 1, marginBottom: bottomNavHeight }}>
      <CameraGestureHandler
        onSetZoom={setZoom}
        tabBarSwipeSpeed={1200}
        controlsSwipeSpeed={1200}
      >
        <VisionCamera
          device={device}
          style={{ flex: 1 }}
          resizeMode="contain"
          isActive={isCameraActive}
          outputs={outputs}
          constraints={[
            { resolutionBias: outputs[0] }, // index 0 is cameraOutput
            { resolutionBias: outputs[1] }, // index 1 is photoOutput
            { fps: chosenFps }
          ]}
          zoom={zoom}
        />
      </CameraGestureHandler>
      <Controls
        onTakePhoto={takePhoto}
      />
      {
        asset &&
        <AssetPreview
          asset={asset}
        />
      }
    </View>
  );
};

export default Camera;
