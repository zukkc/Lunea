import { create } from 'zustand';
import { getSettingsStore } from '../hooks/settingsHooks';
import NitroFS from 'react-native-nitro-fs';
import type { CameraState } from '@/src/core/types/camera.types';

export const useCameraStore = create<CameraState>((set, get) => ({
  ref: null,
  isActive: true,
  photo: null,
  video: null,
  setRef: r => set({ ref: r }),
  setActive: v => set({ isActive: v }),
  setPhoto: p => set({ photo: p }),
  setVideo: v => set({ video: v }),

  takePhoto: async opts => {
    const cam = get().ref;
    if (!cam) return;
    const img = await cam.takePhoto(opts);
    set({ photo: img, isActive: false });
  },

  deleteTempAsset: async () => {
    const { photo, video, setPhoto, setVideo, setActive } = get();
    const path = photo?.path ?? video?.path;
    if (!path) return;
    try {
      await NitroFS.unlink(path);
    } catch (e) {
      console.error(e);
    } finally {
      setPhoto(null);
      setVideo(null);
      setActive(true);
    }
  },

  deviceByPosition: { front: null, back: null, external: null },
  setDeviceForPosition: (position, device) =>
    set(state => {
      const next =
        typeof device === 'string'
          ? state.allDevices?.find(d => d.name === device) ?? null
          : device;

      const curr = state.deviceByPosition[position];

      // nic się nie zmieniło → nic nie rób
      if ((curr?.id ?? null) === (next?.id ?? null)) return state;

      // persist: aktualizuj ID w settings store
      getSettingsStore().setDeviceIdForPosition(position, next?.id ?? null);

      // runtime: aktualizuj mapę urządzeń
      return {
        deviceByPosition: { ...state.deviceByPosition, [position]: next },
      };
    }),
  allDevices: undefined,
  setAllDevices: devices => set({ allDevices: devices }),
}));
