import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';
import { SettingsState } from '@/shared/settings/types';

const mmkv = createMMKV({ id: 'settings' });

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      devicePreference: 'quality',
      changeDevicePreference: preference =>
        set(() => ({ devicePreference: preference })),
      deviceSnapshot: null,
      setDeviceSnapshot: snapshot =>
        set(() => ({ deviceSnapshot: snapshot })),
      fps: 30,
      setFps: (fps) =>
        set({ fps: fps }),
      photoQuality: 'speed',
      changePhotoQuality: qualityValue =>
        set(() => ({ photoQuality: qualityValue })),
      cameraPosition: 'front',
      changeCameraPosition: position =>
        set(state => ({
          cameraPosition: position
            ? position
            : state.cameraPosition === 'back'
              ? 'front'
              : 'back',
        })),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => ({
        getItem: (key: string): string | null => mmkv.getString(key) ?? null,
        setItem: (key: string, value: string): void => mmkv.set(key, value),
        removeItem: (key: string): boolean => mmkv.remove(key),
      })),
      partialize: state => ({
        devicePreference: state.devicePreference,
        fps: state.fps,
        photoQuality: state.photoQuality,
        cameraPosition: state.cameraPosition,
      }),
    },
  ),
);
