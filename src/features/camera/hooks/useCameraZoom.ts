import { useSharedValue } from "react-native-reanimated"
import type { SharedValue } from "react-native-reanimated";

type CameraZoomInputs = {
    initialZoom: number 
    minZoom: number | undefined
    maxZoom: number | undefined
}

type CameraZoomReturn = {
    zoom: SharedValue<number>
    setZoom: (z: number) => void
}

export const useCameraZoom = ({ initialZoom, minZoom, maxZoom }: CameraZoomInputs): CameraZoomReturn => {
    const zoom = useSharedValue(initialZoom);

    const setZoom = (z: number): void => {
        'worklet'
        zoom.value = z
    }

    return {
        zoom: zoom,
        setZoom: setZoom
    }
}