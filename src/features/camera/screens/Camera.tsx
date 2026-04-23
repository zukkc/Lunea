import { View } from 'react-native';
import React from 'react';
import {
  useCameraFormat,
  Camera as VisionCamera,
} from 'react-native-vision-camera';

import Controls from '../components/Controls';
import HasNoPermissionView from '../components/HasNoPermissionView';
import AssetPreview from '../components/AssetPreview.tsx';
import CameraGestureHandler from '../components/CameraGestureHandler.tsx';

import { useCamera } from '../../../core/hooks/cameraHooks.ts';
import { useSettings } from '../../../core/hooks/settingsHooks.ts';
import { useSetupCameraDevice } from '../hooks/useSetupCameraDevice.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCameraAndMicPermission } from '../hooks/useCameraAndMicPermission.ts';
import { useDeactivateCamera } from '../hooks/useDeactivateCamera.ts';
import { useSetPreviewDimensions } from '../hooks/useSetPreviewDimensions.ts';

const Camera = (): React.JSX.Element => {
  // TODO: SPRAWDZIC CZEMU KOMPONETENT PRZY ROBIENIU ZDJECIA REDNERUJE SIE 2 RAZY

  // ZWRACA WYSOKOSC DOLNEGO PRZYCISKU NAVIGACJI W TELEFONIE
  const { bottom: bottomNavHeight } = useSafeAreaInsets();

  // ====================== KAMERA ================== //

  // SPRAWDZA CZY NADANE SA PERMISJE (W PRZYPADKU GDY NIE TO O NIE PROSI) I ZWRACA WYNIK
  const { isPermissionsGranted } = useCameraAndMicPermission();

  // USTAWIA ALBO AUTOMATYCZNIE NAJLEPSZE URZADZENIE ALBO UZYWA WCZESNIEJ WYBRANEGO
  const device = useSetupCameraDevice();

  // cameraRef - USTAWIA REF NA KAMERZE DLA POZNIEJSZEGO UZYWANIA NP. cameraRef.takePhoto()
  // isCameraActive - SPRAWDZA I ODDAJE WYNIK CZY KAMERA POWINNA BYC AKTYWOWANA
  // asset - ZWRACA ASSET LUB NULL JEZELI ASSET ISNIEJE (ZDJECIE / VIDEO)
  const {
    setRef,
    isActive: isCameraActive,
    photo: asset,
  } = useCamera('setRef', 'isActive', 'photo');

  // TESTOWO
  const format = useCameraFormat(device || undefined, [
    { photoAspectRatio: 16 / 9 },
  ]);

  // AKTYWUJE LUB DESAKTYWUJE KAMERE PRZY WEJSCIU LUB WYJSCIU Z NIEJ
  useDeactivateCamera();

  // USTAWIA CONSTANTS WARTOSCI JAKIE SA DLA DANEGO WYSWIETLACZA TAKIE JAK WYSOKOSCI ITD
  useSetPreviewDimensions();

  // ======================== USTAWIENIA ========================== //

  // ZWRACA JAKOSC (KTORA JEST ZAPISANA W USTAWIENIACH) W JAKIEJ MAJA BYC ROBIONE ZDJECIA
  const { photoQuality } = useSettings('photoQuality');

  // ============================================================== //

  // SPRAWDZA CZY PERMISJE ZOSTALY NADANE
  if (!isPermissionsGranted) {
    return <HasNoPermissionView />;
  }

  // SPRAWDZA CZY KAMERA W OGOLE FIZYCZNIE ISTNIEJE W URZADZENIU
  if (!device) {
    return <View />;
  }

  return (
    <View style={{ flex: 1, marginBottom: bottomNavHeight }}>
      <CameraGestureHandler tabBarSwipeSpeed={1200} controlsSwipeSpeed={1200}>
        <VisionCamera
          ref={setRef}
          device={device}
          format={format}
          style={{ flex: 1 }}
          resizeMode="contain"
          isActive={isCameraActive}
          photo={true}
          video={true}
          audio={true}
          photoQualityBalance={photoQuality}
        />
      </CameraGestureHandler>
      <Controls />
      {asset && <AssetPreview asset={asset} />}
    </View>
  );
};

export default Camera;
