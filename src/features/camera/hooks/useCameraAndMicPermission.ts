import {
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';

export const useCameraAndMicPermission = () => {
  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();
  const hasPermissions = hasCameraPermission && hasMicrophonePermission;

  if (!hasPermissions) {
    requestCameraPermission();
    requestMicrophonePermission();
  }

  return {isPermissionsGranted: hasPermissions};
};
