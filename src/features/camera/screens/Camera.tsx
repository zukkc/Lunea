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
  // TODO: SPRAWDZIC CZEMU KOMPONETENT PRZY ROBIENIU ZDJECIA REDNERUJE SIE 2 RAZY
  // ZWRACA WYSOKOSC DOLNEGO PRZYCISKU NAVIGACJI W TELEFONIE
  const { bottom: bottomNavHeight } = useSafeAreaInsets();

  // ====================== KAMERA ================== //

  // HOOK ZAJMUJACY SIE OBLSUGA KAMERY JAK ROBIENIE ZDJEC I FILMOW
  const { outputs, asset, takePhoto } = useCameraCapture();

  // SPRAWDZA CZY NADANE SA PERMISJE
  const { isPermissionsGranted } = useCameraAndMicPermission();

  //SPRAWDZA CZY KAMERA POWINNA BYC AKTYWOWANA
  const isCameraActive = useCameraStore(s => s.isActive);

  // USTAWIA ALBO AUTOMATYCZNIE NAJLEPSZE URZADZENIE
  const device = useSetupCameraDevice();
  
  // SYNC DEVICE SNAPSHOT FOR SETTIGNS
  useSyncCameraDeviceSnapshot(device) 

  // SETTINGS
  const chosenFps = useSettingsStore(s => s.fps); 

  const { zoom, setZoom } = useCameraZoom({ 
    initialZoom: DEFAULT_ZOOM, 
    minZoom: device?.minZoom, 
    maxZoom: device?.maxZoom 
  });

  // SPRAWDZA CZY PERMISJE ZOSTALY NADANE
  if (!isPermissionsGranted) {
    return <HasNoPermissionView />;
  }

  // SPRAWDZA CZY KAMERA W OGOLE FIZYCZNIE ISTNIEJE W URZADZENIU
  if (!device) {
    return <View />;
  }

  console.log('SELECTED DEVICE', {
    id: device?.id,
    type: device?.type,
    position: device?.position,
    isVirtualDevice: device?.isVirtualDevice,
    physicalDevices: device?.physicalDevices,
    minZoom: device?.minZoom,
    maxZoom: device?.maxZoom,
    zoomLensSwitchFactors: device?.zoomLensSwitchFactors,
  })

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
