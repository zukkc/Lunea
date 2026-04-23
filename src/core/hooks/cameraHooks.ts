import { useMemo } from 'react';
import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { useCameraStore } from '../store/camera.store';
import type { CameraState, CameraKey } from '../types/camera.types';
import type { CameraDevice, CameraPosition } from 'react-native-vision-camera';

const pick = <S, K extends keyof S>(state: S, keys: readonly K[]) => {
  const out = {} as Pick<S, K>;
  for (const k of keys) out[k] = state[k];
  return out;
};

function useCameraSelector<T>(
  selector: (state: CameraState) => T,
  equalityFn?: (a: T, b: T) => boolean,
) {
  return useStoreWithEqualityFn(useCameraStore, selector, equalityFn);
}

///////////////////////////////////

export function useCamera<K extends CameraKey>(...keys: readonly K[]) {
  return useCameraSelector(state => pick(state, keys), shallow);
}

export const useIsAssetExist = () =>
  useCameraSelector(state => Boolean(state.photo || state.video));

export const useCameraDevicesNamesByPosition = (position: CameraPosition): Array<string> | undefined => {
  const allDevices = useCameraSelector(s => s.allDevices);
  const devicesNames = useMemo(() => allDevices?.filter(d => d.position === position).map(d => d.name ) ?? ['Error'], [allDevices])
  return devicesNames;
} 
