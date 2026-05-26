import { useEffect } from 'react'
import { useSettingsStore } from '@/shared/settings/store'
import { createCameraDeviceSnapshot } from '../utils/utils'
import type { CameraDevice } from 'react-native-vision-camera'

export function useSyncCameraDeviceSnapshot(device: CameraDevice | undefined) {
  const setDeviceSnapshot = useSettingsStore(s => s.setDeviceSnapshot)

  useEffect(() => {
    if (!device) {
      setDeviceSnapshot(null)
      return
    }

    const snapshot = createCameraDeviceSnapshot(device)

    setDeviceSnapshot(snapshot)
  }, [device, setDeviceSnapshot])
}